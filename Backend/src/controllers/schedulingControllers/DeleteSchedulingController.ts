import {FastifyReply, FastifyRequest} from "fastify";
import {DeleteSchedulingService} from "../../services/schedulingServices/DeleteSchedulingService";

class DeleteSchedulingController {
    async handle(request: FastifyRequest, reply: FastifyReply){
        const id = Number(request.query.id)
        const schedulingDeleteService =  new DeleteSchedulingService()

        const clientTodDelete = await schedulingDeleteService.execute({ id })

        reply.send(clientTodDelete)
    }
}

export { DeleteSchedulingController }