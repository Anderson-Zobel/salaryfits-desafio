import { FastifyRequest, FastifyReply } from "fastify";
import { CreatePetService } from "../../services/petServices/CreatePetService";

class CreatePetController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        const { name, type, client_id } = request.body as {
            name: string,
            type: string,
            client_id: number
        };


        const petService = new CreatePetService()

        const pet = await petService.execute({ name, type, client_id })

        reply.send(pet)
    }
}

export { CreatePetController }