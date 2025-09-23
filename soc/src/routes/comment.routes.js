import { Router } from 'express';
import { getAllPosts, getPostById, createPost } from '../controllers/post.controller.js';
import { getCommentsByPostId, createCommentForPost } from '../controllers/comment.controller.js';
import { validateComment } from '../middlewares/validator.middleware.js';

const router = Router();

router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.post('/', createPost);

router.get('/:postId/comments', getCommentsByPostId);
router.post('/:postId/comments', validateComment, createCommentForPost);

export default router;
