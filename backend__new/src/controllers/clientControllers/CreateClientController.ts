import { FastifyRequest, FastifyReply } from "fastify";
import { CreateClientService } from "../../services/clientServices/CreateClientService";

// Neste código, um controlador (CreateClientController) é definido para lidar com uma requisição de criação de cliente.
// Ele extrai dados do corpo da requisição, utiliza o serviço CreateClientService para criar um cliente, e envia a resposta correspondente,
// seja o cliente criado ou uma mensagem de erro interno do servidor em caso de falha.

class CreateClientController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { name, email, phone } = request.body as {
                name: string;
                email: string;
                phone: string;
            };

            const clientService = new CreateClientService();

            const client = await clientService.execute({
                name,
                email,
                phone,
            });

            reply.code(201).send(client);
        } catch (error) {
            reply.code(500).send({ error: "Erro interno do servidor" });
        }
    }
}

export { CreateClientController };
