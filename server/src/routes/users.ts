import express from 'express';
import {
	deleteUser,
	getUser,
	getUsers,
	udpateUser,
} from '../controllers/user';
import { register } from '../controllers/auth';
import { verifyAdmin, verifyUser } from '../middleware';

const router = express.Router();

router.post('/', register);
router.put('/:slug', verifyUser, udpateUser);
router.delete('/:slug', verifyUser, deleteUser);
router.get('/:slug', verifyUser, getUser);
router.get('/', verifyAdmin, getUsers);

export default router;
