import { EventEmitter } from 'events';
import { SubmissionTask } from '../types';

const queue: SubmissionTask[] = [];
export const submissionEvents = new EventEmitter();

export const enqueueSubmission = (task: SubmissionTask) => {
  queue.push(task);
  submissionEvents.emit('taskQueued', task);
};

export const getSubmissionTask = (): SubmissionTask | undefined => {
  return queue.shift();
};

export const getSubmissionQueueLength = () => {
  return queue.length;
};
