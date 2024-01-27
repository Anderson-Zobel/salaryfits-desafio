import prisma from "../../prismaClient";

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