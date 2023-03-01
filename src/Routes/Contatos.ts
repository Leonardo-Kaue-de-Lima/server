import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from "../lib/prisma"
import { authenticate } from "../plugins/authenticate"

export async function userRoutes(fastify: FastifyInstance) {
  fastify.get('/contatos/count', async () => {
    const count = await prisma.contatosEmergencia.count()

    return { count }
  })

  fastify.post('/contatos/create', {
    onRequest: [authenticate]
   }, async (request, reply) =>{

    const createUser = z.object({
      name: z.string(),
      numero: z.string(),
    })  

    const { numero } = createUser.parse(request.body)

    const contato = await prisma.contatosEmergencia.findUnique({
      where:{
        contato01,
      }
    })

  })
}