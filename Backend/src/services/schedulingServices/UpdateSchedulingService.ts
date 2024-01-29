import prisma from "../../prismaClient";

interface UpdateSchedulingProps {
    id: number;
    status?: string;
    client_id?: number;
    pet_id?: number;
    scheduled_at?: string;
}

class UpdateSchedulingService {
    async execute({ id, status, client_id, pet_id, scheduled_at }: UpdateSchedulingProps) {
        try {
            const existingScheduling = await prisma.scheduling.findUnique({
                where: { id },
            });

            if (!existingScheduling) {
                throw new Error("Agendamento não encontrado");
            }

            const updateScheduling = await prisma.scheduling.update({
                where: { id },
                data: {
                    status: status || existingScheduling.status,
                    client_id: client_id || existingScheduling.client_id,
                    pet_id: pet_id || existingScheduling.pet_id,
                    scheduled_at: scheduled_at || existingScheduling.scheduled_at,
                },
            });

            return updateScheduling;
        } catch (error) {
            throw error;
        }
    }
}

export { UpdateSchedulingService };
