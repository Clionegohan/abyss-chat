import e from 'express';
import {  PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
    await prisma.user.createMany({
        data: [
            {
                name: 'Alice',
                gender: '女',
                avatarUrl: "coelacanth.png",
                message: 'Hello!!',
                email: 'example@test.com',
                passwordHash: 'password',
                
            },
            {
                name: 'リーダー',
                gender: '男',
                avatarUrl: "sea-angel.png",
                message: 'こんにちは',
                email: 'example@test.org',
                passwordHash: 'password',
            },
            {
                name: '女マン',
                gender: 'その他',
                avatarUrl: "leafy-seadragon.png",
                message: 'オンデマンド！',
                email: 'example@example.com',
                passwordHash: 'password',
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
