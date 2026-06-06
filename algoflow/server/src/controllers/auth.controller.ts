import { FastifyRequest, FastifyReply } from 'fastify';
import bcrypt from 'bcrypt';
import { User } from '../models/User';
import { RegisterSchema, LoginSchema } from '../validators/auth.validator';
import { successResponse } from '../utils/apiResponse';
// 1. לוגיקת הרשמה (Register)
export const registerHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    // אימות הקלט בעזרת Zod
    const validatedData = RegisterSchema.parse(request.body);

    // בדיקה האם המשתמש כבר קיים במערכת
    const existingUser = await User.findOne({ email: validatedData.email });
    if (existingUser) {
      return reply.status(400).send({ error: 'משתמש עם אימייל זה כבר קיים במערכת' });
    }

    // הצפנת הסיסמה לפני שמירה
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(validatedData.password, saltRounds);

    // יצירת המשתמש החדש ושמירתו ב-DB
    const newUser = new User({
      username: validatedData.username,
      email: validatedData.email,
      passwordHash,
      role: validatedData.role || 'user'
    });

    await newUser.save();

    return reply.status(201).send({ message: 'המשתמש נרשם בהצלחה!' });
  } catch (error: any) {
    // אם הולידציה של Zod נכשלה
    if (error.issues) {
      return reply.status(400).send({ error: 'שגיאת ולידציה', details: error.issues });
    }
    return reply.status(500).send({ error: 'שגיאת שרת פנימית' });
  }
};

// 2. לוגיקת התחברות (Login)
export const loginHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const validatedData = LoginSchema.parse(request.body);

    // חיפוש המשתמש לפי אימייל
    const user = await User.findOne({ email: validatedData.email });
    if (!user) {
      return reply.status(401).send({ error: 'פרטי התחברות שגויים' });
    }

    // בדיקה האם הסיסמה שהוזנה מתאימה לסיסמה המוצפנת ב-DB
    const isPasswordValid = await bcrypt.compare(validatedData.password, user.passwordHash);
    if (!isPasswordValid) {
      return reply.status(401).send({ error: 'פרטי התחברות שגויים' });
    }

    // יצירת טוקן JWT מוצפן שמכיל את userId, email והתפקיד (Role) של המשתמש
    // הגישה ל-jwt מתבצעת דרך request.server מכיוון שאנו בתוך פונקציית קונטרולר חיצונית
    const token = request.server.jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      { expiresIn: '1d' } // תוקף הטוקן: יום אחד
    );

//     return reply.status(200).send({
//       message: 'התחברת בהצלחה',
//       token,
//       user: { id: user._id, username: user.username, role: user.role }
//     });
//   } catch (error: any) {
//     if (error.issues) {
//       return reply.status(400).send({ error: 'שגיאת ולידציה', details: error.issues });
//     }
//     return reply.status(500).send({ error: 'שגיאת שרת פנימית' });
//   }
// };
return reply.status(200).send(
  successResponse(
    {
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      }
    },
    'התחברת בהצלחה'
  )
)}finally{

}};