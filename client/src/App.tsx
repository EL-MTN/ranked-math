import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './pages/Home';
import LandingPage from './pages/Landing';
import Layout from './pages/Layout';
import Login from './pages/Login';
import { PrivateRoutes } from './components/ProtectedRoute';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<LandingPage />} />

					<Route path="/login" element={<Login />} />
					<Route element={<PrivateRoutes />}>
						<Route path="/home" element={<Home />} />
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
