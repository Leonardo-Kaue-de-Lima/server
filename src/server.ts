import Fastify from "fastify";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['query'],
})

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  })

  fastify.get('/alerty/login', async () => {

    const users = await prisma.user.findMany({
      where:{
        Email:{
          startsWith: 'l'
        }
      }
    })

    return(true)
  })

  await fastify.listen({port:3333})
}

bootstrap()