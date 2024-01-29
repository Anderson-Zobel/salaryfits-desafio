import prisma from "../../prismaClient";


// DeleteSchedulingService exclui um agendamento com base no ID fornecido. Antes de excluir, verifica se o agendamento existe.
// Retorna uma mensagem indicando que o agendamento foi excluído com sucesso ou lança um erro se o agendamento não for encontrado ou se o ID não for fornecido

interface DeleteSchedulingProps{
    id: number;
}

class DeleteSchedulingService {
    async execute({ id }: DeleteSchedulingProps){

        if(!id){
            throw new Error("Ocorreu um erro")
        }

        const findSchedule = await prisma.scheduling.findFirst({
            where: {
                id: id
            }
        })

        if(!findSchedule) {
            throw new Error('Agendamento não encontrado')
        }

        await prisma.scheduling.delete({
            where: {
                id: findSchedule.id
            }
        })

        return { message: 'Agendamento deletado'}

    }
}

export { DeleteSchedulingService }