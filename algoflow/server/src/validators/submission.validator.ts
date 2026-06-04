import { z } from 'zod';

export const CreateSubmissionSchema = z.object({
  challengeId: z.string().min(1),
  code: z.string().min(1)
});

export const QuerySubmissionSchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  search: z.string().optional(),
  status: z.enum(['queued','running','passed','failed']).optional()
});
