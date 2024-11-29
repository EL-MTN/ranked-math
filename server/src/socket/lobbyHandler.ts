import { Socket } from 'socket.io';
import { generateId } from '../lib/nanoid';
import { User } from '../models/User';

const queue: Socket[] = [];
const games = new Map<string, { socket: Socket; choice: '' | 'cooperate' | 'defect' }[]>();

const connectedIds = new Set<string>();

export function registerLobbyHandlers(socket: Socket) {
	const onConnect = () => {
		connectedIds.add(socket.request.user);
	};

	const onQueue = async () => {
		if (queue.indexOf(socket) !== -1) return;

		queue.push(socket);

		if (queue.length === 2) {
			const roomId = generateId();
			queue[0].join(roomId);
			queue[1].join(roomId);

			const opponent1 = await User.findById(queue[0].data.user).select('-password -_id');
			const opponent2 = await User.findById(queue[1].data.user).select('-password -_id');

			queue[0].emit('gameStart', { opponent: opponent2 });
			queue[1].emit('gameStart', { opponent: opponent1 });

			games.set(roomId, [
				{ socket: queue[0], choice: '' },
				{ socket: queue[1], choice: '' },
			]);

			queue.shift();
			queue.shift();
		}
	};

	const cancelQueue = async () => {
		const index = queue.indexOf(socket);
		if (index !== -1) {
			queue.splice(index, 1);
		}
	};

	const onDisconnecting = () => {
		socket.rooms.forEach((room) => {
			socket.to(room).emit('gameEnd');
			games.delete(room);
		});
	};

	const onDisconnect = () => {
		connectedIds.delete(socket.request.user);

		const index = queue.indexOf(socket);
		if (index !== -1) {
			queue.splice(index, 1);
		}
	};

	socket.on('connect', onConnect);
	socket.on('queue', onQueue);
	socket.on('cancelQueue', cancelQueue);
	socket.on('disconnecting', onDisconnecting);
	socket.on('disconnect', onDisconnect);
}
