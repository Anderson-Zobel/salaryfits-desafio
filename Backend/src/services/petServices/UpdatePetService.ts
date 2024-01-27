import prisma from "../../prismaClient";

interface UpdatePetProps {
    id: number;
    name?: string;
    type?: string;
    client_id?: number;
}

class UpdatePetService {
    async execute({ id, name, type, client_id }: UpdatePetProps) {
        try {
            const existingPet = await prisma.pet.findUnique({
                where: { id },
            });

            if (!existingPet) {
                return { error: "Pet não encontrado" };
            }

            const updatedPet = await prisma.pet.update({
                where: { id },
                data: {
                    name: name || existingPet.name,
                    type: type || existingPet.type,
                    client_id: client_id || existingPet.client_id,
                },
            });

            return updatedPet;
        } catch (error) {
            throw error;
        }
    }
}

export { UpdatePetService };
