import { FastifyRequest, FastifyReply } from "fastify";
import { ListPetService } from "../../services/petServices/ListPetService";

// Neste código, o controlador ListPetController é responsável por lidar com uma requisição de listagem de pets.
// Ele extrai o parâmetro opcional search da query da requisição e utiliza o serviço ListPetService para obter uma lista de pets
// com base nos critérios fornecidos. Em seguida, envia uma resposta com código 200 (OK) contendo os dados dos pets encontrados.
// Se ocorrer algum erro interno do servidor durante o processamento, a resposta terá um código 500 (Internal Server Error) com uma mensagem indicando o problema.

class ListPetController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        try {
            const query = request.query as { search?: string };

            const { search } = query;

            const listPetService = new ListPetService();

            const pets = await listPetService.execute(search);

            reply.code(200).send(pets);
        } catch (error) {
            reply.code(500).send({ error: "Erro interno do servidor" });
        }
    }
}

export { ListPetController };
