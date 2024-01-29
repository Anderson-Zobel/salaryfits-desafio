import { FastifyRequest, FastifyReply } from "fastify";
import { ListClientService } from "../../services/clientServices/ListClientService";

class ListClientController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { search } = request.query as { search?: string };

        const listClientService = new ListClientService();
        const clients = await listClientService.execute(search);

        reply.send(clients);
    }
}

export { ListClientController };
