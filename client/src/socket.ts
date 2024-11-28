import { io } from 'socket.io-client';

export const socket = io('http://localhost:1025', {
	extraHeaders: {
		authorization: `Bearer ${localStorage.getItem('token')}`,
	},
	autoConnect: false,
});
