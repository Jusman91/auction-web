import express from 'express';
import { verifyUser } from '../middleware';
import {
	createItem,
	deleteItem,
	getItem,
	getItems,
	updateItem,
} from '../controllers/item';

const router = express.Router();

router.post('/:auctioneerId', verifyUser, createItem);
router.put('/:slug', verifyUser, updateItem);
router.delete('/:slug', verifyUser, deleteItem);
router.get('/:slug', getItem);
router.get('/', getItems);

export default router;
