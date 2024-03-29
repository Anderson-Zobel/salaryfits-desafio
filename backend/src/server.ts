import Fastify from 'fastify';
import { routes } from './routes'
import fastifyCors from '@fastify/cors';

const app = Fastify({ logger: true })
app.register(fastifyCors);

app.setErrorHandler((error, request, reply) => {
    reply.code(400).send({ message: error.message })
})

async function start() {
    await app.register(routes)

    try{
        await app.listen({ port: 3001})
    }catch(err){
        process.exit(1)
    }
}

start()