import { FastifyInstance } from 'fastify';
import { registerHandler, loginHandler } from '../controllers/auth.controller';

export const authRoutes = async (server: FastifyInstance) => {
  server.post('/api/auth/register', registerHandler);
  server.post('/api/auth/login', loginHandler);
};