import { FastifyReply, FastifyRequest } from 'fastify';
import Code from '../models/CodeModel';

export const createCode = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { code, expectedTime } = request.body as { code?: string; expectedTime?: number };

    if (!code || !expectedTime || typeof expectedTime !== 'number') {
      return reply.status(400).send({ error: 'Invalid input' });
    }

    const newCode = new Code({ code, expectedTime });
    await newCode.save();

    const executionResult = 'Execution disabled for security reasons';
    const actualTime = 0;

    return reply.status(201).send({
      message: 'Code executed successfully',
      executionResult,
      actualTime,
    });
  } catch (error) {
    return reply.status(500).send({ error: 'Internal server error' });
  }
};

export const getCodes = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const codes = await Code.find().lean();
    return reply.send(codes);
  } catch (error) {
    return reply.status(500).send({ error: 'Unable to load codes' });
  }
};

// export const getCode = async (req: Request, res: Response) => {
//     const code = await Code.findById(req.params.id);
//     if (!code) return res.status(404).send('Code not found');
//     res.json(code);
// };