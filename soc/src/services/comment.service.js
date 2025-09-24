import { ApiError } from '../utils/ApiError.js';
import { getPostById } from './post.service.js';
import { getUserById } from './user.service.js';

let comments = [];
let nextId = 1;

export const getAllComments = async () => comments;

export const getCommentsByPostId = async (postId) => {
  const id = Number(postId);
  return comments.filter(c => c.postId === id);
};

export const getCommentById = async (id) =>
  comments.find(c => c.id === Number(id)) ?? null;

export const createComment = async (postId, { text, authorId }) => {
  const pid = Number(postId);
  const aid = Number(authorId);

  // Ensure the post exists
  try {
    await getPostById(pid);
  } catch (e) {
    if (e instanceof ApiError && e.statusCode === 404) {
      throw new ApiError(404, 'Post not found.');
    }
    throw e;
  }

  // Ensure the author exists
  try {
    await getUserById(aid);
  } catch (e) {
    if (e instanceof ApiError && e.statusCode === 404) {
      throw new ApiError(400, 'Invalid authorId.');
    }
    throw e;
  }

  if (!text || String(text).trim() === '') {
    throw new ApiError(400, 'Comment text is required.');
  }

  const item = {
    id: nextId++,
    postId: pid,
    authorId: aid,
    text: String(text).trim(),
    createdAt: new Date().toISOString(),
  };

  comments.push(item);
  return item;
};

// (Optional) handy for tests/reset
export const __resetComments = () => {
  comments = [];
  nextId = 1;
};
