import { z } from 'zod';


const VALID_EMAIL_REGEX = /^[\w+-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+$/i;
const VALID_PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;

export const UserInputSchema = z.object({
    name: z.string().min(1, '名前を入力してください。').max(20, '名前は20文字以内で入力してください。'),
    email: z.string()
        .min(1, 'メールアドレスを入力してください。')
        .max(100, 'メールアドレスは100文字以内で入力してください。')
        .regex(VALID_EMAIL_REGEX, '有効なメールアドレスを入力してください。'),
    password: z.string()
        .max(100, 'パスワードは100文字以内で入力してください。')
        .regex(VALID_PASSWORD_REGEX, 'パスワードは6文字以上の英数字で入力してください。'),
    gender: z.enum(['男', '女', 'その他']), 
    avatarUrl: z.string().min(1, 'アバターを選択してください。'),
    message: z.string()
        .min(1, 'メッセージを入力してください。')
        .max(140, 'メッセージは140文字以内で入力してください。'),
});
