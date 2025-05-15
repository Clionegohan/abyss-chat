import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRoutes';

import { pool } from './config/db';
import { PrismaClient } from './generated/prisma';

const app = express();
const PORT = 3001;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Abyss Chat Backend is running');
});

app.use('/users', userRouter);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
