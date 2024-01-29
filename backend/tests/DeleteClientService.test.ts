import prisma from '../../backend/src/prismaClient/index';
import {DeleteClientService} from "../src/services/clientServices/DeleteClientService";

jest.mock('../src/prismaClient', () => ({
    $transaction: jest.fn(),
    scheduling: {
        deleteMany: jest.fn(),
    },
    pet: {
        deleteMany: jest.fn(),
    },
    client: {
        delete: jest.fn(),
    },
}));

describe('DeleteClientService', () => {
    it('should delete a client and related data', async () => {
        (prisma.$transaction as jest.Mock).mockResolvedValueOnce([
        ]);

        const deleteClientService = new DeleteClientService();
        const result = await deleteClientService.execute({ id: 1 });

        expect(result).toEqual({ message: 'Cliente Deletado' });

        expect(prisma.$transaction).toHaveBeenCalledWith([
            prisma.scheduling.deleteMany({
                where: {
                    client_id: 1,
                },
            }),
            prisma.pet.deleteMany({
                where: {
                    client_id: 1,
                },
            }),
            prisma.client.delete({
                where: {
                    id: 1,
                },
            }),
        ] as const);

        jest.clearAllMocks();
    });

});
