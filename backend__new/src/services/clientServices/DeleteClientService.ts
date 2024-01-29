import prisma from "../../prismaClient";

// DeleteClientService é um serviço que exclui um cliente e todos os seus relacionamentos, como agendamentos e pets, usando transações do Prisma.
// Se o ID do cliente não for fornecido, uma exceção é lançada. Em caso de sucesso, uma mensagem indicando a exclusão é retornada.

interface DeleteClientProps{
    id: number;
}

class DeleteClientService {
    async execute({ id }: DeleteClientProps) {
        if (!id) {
            throw new Error("Ocorreu um erro");
        }

        await prisma.$transaction([
            prisma.scheduling.deleteMany({
                where: {
                    client_id: id,
                },
            }),

            prisma.pet.deleteMany({
                where: {
                    client_id: id,
                },
            }),

            prisma.client.delete({
                where: {
                    id: id,
                },
            }),
        ]);

        return { message: "Cliente Deletado" };
    }
}

export { DeleteClientService }