import { Request, Response } from 'express';
import { getUserById } from './userBusiness';
import { getUsersInAgeRange } from './userBusiness';
import { updateUser } from './userBusiness';
import { cleanupInactiveUsers } from './userBusiness';
import { User } from './dataBase';

export const getUserByIdController = (req: Request, res: Response) => {
  const userId = parseInt(req.params.id as string);
  if (isNaN(userId)) {
    return res.status(400).json({ success: false, message: 'ID do usuário inválido. Por favor, forneça um número.' });
  }
  const user = getUserById(userId);
  if (!user) {
    return res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
  }
  res.json({ success: true, data: user });
};

export const getUsersByAgeRangeController = (req: Request, res: Response) => {
  const minAge = parseInt(req.query.min as string);
  const maxAge = parseInt(req.query.max as string);
  if (isNaN(minAge) || isNaN(maxAge)) {
    return res.status(400).json({ success: false, message: 'Parâmetros de idade (min e max) inválidos. Por favor, forneça números.' });
  }
  const usersByAgeRange = getUsersInAgeRange(minAge, maxAge);
  if (usersByAgeRange.length === 0) {
    return res.status(404).json({ success: false, message: 'Nenhum usuário encontrado na faixa etária informada.' });
  }
  res.json({ success: true, data: usersByAgeRange });
};

export const updateUserController = (req: Request, res: Response) => {
  const userId = parseInt(req.params.id as string);
  const { name, email, role, age } = req.body;
  if (isNaN(userId) || !name || !email || !role || !age) {
    return res.status(400).json({ success: false, message: 'Dados inválidos. Verifique o ID e todos os campos obrigatórios (name, email, role, age).' });
  }
  try {
    const updatedUser = updateUser(userId, { name, email, role, age });
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
    }
    res.json({ success: true, message: 'Usuário atualizado com sucesso.', data: updatedUser });
  } catch (error) {
    if (error instanceof Error && error.message === 'Email already in use.') {
      return res.status(409).json({ success: false, message: error.message });
    }
    return res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
  }
};

export const cleanupInactiveUsersController = (req: Request, res: Response) => {
  const confirm = req.query.confirm === 'true';
  if (!confirm) {
    return res.status(400).json({ success: false, message: 'Confirmação obrigatória. Adicione ?confirm=true à sua URL.' });
  }
  const removedUsers = cleanupInactiveUsers();
  if (removedUsers.length === 0) {
    return res.status(404).json({ success: false, message: 'Nenhum usuário inativo encontrado para remoção.' });
  }
  res.json({ success: true, message: 'Usuários inativos removidos com sucesso.', data: removedUsers });
};