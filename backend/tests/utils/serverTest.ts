import Fastify from 'fastify';
import { routes } from '../../src/routes';
import fastifyCors from '@fastify/cors';


const createServer = () => {
    const app = Fastify({ logger: true });

    app.register(fastifyCors);
    app.setErrorHandler((error, request, reply) => {
        reply.code(400).send({ message: error.message });
    });

    app.register(routes);

    return app;
};

export { createServer };