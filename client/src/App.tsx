import { useEffect } from 'react';
import { io } from 'socket.io-client';
import './App.css';

const socket = io('http://localhost:1025');

function App() {
	useEffect(() => {
		socket.connect();
		socket.emit('data', 'Hello from client');
	}, []);

	return <p>AAA</p>;
}

export default App;
