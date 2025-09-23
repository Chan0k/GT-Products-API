import pool from '../config/db.js';
import { ApiError } from '../utils/ApiError.js';

export const getAllComments = async () => {
  const [rows] = await pool.query('SELECT * FROM comments ORDER BY id');
  return rows;
};

export const getCommentsByPostId = async (postId) => {
  const [rows] = await pool.query(
    'SELECT * FROM comments WHERE postId = ? ORDER BY id',
    [postId]
  );
  return rows;
};

export const createComment = async ({ postId, authorId, text }) => {
  try {
    const [result] = await pool.query(
      'INSERT INTO comments (text, postId, authorId) VALUES (?, ?, ?)',
      [text, postId, authorId]
    );
    const [rows] = await pool.query('SELECT * FROM comments WHERE id = ?', [result.insertId]);
    return rows[0];
  } catch (error) {
    if (error?.code === 'ER_NO_REFERENCED_ROW_2') {
      throw new ApiError(400, 'Invalid postId or authorId. The specified post or user does not exist.');
    }
    throw error;
  }
};
