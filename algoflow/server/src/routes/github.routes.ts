import { FastifyInstance } from 'fastify';
import { getRepo } from '../controllers/github.controller';

export const githubRoutes = async (server: FastifyInstance) => {
  server.get('/api/github/:owner/:repo', getRepo);
};
