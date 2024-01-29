import createSchedulingMock from '../src/__mocks__/CreateSchedulingMock';
import {CreateSchedulingService} from "../src/services/schedulingServices/CreateSchedulingService";

jest.mock('../src/prismaClient', () => createSchedulingMock);

describe('CreateSchedulingService Tests', () => {
    it('should create a scheduling', async () => {
        createSchedulingMock.scheduling.create.mockResolvedValueOnce({
            id: 1,
            status: 'scheduled',
            client_id: 1,
            pet_id: 2,
            scheduled_at: '2024-01-30T12:00:00',
        });

        const createSchedulingService = new CreateSchedulingService();
        const scheduling = await createSchedulingService.execute({
            client_id: 1,
            pet_id: 2,
            scheduled_at: '2024-01-30T12:00:00',
        });

        expect(createSchedulingMock.scheduling.create).toHaveBeenCalledWith({
            data: {
                status: undefined,
                client_id: 1,
                pet_id: 2,
                scheduled_at: '2024-01-30T12:00:00',
            },
        });

        expect(scheduling).toEqual({
            id: 1,
            status: 'scheduled',
            client_id: 1,
            pet_id: 2,
            scheduled_at: '2024-01-30T12:00:00',
        });
    });

    it('should return an error if required fields are missing', async () => {
        const createSchedulingService = new CreateSchedulingService();
        const scheduling = await createSchedulingService.execute({
            pet_id: 0,
            scheduled_at: "",
            client_id: 1
        });

        // Seu código de expectativa aqui
        expect(scheduling).toEqual({
            error: 'Preencha todos os campos',
        });
    });
});