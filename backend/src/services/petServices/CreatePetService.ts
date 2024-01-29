import prisma from "../../prismaClient";

// CreatePetService é um serviço que cria um novo animal de estimação associado a um cliente.
// Utiliza o Prisma para verificar se o cliente existe antes de criar o animal de estimação.
// Retorna o novo animal de estimação ou uma mensagem de erro se algum campo estiver ausente ou se o cliente não existir.

interface CreatePetProps {
    name: string;
    type: string;
    client_id: number;
}

class CreatePetService {
    async execute({ name, type, client_id }: CreatePetProps) {
        try {
            if (!name || !type || !client_id) {
                return {
                    error: "Preencha todos os campos",
                    status: 400,
                };
            }

            const client = await prisma.client.findUnique({
                where: { id: client_id },
            });

            if (!client) {
                return { error: "Cliente não encontrado" };
            }

            const pet = await prisma.pet.create({
                data: {
                    name,
                    type,
                    client_id,
                },
            });

            return pet;
        } catch (error) {
            throw error;
        }
    }
}

export { CreatePetService };
