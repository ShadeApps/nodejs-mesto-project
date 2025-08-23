import { Router } from 'express';
import {
  getAllUsers, getUserById, updateUserProfile, updateUserAvatar,
} from '../controllers/users';

const usersRouter = Router();

usersRouter.get('/users', getAllUsers);
usersRouter.get('/users/:userId', getUserById);
usersRouter.patch('/users/me', updateUserProfile);
usersRouter.patch('/users/me/avatar', updateUserAvatar);

export default usersRouter;
