import listSchedulingMock from '../src/__mocks__/ListSchedulingMock';
import { ListSchedulingService } from "../src/services/schedulingServices/ListSchedulingService";

jest.mock('../src/prismaClient', () => listSchedulingMock);

describe('ListSchedulingService', () => {
    it('should list schedulings with specified criteria', async () => {
        listSchedulingMock.scheduling.findMany.mockResolvedValueOnce([
        ]);

        const listSchedulingsService = new ListSchedulingService();
        const result = await listSchedulingsService.execute('search-value', '2024-01-29', 'status-value');

        expect(listSchedulingMock.scheduling.findMany).toHaveBeenCalledWith(
            expect.objectContaining({
                where: expect.objectContaining({
                    OR: [
                        {
                            client: {
                                name: {
                                    contains: 'search-value',
                                },
                            },
                        },
                        {
                            pet: {
                                name: {
                                    contains: 'search-value',
                                },
                            },
                        },
                    ],
                    scheduled_at: {
                        gte: new Date('2024-01-29T00:00:00.000Z'),
                        lt: new Date('2024-01-30T00:00:00.000Z'),
                    },
                    status: {
                        contains: 'status-value',
                    },
                }),
            })
        );

        jest.clearAllMocks();
    });

});