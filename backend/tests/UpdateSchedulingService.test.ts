import updateSchedulingMock from '../src/__mocks__/UpdateSchedulingMock';
import { UpdateSchedulingService } from '../src/services/schedulingServices/UpdateSchedulingService';

jest.mock('../src/prismaClient', () => ({
    ...updateSchedulingMock,
    $transaction: jest.fn(),
}));UpdateSchedulingService

describe('UpdateSchedulingService Tests', () => {
    it('should update a scheduling', async () => {
        updateSchedulingMock.scheduling.findUnique.mockResolvedValueOnce({
            id: 1,
            status: 'scheduled',
            client_id: 1,
            pet_id: 2,
            scheduled_at: '2024-01-30T12:00:00',
            // outros campos simulados
        });

        updateSchedulingMock.scheduling.update.mockResolvedValueOnce({
            id: 1,
            status: 'completed',
            client_id: 1,
            pet_id: 2,
            scheduled_at: '2024-01-30T15:00:00',
        });

        const updateSchedulingService = new UpdateSchedulingService();
        const updatedScheduling = await updateSchedulingService.execute({
            id: 1,
            status: 'completed',
            scheduled_at: '2024-01-30T15:00:00',
        });

        expect(updateSchedulingMock.scheduling.findUnique).toHaveBeenCalledWith({
            where: {
                id: 1,
            },
        });

        expect(updateSchedulingMock.scheduling.update).toHaveBeenCalledWith({
            where: {
                id: 1,
            },
            data: {
                status: 'completed',
                client_id: 1,
                pet_id: 2,
                scheduled_at: '2024-01-30T15:00:00',
            },
        });

        expect(updatedScheduling).toEqual({
            id: 1,
            status: 'completed',
            client_id: 1,
            pet_id: 2,
            scheduled_at: '2024-01-30T15:00:00',
            // outros campos simulados
        });
    });

    it('should throw an error if scheduling is not found', async () => {
        updateSchedulingMock.scheduling.findUnique.mockResolvedValueOnce(null);

        const updateSchedulingService = new UpdateSchedulingService();

        await expect(updateSchedulingService.execute({
            id: 1,
            status: 'completed',
            scheduled_at: '2024-01-30T15:00:00',
        })).rejects.toThrow('Agendamento não encontrado');
    });
});
