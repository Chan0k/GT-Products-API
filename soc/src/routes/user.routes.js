
import { Router } from 'express';
import { validatePost } from '../middlewares/validator.middleware.js';
import * as userController from '../controllers/user.controller.js';

const router = Router();

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);
router.get('/:userId/posts',userController.getPostsByUser);

export default router;