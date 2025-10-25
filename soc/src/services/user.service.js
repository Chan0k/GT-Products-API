
import { ApiError } from '../utils/ApiError.js';
import pool from '../config/db.js';
import bcrypt from 'bcrypt'; 


export const registerUser = async (userData) => {
    const { username, email, password } = userData; // Destructure password
    try {
        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const [result] = await pool.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );

        const newUser = await getUserById(result.insertId);
        return newUser;

    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            throw new ApiError(409, "Username or email already exists.");
        }
        throw error;
    }
};

export const getUserById = async (id) => {
    const [rows] = await pool.query('SELECT id, username, email, createdAt FROM users WHERE id = ?', [id]);
    if (rows.length === 0) {
        throw new ApiError(404, "User not found");
    }
    return rows[0];
};

export const getAllUsers = async () => {
    const [users] = await pool.query('SELECT id, username, email, createdAt FROM users');
    return users;
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