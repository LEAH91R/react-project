import { FastifyInstance } from 'fastify';
import { authRoutes } from './auth.routes';
import { codeRoutes } from './code.routes';
import { challengeRoutes } from './challenge.routes';
import { submissionRoutes } from './submission.routes';
import { githubRoutes } from './github.routes';

export const registerRoutes = async (server: FastifyInstance) => {
  await authRoutes(server);
  await codeRoutes(server);
  await challengeRoutes(server);
  await submissionRoutes(server);
  await githubRoutes(server);
};
