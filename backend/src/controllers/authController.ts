import { Request, Response } from 'express';
import { loginService, getUserByIdService } from '../services/authService';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await loginService(req.body.email, req.body.password);
    req.session.userId = user.id;
    res.status(200).json({ message: 'ログイン成功', user: { id: user.id, name: user.name } });
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};

export const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
  const userId = req.session.userId;
  if (!userId) {
    res.status(404).json({ error: 'ユーザーが見つかりません。' });
    return;
  }
  
  try {
    const user = await getUserByIdService(userId);

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: 'サーバーエラーが発生しました。' });
  }
};

export const logout = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: 'ログアウトに失敗しました。' });
    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'ログアウトしました。' });
  });
};
