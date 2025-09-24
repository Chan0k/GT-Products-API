// src/routes/post.routes.js
import { Router } from 'express';
import { validatePost, validateComment } from '../middlewares/validator.middleware.js';
import * as postController from '../controllers/post.controller.js';
import * as commentController from '../controllers/comment.controller.js';

const router = Router();

router.get('/', postController.getAllPosts);
router.post('/', validatePost ?? [], postController.createPost);
router.get('/:id', postController.getPostById);
router.put('/:id', postController.updatePost);
router.patch('/:id', postController.partiallyUpdatePost);
router.delete('/:id', postController.deletePost);

router.get('/:postId/comments', commentController.getCommentsByPostId);
router.post('/:postId/comments', validateComment, commentController.createCommentForPost);

export default router;
