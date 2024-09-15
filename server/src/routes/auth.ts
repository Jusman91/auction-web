import express from 'express';
import {
	forgotPassword,
	loggedIn,
	login,
	logout,
	register,
	resetPassword,
} from '../controllers/auth';
import { verifyToken } from '../middleware';

const router = express();

router.post('/register', register);
router.post('/login', login);
router.get('/me', verifyToken, loggedIn);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:id/:token', resetPassword);
router.get('/logout', logout);

export default router;
