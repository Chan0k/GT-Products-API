import { getPostById } from './post.service.js';

let comments = [];
let nextId = 1;

export const getAllComments = () => comments;

export const getCommentsByPostId = (postId) =>
  comments.filter(c => c.postId === postId);

export const createComment = (postId, text) => {
  // 🔑 Check if post exists first
  const post = getPostById(postId);
  if (!post) return null;

  const comment = { id: nextId++, text, postId };
  comments.push(comment);
  return comment;
};
