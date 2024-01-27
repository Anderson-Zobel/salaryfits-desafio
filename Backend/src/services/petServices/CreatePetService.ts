import prisma from "../../prismaClient";

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

            // Verificar se o cliente existe
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
