import { logger } from '../logger/logger';
import { getSubmissionTask, submissionEvents } from './submissionQueue';
import { SubmissionTask } from '../types';
import { Submission } from '../models/Submission';

const workIntervalMs = 2000;

const processTask = async (task: SubmissionTask) => {
  try {
    logger.info({ taskId: task.taskId, userId: task.userId }, 'Processing submission task');
    
    await Submission.findByIdAndUpdate(task.taskId, { status: 'running' });
    
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    await Submission.findByIdAndUpdate(task.taskId, { status: 'passed' });
    
    logger.info({ taskId: task.taskId, userId: task.userId }, 'Submission task completed');
  } catch (err: any) {
    logger.error({ taskId: task.taskId, userId: task.userId, err }, 'Submission task failed');
    await Submission.findByIdAndUpdate(task.taskId, { status: 'failed' });
  }
};

export const startSubmissionWorker = () => {
  submissionEvents.on('taskQueued', async () => {
    const nextTask = getSubmissionTask();
    if (!nextTask) return;
    await processTask(nextTask);
  });

  setInterval(async () => {
    const nextTask = getSubmissionTask();
    if (nextTask) {
      await processTask(nextTask);
    }
  }, workIntervalMs);
};
