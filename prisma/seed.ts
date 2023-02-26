import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function Main(){
    const User = await prisma.user.create({
      data:{
        nome: 'John Doe',
        email: 'leonlima1610@gmail.com',
        telefone: '(51) 984729267',
      } 
    })

    const contatos = await prisma.contatosEmergencia.create({
      data:{
        contato01: '51 998429060',
        owner: User.id
      }
    })

    const mensagem = await prisma.mensagem.create({
      data:{
        mensagem:'SOS: Socorro posso estar em alguma situação de perigo, se você recebeu está mensagem porfavor contato a policia e tente contato comigo',
        destinatario: '51 998429060',
        remetenteId: User.id,        
      }
    })

    const aciona = await prisma.acionaEmergencia.create({
      data:{
        userId: User.id,
        tecla01: 'volumen',
        tecla02:'volumem',
        tecla03: 'volumen',
        biometric: 'aaa',

      }
    })
}

Main()