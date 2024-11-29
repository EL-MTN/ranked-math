import { useEffect, useState } from 'react';
import { ConnectionState } from '../components/ConnectionState';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router';

export default function App() {
	const socket = io('http://localhost:1025', {
		auth: {
			token: localStorage.getItem('token'),
		},
		autoConnect: false,
	});

	const navigate = useNavigate();
	const [data, setData] = useState<string>();
	const [isConnected, setIsConnected] = useState(socket.connected);

	useEffect(() => {
		socket.connect();

		return () => {
			socket.disconnect();
		};
	}, []);

	useEffect(() => {
		function onConnect() {
			setIsConnected(true);
		}
		function onDisconnect() {
			setIsConnected(false);
		}
		function onUserInfo(data: string) {
			setData(data);
		}
		function onPong() {
			console.log('Pong');
		}

		socket.on('connect', onConnect);
		socket.on('disconnect', onDisconnect);
		socket.on('user_info', onUserInfo);
		socket.on('pong', onPong);

		return () => {
			socket.off('connect', onConnect);
			socket.off('disconnect', onDisconnect);
			socket.off('user_info', onUserInfo);
			socket.off('pong', onPong);
		};
	}, []);

	return (
		<div>
			<p>{data}</p>
			<ConnectionState isConnected={isConnected} />
			<button
				onClick={() => {
					socket.emit('ping');
					console.log('Ping');
				}}
			>
				Ping
			</button>
			<button
				onClick={() => {
					socket.disconnect();
					localStorage.removeItem('token');
					navigate('/');
				}}
			>
				Logout
			</button>
		</div>
	);
}
