import { FastifyReply, FastifyRequest } from "fastify";
import { DeleteSchedulingService } from "../../services/schedulingServices/DeleteSchedulingService";


// Neste código, o controlador DeleteSchedulingController lida com uma requisição para excluir um agendamento (scheduling).
// Ele extrai o parâmetro id da consulta da requisição, converte para um número e utiliza o serviço DeleteSchedulingService
// para executar a exclusão do agendamento com base no ID fornecido. Se a exclusão for bem-sucedida, o controlador envia
// uma resposta com código 200 (OK) contendo os detalhes do agendamento excluído. Se o agendamento não for encontrado, a
// resposta terá um código 404 (Not Found) com uma mensagem indicando que o agendamento não foi encontrado. Em caso de erro
// interno do servidor, a resposta terá um código 500 (Internal Server Error) com uma mensagem indicando o problema.

class DeleteSchedulingController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        try {
            const query = request.query as { id?: string };
            const id = Number(query.id);

            const schedulingDeleteService = new DeleteSchedulingService();



            const schedulingToDelete = await schedulingDeleteService.execute({ id });

            if (schedulingToDelete) {
                reply.code(200).send(schedulingToDelete);
            } else {
                reply.code(404).send({ error: "Agendamento não encontrado" });
            }
        } catch (error) {
            reply.code(500).send({ error: "Erro interno do servidor" });
        }
    }
}

export { DeleteSchedulingController };
