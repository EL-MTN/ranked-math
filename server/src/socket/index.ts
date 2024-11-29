import { Socket } from 'socket.io';
import { registerLobbyHandlers } from './lobbyHandler';

export const onConnection = (socket: Socket) => {
	registerLobbyHandlers(socket);

	console.log('New connection');

	socket.emit('message', `Hello from server ${new Date().toISOString()}`);
};
