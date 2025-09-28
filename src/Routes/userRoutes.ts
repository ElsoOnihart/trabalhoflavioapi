import { Router } from 'express';
import { getUserByIdController } from '../Controller/userController';
import { getUsersByAgeRangeController } from '../Controller/userController';
import { updateUserController } from '../Controller/userController';
import { cleanupInactiveUsersController } from '../Controller/userController';

export const usersRouter = Router();

usersRouter.get('/:id', getUserByIdController);
usersRouter.get('/age-range', getUsersByAgeRangeController);
usersRouter.put('/:id', updateUserController);
usersRouter.delete('/cleanup-inactive', cleanupInactiveUsersController);