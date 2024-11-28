import express from 'express';
import { createServer } from 'http';
import { connect } from 'mongoose';
import { Server } from 'socket.io';
import { passportConfig } from './config/passport';
import { router } from './router';

const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: '*',
	},
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passportConfig.initialize());

app.use(router);

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
