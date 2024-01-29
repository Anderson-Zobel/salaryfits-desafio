import deleteSchedulingMock from '../src/__mocks__/DeleteSchedulingMock';
import { DeleteSchedulingService } from "../src/services/schedulingServices/DeleteSchedulingService";

jest.mock('../src/prismaClient', () => deleteSchedulingMock);

describe('DeleteSchedulingService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should delete scheduling with valid id', async () => {
        deleteSchedulingMock.scheduling.findFirst.mockResolvedValueOnce({
            id: 1,
        });

        const deleteSchedulingService = new DeleteSchedulingService();
        const result = await deleteSchedulingService.execute({ id: 1 });

        expect(deleteSchedulingMock.scheduling.findFirst).toHaveBeenCalledWith({
            where: { id: 1 },
        });

        expect(deleteSchedulingMock.scheduling.delete).toHaveBeenCalledWith({
            where: { id: 1 },
        });

        expect(result).toEqual({ message: 'Agendamento deletado' });
    });

    it('should throw error for invalid id', async () => {
        const deleteSchedulingService = new DeleteSchedulingService();

        await expect(deleteSchedulingService.execute({ id: null as any })).rejects.toThrowError('Ocorreu um erro');
    });

    it('should throw error for non-existing scheduling', async () => {
        deleteSchedulingMock.scheduling.findFirst.mockResolvedValueOnce(null);

        const deleteSchedulingService = new DeleteSchedulingService();

        await expect(deleteSchedulingService.execute({ id: 1 })).rejects.toThrowError('Agendamento não encontrado');
    });

});
