import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { PUBLIC_COOKIE_NAME} from '$env/static/public'

export const load: LayoutServerLoad = ({ cookies }) => {
  const token = cookies.get(PUBLIC_COOKIE_NAME);
  if (token) throw redirect(301, '/');
};
