import { Router } from 'express';
import UserController from '../Controller/userController';

export default function createUserRoutes(userController: UserController): Router {
  const router = Router();

  // Exercício 1: GET /users/:id
  router.get('/:id', userController.getById);

  // Exercício 2: GET /users/age-range
  router.get('/age-range', userController.getAgeRange);

  // Exercício 4: PUT /users/:id
  router.put('/:id', userController.update);

  // Exercício 7: DELETE /users/cleanup-inactive
  router.delete('/cleanup-inactive', userController.cleanupInactive);

  // Adicione aqui rotas para os exemplos (ex: GET /, GET /search, POST /, PATCH /:id, DELETE /:id, DELETE /bulk-delete)

  return router;
}