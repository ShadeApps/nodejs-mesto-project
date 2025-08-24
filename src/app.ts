import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import userRouter from './routes/users';
import cardRouter from './routes/cards';
import auth from './middlewares/auth';import errorHandler from './middlewares/errorHandler';
import { requestLogger, errorLogger } from './middlewares/logger';
import { validateSignIn, validateSignUp } from './middlewares/validators';
import { login, createUser } from './controllers/users';
import { errors } from 'celebrate';
import AppError from './errors/appError';

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

app.use(cookieParser());

app.post('/signup', validateSignUp, createUser);
app.post('/signin', validateSignIn, login);

app.use(auth);

app.use('/', userRouter);
app.use('/', cardRouter);
app.use('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError('Тут ничего нет.', 404));
});

app.use(errors());

mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(+PORT);
