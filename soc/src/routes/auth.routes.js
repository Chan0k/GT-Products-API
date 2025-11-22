import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';
import { validateRegistration } from '../middlewares/validator.middleware.js';
import { authLimiter } from '../middlewares/ratelimit.middleware.js';

const router = Router();

router.use(authLimiter);
router.post('/register', validateRegistration, authController.registerUser);
router.post('/login', authController.loginUser);
export default router;