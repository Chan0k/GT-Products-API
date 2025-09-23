
import { Router } from 'express';
import { validatePost } from '../middlewares/validator.middleware.js';
import * as postController from '../controllers/post.controller.js';
import * as commentController from '../controllers/comment.controller.js';

const router = Router();

router.get('/', postController.getAllPosts);
router.post('/', postController.createPost);
router.get('/:id', postController.getPostById);
router.put('/:id', postController.updatePost);
router.patch('/:id', postController.partiallyUpdatePost);
router.delete('/:id', postController.deletePost);
router.patch('/:id', postController.patchPost);

router.get('/:postId/comments', commentController.getCommentsByPostId);
router.post('/:postId/comments', commentController.createCommentForPost);

export default router;