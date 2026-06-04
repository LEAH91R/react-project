import { Schema, model, Document, Types } from 'mongoose';

export interface ISubmission extends Document {
  userId: Types.ObjectId;
  challengeId: Types.ObjectId;
  code: string;
  result?: string;
  status: 'queued' | 'running' | 'passed' | 'failed';
  createdAt: Date;
}

const SubmissionSchema = new Schema<ISubmission>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  challengeId: { type: Schema.Types.ObjectId, ref: 'Challenge', required: true, index: true },
  code: { type: String, required: true },
  result: { type: String },
  status: { type: String, enum: ['queued', 'running', 'passed', 'failed'], default: 'queued' },
  createdAt: { type: Date, default: Date.now }
});

export const Submission = model<ISubmission>('Submission', SubmissionSchema);
export default Submission;
