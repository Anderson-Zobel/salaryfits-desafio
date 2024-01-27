import prisma from "../../prismaClient";

interface DeleteClientProps{
    id: number;
}

class DeleteClientService {
    async execute({ id }: DeleteClientProps){

        if(!id){
            throw new Error("Ocorreu um erro")
        }

        const findClient = await prisma.client.findFirst({
            where: {
                id: id
            }
        })

        if(!findClient) {
            throw new Error('Cliente não encontrado')
        }

        await prisma.client.delete({
            where: {
                id: findClient.id
            }
        })

        return { message: 'Cliente Deletado'}

    }
}

export { DeleteClientService }