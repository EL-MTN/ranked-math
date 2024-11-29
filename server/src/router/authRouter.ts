import { Router } from 'express';
import * as authController from '../controllers/auth';
import { passportConfig } from '../config/passport';

export const authRouter = Router();

// Unprotected Routes
authRouter.post('/login', authController.userLogin);
authRouter.post('/signup', authController.userRegister);

// Protected Routes
authRouter.use(passportConfig.authenticate('jwt', { session: false }));
authRouter.post('/verify', authController.verifyAuth);
