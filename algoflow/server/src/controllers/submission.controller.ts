import { FastifyReply, FastifyRequest } from 'fastify';
import { Submission } from '../models/Submission';
import { CreateSubmissionSchema, QuerySubmissionSchema } from '../validators/submission.validator';
import { buildPagination } from '../utils/pagination';
import { successResponse, errorResponse } from '../utils/apiResponse';
import { logger } from '../logger/logger';
import { Types } from 'mongoose';
import { JwtPayload } from '../types';
import { enqueueSubmission } from '../queue/submissionQueue';

export const listSubmissions = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const query = QuerySubmissionSchema.parse(request.query as any);
    const { page, limit, skip } = buildPagination(query as any);

    const filter: any = {};
    // role based: if not admin, restrict to own userId
    const requester = request.user as JwtPayload | undefined;
    if (!requester || requester.role !== 'admin') {
      filter.userId = requester?.userId ? Types.ObjectId.createFromHexString(String(requester.userId)) : undefined;
    }

    if (query.status) filter.status = query.status;
    if (query.search) {
      filter.$or = [{ result: { $regex: query.search, $options: 'i' } }, { code: { $regex: query.search, $options: 'i' } }];
    }

    const [items, total] = await Promise.all([
      Submission.find(filter).skip(skip).limit(limit).lean(),
      Submission.countDocuments(filter)
    ]);

    return reply.code(200).send(successResponse({ items, total, page, limit }));
  } catch (err: any) {
    logger.error({ err }, 'listSubmissions failed');
    return reply.code(500).send(errorResponse('Unable to list submissions'));
  }
};

export const getSubmission = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as any;
    if (!Types.ObjectId.isValid(id)) return reply.code(400).send(errorResponse('Invalid id'));

    const submission = await Submission.findById(id).lean();
    if (!submission) return reply.code(404).send(errorResponse('Submission not found'));

    const requester = request.user as JwtPayload | undefined;
    if (requester?.role !== 'admin' && String(submission.userId) !== String(requester?.userId)) {
      return reply.code(403).send(errorResponse('Forbidden'));
    }

    return reply.code(200).send(successResponse(submission));
  } catch (err: any) {
    logger.error({ err }, 'getSubmission failed');
    return reply.code(500).send(errorResponse('Unable to get submission'));
  }
};

export const createSubmission = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const payload = CreateSubmissionSchema.parse(request.body as any);
    const requester = request.user as JwtPayload | undefined;
    if (!requester) return reply.code(401).send(errorResponse('Unauthorized'));

    const doc = await Submission.create({
      userId: Types.ObjectId.createFromHexString(String(requester.userId)),
      challengeId: Types.ObjectId.createFromHexString(payload.challengeId),
      code: payload.code,
      status: 'queued'
    } as any);

    enqueueSubmission({
      taskId: doc._id.toString(),
      userId: doc.userId.toString(),
      payload: { challengeId: doc.challengeId.toString(), code: doc.code },
      createdAt: Date.now()
    });

    return reply.code(201).send(successResponse(doc, 'Submission created'));
  } catch (err: any) {
    logger.error({ err }, 'createSubmission failed');
    return reply.code(400).send(errorResponse('Invalid payload', err));
  }
};
