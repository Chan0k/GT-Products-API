// src/services/post.service.js
import pool from '../config/db.js';

export const getAllPosts = async () => {
  const [rows] = await pool.query('SELECT * FROM posts ORDER BY id');
  return rows;
};

export const getPostById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM posts WHERE id = ?', [id]);
  return rows[0] || null;
};

export const createPost = async (postData) => {
  const { title, content } = postData;
  const [result] = await pool.query(
    'INSERT INTO posts (title, content) VALUES (?, ?)',
    [title, content]
  );
  return getPostById(result.insertId);
};

export const updatePost = async (id, postData) => {
  const { title, content } = postData;
  const [result] = await pool.query(
    'UPDATE posts SET title = ?, content = ? WHERE id = ?',
    [title, content, id]
  );
  if (result.affectedRows === 0) return null;
  return getPostById(id);
};

export const partiallyUpdatePost = async (id, updates) => {
  const allowed = ['title', 'content'];
  const fields = Object.keys(updates).filter((f) => allowed.includes(f));
  if (fields.length === 0) return getPostById(id);

  const values = fields.map((f) => updates[f]);
  const setClause = fields.map((f) => `${f} = ?`).join(', ');

  const [result] = await pool.query(
    `UPDATE posts SET ${setClause} WHERE id = ?`,
    [...values, id]
  );
  if (result.affectedRows === 0) return null;
  return getPostById(id);
};

export const deletePost = async (id) => {
  const [result] = await pool.query('DELETE FROM posts WHERE id = ?', [id]);
  return result.affectedRows > 0;
};

export const patchPost = partiallyUpdatePost;
