import prisma from "../../prismaClient";

interface DeletePetProps{
    id: number;
}

class DeletePetService{
    async execute({ id }: DeletePetProps){

        if(!id){
            return {
                error: "Preencha todos os campos",
                status: 400,
            };
        }

        const findPet = await prisma.pet.findFirst({
            where: {
                id: id
            }
        })

        if(!findPet) {
            throw new Error('Pet não Encontrado')
        }

        await prisma.pet.delete({
            where: {
                id: findPet.id
            }
        })

        return { message: 'Pet deletado'}

    }
}

export { DeletePetService }