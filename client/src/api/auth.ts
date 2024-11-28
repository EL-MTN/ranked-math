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

	console.log(data);

	return data;
};
