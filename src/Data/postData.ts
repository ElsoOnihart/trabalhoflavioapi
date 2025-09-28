import { Post, users, posts } from './dataBase';
import { User } from './dataBase';

export const removePostFromDatabase = (postId: number): Post | null => {
  const postIndex = posts.findIndex(p => p.id === postId);
  if (postIndex === -1) {
    return null;
  }
  const removedPost = posts.splice(postIndex, 1)[0];
  return removedPost;
};

export const findPostById = (id: number): Post | undefined => {
  return posts.find(p => p.id === id);
};

export const addPostToDatabase = (newPost: Post): Post => {
  posts.push(newPost);
  return newPost;
};

export const updatePostInDatabase = (postId: number, updates: Partial<Post>): Post | null => {
  const postIndex = posts.findIndex(p => p.id === postId);
  if (postIndex === -1) {
    return null;
  }
  Object.assign(posts[postIndex], updates);
  return posts[postIndex];
};