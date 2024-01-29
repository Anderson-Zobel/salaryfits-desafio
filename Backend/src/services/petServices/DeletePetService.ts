import prisma from "../../prismaClient";

// DeletePetService exclui um animal de estimação pelo ID, realizando uma transação para garantir consistência nas exclusões.
// Retorna uma mensagem de sucesso ou erro.

interface DeletePetProps{
    id: number;
}

class DeletePetService{
    async execute({ id }: DeletePetProps){

        if(!id){
            return {
                error: "Ocorreu um erro",
                status: 400,
            };
        }

        await prisma.$transaction([
            prisma.scheduling.deleteMany({
                where: {
                    pet_id: id,
                },
            }),

            prisma.pet.delete({
                where: {
                    id: id,
                },
            }),

        ]);

        return { message: "Pet Deletado" };

    }
}

export { DeletePetService }