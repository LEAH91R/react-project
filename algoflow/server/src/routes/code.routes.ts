import { FastifyInstance } from 'fastify';
import { createCode, getCodes } from '../controllers/codeController';

export const codeRoutes = async (server: FastifyInstance) => {
  server.post('/api/codes', createCode);
  server.get('/api/codes', getCodes);
};
