import express, { Request, Response } from 'express';

const { PORT = 3000 } = process.env;
const app = express();

app.listen(PORT, () => console.log('Сервер работает! port: ' + PORT))
