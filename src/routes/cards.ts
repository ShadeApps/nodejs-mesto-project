import { Router } from 'express';
import {
  getAllCards, createCard, deleteCard, addLike, deleteLike,
} from '../controllers/cards';

const cardsRouter = Router();

cardsRouter.get('/cards', getAllCards);
cardsRouter.post('/cards', createCard);
cardsRouter.delete('/cards/:cardId', deleteCard);
cardsRouter.put('/cards/:cardId/likes', addLike);
cardsRouter.delete('/cards/:cardId/likes', deleteLike);

export default cardsRouter;
