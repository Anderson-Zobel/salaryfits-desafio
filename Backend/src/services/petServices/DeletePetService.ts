import prisma from "../../prismaClient";

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

        return { message: "Cliente Deletado" };

    }
}

export { DeletePetService }