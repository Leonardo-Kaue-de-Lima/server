import { FastifyInstance } from "fastify"
import { prisma } from "../lib/prisma"

export async function userRoutes(fastify: FastifyInstance) {
  fastify.get('/contatos/count', async () => {
    const count = await prisma.contatosEmergencia.count()

    return { count }
  })
}
