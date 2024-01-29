import { FastifyRequest, FastifyReply } from "fastify";
import { ListPetService } from "../../services/petServices/ListPetService";

class ListPetController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { search } = request.query; // Adicionando a obtenção do parâmetro de busca

        const listPetService = new ListPetService();

        const pets = await listPetService.execute(search);

        reply.send(pets);
    }
}

export { ListPetController };
