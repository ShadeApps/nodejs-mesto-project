import { Router } from 'express';
import {
  getAllCards, createCard, deleteCard, addLike, deleteLike,
} from '../controllers/cards';
import { validateCardId, validateCreateCard } from '../middlewares/validators';

const cardsRouter = Router();

cardsRouter.get('/cards', getAllCards);
cardsRouter.post('/cards', validateCreateCard, createCard);
cardsRouter.delete('/cards/:cardId', validateCardId, deleteCard);
cardsRouter.put('/cards/:cardId/likes', validateCardId, addLike);
cardsRouter.delete('/cards/:cardId/likes', validateCardId, deleteLike);

export default cardsRouter;
