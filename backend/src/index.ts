import express from 'express';
import cors from 'cors';
import { pool } from './db';
import { PrismaClient } from './generated/prisma';

const app = express();
const PORT = 3001;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Abyss Chat Backend is running');
});

app.listen(PORT, () => {
    console.log(`Server is runnning on http://localhost:${PORT}`);
});
