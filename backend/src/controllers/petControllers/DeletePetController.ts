import { FastifyReply, FastifyRequest } from "fastify";
import { DeletePetService } from "../../services/petServices/DeletePetService";


// Neste código, um controlador (DeletePetController) é definido para lidar com uma requisição de exclusão de um pet.
// Ele extrai o parâmetro id da requisição, utiliza o serviço DeletePetService para excluir o pet com o ID fornecido e
// envia uma resposta com base no resultado da operação. Se o pet for excluído com sucesso, a resposta terá um código 200 (OK)
// e conterá os dados do pet excluído. Se o pet não for encontrado, a resposta terá um código 404 (Not Found) e uma mensagem indicando
// que o pet não foi encontrado. Em caso de erro interno do servidor, a resposta terá um código 500 (Internal Server Error).


class DeletePetController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        try {
            const query = request.query as { id?: string };
            const id = Number(query.id);

            const petDeleteService = new DeletePetService();

            const petToDelete = await petDeleteService.execute({ id });

            if (petToDelete) {
                reply.code(200).send(petToDelete);
            } else {
                reply.code(404).send({ error: "Pet não encontrado" });
            }
        } catch (error) {
            reply.code(500).send({ error: "Erro interno do servidor" });
        }
    }
}

export { DeletePetController };
