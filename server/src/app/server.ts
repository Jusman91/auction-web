import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import authRoutes from '../routes/auth';
import usersRoutes from '../routes/users';
import categoriesRoutes from '../routes/categories';
import { BASE_URL } from '../config/env';
import { errorHandler } from '../middleware';

const createServer = () => {
	const app = express();

	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(
		cors({
			credentials: true,
		}),
	);
	app.use(morgan('dev'));
	app.use(cookieParser());

	// routes
	app.use(`${BASE_URL}/auth`, authRoutes);
	app.use(`${BASE_URL}/users`, usersRoutes);
	app.use(`${BASE_URL}/categories`, categoriesRoutes);

	// error handler should be the last middleware
	app.use(errorHandler);

	return app;
};

export default createServer;
