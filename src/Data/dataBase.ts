export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  role: 'user' | 'admin';
}

export interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  createdAt: Date;
  published: boolean;
}

export const users: User[] = [
  { id: 1, name: 'João', email: 'joao@email.com', age: 27, role: 'user' },
  { id: 2, name: 'Maria', email: 'maria@email.com', age: 24, role: 'user' },
  { id: 3, name: 'José', email: 'jose@email.com', age: 16, role: 'user' },
  { id: 4, name: 'Joseph', email: 'joseph@email.com', age: 39, role: 'admin' },
  { id: 5, name: 'Franklin', email: 'franklin@email.com', age: 49, role: 'user' },
  { id: 6, name: 'Moses', email: 'moses@email.com', age: 26, role: 'user' },
  { id: 7, name: 'Joshua', email: 'joshua@email.com', age: 25, role: 'admin' },
  { id: 8, name: 'Jason', email: 'jason@email.com', age: 20, role: 'user' },
  { id: 9, name: 'Anna', email: 'anna@email.com', age: 33, role: 'user' }
];

export const posts: Post[] = [
  { id: 1, title: 'Primeiro Post', content: 'Conteúdo do primeiro post...', authorId: 1, createdAt: new Date(), published: true },
  { id: 2, title: 'Receita de Bolo', content: 'Passo a passo para um bolo perfeito.', authorId: 5, createdAt: new Date(), published: true },
  { id: 3, title: 'Viagem ao Espaço', content: 'Minha experiência visitando a lua.', authorId: 4, createdAt: new Date(), published: false }
];