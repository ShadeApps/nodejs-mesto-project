import express, { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose';
import userRouter from './routes/users';
import cardRouter from './routes/cards';
import './types/express';

const { PORT = 3000 } = process.env;
const app = express();

// Temporary solution for authorization
app.use((req: Request, res: Response, next: NextFunction)=>{
  req.user = {
    _id: '674365e821ad7ba0f382ff1d'
  };
  next();
});

app.use(express.json())
app.use('/', userRouter)
app.use('/', cardRouter)
app.use('*', (req: Request, res: Response) => {
  res.status(404).send({message: 'Тут ничего нет.'});
});

mongoose.connect('mongodb://localhost:27017/mestodb')
  .then(() => {
    console.log('Успешное подключение к MongoDB.')
    app.listen(PORT, () => console.log('Сервер работает. Port: ' + PORT));
  })
  .catch(err => console.error('Ошибка подключения к MongoDB:', err));