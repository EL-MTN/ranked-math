import { Navigate, Outlet } from 'react-router';
export const PrivateRoutes = () => {
	let token = localStorage.getItem('token');

	return token ? <Outlet /> : <Navigate to="/login" />;
};
