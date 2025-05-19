import { Request, Response, NextFunction } from 'express';

export const requireLogin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.userId) {
    res.status(401).json({ error: 'ログインが必要です。' });
    return;
  }
  next();
};
