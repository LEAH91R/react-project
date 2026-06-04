import { FastifyReply, FastifyRequest } from 'fastify';

interface RequestUser {
  role?: 'user' | 'admin';
}

export const authorize = (allowedRoles: Array<'user' | 'admin'>) => async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const user = request.user as RequestUser | undefined;
  const role = user?.role;

  if (!role || !allowedRoles.includes(role)) {
    return reply.status(403).send({ status: 'error', message: 'Forbidden' });
  }
};
