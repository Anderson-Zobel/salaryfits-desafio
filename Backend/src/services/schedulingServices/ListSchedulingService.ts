import prisma from "../../prismaClient";

class ListSchedulingService {
    async execute() {
        try {
            const schedulings = await prisma.scheduling.findMany({
                include: {
                    client: true,
                    pet: true,
                },
            });

            return schedulings;
        } catch (error) {
            console.error('Erro ao buscar agendamentos:', error);
            return {
                error: "Erro ao buscar agendamentos",
                status: 400,
            };
        }
    }
}

export { ListSchedulingService };
