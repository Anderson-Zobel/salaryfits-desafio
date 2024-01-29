import prisma from '../../backend/src/prismaClient/index';
import {CreateClientService} from "../src/services/clientServices/CreateClientService";

jest.mock('../src/prismaClient', () => ({
    client: {
        create: jest.fn(),
    },
}));

describe('CreateClientService', () => {
    it('should create a new client', async () => {
        (prisma.client.create as jest.Mock).mockResolvedValueOnce({
            id: 1,
            name: 'Test Client',
            email: 'test@example.com',
            phone: '123456789',
        });

        const createClientService = new CreateClientService();
        const result = await createClientService.execute({
            name: 'Test Client',
            email: 'test@example.com',
            phone: '123456789',
        });

        expect(result).toEqual({
            id: 1,
            name: 'Test Client',
            email: 'test@example.com',
            phone: '123456789',
        });

        expect(prisma.client.create).toHaveBeenCalledWith({
            data: {
                name: 'Test Client',
                email: 'test@example.com',
                phone: '123456789',
            },
        });

        jest.clearAllMocks();
    });

});
