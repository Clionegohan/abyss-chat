import {  Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export const getUserById = async (req: Request, res: Response) => {
    const userId = req.params.id;

    try {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) return res.status(404).json({ error: 'ユーザーが見つからないよ；；'});
        return res.json(user);
    } catch (error) {
        return res.status(500).json({ error: 'サーバーエラーが発生したよ；；' });
    }
};
