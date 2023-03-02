import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    await prisma.user.deleteMany()

    await prisma.user.create({
        data: {
            nome: 'Joaozinho',
            createdAt: new Date('2023-03-01T00:00:00.000Z'),
        }
    })
}

main().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})