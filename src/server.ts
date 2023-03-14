import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from '@fastify/jwt';

import { authRoutes } from "./Routes/Auth"
import { contatosRoutes } from "./Routes/Contatos";
import { MensagemRoutes } from "./Routes/Mensagem";
import { UserRoutes } from "./Routes/User";

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  })

  await fastify.register(cors, {
    origin: true,
  })

  // Em produção isso precisa ser uma viarável de ambiente

  await fastify.register(jwt, {
    secret: 'alerty',
  })

  await fastify.register(authRoutes)
  await fastify.register(contatosRoutes)
  await fastify.register(MensagemRoutes)
  await fastify.register(UserRoutes)

  await fastify.listen({ port: 3333, host: '0.0.0.0' })
}

bootstrap()
