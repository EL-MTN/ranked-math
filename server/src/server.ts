import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { createServer } from 'http';
import { connect } from 'mongoose';
import { Server } from 'socket.io';
import { passportConfig } from './config/passport';
import { router } from './router';

const app = express();
const httpServer = createServer(app);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passportConfig.initialize());

app.use(router);

const ids = new Set<string>();

const io = new Server(httpServer, {
	cors: {
		origin: '*',
	},
});

io.engine.use((req: Request, res: Response, next: NextFunction) => {
	const isHandshake = (req as any)._query.sid === undefined;
	if (isHandshake) {
		passportConfig.authenticate('jwt', { session: false })(req, res, next);
	} else {
		next();
	}
});

io.on('connection', (socket) => {
	console.log('Connected');
	socket.emit('user_info', (socket.request as any).user!);
	socket.emit('pong');

	socket.on('data', (data) => {
		console.log(data);
		ids.add(socket.id);
	});
	socket.on('ping', () => {
		console.log('Ping');
		socket.emit('pong');
	});

	socket.on('disconnect', () => {
		console.log('Disconnected');
	});
});

httpServer.listen(1025);
connect('mongodb://localhost:27017/rankedMath').then(() => {
	console.log('Connected to MongoDB');
});
