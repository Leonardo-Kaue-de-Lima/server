import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from "../lib/prisma"
import { authenticate } from "../plugins/authenticate"

export async function userRoutes(fastify: FastifyInstance) {
  fastify.get('/contatos/count', async () => {
    const count = await prisma.contatosEmergencia.count()

    return { count }
  })

  // Rota POST para criar um novo contato
  fastify.post('/contact-user', async (request, reply) => {
    try {
      // Obtém os dados enviados no body da requisição
      const { contact, amount } = request.body;

      // Cria o contato no banco de dados
      const newContact = await prisma.contatosEmergencia.create({
        data: {
          ,
          amount
        }
      });

      // Retorna o novo contato criado
      return newContact;
    } catch (error) {
      // Em caso de erro, retorna uma mensagem de erro com o status 500
      reply.status(500).send({ error: error.message });
    }
});
}