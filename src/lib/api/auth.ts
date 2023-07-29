import { PUBLIC_API_URL } from '$env/static/public';
import type { OAuth2Login, User } from '$lib/types/sprintlog';
const createUser = async (email: string, password: string) => {
	// Check if user exists
	fetch(`${PUBLIC_API_URL}/api/users`, {
		method: 'POST',
		headers: {
			accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email: email,
			password: password,
			name: email.split('@')[0],
			isSuperuser: false,
			isActive: true,
			isVerified: true
		})
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then((data) => {
			console.log(data);
		})
		.catch((error) => {
			console.error('Error:', error);
		});
};

const loginUser = async (email: string, password: string): Promise<OAuth2Login> => {
	try {
		const response = await fetch(`${PUBLIC_API_URL}/api/access/login`, {
			method: 'POST',
			headers: {
				accept: 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams({
				username: email,
				password: password
			})
		});
		if (!response.ok) {
			throw new Error('User or Password Error');
		}
		const data = await response.json();
		console.log(data);
		return data;
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
};

const getCurrentUser = async (token: string): Promise<User> => {
	let response;
	try {
		response = await fetch(`${PUBLIC_API_URL}/api/me`, {
			credentials: 'include',
			headers: {
				Authorization: `${token}`
			}
		});
		if (!response.ok) throw Error();
		const data = await response.json();
		return data;
	} catch (err) {
		throw response;
	}
};

export { createUser, loginUser, getCurrentUser };
