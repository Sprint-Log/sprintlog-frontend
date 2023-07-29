import { getCurrentUser } from '$lib/api/auth';
import { error, redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ cookies, depends }) => {
	depends('user');

	const token = cookies.get('token');
	if (!token) {
		throw redirect(303, '/login');
	}
	let user;
	try {
		user = await getCurrentUser(token);
	} catch (err: any) {
		const status = err.status;
		if (status === 401) {
			cookies.delete('token');
			throw redirect(303, '/login');
		}
		throw error(status, 'Something went wrong');
	}

	return {
		user
	};
}) satisfies LayoutServerLoad;
