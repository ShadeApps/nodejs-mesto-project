import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import userRouter from './routes/users';
import cardRouter from './routes/cards';
import auth from './middlewares/auth';
import './utils/types';
import { login, createUser } from './controllers/users';

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

app.use(cookieParser());

app.post('/signup', createUser);
app.post('/signin', login);

app.use(auth);

app.use('/', userRouter);
app.use('/', cardRouter);
app.use('*', (req: Request, res: Response) => {
  res.status(404).send({ message: 'Тут ничего нет.' });
});

mongoose.connect('mongodb://localhost:27017/mestodb')
  .then(() => {
    console.log('Успешное подключение к MongoDB.');
    app.listen(PORT, () => console.log(`Сервер работает. Port: ${PORT}`));
  })
  .catch((err) => console.error('Ошибка подключения к MongoDB:', err));
