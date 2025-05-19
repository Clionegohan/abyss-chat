import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const LoginSchema = z.object({
  email: z.string().email('正しいメールアドレスを入力してください'),
  password: z.string().min(6, 'パスワードは6文字以上で入力してください')
});

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  try {
    LoginSchema.parse(req.body);
    next();
  } catch (err: any) {
    res.status(400).json({ error: 'バリデーションエラー', details: err.errors?.map((e: any) => e.message) });
  }
};
