import express from 'express';
import { createCode, getCode } from '../controllers/codeController';

const router = express.Router();

// מסלול יצירת קוד
router.post('/', createCode);
// מסלול קבלת קוד
router.get('/:id', getCode);

export { router as codeRouter };