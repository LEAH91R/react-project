import { Schema, model, Document } from 'mongoose';

// 1. הגדרת הטיפוס של מקרה בוחן בודד
interface ITestCase {
  input: string;          // הקלט שיועבר לפונקציה (למשל: "5")
  expectedOutput: string; // הפלט שהפונקציה אמורה להחזיר (למשל: "120")
  isPublic: boolean;      // האם להציג את המקרה הזה למשתמש באתר
}

// 2. הגדרת הממשק של האתגר כולו עבור TypeScript
export interface IChallenge extends Document {
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;       // למשל: 'Arrays', 'Math', 'Strings' (בשביל הסינון והחיפוש)
  testCases: ITestCase[]; // מערך של מקרי בוחן
  createdAt: Date;
}

// 3. יצירת הסכמה של Mongoose שתתאים למבנה
const ChallengeSchema = new Schema<IChallenge>({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  category: { type: String, required: true, index: true }, // אינדקס לחיפוש מהיר
  testCases: [
    {
      input: { type: String, required: true },
      expectedOutput: { type: String, required: true },
      isPublic: { type: Boolean, default: true }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

// 4. יצירת המודל וייצוא שלו
export const Challenge = model<IChallenge>('Challenge', ChallengeSchema);