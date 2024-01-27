import prisma from "../../prismaClient";

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