import fastify from 'fastify';
import mongoose from 'mongoose';
import fastifyJwt from '@fastify/jwt'; // <-- הוסיפו את הייבוא הזה

import { authRoutes } from './routes/auth.routes'; // <-- 1. הוסיפו את הייבוא

const server = fastify({ logger: true });

server.register(fastifyJwt, {
  secret: process.env.JWT_SECRET || 'fallback_secret'
});

// 2. רישום נתיבי ה-Authentication בשרת
server.register(authRoutes);


// אם MONGO_URI לא מוגדר ב-env, הוא ישתמש בכתובת הלוקאלית הזו כמחרוזת בוודאות
const MONGO_URI = process.env.MONGO_URI ;
// אם PORT לא מוגדר, הוא ישתמש ב-5000 כברירת מחדל
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;
server.get('/health', async (request, reply) => {
  return { status: 'ok', message: 'LogicRoot Fastify Server is running' };
});

const start = async () => {
  try {
    // 1. מתחברים קודם כל למסד הנתונים
    await mongoose.connect(process.env.MONGO_URI !);
    console.log('🍃 Successfully connected to MongoDB!');

    // 2. רק אחרי שהחיבור ל-DB הצליח, השרת מתחיל להקשיב
    await server.listen({ port: PORT, host: '0.0.0.0' });
    console.log(`🚀 Fastify server is floating on http://localhost:${PORT}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();