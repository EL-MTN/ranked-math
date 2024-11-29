import { Link, useNavigate } from 'react-router';
import { signup } from '../api/auth';

export default function Signup() {
	const navigate = useNavigate();

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const form = event.currentTarget;
		const email = form.elements.namedItem('email') as HTMLInputElement;
		const password = form.elements.namedItem('password') as HTMLInputElement;

		signup(email.value, password.value).then((data) => {
			if (data.error) {
				alert(data.error);
			} else {
				localStorage.setItem('token', data.token);
				navigate('/home');
			}
		});
	}

	return (
		<div>
			<Link to="/login">Login</Link>
			<form
				onSubmit={(e) => {
					handleSubmit(e);
				}}
			>
				<label>
					Email:
					<input type="email" name="email" />
				</label>
				<br />
				<label>
					Password:
					<input type="password" name="password" />
				</label>
				<br />
				<button type="submit">Signup</button>
			</form>
		</div>
	);
}
