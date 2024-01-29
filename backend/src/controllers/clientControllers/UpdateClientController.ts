import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateClientService } from "../../services/clientServices/UpdateClientService";


// Neste código, um controlador (UpdateClientController) é definido para lidar com uma requisição de atualização de cliente.
// Ele extrai os parâmetros necessários (id, name, email, phone) da requisição, utiliza o serviço UpdateClientService para
// realizar a atualização do cliente com base nos parâmetros fornecidos e envia a resposta, seja com os dados atualizados
// do cliente ou uma mensagem de erro interno do servidor em caso de falha.

class UpdateClientController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { id, name, email, phone } = request.body as {
                id: number;
                name?: string;
                email?: string;
                phone?: string;
            };

            const updateClientService = new UpdateClientService();

            const updatedClient = await updateClientService.execute({
                id,
                name,
                email,
                phone,
            });

            reply.code(200).send(updatedClient);
        } catch (error) {
            reply.code(500).send({ error: "Erro interno do servidor" });
        }
    }
}

export { UpdateClientController };
