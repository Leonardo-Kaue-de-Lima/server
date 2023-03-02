import { FastifyInstance } from "fastify"
import { object, string, z } from "zod"
import { prisma } from "../lib/prisma"
import { authenticate } from "../plugins/authenticate"

export async function MensagemRoutes(fastify: FastifyInstance) {
   // Rota POST para criar um novo contato
  fastify.post('/user/:id/mensagemuser', async (request, reply) => {
    try {
      // Obtém os dados enviados no body da requisição   

      console.log(request.params)
      
      const contactuserid = z.object({
        id: string()
      })

      const id = contactuserid.parse(request.params)

      const mensagemInfoSchema = z.object({
        mensagem: string(),
        })

      const dados = mensagemInfoSchema.parse(request.body);

      // Cria o contato no banco de dados
      const newMensage = await prisma.mensagem.create({
        data: {
          mensagem: dados.mensagem,
          user_id: id.id
        },include:{
          user: true
        }

      });

      // Retorna o novo contato criado
      return newMensage;
    } catch (error: any) {
      console.log("testando erro")
      // Em caso de erro, retorna uma mensagem de erro com o status 500
      reply.status(500).send({ error: error.message });
    }
  });

  fastify.get('/user/:id/mensage', {onRequest: [authenticate]},
  async (request, reply) => {
    try {

      const mensageuserid = z.object({
        id: string()
      })

      const id = mensageuserid.parse(request.params)

      const mensage = await prisma.user.findMany({
        where: {
          id: id.id 
        },include:{
          Mensagem: true
        }
      })
      return mensage;
    } catch (error:any) {
      reply.status(500).send({ error: error.message });
    }
 });

 fastify.post('/mensagem/:id/update', {onRequest: [authenticate]},
  async (request, reply) => {
    try {

      const mensageInfoSchema = z.object({
        mensage: string(),
        })

      const dados = mensageInfoSchema.parse(request.body);

      const mensageuserid = z.object({
        id: string()
      })

      const id = mensageuserid.parse(request.params)

      const mensage = await prisma.mensagem.update({
        where: {
          id: id.id 
        },data:{
          mensagem: dados.mensage
        }
          
      })
      return mensage;

    } catch (error:any) {
      reply.status(500).send({ error: error.message });
    }
 });

 fastify.post('/mensagem/:id/delete',{onRequest: [authenticate]},
 async (request, reply) => {
  try {  
    const mensageuserid = z.object({
      id: string()
    })

    const id = mensageuserid.parse(request.params)

    const deleteMensage = await prisma.mensagem.delete({
      where:{
        id: id.id
      }
    })
    return{mensagem:'Mensagem deletada com sucesso!'}
  } catch (error:any) {
    reply.status(500).send({ error: error.message });
  }
});
 
}