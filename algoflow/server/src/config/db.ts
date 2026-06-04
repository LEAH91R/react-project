import mongoose from 'mongoose';
import { env } from './env';
import { logger } from '../logger/logger';

export const connectDatabase = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    logger.info('Connected to MongoDB');
  } catch (error) {
    logger.error({ err: error }, 'Failed to connect to MongoDB');
    throw error;
  }
};
