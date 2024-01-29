import { FastifyRequest, FastifyReply } from "fastify";
import { ListClientService } from "../../services/clientServices/ListClientService";

// Neste código, um controlador (ListClientController) é definido para lidar com uma requisição de listagem de clientes.
// Ele extrai o parâmetro de consulta "search" da requisição, utiliza o serviço ListClientService para buscar clientes
// com base no parâmetro e envia a resposta, seja com a lista de clientes ou uma mensagem de erro interno do servidor em caso de falha.


class ListClientController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { search } = request.query as { search?: string };

            const listClientService = new ListClientService();
            const clients = await listClientService.execute(search);

            reply.code(200).send(clients);
        } catch (error) {
            reply.code(500).send({ error: "Erro interno do servidor" });
        }
    }
}

export { ListClientController };
