import { FastifyInstance } from 'fastify';
import { createServer } from './utils/serverTest';
import prisma from "../src/prismaClient";

let server: FastifyInstance;

beforeEach(async () => {
    server = await createServer();
    await prisma.$transaction([
        prisma.scheduling.deleteMany({}),
        prisma.pet.deleteMany({}),
        prisma.client.deleteMany({}),
    ]);
});

afterEach(async () => {
    await server.close();
    await prisma.$disconnect();
});

describe('Integration Tests', () => {
    it('should create, update, list, and delete a client', async () => {

        ///////////////////////
        //// Create Client ////
        ///////////////////////

        const createResponse = await server.inject({
            method: 'POST',
            url: '/client',
            payload: {
                name: 'Test Client',
                email: 'test@example.com',
                phone: '123456789',
            },
        });
        const createdClient = JSON.parse(createResponse.body);
        expect(createResponse.statusCode).toBe(201);
        expect(createdClient).toHaveProperty('id');

        ///////////////////////
        //// List Clients ////
        /////////////////////

        const listResponse = await server.inject({
            method: 'GET',
            url: '/clients',
        });
        const clientsList = JSON.parse(listResponse.body);
        expect(listResponse.statusCode).toBe(200);
        expect(clientsList).toHaveLength(1);

        ///////////////////////
        //// Update Client ////
        ///////////////////////

        const updateResponse = await server.inject({
            method: 'PUT',
            url: '/client',
            payload: {
                id: createdClient.id,
                name: 'Updated Client',
                email: 'updated@example.com',
                phone: '987654321',
            },
        });
        const updatedClient = JSON.parse(updateResponse.body);

        expect(updateResponse.statusCode).toBe(200);
        expect(updatedClient).toHaveProperty('name');


        ////////////////////
        //// Create Pet ////
        ///////////////////

        const createPetResponse = await server.inject({
            method: 'POST',
            url: '/pet',
            payload: {
                name: 'Fido',
                type: 'Dog',
                client_id: createdClient.id,
            },
        });
        const createdPet = JSON.parse(createPetResponse.body);

        expect(createPetResponse.statusCode).toBe(201);
        expect(createdPet).toHaveProperty('id');

        ////////////////////////
        //// => Pet List //////
        ///////////////////////

        const listPetsResponse = await server.inject({
            method: 'GET',
            url: '/pets',
        });
        const petsList = JSON.parse(listPetsResponse.body);

        expect(listPetsResponse.statusCode).toBe(200);
        expect(petsList).toHaveLength(1);

        ////////////////////////
        //// => Update Pet/////
        ///////////////////////

        const updatePetResponse = await server.inject({
            method: 'PUT',
            url: '/pet',
            payload: {
                id: createdPet.id,
                name: 'Updated Fido',
                type: 'Updated Type',
                client_id: createdClient.id,
            },
        });
        const updatedPet = JSON.parse(updatePetResponse.body);

        expect(updatePetResponse.statusCode).toBe(200);
        expect(updatedPet).toHaveProperty('name', );
        expect(updatedPet).toHaveProperty('type', );

        ///////////////////////////////
        //// => Create Scheduling /////
        //////////////////////////////

        const createSchedulingResponse = await server.inject({
            method: 'POST',
            url: '/scheduling',
            payload: {
                status: 'open',
                client_id: createdClient.id,
                pet_id: createdPet.id,
                scheduled_at: new Date().toISOString(),
            },
        });

        const createdScheduling = JSON.parse(createSchedulingResponse.body);

        expect(createSchedulingResponse.statusCode).toBe(201);
        expect(createdScheduling).toHaveProperty('id');

        ///////////////////////////////
        //// => List Scheduling //////
        //////////////////////////////

        const listSchedulingResponse = await server.inject({
            method: 'GET',
            url: '/schedulings',
        });

        const schedulingList = JSON.parse(listSchedulingResponse.body);
        expect(listSchedulingResponse.statusCode).toBe(200);
        expect(schedulingList).toHaveLength(1);

        ///////////////////////////////
        //// => Update Scheduling //////
        //////////////////////////////

        const updateSchedulingResponse = await server.inject({
            method: 'PUT',
            url: '/scheduling',
            payload: {
                id: createdScheduling.id,
                status: 'closed',
            },
        });

        const updatedScheduling = JSON.parse(updateSchedulingResponse.body)

        expect(updateSchedulingResponse.statusCode).toBe(200);
        expect(updatedScheduling).toHaveProperty('status', 'closed');

        ///////////////////////////////
        //// => Delete Scheduling /////
        //////////////////////////////

        const deleteSchedulingResponse = await server.inject({
            method: 'DELETE',
            url: `/scheduling?id=${createdScheduling.id}`,
        });
        const deletedScheduling = JSON.parse(deleteSchedulingResponse.body);

        expect(deleteSchedulingResponse.statusCode).toBe(200);
        expect(deletedScheduling).toHaveProperty('message');

        ////////////////////////
        //// => Delete Pet /////
        ///////////////////////

        const deletePetResponse = await server.inject({
            method: 'DELETE',
            url: `/pet?id=${createdPet.id}`,
        });
        const deletedPet = JSON.parse(deletePetResponse.body);

        expect(deletePetResponse.statusCode).toBe(200);
        expect(deletedPet).toHaveProperty('message', 'Pet Deletado');

        ////////////////////////////
        //// => Delete Client /////
        //////////////////////////

        // Delete Client - Cliente existente
        const deleteResponse = await server.inject({
            method: 'DELETE',
            url: `/client?id=${createdClient.id}`,
        });
        const deletedClient = JSON.parse(deleteResponse.body);

        const deleteInternalErrorResponse = await server.inject({
            method: 'DELETE',
            url: '/client?id=123', // ID inválido para forçar o erro interno
        });

        expect(deleteResponse.statusCode).toBe(200);
        expect(deletedClient).toHaveProperty('message', 'Cliente Deletado');
        expect(deleteInternalErrorResponse.statusCode).toBe(500);
        expect(JSON.parse(deleteInternalErrorResponse.body)).toHaveProperty('error', 'Erro interno do servidor');
    });
});
