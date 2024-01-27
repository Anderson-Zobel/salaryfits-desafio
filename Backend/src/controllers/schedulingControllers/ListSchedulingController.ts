import { FastifyRequest, FastifyReply } from "fastify";
import {ListSchedulingService} from "../../services/schedulingServices/ListSchedulingService";

class ListSchedulingController {
    async handle(request: FastifyRequest, reply: FastifyReply){
        const listSchedulingService = new ListSchedulingService();

        const scheduling = await listSchedulingService.execute()

        reply.send(scheduling)
    }
}

export { ListSchedulingController }