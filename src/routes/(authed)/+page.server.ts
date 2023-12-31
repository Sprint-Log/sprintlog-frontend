import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ parent }) => {
  await parent();
  throw redirect(303, '/projects');
};

export const actions: Actions = {
  logout: async (event) => {
    event.cookies.delete('token');

    throw redirect(302, '/login');
  }
};
