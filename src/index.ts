import express from 'express';
const app = express();
import { usersRouter } from './Routes/userRoutes';
import { postsRouter } from './Routes/postRoutes';

app.use('/users', usersRouter);
app.use('/posts', postsRouter);