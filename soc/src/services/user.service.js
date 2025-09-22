
import { ApiError } from '../utils/ApiError.js';
import pool from '../config/db.js';

export const getAllUsers = async () => {
  const [rows] = await pool.query('SELECT * FROM users ORDER BY id');
  return rows;
};

export const getUserById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    if (!rows[0]) {
        throw new ApiError(404, "User not found");
    }
    return rows[0];
};

export const createUser = async (userData) => {
  const { username, email } = userData;

  try {
    const [result] = await pool.query(
      'INSERT INTO users (username, email) VALUES (?, ?)',
      [username, email]
    );
    return await getUserById(result.insertId);
  } catch (error) {
    if (error && error.code === 'ER_DUP_ENTRY') {
      throw new ApiError(409, 'Username or email already exists.');
    }
    throw error;
  }
};