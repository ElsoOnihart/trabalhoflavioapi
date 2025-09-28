import { Request, Response } from 'express';
import { deletePost } from '../Business/postBusiness';
import { createPost } from '../Business/postBusiness';
import { patchPost } from '../Business/postBusiness';
import { findUserById } from '../Data/userData';

export const deletePostController = (req: Request, res: Response) => {
  const postId = parseInt(req.params.id as string);
  const userIdHeader = req.headers['user-id'];
  const userId = typeof userIdHeader === 'string' ? parseInt(userIdHeader) : NaN;
  if (isNaN(postId) || isNaN(userId)) {
    return res.status(400).json({ success: false, message: 'ID do post ou do usuário inválido.' });
  }
  const post = deletePost(postId, userId);
  if (!post) {
    return res.status(404).json({ success: false, message: 'Você não tem permissão para remover este post ou o post não foi encontrado.' });
  }
  res.json({ success: true, message: 'Post removido com sucesso.' });
};

export const createPostController = (req: Request, res: Response) => {
  const { title, content, authorId } = req.body;
  if (!title || !content || !authorId) {
    return res.status(400).json({ success: false, message: 'Título, conteúdo e ID do autor são obrigatórios.' });
  }
  const author = findUserById(authorId);
  if (!author) {
    return res.status(404).json({ success: false, message: 'Autor do post não encontrado.' });
  }
  const newPost = createPost(title, content, authorId);
  res.status(201).json({ success: true, message: 'Post criado com sucesso!', data: newPost });
};

export const patchPostController = (req: Request, res: Response) => {
  const postId = parseInt(req.params.id as string);
  const updates = req.body;
  const allowedUpdates = ['title', 'content', 'published'];
  const isValidOperation = Object.keys(updates).every(update => allowedUpdates.includes(update));
  if (isNaN(postId) || !isValidOperation) {
    return res.status(400).json({ success: false, message: 'Atualização inválida. Campos permitidos: title, content, published.' });
  }
  const updatedPost = patchPost(postId, updates);
  if (!updatedPost) {
    return res.status(404).json({ success: false, message: 'Post não encontrado.' });
  }
  res.json({ success: true, message: 'Post atualizado com sucesso.', data: updatedPost });
};