import { User } from './dataBase';
import { users } from './dataBase';
import { posts } from './dataBase';

export const findUserById = (id: number): User | undefined => {
  return users.find(u => u.id === id);
};

export const findUsersByAgeRange = (minAge: number, maxAge: number): User[] => {
  return users.filter(user => user.age >= minAge && user.age <= maxAge);
};

export const findUserByEmail = (email: string): User | undefined => {
  return users.find(user => user.email === email);
};

export const updateUserInDatabase = (userToUpdate: User): User | null => {
  const userIndex = users.findIndex(u => u.id === userToUpdate.id);
  if (userIndex !== -1) {
    users[userIndex] = userToUpdate;
    return users[userIndex];
  }
  return null;
};

export const findUsersWithPosts = (): Set<number> => {
  const usersWithPosts = new Set<number>();
  posts.forEach(post => usersWithPosts.add(post.authorId));
  return usersWithPosts;
};

export const removeInactiveUsers = (userIdsWithPosts: Set<number>): User[] => {
  const removedUsers: User[] = [];
  for (let i = users.length - 1; i >= 0; i--) {
    const user = users[i];
    if (user && user.role !== 'admin' && !userIdsWithPosts.has(user.id)) {
      removedUsers.push(users.splice(i, 1)[0]);
    }
  }
  return removedUsers;
};