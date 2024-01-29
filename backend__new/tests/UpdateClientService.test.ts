import prisma from '../../backend/src/prismaClient/index';
import {UpdateClientService} from "../src/services/clientServices/UpdateClientService";

jest.mock('../src/prismaClient', () => ({
    client: {
        findUnique: jest.fn(),
        update: jest.fn(),
    },
}));

describe('UpdateClientService', () => {
    it('should handle updating a non-existing client', async () => {
        (prisma.client.findUnique as jest.Mock).mockResolvedValueOnce(null);

        const updateClientService = new UpdateClientService();
        const result = await updateClientService.execute({
            id: 1,
            name: 'Updated Client',
            email: 'updated@example.com',
            phone: '987654321',
        });

        expect(result).toEqual({
            error: 'Cliente não encontrado',
        });

        expect(prisma.client.findUnique).toHaveBeenCalledWith({
            where: {
                id: 1,
            },
        });

        expect(prisma.client.update).not.toHaveBeenCalled();

        jest.clearAllMocks();
    });

});
