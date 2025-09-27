import PostData from '../Data/postData';
import UserData from '../Data/userData';
import { Post } from '../Data/dataBase';

class PostBusiness {
  constructor(private postData: PostData, private userData: UserData) {}

  create(post: Omit<Post, 'id' | 'createdAt' | 'published'>): Post {
    if (!post.title || post.title.length < 3) throw new Error('Título mínimo 3 caracteres');
    if (!post.content || post.content.length < 10) throw new Error('Conteúdo mínimo 10 caracteres');
    if (!this.userData.getById(post.authorId)) throw new Error('Autor não existe');
    return this.postData.create(post);
  }

  partialUpdate(id: number, updates: Partial<Omit<Post, 'id' | 'authorId' | 'createdAt'>>): Post {
    const post = this.postData.getById(id);
    if (!post) throw new Error('Post não encontrado');
    const allowed = ['title', 'content', 'published'];
    for (const key in updates) {
      if (!allowed.includes(key)) throw new Error('Campo não permitido');
    }
    return this.postData.partialUpdate(id, updates);
  }

  delete(id: number, userId: number): void {
    const post = this.postData.getById(id);
    if (!post) throw new Error('Post não encontrado');
    const user = this.userData.getById(userId);
    if (!user) throw new Error('Usuário não encontrado');
    if (post.authorId !== userId && user.role !== 'admin') throw new Error('Não autorizado');
    this.postData.delete(id);
  }
}

export default PostBusiness;