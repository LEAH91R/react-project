import { FastifyReply, FastifyRequest } from 'fastify';
import { JwtPayload } from '../types';

export const authenticate = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const payload = await request.jwtVerify<JwtPayload>();

    request.user = payload;
    return;
  } catch (error) {
    return reply.status(401).send({ status: 'error', message: 'Unauthorized' });
  }
};
