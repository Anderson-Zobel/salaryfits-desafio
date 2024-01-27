import prisma from "../../prismaClient";

class ListClientService {
    async execute() {
        try {
            const clients = await prisma.client.findMany({
                include: {
                    pets: true, // Inclui os dados dos pets associados a cada client
                },
            });

            return clients;
        } catch (error) {
            console.error('Erro ao buscar clientes:', error);
            return {
                error: "Erro ao buscar clientes",
                status: 400,
            };
        }
    }
}

export { ListClientService };
