import { FastifyRequest, FastifyReply } from "fastify";
import { CreateClientService } from "../../services/clientServices/CreateClientService";

class CreateClientController {
    async handle(request: FastifyRequest, reply: FastifyReply){
        const { name, email, phone } = request.body as {
            name: string,
            email: string,
            phone: string,
        };

        const clientService = new CreateClientService()

        const client = await clientService.execute({
            name,
            email,
            phone,
        })

        reply.send(client)
    }
}

export { CreateClientController }