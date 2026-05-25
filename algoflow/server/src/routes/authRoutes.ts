import express from 'express';
import { authenticateUser } from '../controllers/authController';
const router = express.Router();

// מסלול התחברות
router.post('/login', authenticateUser);

export { router as authRouter };