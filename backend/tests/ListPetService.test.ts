import prisma from '../../backend/src/prismaClient/index';
import {ListPetService} from "../src/services/petServices/ListPetService";

jest.mock('../src/prismaClient', () => ({
    pet: {
        findMany: jest.fn(),
    },
}));

describe('ListPetService', () => {
    it('should list pets with specified search criteria', async () => {
        (prisma.pet.findMany as jest.Mock).mockResolvedValueOnce([
            { id: 1, name: 'Fido', type: 'Dog', client: { id: 1, name: 'Test Client' } },
        ]);

        const listPetService = new ListPetService();
        const result = await listPetService.execute('search-value');

        expect(result).toEqual([
            { id: 1, name: 'Fido', type: 'Dog', client: { id: 1, name: 'Test Client' } },
        ]);

        expect(prisma.pet.findMany).toHaveBeenCalledWith({
            where: {
                name: {
                    contains: 'search-value',
                },
            },
            include: {
                client: true,
            },
        });

        jest.clearAllMocks();
    });

});
