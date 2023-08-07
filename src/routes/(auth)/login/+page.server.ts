import type { Actions } from './$types';
import { redirect, fail } from '@sveltejs/kit';
import { loginUser } from '$lib/api/auth';
import { env } from '$env/dynamic/public';

export const actions: Actions = {
	default: async (event) => {
		const formData = Object.fromEntries(await event.request.formData());

		if (!formData.email || !formData.password) {
			return fail(400, {
				error: 'Missing email or password'
			});
		}

		const { email, password } = formData as { email: string; password: string };
		try {
			const token = (await loginUser(email, password)).access_token;
			event.cookies.set('token', `Bearer ${token}`, {
				httpOnly: true,
				path: '/',
				secure: true,
				sameSite: 'strict',
				maxAge: 60 * 60 * 24, // 1 day
				domain: env.PUBLIC_COOKIE_DOMAIN
			});
		} catch (error: any) {
			return fail(400, {
				error: error.message
			});
		}

		// Set the cookie

		throw redirect(302, '/');
	}
};
