// index.js
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import postRoutes from './src/routes/post.routes.js';
import { testConnection } from './src/config/db.js';

// Load env vars
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Mount routes
app.use('/posts', postRoutes);

// Start server once
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  // Test DB connection on startup
  testConnection();
});
