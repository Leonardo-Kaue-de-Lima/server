import { FastifyInstance } from "fastify"
import { object, string, z } from "zod"
import { prisma } from "../lib/prisma"
import { authenticate } from "../plugins/authenticate"

export async function contatosRoutes(fastify: FastifyInstance) {
  fastify.get('/contatos/count', async () => {
    const count = await prisma.contactUser.count()

    return { count }
  })

  // Rota POST para criar um novo contato
  fastify.post('/user/:id/contactuser', async (request, reply) => {
    try {
      // Obtém os dados enviados no body da requisição   

      console.log(request.params)
      
      const contactuserid = z.object({
        id: string()
      })

      const id = contactuserid.parse(request.params)

      const contactInfoSchema = z.object({
        contact: string(),
        name: string(),
        })

      const dados = contactInfoSchema.parse(request.body);
        console.log('chegou aqui', dados)
      // Cria o contato no banco de dados
      const newContact = await prisma.contactUser.create({
        data: {
          contact: dados.contact,
          name: dados.name,
          user_id: id.id
        },include:{
          user: true
        }

      });

      // Retorna o novo contato criado
      return newContact;
    } catch (error: any) {
      console.log("testando erro",  error)
      // Em caso de erro, retorna uma mensagem de erro com o status 500
      reply.status(500).send({ error: error.message });
    }
  });

  fastify.get('/user/:id/contacts', {onRequest: [authenticate]},
  async (request) => {
    const contactuserid = z.object({
      id: string()
    })

    const id = contactuserid.parse(request.params)

    const contacts = await prisma.user.findMany({
      where: {
        id: id.id 
      },include:{
        contactUser: true
      }
    })
    return contacts;
 });

 fastify.post('/contatos/:id/update', {onRequest: [authenticate]},
  async (request) => {
    const contactInfoSchema = z.object({
      contact: string(),
      name: string() 
    })

    const dados = contactInfoSchema.parse(request.body);

    const contactuserid = z.object({
      id: string()
    })

    const id = contactuserid.parse(request.params)

    const contacts = await prisma.contactUser.update({
      where: {
        id: id.id 
      },data:{
        contact: dados.contact,
        name: dados.name        
      }
        
    })
    return contacts;
 });

 fastify.post('/contatos/:id/delete',{onRequest: [authenticate]},
 async (request) => {
  
  const contactuserid = z.object({
    id: string()
  })

  const id = contactuserid.parse(request.params)

  const deleteContact = await prisma.contactUser.delete({
    where:{
      id: id.id
    }
  })
  return{mensagem:'Contato deletado com sucesso!'}
});
 
}