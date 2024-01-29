import prisma from "../../prismaClient";

class ListPetService {
    async execute(search?: string) {
        try {
            const pets = await prisma.pet.findMany({
                where: {
                    name: {
                        contains: search,
                    },
                },
                include: {
                    client: true,
                },
            });

            return pets;
        } catch (error) {
            console.error('Erro ao buscar pets:', error);
            return {
                error: "Erro ao buscar pets",
                status: 400,
            };
        }
    }
}

export { ListPetService };
