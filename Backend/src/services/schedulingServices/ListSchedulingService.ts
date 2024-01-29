import prisma from "../../prismaClient";

class ListSchedulingService {
    async execute(search?: string, date?: string, status?: string) {
        try {
            const formattedSearchDate = date ? new Date(date) : undefined;

            const schedulings = await prisma.scheduling.findMany({
                where: {
                    OR: [
                        {
                            client: {
                                name: {
                                    contains: search,
                                },
                            },
                        },
                        {
                            pet: {
                                name: {
                                    contains: search,
                                },
                            },
                        },
                    ],
                    scheduled_at: formattedSearchDate
                        ? {
                            gte: formattedSearchDate,
                            lt: new Date(formattedSearchDate.getTime() + 24 * 60 * 60 * 1000),
                        }
                        : undefined,
                    status: {
                        contains: status,
                    },
                },
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
