import { Router } from 'express';
import {
  getUsers, getUserById, updateUserProfile, updateUserAvatar,
  getCurrentUser,
} from '../controllers/users';

const usersRouter = Router();

usersRouter.get('/users', getUsers);
usersRouter.get('/users/me', getCurrentUser);
usersRouter.get('/users/:userId', getUserById);
usersRouter.patch('/users/me', updateUserProfile);
usersRouter.patch('/users/me/avatar', updateUserAvatar);

export default usersRouter;