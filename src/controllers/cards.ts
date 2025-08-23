import { NextFunction, Request, Response } from 'express';
import Card from '../models/card';
import { RequestWithUser } from '../utils/types';

export const createCard = async (req: Request, res: Response, next: NextFunction) => {
  const userId = (req as RequestWithUser).user._id;
  try {
    const {
      name, link, owner = userId, likes, createdAt,
    } = req.body;
    const card = await Card.create({
      name, link, owner, likes, createdAt,
    });
    return res.status(201).json(card);
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Переданы некорректные данные при создании карточки.',
      });
    }
    return res.status(500).json({ message: 'На сервере произошла ошибка' });
  }
};

export const getAllCards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cards = await Card.find();
    return res.status(200).json(cards);
  } catch (error: any) {
    return res.status(500).json({ message: 'На сервере произошла ошибка' });
  }
};

export const deleteCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.cardId);
    if (!card) {
      return res.status(404).json({
        message: 'Карточка с указанным _id не найдена.',
      });
    }
    return res.status(200).json(card);
  } catch (error: any) {
    if (error.name === 'SyntaxError') {
      return res.status(400).json({
        message: 'Передан некорректный _id карточки.',
      });
    }
    if (error.name === 'CastError') {
      return res.status(400).json({
        message: 'Карточка с указанным _id не найдена.',
      });
    }
    return res.status(500).json({ message: 'На сервере произошла ошибка' });
  }
};

export const addLike = async (req: Request, res: Response, next: NextFunction) => {
  const userId = (req as RequestWithUser).user._id;
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: userId } } as any,
      { new: true },
    );
    if (!card) {
      return res.status(404).json({
        message: 'Передан несуществующий _id карточки.',
      });
    }
    return res.status(200).json(card);
  } catch (error: any) {
    if (error.name === 'SyntaxError') {
      return res.status(400).json({
        message: 'Переданы некорректные данные для постановки/снятия лайка или некорректный _id карточки.',
      });
    }
    if (error.name === 'CastError') {
      return res.status(400).json({
        message: 'Переданы некорректные данные для постановки/снятия лайка или некорректный _id карточки.',
      });
    }
    return res.status(500).json({ message: 'На сервере произошла ошибка' });
  }
};

export const deleteLike = async (req: Request, res: Response, next: NextFunction) => {
  const userId = (req as RequestWithUser).user._id;
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: userId } } as any,
      { new: true },
    );
    if (!card) {
      return res.status(404).json({
        message: 'Передан несуществующий _id карточки.',
      });
    }
    return res.status(200).json(card);
  } catch (error: any) {
    if (error.name === 'SyntaxError') {
      return res.status(400).json({
        message: 'Переданы некорректные данные для постановки/снятия лайка или некорректный _id карточки.',
      });
    }
    if (error.name === 'CastError') {
      return res.status(400).json({
        message: 'Переданы некорректные данные для постановки/снятия лайка или некорректный _id карточки.',
      });
    }
    return res.status(500).json({ message: 'На сервере произошла ошибка' });
  }
};
