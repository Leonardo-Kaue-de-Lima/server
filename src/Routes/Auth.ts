import { FastifyInstance } from "fastify"
import fetch from "node-fetch";
import { z } from "zod"
import { prisma } from "../lib/prisma"
import { authenticate } from "../plugins/authenticate"

export async function authRoutes(fastify: FastifyInstance) {
  fastify.get('/me', {onRequest: [authenticate]},
   async (request) => {
    return { user: request.user };
  });

  //Requisição para criação de usuario, enviando o access_token do front 
  fastify.post('/users', async (request) => {
    const createUserBody = z.object({
      access_token: z.string(),
    })

    const { access_token } = createUserBody.parse(request.body)

    //Função para mandar o access token para a google e retornar data dados
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    })

    //transformando os dados do access_token em informações de usuarios
    const userData = await userResponse.json()

    //tipando as variaveis com zod papa verificar se os dados que vamos receber do google batem com o esperado
    const userInfoSchema = z.object({
      id: z.string(),
      email: z.string().email(),
      name: z.string(),
      picture: z.string().url(),
      phoneNumber: z.string().url(),
    })

    //verificando se os dados que vamos receber do google batem com o esperado
    const userInfo = userInfoSchema.parse(userData)

    //Verificação para ver se usuario existe no DB
    let user = await prisma.user.findUnique({
      where: {
        googleId: userInfo.id,
      }
    })
    //Se usuario não existir, criar usuario
    if (!user) {
      user = await prisma.user.create({
        data:{
          googleId: userInfo.id,
          nome: userInfo.name,
          email: userInfo.email,
          avatarUrl: userInfo.picture,
          telefone: userInfo.phoneNumber,
        }
      })
    }    
    
    //Gerando token com hash para validar usuario, primeiro passando parametros que conterão no token e depois quem criou e quando ele expira 
    const token =  fastify.jwt.sign({
      name: user.nome,
      avatarUrl: user.avatarUrl,
    }, {
      sub: user.id,
      expiresIn: '7 days'
    })

    //Devolve token para a aplicação 
    return { token }
   })
}