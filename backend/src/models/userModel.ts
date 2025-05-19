import prisma from '../config/db';
import { CreateUserInputWithHash } from '../types/user';

export const getUserByIdModel = async (UserId: string) => {
    return await prisma.user.findUnique({ where: { id: UserId } });
};

export const findUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({ where: { email } });
};

export const findUserById = (id: string) => {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
      },
    });
  };

export const createUserModel = async (input : CreateUserInputWithHash) => {
    return await prisma.user.create({
        data: {
            name: input.name,
            email: input.email,
            passwordHash: input.passwordHash,
            gender: input.gender,
            avatarUrl: input.avatarUrl,
            message: input.message,
        },
    });
};
