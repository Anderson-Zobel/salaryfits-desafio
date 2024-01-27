import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateClientService } from "../../services/clientServices/UpdateClientService";

class UpdateClientController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id, name, email, phone } = request.body as {
            id: number;
            name?: string;
            email?: string;
            phone?: string;
        };

        const updateClientService = new UpdateClientService();

        const updatedClient = await updateClientService.execute({
            id,
            name,
            email,
            phone,
        });

        reply.send(updatedClient);
    }
}

export { UpdateClientController };
