import { NextFunction, Request, Response } from 'express';
import { RequestWithUser } from '../utils/types';
import Card from '../models/card';
import AppError from '../errors/appError';

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
      return next(new AppError('Карточка с указанным _id не найдена', 404));
    }

    if (card.owner.toString() !== (req as RequestWithUser).user._id) {
      return next(new AppError('Нет прав для удаления этой карточки', 403));
    }

    await card.remove();

    return res.status(200).send({ message: 'Карточка удалена' });
  } catch (err: unknown) {
    if (err instanceof Error && err.name === 'CastError') {
      return next(new AppError('Передан некорректный _id карточки', 400));
    }
    return next(err);
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
