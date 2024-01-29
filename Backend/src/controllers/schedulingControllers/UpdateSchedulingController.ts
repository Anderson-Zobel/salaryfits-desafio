import { FastifyRequest, FastifyReply } from "fastify";
import {UpdateSchedulingService} from "../../services/schedulingServices/UpdateSchedulingService";

class UpdateSchedulingController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id, status, client_id, pet_id, scheduled_at } = request.body as {
            id: number;
            status?: string;
            client_id?: number;
            pet_id?: number;
            scheduled_at?: string;
        };

        const updateSchedulingService = new UpdateSchedulingService();

        const updateScheduling = await updateSchedulingService.execute({
            id,
            status,
            client_id,
            pet_id,
            scheduled_at,
        });

        reply.send(updateScheduling);
    }
}

export { UpdateSchedulingController };
