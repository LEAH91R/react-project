import { Request, Response } from 'express';

   export const authenticateUser = async (req: Request, res: Response) => {
       const { username, password } = req.body; // הנחה שיש לך פרטי משתמש כאן
       
       // כאן תצטרך להוסיף את הלוגיקה לאימות המשתמש
       if (username === 'admin' && password === 'password') {
           return res.status(200).json({ message: 'User authenticated' });
       } else {
           return res.status(401).json({ message: 'Invalid credentials' });
       }
   };