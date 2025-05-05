import express from 'express';
import cors from 'cors';
import { pool } from './db';
import { PrismaClient } from './generated/prisma';

const app = express()
const PORT = 3001
const prisma = new PrismaClient()

async function main() {
    const users = await prisma.user.findMany()
    console.log('Users:', users)
}

main()
    .catch((e) => console.error(e))
    .finally(() => prisma.$disconnect())

