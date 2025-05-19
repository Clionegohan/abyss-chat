import express from 'express';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRoutes';
import authRoutes from './routes/authRoutes';


const app = express();

// CORS
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true,
}));

// ミドルウェア
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET || 'default-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
}));

// ルーティング
app.use('/users', userRouter);
app.use(authRoutes);

// ヘルスチェック
app.get('/', (req, res) => {
  res.send('Abyss Chat Backend is running');
});

export default app;
