import { z } from 'zod';

// סכמת ולידציה עבור הרשמה
export const RegisterSchema = z.object({
  username: z.string().min(3, 'השם חייב להכיל לפחות 3 תווים').max(20),
  email: z.string().email('אימייל לא תקין'),
  password: z.string().min(6, 'הסיסמה חייבת להכיל לפחות 6 תווים'),
  role: z.enum(['user', 'admin']).optional() // תפקיד הוא אופציונלי בהרשמה, ברירת מחדל היא user
});

// סכמת ולידציה עבור התחברות
export const LoginSchema = z.object({
  email: z.string().email('אימייל לא תקין'),
  password: z.string().min(6)
});