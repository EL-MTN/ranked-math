import { Outlet, Link } from 'react-router';

export default function Layout() {
	return (
		<>
			<nav>
				<ul>
					<li>
						<Link to="/">Landing</Link>
					</li>
					<li>
						<Link to="/home">Home</Link>
					</li>
					<li>
						<Link to="/login">Login</Link>
					</li>
				</ul>
			</nav>

			<Outlet />
		</>
	);
}
