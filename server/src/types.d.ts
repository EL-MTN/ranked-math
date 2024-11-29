import 'socket.io';
import { IncomingMessage } from 'http';

declare namespace Express {
	interface Request {
		user: {
			id: string;
		};
	}
}

declare module 'http' {
	interface IncomingMessage {
		user?: any;
	}
}

interface ServerToClientEvents {
	pong: () => void;
	user_info: (data: any) => void;
}

interface ClientToServerEvents {
	ping: () => void;
	data: (data: any) => void;
}

interface InterServerEvents {
	ping: () => void;
}

interface SocketData {
	user: string;
}
