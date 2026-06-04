import { FastifyReply, FastifyRequest } from 'fastify';
import { Challenge } from '../models/Challenge';
import { CreateChallengeSchema, UpdateChallengeSchema, QueryChallengeSchema } from '../validators/challenge.validator';
import { buildPagination } from '../utils/pagination';
import { successResponse, errorResponse } from '../utils/apiResponse';
import { logger } from '../logger/logger';
import { Types } from 'mongoose';

export const listChallenges = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const query = QueryChallengeSchema.parse(request.query as any);
    const { page, limit, skip } = buildPagination(query as any);

    const filter: any = {};
    if (query.difficulty) filter.difficulty = query.difficulty;
    if (query.category) filter.category = query.category;
    if (query.search) {
      filter.$or = [
        { title: { $regex: query.search, $options: 'i' } },
        { description: { $regex: query.search, $options: 'i' } }
      ];
    }

    const [items, total] = await Promise.all([
      Challenge.find(filter).skip(skip).limit(limit).lean(),
      Challenge.countDocuments(filter)
    ]);

    return reply.code(200).send(successResponse({ items, total, page, limit }));
  } catch (err: any) {
    logger.error({ err }, 'listChallenges failed');
    return reply.code(500).send(errorResponse('Unable to list challenges'));
  }
};

export const getChallenge = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as any;
    if (!Types.ObjectId.isValid(id)) return reply.code(400).send(errorResponse('Invalid id'));

    const item = await Challenge.findById(id).lean();
    if (!item) return reply.code(404).send(errorResponse('Challenge not found'));
    return reply.code(200).send(successResponse(item));
  } catch (err: any) {
    logger.error({ err }, 'getChallenge failed');
    return reply.code(500).send(errorResponse('Unable to get challenge'));
  }
};

export const createChallenge = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const payload = CreateChallengeSchema.parse(request.body as any);
    const created = await Challenge.create(payload as any);
    return reply.code(201).send(successResponse(created, 'Challenge created'));
  } catch (err: any) {
    logger.error({ err }, 'createChallenge failed');
    return reply.code(400).send(errorResponse('Invalid payload', err));
  }
};

export const updateChallenge = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as any;
    if (!Types.ObjectId.isValid(id)) return reply.code(400).send(errorResponse('Invalid id'));

    const payload = UpdateChallengeSchema.parse(request.body as any);
    const updated = await Challenge.findByIdAndUpdate(id, payload as any, { new: true }).lean();
    if (!updated) return reply.code(404).send(errorResponse('Challenge not found'));
    return reply.code(200).send(successResponse(updated, 'Challenge updated'));
  } catch (err: any) {
    logger.error({ err }, 'updateChallenge failed');
    return reply.code(400).send(errorResponse('Invalid payload', err));
  }
};

export const deleteChallenge = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as any;
    if (!Types.ObjectId.isValid(id)) return reply.code(400).send(errorResponse('Invalid id'));

    const deleted = await Challenge.findByIdAndDelete(id).lean();
    if (!deleted) return reply.code(404).send(errorResponse('Challenge not found'));
    return reply.code(200).send(successResponse(null, 'Challenge deleted'));
  } catch (err: any) {
    logger.error({ err }, 'deleteChallenge failed');
    return reply.code(500).send(errorResponse('Unable to delete challenge'));
  }
};
