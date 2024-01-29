import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateSchedulingService } from "../../services/schedulingServices/UpdateSchedulingService";

// UpdateSchedulingController recebe uma requisição para atualizar um agendamento, usando parâmetros como id, status, client_id, pet_id, e
// scheduled_at. Ele utiliza o serviço UpdateSchedulingService para executar a atualização e responde com os dados atualizados (código 200)
// ou, em caso de erro interno, retorna uma mensagem de erro com código 500.

class UpdateSchedulingController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { id, status, client_id, pet_id, scheduled_at } = request.body as {
                id: number;
                status?: string;
                client_id?: number;
                pet_id?: number;
                scheduled_at?: string;
            };

            const updateSchedulingService = new UpdateSchedulingService();

            const updateScheduling = await updateSchedulingService.execute({
                id,
                status,
                client_id,
                pet_id,
                scheduled_at,
            });

            reply.code(200).send(updateScheduling);
        } catch (error) {
            reply.code(500).send({ error: "Erro interno do servidor" });
        }
    }
}

export { UpdateSchedulingController };
