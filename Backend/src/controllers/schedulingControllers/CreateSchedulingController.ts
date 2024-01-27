import { FastifyRequest, FastifyReply } from "fastify";
import { CreateSchedulingService } from "../../services/schedulingServices/CreateSchedulingService";

class CreateSchedulingController {
    async handle(request: FastifyRequest, reply: FastifyReply){
        const { status, client_id, pet_id, scheduled_at  } = request.body as {
            status?: string,
            client_id: number,
            pet_id: number,
            scheduled_at: string,
        };

        const schedulingService = new CreateSchedulingService()

        const schedule = await schedulingService.execute({
            status,
            client_id,
            pet_id,
            scheduled_at,
        })

        reply.send(schedule)
    }
}

export { CreateSchedulingController }