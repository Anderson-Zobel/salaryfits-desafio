import prisma from '../../backend/src/prismaClient/index';
import {DeletePetService} from "../src/services/petServices/DeletePetService";

jest.mock('../src/prismaClient', () => ({
    $transaction: jest.fn(),
    scheduling: {
        deleteMany: jest.fn(),
    },
    pet: {
        delete: jest.fn(),
    },
}));

describe('DeletePetService', () => {
    it('should delete pet and related schedulings', async () => {
        const mockTransaction = jest.fn();
        mockTransaction.mockResolvedValueOnce([
            { count: 2 },
            { count: 1 },
        ]);

        (prisma.$transaction as jest.Mock).mockImplementationOnce(mockTransaction);


        const deletePetService = new DeletePetService();
        const result = await deletePetService.execute({ id: 1 });

        expect(prisma.scheduling.deleteMany).toHaveBeenCalledWith({
            where: {
                pet_id: 1,
            },
        });
        expect(prisma.pet.delete).toHaveBeenCalledWith({
            where: {
                id: 1,
            },
        });
        expect(result).toEqual({ message: 'Pet Deletado' });

        jest.clearAllMocks();
    });

});
