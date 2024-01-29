import { FastifyRequest, FastifyReply } from "fastify";
import { ListSchedulingService } from "../../services/schedulingServices/ListSchedulingService";

class ListSchedulingController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { search, date, status } = request.query;

        const listSchedulingService = new ListSchedulingService();

        const scheduling = await listSchedulingService.execute(
            search,
            date,
            status
        );

        reply.send(scheduling);
    }
}

export { ListSchedulingController };
