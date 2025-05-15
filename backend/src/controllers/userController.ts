import { Request, Response } from "express";
import { getUserByIdService, createUserService } from "../services/userServices";
import { UserInputSchema } from '../validators/userValidator';
import { formatZodErrors } from '../utils/formatErrors';

// ユーザー取得（by ID）
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await getUserByIdService(req.params.id);
    if (!user)
      return res.status(404).json({ error: "ユーザーが見つかりません。" });
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: "サーバーエラーが発生しました。" });
  }
};

// ユーザー作成
export const createUser = async (req: Request, res: Response) => {
  try {
    const input = UserInputSchema.parse(req.body);
    const user = await createUserService(req.body);
    return res.status(201).json(user);
  } catch (err: any) {
    const errorMessages = formatZodErrors(err);
    return res.status(500).json({ error: '入力’データにエラーがあります。', details: errorMessages  });
  }
};
