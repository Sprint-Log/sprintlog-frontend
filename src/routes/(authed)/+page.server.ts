import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { PUBLIC_COOKIE_NAME} from '$env/static/public';


export const load: PageServerLoad = async ({ parent }) => {
  await parent();
  throw redirect(303, '/projects');
};

export const actions: Actions = {
  logout: async (event) => {
    console.log("Delete cookie")
    event.cookies.delete(PUBLIC_COOKIE_NAME, {path: '/'});

    throw redirect(302, '/login');
  }
};
