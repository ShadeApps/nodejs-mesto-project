import { Router } from 'express';
import {
  getAllUsers, getUserById, updateUserProfile, updateUserAvatar, getCurrentUser,
} from '../controllers/users';
import { validateUpdateUser, validateUserId, validateUpdateUserAvatar } from '../middlewares/validators';

const usersRouter = Router();

usersRouter.get('/users', getAllUsers);
usersRouter.get('/users/:userId', validateUserId, getUserById);
usersRouter.get('/users/me', getCurrentUser);
usersRouter.patch('/users/me', validateUpdateUser, updateUserProfile);
usersRouter.patch('/users/me/avatar', validateUpdateUserAvatar, updateUserAvatar);

export default usersRouter;
