import createPetMock from '../src/__mocks__/CreatePetMock';
import { CreatePetService } from '../src/services/petServices/CreatePetService';

jest.mock('../src/prismaClient', () => createPetMock);

describe('CreatePetService', () => {
    it('should create a pet', async () => {
        createPetMock.client.findUnique.mockResolvedValueOnce({
        });

        createPetMock.pet.create.mockResolvedValueOnce({
        });

        const createPetService = new CreatePetService();
        const result = await createPetService.execute({
            name: 'Fido',
            type: 'Dog',
            client_id: 1,
        });

        expect(createPetMock.client.findUnique).toHaveBeenCalledWith({
            where: {
                id: 1,
            },
        });

        expect(createPetMock.pet.create).toHaveBeenCalledWith({
            data: {
                name: 'Fido',
                type: 'Dog',
                client_id: 1,
            },
        });

        expect(result).toEqual(
            expect.objectContaining({
            })
        );

        jest.clearAllMocks();
    });

});
