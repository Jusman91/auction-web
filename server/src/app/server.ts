import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

// import { BASE_URL } from '../config';
// import { errorHandler } from '../middleware';

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

	// error handler should be the last middleware
	// app.use(errorHandler);

	return app;
};

export default createServer;
