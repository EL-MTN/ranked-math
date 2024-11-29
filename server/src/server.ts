import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { createServer } from 'http';
import { connect } from 'mongoose';
import { Server } from 'socket.io';
import { passportConfig } from './config/passport';
import { router } from './router';
import { registerLobbyHandlers } from './socket/lobbyHandler';
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from './types';
import { socketAuth } from './middlewares/socketAuth';
import { onConnection } from './socket';

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

io.use(socketAuth);
io.on('connection', onConnection);

httpServer.listen(1025);
connect('mongodb://localhost:27017/rankedMath').then(() => {
	console.log('Connected to MongoDB');
});
