import express from 'express';

const app = express();

app.use(express.json());
// app.use('/users', userRoutes); など

export default app;
