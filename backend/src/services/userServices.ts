import { getUserByIdModel, createUserModel, findUserByEmail } from '../models/userModel';
import { hashPassword } from '../utils/hash';
import { CreateUserInput } from '../types/user';

export const getUserByIdService = async (id: string) => {
    return await getUserByIdModel(id);
};

export const createUserService = async (input: CreateUserInput) => {
    const exists = await findUserByEmail(input.email);
    if (exists) throw new Error('そのメールアドレスは既に使われています。');

    const passwordHash = await hashPassword(input.password);
    return await createUserModel({ ...input, passwordHash });
};

