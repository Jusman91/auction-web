import express from 'express';
import {
	createCategory,
	deleteCategoroy,
	getCategories,
	updateCategory,
} from '../controllers/category';
import { verifyAdmin } from '../middleware';

const router = express.Router();

router.post('/', verifyAdmin, createCategory);
router.get('/', getCategories);
router.put('/:id', verifyAdmin, updateCategory);
router.delete('/:id', verifyAdmin, deleteCategoroy);

export default router;
