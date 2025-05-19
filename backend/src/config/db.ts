// ✅ src/config/db.ts
import dotenv from 'dotenv';
dotenv.config(); // ← 必ず一番上で実行！

import { PrismaClient } from '@prisma/client';
// import { Pool } from 'pg';

// Prisma Client for ORM
const prisma = new PrismaClient();
export default prisma;

// // Raw PG Pool for direct SQL (任意で使う場合)
// export const pool = new Pool({
//   host: process.env.DB_HOST,
//   port: parseInt(process.env.DB_PORT || '5432', 10),
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });
