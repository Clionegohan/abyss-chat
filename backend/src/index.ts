import express from 'express';
import cors from 'cors';
import { pool } from './db';

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

app.get('/', async (_req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.send(`DB接続成功！！時刻： ${result.rows[0].now}`);
    } catch (err) {
        res.status(500).send('DB接続に失敗しました！');
    }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`)
})
