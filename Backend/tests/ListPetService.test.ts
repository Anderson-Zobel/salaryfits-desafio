import prisma from '../../src/prismaClient';
import {ListPetService} from "../../src/services/petServices/ListPetService";

jest.mock('../src/prismaClient', () => ({
    pet: {
        findMany: jest.fn(),
    },
}));

describe('ListPetService', () => {
    it('should list pets with specified search criteria', async () => {
        // Configurando mock para pet.findMany retornar dados simulados
        (prisma.pet.findMany as jest.Mock).mockResolvedValueOnce([
            { id: 1, name: 'Fido', type: 'Dog', client: { id: 1, name: 'Test Client' } },
        ]);

        // Chamando o serviço ListPetService
        const listPetService = new ListPetService();
        const result = await listPetService.execute('search-value');

        // Avaliar os resultados esperados
        expect(result).toEqual([
            { id: 1, name: 'Fido', type: 'Dog', client: { id: 1, name: 'Test Client' } },
        ]);

        // Verificar se a chamada ao mock de pet.findMany ocorreu com os critérios esperados
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

        // Limpar mocks após o teste
        jest.clearAllMocks();
    });

});
