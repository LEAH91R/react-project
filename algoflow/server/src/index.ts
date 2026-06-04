import fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';

import { env } from './config/env';
import { connectDatabase } from './config/db';
import { logger } from './logger/logger';
import { registerRoutes } from './routes';
import { errorHandler } from './middlewares/errorHandler';
import { startSubmissionWorker } from './queue/submissionWorker';

const server = fastify({
  logger: true,
});
server.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

server.addHook('onSend', async (request, reply, payload) => {
  reply.header('Access-Control-Allow-Origin', '*');
  reply.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  reply.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return payload;
});

server.options('/*', async (request, reply) => {
  reply
    .header('Access-Control-Allow-Origin', '*')
    .header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS')
    .header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    .send({ status: 'ok' });
});

server.setErrorHandler(errorHandler);

server.get('/health', async () => ({ status: 'ok', message: 'LogicRoot Fastify Server is running' }));

const start = async () => {
  try {
    await connectDatabase();
    await registerRoutes(server);
    startSubmissionWorker();
    await server.listen({ port: env.PORT, host: '0.0.0.0' });
    logger.info(`Server is running on http://localhost:${env.PORT}`);
  } catch (error) {
    logger.error({ err: error }, 'Server startup failed');
    process.exit(1);
  }
};

start();