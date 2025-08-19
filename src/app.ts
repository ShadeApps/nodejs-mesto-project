import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb')
  .then(() => {
    console.log('Успешное подключение к MongoDB.')
    app.listen(PORT, () => console.log('Сервер работает. Port: ' + PORT));
  })
  .catch(err => console.error('Ошибка подключения к MongoDB:', err));