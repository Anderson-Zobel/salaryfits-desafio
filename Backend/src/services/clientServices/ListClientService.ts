import prisma from "../../prismaClient";

class ListClientService {
    async execute(search?: string) {
        try {
            const clients = await prisma.client.findMany({
                where: {
                    name: {
                        contains: search,
                    },
                },
                include: {
                    pets: true,
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
