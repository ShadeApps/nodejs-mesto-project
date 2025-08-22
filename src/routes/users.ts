import { Router } from 'express';
import {
  createUser, getAllUsers, getUserById, getCurrentUser, updateUserProfile, updateUserAvatar,
} from '../controllers/users';

const usersRouter = Router();

usersRouter.post('/users', createUser);
usersRouter.get('/users', getAllUsers);
usersRouter.get('/users/me', getCurrentUser);
usersRouter.get('/users/:userId', getUserById);
usersRouter.patch('/users/me', updateUserProfile);
usersRouter.patch('/users/me/avatar', updateUserAvatar);

export default usersRouter;
