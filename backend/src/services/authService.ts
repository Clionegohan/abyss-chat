import { comparePassword } from '../utils/hash';
import { findUserByEmail, findUserById } from '../models/userModel';

export const loginService = async (email: string, password: string) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error('メールアドレスが見つかりません。');

  const isMatch = await comparePassword(password, user.passwordHash);
  if (!isMatch) throw new Error('パスワードが一致しません。');

  return user;
};

export const getUserByIdService = async (userId: string) => {
  return await findUserById(userId);
};
