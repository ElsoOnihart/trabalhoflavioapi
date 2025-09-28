import { Router } from 'express';
import { deletePostController } from '../Controller/postController';
import { createPostController } from '../Controller/postController';
import { patchPostController } from '../Controller/postController';

export const postsRouter = Router();

postsRouter.delete('/:id', deletePostController);
postsRouter.post('/', createPostController);
postsRouter.patch('/:id', patchPostController);