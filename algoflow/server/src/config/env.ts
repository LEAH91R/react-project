import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().positive().default(5000),
  MONGO_URI: z.string().min(1, 'MONGO_URI must be defined'),
  JWT_SECRET: z.string().min(10, 'JWT_SECRET must be defined'),
  GITHUB_TOKEN: z.string().optional(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('Invalid environment:', parsedEnv.error.format());
  throw new Error('Missing or invalid environment variables');
}

export const env = parsedEnv.data;
