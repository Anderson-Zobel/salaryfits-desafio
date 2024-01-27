import prisma from "../../prismaClient";

interface UpdateClientProps {
    id: number;
    name?: string;
    email?: string;
    phone?: string;
}

class UpdateClientService {
    async execute({ id, name, email, phone }: UpdateClientProps) {
        try {
            const existingClient = await prisma.client.findUnique({
                where: { id },
            });

            if (!existingClient) {
                return { error: "Cliente não encontrado" };
            }

            const updatedClient = await prisma.client.update({
                where: { id },
                data: {
                    name: name || existingClient.name,
                    email: email || existingClient.email,
                    phone: phone || existingClient.phone,
                },
            });

            return updatedClient;
        } catch (error) {
            throw error;
        }
    }
}

export { UpdateClientService };
