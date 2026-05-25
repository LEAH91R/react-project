import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import { config } from 'dotenv';
import { authRouter } from './routes/authRoutes';
import { codeRouter } from './routes/codeRoutes';
import { rateLimit } from 'express-rate-limit';

config();

// יצירת האפליקציה
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/codes', codeRouter);
// התחברות ל-MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// הגדרת מגבלת קריאות
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 דקה
    max: 100 // מגבלה על 100 קריאות
});
app.use(limiter);

// הגדרת מסלולים
app.use('/api/auth', authRouter);
app.use('/api/codes', codeRouter);

// הפעלת השרת
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});