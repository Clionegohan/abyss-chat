import e from 'express';
import {  PrismaClient } from '../src/generated/prisma';
import { hashPassword } from '../src/utils/hash';

const prisma = new PrismaClient();

async function main() {
    await prisma.user.deleteMany();

    await prisma.user.createMany({
        data: [
            {
                name: 'Alice',
                gender: '女',
                avatarUrl: "coelacanth.png",
                message: 'Hello!!',
                email: 'example@test.com',
                passwordHash: await hashPassword('abc123'),
                
            },
            {
                name: 'リーダー',
                gender: '男',
                avatarUrl: "sea-angel.png",
                message: 'こんにちは',
                email: 'example@test.org',
                passwordHash: await hashPassword('abc123'),
            },
            {
                name: '女マン',
                gender: 'その他',
                avatarUrl: "leafy-seadragon.png",
                message: 'オンデマンド！',
                email: 'example@example.com',
                passwordHash: await hashPassword('abc123'),
            },
        ],
    });

    console.log('✅ Seeding completed!!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
