import { FastifyRequest, FastifyReply } from "fastify";
import { CreateSchedulingService } from "../../services/schedulingServices/CreateSchedulingService";


// Neste código, o controlador CreateSchedulingController trata uma requisição para criar um novo agendamento (scheduling).
// Ele extrai os parâmetros necessários do corpo da requisição, incluindo status, client_id, pet_id e scheduled_at.
// Em seguida, utiliza o serviço CreateSchedulingService para realizar a criação do agendamento com base nos parâmetros fornecidos.
// Se a criação for bem-sucedida, o controlador envia uma resposta com código 201 (Created) contendo os dados do agendamento recém-criado.
// Se ocorrer algum erro interno do servidor durante o processamento, a resposta terá um código 500 (Internal Server Error) com uma mensagem indicando o problema.


class CreateSchedulingController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { status, client_id, pet_id, scheduled_at } = request.body as {
                status?: string;
                client_id: number;
                pet_id: number;
                scheduled_at: string;
            };

            const schedulingService = new CreateSchedulingService();

            const schedule = await schedulingService.execute({
                status,
                client_id,
                pet_id,
                scheduled_at,
            });

            reply.code(201).send(schedule);
        } catch (error) {
            reply.code(500).send({ error: "Erro interno do servidor" });
        }
    }
}

export { CreateSchedulingController };
