import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from '@fastify/jwt';

import { authRoutes } from "./Routes/Auth"

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  })

  await fastify.register(cors, {
    origin: true,
  })

  // Em produção isso precisa ser uma viarável de ambiente

  await fastify.register(jwt, {
    secret: '4l3rt1l3ogu',
  })

  await fastify.register(authRoutes)

  await fastify.listen({ port: 3333, host: '192.168.0.85' })
}

bootstrap()
