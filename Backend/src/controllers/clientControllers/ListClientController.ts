import { FastifyRequest, FastifyReply } from "fastify";
import { ListClientService } from "../../services/clientServices/ListClientService";

class ListClientController {
    async handle(request: FastifyRequest, reply: FastifyReply){
        const listClientService = new ListClientService();

        const clients = await listClientService.execute()

        reply.send(clients)
    }
}

export { ListClientController }