import { Router } from 'express';
import PostController from '../Controller/postController';

export default function createPostRoutes(postController: PostController): Router {
  const router = Router();

  // Exercício 3: POST /posts
  router.post('/', postController.create);

  // Exercício 5: PATCH /posts/:id
  router.patch('/:id', postController.partialUpdate);

  // Exercício 6: DELETE /posts/:id
  router.delete('/:id', postController.delete);

  // Adicione aqui rotas para os exemplos, se necessário

  return router;
}