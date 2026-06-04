import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { logger } from '../logger/logger';
import { errorResponse } from '../utils/apiResponse';

export const errorHandler = async (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  logger.error({ err: error, url: request.url }, 'Unhandled request error');

  const statusCode = typeof error.statusCode === 'number' ? error.statusCode : 500;
  return reply.status(statusCode).send(errorResponse(error.message ?? 'Server error', error));
};
