import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreatePetController } from "./controllers/petControllers/CreatePetController";
import { ListPetController } from "./controllers/petControllers/ListPetController";
import { DeletePetController } from "./controllers/petControllers/DeletePetController";
import { UpdatePetController } from "./controllers/petControllers/UpdatePetController";
import { CreateClientController } from "./controllers/clientControllers/CreateClientController";
import { UpdateClientController } from "./controllers/clientControllers/UpdateClientController";
import { ListClientController } from "./controllers/clientControllers/ListClientController";
import { DeleteClientController } from "./controllers/clientControllers/DeleteClientController";
import {CreateSchedulingController} from "./controllers/schedulingControllers/CreateSchedulingController";
import {UpdateSchedulingController} from "./controllers/schedulingControllers/UpdateSchedulingController";
import {ListSchedulingController} from "./controllers/schedulingControllers/ListSchedulingController";
import {DeleteSchedulingController} from "./controllers/schedulingControllers/DeleteSchedulingController";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

////////////////////////////////
//// Client Requisitions => ////
////////////////////////////////

    fastify.post('/client', async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateClientController().handle(request, reply)
    })

    fastify.put('/client', async (request: FastifyRequest, reply: FastifyReply) => {
        return new UpdateClientController().handle(request, reply)
    })

    fastify.get('/clients', async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListClientController().handle(request, reply)
    })

    fastify.delete('/client', async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteClientController().handle(request, reply)
    })

////////////////////////////////
//// Pet Requisitions => ///////
////////////////////////////////

    fastify.post('/pet', async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreatePetController().handle(request, reply)
    })

    fastify.put('/pet', async (request: FastifyRequest, reply: FastifyReply) => {
        return new UpdatePetController().handle(request, reply)
    })

    fastify.get('/pets', async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListPetController().handle(request, reply)
    })

    fastify.delete('/pet', async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeletePetController().handle(request, reply)
    })

////////////////////////////////////
//// Scheduling Requisitions => ////
////////////////////////////////////

    fastify.post('/scheduling', async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateSchedulingController().handle(request, reply)
    })

    fastify.put('/scheduling', async (request: FastifyRequest, reply: FastifyReply) => {
        return new UpdateSchedulingController().handle(request, reply)
    })

    fastify.get('/schedulings', async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListSchedulingController().handle(request, reply)
    })

    fastify.delete('/scheduling', async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteSchedulingController().handle(request, reply)
    })




}