import createServer from './app/server';
import { connectToDB } from './config/db';

const app = createServer();

// server listening on port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	connectToDB();
	console.log(`Server is running on ${PORT}`);
});
