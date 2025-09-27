import UserData from '../Data/userData';
import { User } from '../Data/dataBase';

class UserBusiness {
  constructor(private userData: UserData) {}

  getById(id: number): User {
    const user = this.userData.getById(id);
    if (!user) throw new Error('Usuário não encontrado');
    return user;
  }

  getByAgeRange(min: string, max: string): User[] {
    const minNum = parseInt(min);
    const maxNum = parseInt(max);
    if (isNaN(minNum) || isNaN(maxNum)) throw new Error('Parâmetros inválidos');
    return this.userData.getByAgeRange(minNum, maxNum);
  }

  update(id: number, user: Omit<User, 'id'>): User {
    const existing = this.userData.getById(id);
    if (!existing) throw new Error('Usuário não encontrado');
    if (!user.name || !user.email || !user.role || user.age === undefined) throw new Error('Todos os campos são obrigatórios para PUT');
    if (this.userData.getByEmail(user.email) && existing.email !== user.email) throw new Error('Email duplicado');
    return this.userData.update(id, user);
  }
  cleanupInactive(confirm: string): User[] {
    if (confirm !== 'true') throw new Error('Confirmação obrigatória');
    return this.userData.cleanupInactive();
  }

  // Adicione aqui métodos para os exemplos (ex: createUser, delete, etc.), se necessário
}

export default UserBusiness;