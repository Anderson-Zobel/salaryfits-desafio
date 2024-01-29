import prisma from "../../prismaClient";

// CreateClientService é um serviço que cria um novo cliente utilizando o Prisma.
// Ele verifica se os campos obrigatórios estão preenchidos, retornando um erro se não.
// Em caso de sucesso, o novo cliente é retornado; em falha, uma exceção é lançada.


interface CreateClientProps {
    name: string;
    email: string;
    phone: string;
}

class CreateClientService {
    async execute({ name, email, phone }: CreateClientProps) {
        try {
            if (!name || !email || !phone) {
                return {
                    error: "Preencha todos os campos",
                    status: 400
                };
            }

            const client = await prisma.client.create({
                data: {
                    name,
                    email,
                    phone,
                },
            });

            return client;
        } catch (error) {
            throw error;
        }
    }
}

export { CreateClientService };
