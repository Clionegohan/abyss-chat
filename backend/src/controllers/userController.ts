import { Request, Response } from "express";
import { getUserByIdService, createUserService } from "../services/userServices";
import { UserInputSchema } from '../validators/userValidator';
import { formatZodErrors } from '../utils/formatErrors';

// ユーザー取得（by ID）
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await getUserByIdService(req.params.id);
    if (!user)
      res.status(404).json({ error: "ユーザーが見つかりません。" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "サーバーエラーが発生しました。" });
  }
};

// ユーザー作成
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const input = UserInputSchema.parse(req.body);
    const user = await createUserService(req.body);
    res.status(201).json(user);
  } catch (err: any) {
    const errorMessages = formatZodErrors(err);
    res.status(500).json({ error: '入力’データにエラーがあります。', details: errorMessages  });
  }
};
