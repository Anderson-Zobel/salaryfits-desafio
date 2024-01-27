import prisma from "../../prismaClient";

class ListPetService {
    async execute() {
        try {
            const pets = await prisma.pet.findMany({
                include: {
                    client: true, // Inclui os dados dos pets associados a cada client
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
