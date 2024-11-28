import { useEffect, useState } from 'react';

import './App.css';
import { socket } from './socket';
import { ConnectionState } from './components/ConnectionState';

function App() {
	const [data, setData] = useState<{ email: string }>();
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
		function onUserInfo(data: { email: string }) {
			setData(data);
		}

		socket.on('connect', onConnect);
		socket.on('disconnect', onDisconnect);
		socket.on('user_info', onUserInfo);
		return () => {
			socket.off('connect', onConnect);
			socket.off('disconnect', onDisconnect);
			socket.off('user_info', onUserInfo);
		};
	}, [isConnected]);

	return (
		<div>
			<p>{data ? data.email : 'None'}</p>
			<ConnectionState isConnected={isConnected} />
		</div>
	);
}

export default App;
