import { FastifyInstance } from "fastify"
import { object, string, z } from "zod"
import { prisma } from "../lib/prisma"
import { authenticate } from "../plugins/authenticate"

export async function UserRoutes(fastify: FastifyInstance) {

  fastify.post('/user/:id/update', { onRequest: [authenticate] },
    async (request) => {
      const userInfoSchema = z.object({
        name: string(),
        telefone: string(),
        avatarUrl: string().url()
      })

      const dados = userInfoSchema.parse(request.body);

      const userid = z.object({
        id: string()
      })

      const id = userid.parse(request.params)

      const user = await prisma.user.update({
        where: {
          id: id.id
        }, data: {
          nome: dados?.name,
          telefone: dados.telefone,
          avatarUrl: dados?.avatarUrl,
          
        }

      })
      return user;
    });
}