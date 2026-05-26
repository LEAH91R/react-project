import { Schema, model, Document } from 'mongoose';

// 1. הגדרת הממשק של המשתמש עבור TypeScript
export interface IUser extends Document {
  username: string;
  email: string;
  passwordHash: string;
  role: 'user' | 'admin'; // ניהול ההרשאות המבוקש בפרויקט
  createdAt: Date;
}

// 2. יצירת הסכמה של Mongoose
const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  passwordHash: { type: String, required: true }, // נשמור רק סיסמה מוצפנת!
  role: { type: String, enum: ['user', 'admin'], default: 'user' }, // ברירת מחדל משתמש רגיל
  createdAt: { type: Date, default: Date.now }
});

// 3. יצירת המודל וייצוא שלו
export const User = model<IUser>('User', UserSchema);