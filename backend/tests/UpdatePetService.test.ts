import prisma from '../../backend/src/prismaClient/index';
import {UpdatePetService} from "../src/services/petServices/UpdatePetService";

jest.mock('../src/prismaClient', () => ({
    pet: {
        findUnique: jest.fn(),
        update: jest.fn(),
    },
}));

describe('UpdatePetService', () => {
    it('should handle updating a non-existing pet', async () => {
        (prisma.pet.findUnique as jest.Mock).mockResolvedValueOnce(null);

        const updatePetService = new UpdatePetService();
        const result = await updatePetService.execute({
            id: 1,
            name: 'Updated Fido',
            type: 'Updated Type',
        });

        expect(result).toEqual({ error: 'Pet não encontrado' });

        expect(prisma.pet.update).not.toHaveBeenCalled();
    });
});
