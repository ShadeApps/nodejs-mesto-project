import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import JWT_KEY from '../utils/config';
import AppError from '../errors/appError';
import { RequestWithUser } from '../utils/types';

const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.jwt;

  if (!token) {
    return next(new AppError('Необходима авторизация', 401));
  }

  let payload;
  try {
    payload = jwt.verify(token, JWT_KEY);
  } catch (err) {
    return next(new AppError('Необходима авторизация', 401));
  }

  (req as RequestWithUser).user = payload as { _id: string };

  return next();
};

export default auth;
