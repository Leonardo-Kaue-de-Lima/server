import Fastify from "fastify";
import { PrismaClient } from "@prisma/client";
import cors from "@fastify/cors";
import jwt from '@fastify/jwt';

import { authRoutes } from "./Routes/Auth"

const app = Fastify()
const prisma = new PrismaClient();

app.register(cors)

app.get('/users', () => {
  const users = prisma.user.findMany()

  return users;
})

app.listen({
  port: 3333,
}).then(() => {
  console.log('HTTP Server running!')
})
