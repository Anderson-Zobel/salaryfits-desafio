import prisma from "../../prismaClient";


// ListClientService é um serviço que busca clientes com base em um termo de pesquisa opcional. Utiliza o
// Prisma para consultar clientes cujos nomes contenham o termo de pesquisa e inclui informações sobre os
// pets associados a esses clientes. Em caso de sucesso, retorna a lista de clientes encontrados; em caso de erro,
// retorna uma mensagem de erro e um status.

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
