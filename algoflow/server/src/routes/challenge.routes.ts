import { FastifyInstance } from 'fastify';
import {
  listChallenges,
  getChallenge,
  createChallenge,
  updateChallenge,
  deleteChallenge
} from '../controllers/challenge.controller';
import { authenticate } from '../middlewares/authMiddleware';
import { authorize } from '../middlewares/roleMiddleware';

export const challengeRoutes = async (server: FastifyInstance) => {
  server.get('/api/challenges', listChallenges);
  server.get('/api/challenges/:id', getChallenge);
  server.post('/api/challenges', { preHandler: [authenticate, authorize(['admin'])] }, createChallenge);
  server.put('/api/challenges/:id', { preHandler: [authenticate, authorize(['admin'])] }, updateChallenge);
  server.delete('/api/challenges/:id', { preHandler: [authenticate, authorize(['admin'])] }, deleteChallenge);
};
