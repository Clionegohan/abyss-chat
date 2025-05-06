import e from 'express';
import {  PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
    await prisma.user.createMany({
        data: [
            {
                name: 'Alice',
                gender: '女',
                message: 'Hello!!',
            },
            {
                name: 'リーダー',
                gender: '男',
                message: 'こんにちは',
            },
            {
                name: '女マン',
                gender: 'その他',
                message: 'オンデマンド！',
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
