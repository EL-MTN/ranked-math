import { Link } from 'react-router';

export default function LandingPage() {
	return (
		<div>
			<p>This is landing</p>
			<Link to="/login">Login</Link>
			<br />
			<Link to="/signup">Sign Up</Link>
		</div>
	);
}
