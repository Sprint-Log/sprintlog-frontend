import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ cookies }) => {
	const token = cookies.get('token');
	if (token) throw redirect(301, '/');
};
