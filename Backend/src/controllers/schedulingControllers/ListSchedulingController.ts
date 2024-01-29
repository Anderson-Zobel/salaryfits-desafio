import { FastifyRequest, FastifyReply } from "fastify";
import { ListSchedulingService } from "../../services/schedulingServices/ListSchedulingService";


// O ListSchedulingController processa uma requisição para listar agendamentos, usando critérios opcionais como search,
// date, e status. Ele utiliza o serviço ListSchedulingService para realizar a busca e responde com os resultados encontrados
// (código 200) ou, em caso de erro interno, retorna uma mensagem de erro com código 500.

class ListSchedulingController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        try {
            const query = request.query as {
                search?: string;
                date?: string;
                status?: string;
            };

            const { search, date, status } = query;

            const listSchedulingService = new ListSchedulingService();

            const scheduling = await listSchedulingService.execute(
                search,
                date,
                status
            );

            reply.code(200).send(scheduling);
        } catch (error) {
            reply.code(500).send({ error: "Erro interno do servidor" });
        }
    }
}

export { ListSchedulingController };
