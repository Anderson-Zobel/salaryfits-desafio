import { FastifyRequest, FastifyReply } from "fastify";
import { UpdatePetService } from "../../services/petServices/UpdatePetService";

// Neste código, o controlador UpdatePetController é responsável por lidar com uma requisição de atualização de informações de um pet.
// Ele extrai os parâmetros do corpo da requisição, incluindo id, name, type, e client_id. Em seguida, utiliza o serviço UpdatePetService
// para realizar a atualização do pet com base nos parâmetros fornecidos. Se a atualização for bem-sucedida, o controlador envia uma resposta
// com código 200 (OK) contendo os dados atualizados do pet. Se ocorrer algum erro interno do servidor durante o processamento, a
// resposta terá um código 500 (Internal Server Error) com uma mensagem indicando o problema.

class UpdatePetController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        try {
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

            reply.code(200).send(updatedPet);
        } catch (error) {
            reply.code(500).send({ error: "Erro interno do servidor" });
        }
    }
}

export { UpdatePetController };
