import prisma from "../../prismaClient";

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
