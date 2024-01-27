import { FastifyRequest, FastifyReply } from "fastify";
import { ListPetService } from "../../services/petServices/ListPetService";

class ListPetController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        const listPetService = new ListPetService();

        const pets = await listPetService.execute()

        reply.send(pets)
    }
}

export { ListPetController }