import express, { Request, Response } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { passportConfig } from './config/passport';
import { connect } from 'mongoose';
import { User } from './models/User';
import { signToken } from './util/jwt';

const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: '*',
	},
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/login', async (req: Request, res: Response) => {
	const user = await User.findOne({ email: req.body.email });
	if (!user) {
		return res.status(401).send('Invalid email or password');
	}

	const valid = await user.verifyPassword(req.body.password);
	if (!valid) {
		return res.status(401).send('Invalid email or password');
	}

	return res.send(signToken({ email: user.email }));
});

app.use(passportConfig.initialize());

app.post('/verify', passportConfig.authenticate('jwt', { session: false }), (req, res) => {
	res.send('Logged in');
});

const ids = new Set<string>();

io.on('connection', (socket) => {
	console.log('Connection from user');

	socket.on('data', (data) => {
		console.log(data);
		ids.add(socket.id);
	});
});

httpServer.listen(1025);
connect('mongodb://localhost:27017/rankedMath').then(() => {
	console.log('Connected to MongoDB');
});
