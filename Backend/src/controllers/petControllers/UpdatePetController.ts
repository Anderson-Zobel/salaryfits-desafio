import { FastifyRequest, FastifyReply } from "fastify";
import { UpdatePetService } from "../../services/petServices/UpdatePetService";

class UpdatePetController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id, name, type, client_id } = request.body as {
            id: number;
            name?: string;
            type?: string;
            client_id?: number;
        };

        const updatePetService = new UpdatePetService();

        const updatedPet = await updatePetService.execute({
            id,
            name,
            type,
            client_id,
        });

        reply.send(updatedPet);
    }
}

export { UpdatePetController };
