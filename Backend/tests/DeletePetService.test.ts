import prisma from '../../src/prismaClient';
import {DeletePetService} from "../../src/services/petServices/DeletePetService";

// Mock do prisma para uso nos testes
jest.mock('../src/prismaClient', () => ({
    $transaction: jest.fn(),
    scheduling: {
        deleteMany: jest.fn(),
    },
    pet: {
        delete: jest.fn(),
    },
}));

describe('DeletePetService', () => {
    it('should delete pet and related schedulings', async () => {
        // Configurar o mock do Prisma conforme necessário
        const mockTransaction = jest.fn();
        mockTransaction.mockResolvedValueOnce([
            { count: 2 }, // Número de agendamentos deletados
            { count: 1 }, // Número de pets deletados
        ]);

        (prisma.$transaction as jest.Mock).mockImplementationOnce(mockTransaction);


        // Chamar o serviço DeletePetService
        const deletePetService = new DeletePetService();
        const result = await deletePetService.execute({ id: 1 });

        // Avaliar os resultados esperados
        expect(prisma.scheduling.deleteMany).toHaveBeenCalledWith({
            where: {
                pet_id: 1,
            },
        });
        expect(prisma.pet.delete).toHaveBeenCalledWith({
            where: {
                id: 1,
            },
        });
        expect(result).toEqual({ message: 'Pet Deletado' });

        // Limpar mocks após o teste
        jest.clearAllMocks();
    });

    // Adicione mais testes conforme necessário para diferentes casos e critérios
});
