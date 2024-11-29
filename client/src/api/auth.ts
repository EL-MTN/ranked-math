const baseUrl = 'http://localhost:1025';

export const login = async (email: string, password: string) => {
	const response = await fetch(`${baseUrl}/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	});

	const data = await response.json();

	return data;
};

export const signup = async (email: string, password: string) => {
	const response = await fetch(`${baseUrl}/signup`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	});

	const data = await response.json();

	return data;
};
