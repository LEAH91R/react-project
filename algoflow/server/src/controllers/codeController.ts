import { Request, Response } from 'express';
import Code from '../models/CodeModel';

export const createCode = async (req: Request, res: Response) => {
    try {
        const { code, expectedTime } = req.body;

        // בדיקות קלט
        if (!code || !expectedTime || typeof expectedTime !== 'number') {
            return res.status(400).json({ error: 'Invalid input' });
        }

        const newCode = new Code({ code, expectedTime });
        await newCode.save();

        // התחלת הריצה של הקוד
        const startTime = Date.now();

        // כאן יש להריץ את הקוד (בהנחה שיש לך פונקציה להרצה)
        const executionResult = executeCode(code); // יש להגדיר את executeCode

        const endTime = Date.now();
        const actualTime = endTime - startTime;

        // החזרת התשובה
        res.status(201).json({
            message: 'Code executed successfully',
            executionResult,
            actualTime,
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// דוגמת פונקציה להרצת קוד
const executeCode = (code: string) => {
    // כאן תוסיף את הלוגיקה לרוץ על קטע הקוד
    return eval(code); // שימו לב: eval מסוכן; השתמשו בזה בזהירות!
};
// import { Request, Response } from 'express';
// import Code from '../models/CodeModel';

// export const createCode = async (req: Request, res: Response) => {
//     const { code, expectedTime } = req.body;
//     const newCode = new Code({ code, expectedTime });
//     await newCode.save();
//     res.status(201).json(newCode);
// };

// export const getCode = async (req: Request, res: Response) => {
//     const code = await Code.findById(req.params.id);
//     if (!code) return res.status(404).send('Code not found');
//     res.json(code);
// };