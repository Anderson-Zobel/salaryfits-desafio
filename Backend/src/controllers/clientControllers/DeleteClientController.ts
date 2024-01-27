import {FastifyReply, FastifyRequest} from "fastify";
import {DeleteClientService} from "../../services/clientServices/DeleteClientService";

class DeleteClientController {
    async handle(request: FastifyRequest, reply: FastifyReply){
        const id = Number(request.query.id)
        const clientDeleteService =  new DeleteClientService()

        const clientTodDelete = await clientDeleteService.execute({ id })

        reply.send(clientTodDelete)
    }
}

export { DeleteClientController }