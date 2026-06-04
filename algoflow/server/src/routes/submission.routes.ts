import { FastifyInstance } from 'fastify';
import { listSubmissions, getSubmission, createSubmission } from '../controllers/submission.controller';
import { authenticate } from '../middlewares/authMiddleware';
import { authorize } from '../middlewares/roleMiddleware';

export const submissionRoutes = async (server: FastifyInstance) => {
  server.get('/api/submissions', { preHandler: [authenticate] }, listSubmissions);
  server.get('/api/submissions/:id', { preHandler: [authenticate] }, getSubmission);
  server.post('/api/submissions', { preHandler: [authenticate] }, createSubmission);
};
