import type { LayoutServerLoad } from './$types';
import { getCurrentUser } from '$lib/api/auth';
import { error, redirect } from '@sveltejs/kit';
import { PUBLIC_COOKIE_NAME} from '$env/static/public';

export const load = (async ({ cookies, depends }) => {
  depends('user');

  const token = cookies.get(PUBLIC_COOKIE_NAME);
  if (!token) {
    throw redirect(303, '/login');
  }
  let user;
  try {
    user = await getCurrentUser(token);

  } catch (err: any) {
    const status = err.status;
    if (status === 401) {
      cookies.delete(PUBLIC_COOKIE_NAME, {path: '/'});
      throw redirect(303, '/login');
    }
    throw error(status, 'Something went wrong');
  }

  return {
    user
  };
}) satisfies LayoutServerLoad;
