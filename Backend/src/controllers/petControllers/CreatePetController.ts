import { FastifyRequest, FastifyReply } from "fastify";
import { CreatePetService } from "../../services/petServices/CreatePetService";

// Neste código, um controlador (CreatePetController) é definido para lidar com uma requisição de criação de um novo pet.
// Ele extrai os parâmetros necessários (name, type, client_id) da requisição, utiliza o serviço CreatePetService para criar o
// novo pet com base nos parâmetros fornecidos e envia a resposta, seja com os dados do novo pet ou uma mensagem de erro interno do servidor em caso de falha.
// O código retorna um status 201 (Created) caso a criação seja bem-sucedida.

class CreatePetController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { name, type, client_id } = request.body as {
                name: string;
                type: string;
                client_id: number;
            };

            const petService = new CreatePetService();

            const pet = await petService.execute({ name, type, client_id });

            reply.code(201).send(pet);
        } catch (error) {
            reply.code(500).send({ error: "Erro interno do servidor" });
        }
    }
}

export { CreatePetController };
