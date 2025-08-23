import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { RequestWithUser } from '../utils/types';
import JWT_KEY from '../utils/config';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, about, avatar } = req.body;
    const user = await User.create({ name, about, avatar });
    return res.status(201).json(user);
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Переданы некорректные данные при создании пользователя.',
      });
    }
    return res.status(500).json({ message: 'На сервере произошла ошибка' });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error: any) {
    return res.status(500).json({ message: 'На сервере произошла ошибка' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({
        message: 'Пользователь по указанному _id не найден.',
      });
    }
    return res.status(200).json(user);
  } catch (error: any) {
    if (error.name === 'ValidationError' || error.name === 'CastError') {
      return res.status(400).json({
        message: 'Передан некорректный _id пользователя.',
      });
    }
    return res.status(500).json({ message: 'На сервере произошла ошибка' });
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const updUser = await User.findByIdAndUpdate(
      req.user._id,
      req.body,
      { new: true, runValidators: true },
    );
    if (!updUser) {
      return res.status(404).json({
        message: 'Пользователь с указанным _id не найден.',
      });
    }
    return res.status(200).json(updUser);
  } catch (error: any) {
    if (error.name === 'ValidationError' || error.name === 'CastError') {
      return res.status(400).json({
        message: 'Переданы некорректные данные при обновлении профиля.',
      });
    }
    return res.status(500).json({ message: 'На сервере произошла ошибка' });
  }
};

export const updateUserAvatar = async (req: Request, res: Response) => {
  try {
    const updAvatar = await User.findByIdAndUpdate(
      req.user._id,
      req.body,
      { new: true, runValidators: true },
    );
    if (!updAvatar) {
      return res.status(404).json({
        message: 'Пользователь с указанным _id не найден.',
      });
    }
    return res.status(200).json(updAvatar);
  } catch (error: any) {
    if (error.name === 'ValidationError' || error.name === 'CastError') {
      return res.status(400).json({
        message: 'Переданы некорректные данные при обновлении аватара.',
      });
    }
    return res.status(500).json({ message: 'На сервере произошла ошибка' });
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user || (!await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Неправильные почта или пароль' });
    }

    const token = jwt.sign(
      { _id: user._id },
      JWT_KEY,
      { expiresIn: '7d' },
    );

    return res
      .cookie('jwt', token, {
        httpOnly: true,
        sameSite: true,
        maxAge: 7 * 24 * 3600 * 1000,
      })
      .send({ message: 'Вход выполнен успешно' });
  } catch (err) {
    return next(err);
  }
};
