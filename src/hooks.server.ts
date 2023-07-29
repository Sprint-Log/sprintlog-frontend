import { redirect, type Handle } from '@sveltejs/kit';

const handle: Handle = async ({ event, resolve }) => {
	const res = await resolve(event);
	if (res.status === 401) {
		throw redirect(303, '/login');
	}
	return res;
};

export { handle };
