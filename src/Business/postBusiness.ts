import { Post, posts } from '../Data/dataBase';
import { findPostById, removePostFromDatabase, updatePostInDatabase, addPostToDatabase } from '../Data/postData';
import { findUserById } from '../Data/userData';

    

export const canUserDelete = (userId: number, postAuthorId: number, userRole: 'user' | 'admin'): boolean => {
  return userRole === 'admin' || userId === postAuthorId;
};

export const deletePost = (postId: number, userId: number): Post | null => {
    const post = findPostById(postId);
    const user = findUserById(userId);

    if (!post || !user || !canUserDelete(userId, post.authorId, user.role)) {
        return null; 
    }
    
    return removePostFromDatabase(postId);
};

export const createPost = (title: string, content: string, authorId: number): Post => {
  const newPost: Post = {
    id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
    title,
    content,
    authorId,
    createdAt: new Date(),
    published: false
  };
  return addPostToDatabase(newPost);
};

export const patchPost = (postId: number, updates: Partial<Post>): Post | null => {
  return updatePostInDatabase(postId, updates);
};