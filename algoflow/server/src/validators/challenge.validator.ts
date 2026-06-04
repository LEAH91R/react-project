import { z } from 'zod';

export const TestCaseSchema = z.object({
  input: z.string(),
  expectedOutput: z.string(),
  isPublic: z.boolean().optional().default(true)
});

export const CreateChallengeSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']),
  category: z.string().min(1),
  testCases: z.array(TestCaseSchema).min(1)
});

export const UpdateChallengeSchema = CreateChallengeSchema.partial();

export const QueryChallengeSchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']).optional(),
  category: z.string().optional(),
  search: z.string().optional()
});
