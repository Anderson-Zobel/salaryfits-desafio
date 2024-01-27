import prisma from "../../prismaClient";

interface CreateSchedulingProps {
    status?: string;
    client_id: number;
    pet_id: number;
    scheduled_at: string;
}

class CreateSchedulingService {
    async execute({ status, client_id, pet_id, scheduled_at }: CreateSchedulingProps) {
        try {
            if (!client_id || !pet_id || !scheduled_at) {
                return {
                    error: "Preencha todos os campos",
                };
            }

            const schedule = await prisma.scheduling.create({
                data: {
                    status,
                    client_id,
                    pet_id,
                    scheduled_at
                },
            });

            return schedule;
        } catch (error) {
            throw error;
        }
    }
}

export { CreateSchedulingService };
