import prisma from '../../backend/src/prismaClient/index';
import { ListClientService } from "../src/services/clientServices/ListClientService";

jest.mock('../src/prismaClient', () => ({
    client: {
        findMany: jest.fn(),
    },
}));

describe('ListClientService', () => {
    it('should list clients with specified criteria', async () => {
        (prisma.client.findMany as jest.Mock).mockResolvedValueOnce([
        ]);

        const listClientService = new ListClientService();
        const result = await listClientService.execute('search-value');

        expect(result).toEqual([
        ]);

        expect(prisma.client.findMany).toHaveBeenCalledWith({
            where: {
                name: {
                    contains: 'search-value',
                },
            },
            include: {
                pets: true,
            },
        });

        jest.clearAllMocks();
    });

});
