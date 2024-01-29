import { FastifyReply, FastifyRequest } from "fastify";
import { DeleteClientService } from "../../services/clientServices/DeleteClientService";


// Neste código, um controlador (DeleteClientController) é definido para lidar com uma requisição de exclusão de cliente.
// Ele extrai o ID do cliente da consulta da requisição, utiliza o serviço DeleteClientService para excluir o cliente correspondente e envia a resposta,
// seja com a mensagem de sucesso ou uma mensagem de erro interno do servidor em caso de falha.

class DeleteClientController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        try {
            const query = request.query as { id?: string };
            const id = Number(query.id);

            const clientDeleteService = new DeleteClientService();

            const clientToDelete = await clientDeleteService.execute({ id });

            reply.code(200).send(clientToDelete);
        } catch (error) {
            reply.code(500).send({ error: "Erro interno do servidor" });
        }
    }
}

export { DeleteClientController };
