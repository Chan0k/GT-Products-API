import { Router } from 'express';
import { validatePost } from '../middlewares/validator.middleware.js';
import * as postController from '../controllers/post.controller.js';
import * as commentController from '../controllers/comment.controller.js';

const router = Router();

router.get('/', postController.getAllPosts);
router.post('/', postController.createPost);
router.get('/:id', postController.getPostById);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.patch('/:id', postController.patchPost);

router.get('/:postId/comments', (req, res, next) => { console.log('HIT GET /posts/:postId/comments', req.params); next(); }, commentController.getCommentsByPostId);
router.post('/:postId/comments', (req, res, next) => { console.log('HIT POST /posts/:postId/comments', req.params); next(); }, commentController.createComment);

export default router;