import { useNavigate } from 'react-router';
import { login } from '../api/auth';

export default function Login() {
	const navigate = useNavigate();

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const form = event.currentTarget;
		const email = form.elements.namedItem('email') as HTMLInputElement;
		const password = form.elements.namedItem('password') as HTMLInputElement;

		login(email.value, password.value).then((data) => {
			if (data.error) {
				alert(data.error);
			} else {
				localStorage.setItem('token', data.token);
				navigate('/home');
			}
		});
	}

	return (
		<form onSubmit={handleSubmit}>
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
			<button type="submit">Login</button>
		</form>
	);
}
