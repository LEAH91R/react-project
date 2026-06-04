import { FastifyReply, FastifyRequest } from 'fastify';
import { fetchGitHubRepository } from '../services/github.service';
import { successResponse, errorResponse } from '../utils/apiResponse';
import { logger } from '../logger/logger';

export const getRepo = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { owner, repo } = request.params as any;
    const data = await fetchGitHubRepository(owner, repo);
    return reply.code(200).send(successResponse(data));
  } catch (err: any) {
    logger.error({ err }, 'getRepo failed');
    return reply.code(500).send(errorResponse('Unable to fetch repository'));
  }
};
