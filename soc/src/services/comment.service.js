import pool from '../config/db.js';
import { ApiError } from '../utils/ApiError.js';

const parseId = (v, name = 'id') => {
  const n = Number(v);
  if (!Number.isInteger(n) || n <= 0) throw new ApiError(400, `Invalid ${name}`);
  return n;
};

export const getAllComments = async () => {
  const [rows] = await pool.query(
    `SELECT id, text, postId, authorId, createdAt
     FROM comments
     ORDER BY id`
  );
  return rows;
};

export const getCommentsByPostId = async (postId) => {
  const pid = parseId(postId, 'postId');
  const [rows] = await pool.query(
    `SELECT id, text, postId, authorId, createdAt
     FROM comments
     WHERE postId = ?
     ORDER BY id`,
    [pid]
  );
  return rows;
};

export const getCommentById = async (id) => {
  const cid = parseId(id, 'commentId');
  const [rows] = await pool.query(
    `SELECT id, text, postId, authorId, createdAt
     FROM comments
     WHERE id = ?
     LIMIT 1`,
    [cid]
  );
  return rows[0] ?? null;
};

export const createComment = async (postId, { authorId, text }) => {
  const pid = parseId(postId, 'postId');
  const aid = parseId(authorId, 'authorId');
  const body = String(text ?? '').trim();
  if (body === '') throw new ApiError(400, 'Comment text is required.');

  try {
    const [result] = await pool.query(
      `INSERT INTO comments (text, postId, authorId)
       VALUES (?, ?, ?)`,
      [body, pid, aid]
    );

    const [rows] = await pool.query(
      `SELECT id, text, postId, authorId, createdAt
       FROM comments
       WHERE id = ?`,
      [result.insertId]
    );
    return rows[0];
  } catch (err) {
    if (err && err.code === 'ER_NO_REFERENCED_ROW_2') {
      throw new ApiError(400, 'Invalid postId or authorId. The specified post or user does not exist.');
    }
    throw err;
  }
};
