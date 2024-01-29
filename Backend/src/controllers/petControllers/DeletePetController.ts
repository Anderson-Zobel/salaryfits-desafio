import { FastifyReply, FastifyRequest } from "fastify";
import { DeletePetService } from "../../services/petServices/DeletePetService";

class DeletePetController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        const id = Number(request.query.id)
        const petDeleteService =  new DeletePetService()

        const petToDelete = await petDeleteService.execute({ id })

        reply.send(petToDelete)
    }
}

export { DeletePetController }