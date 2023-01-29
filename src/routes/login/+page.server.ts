import { ClickUp } from '$lib/clickup/clickup';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
 
export const load = (async ({ cookies }) => {
  const token = cookies.get('clickup-token');

  if (!token) {
    return { message: 'No token found' };
  }

  const userResponse = await ClickUp.getUser(token);

  if (ClickUp.isError(userResponse)) {
    cookies.delete('clickup-token');
    return { message: 'Invalid token' };
  }

  throw redirect(303, '/');
}) satisfies PageServerLoad;
 
export const actions = {
  default: async ({ cookies, request }) => {
    const data = await request.formData();
    const token = data.get('token');

    if (!token) {
      return fail(400, { message: 'Token is missing' })
    }

    if (typeof token !== 'string') {
      return fail(400, { message: 'Token is not a string' })
    }
 
    const user = await ClickUp.getUser(token);

    if (ClickUp.isError(user)) {
      cookies.delete('clickup-token');
      return fail(500, { success: false, message: user.err })
    }

    cookies.set('clickup-token', token);
 
    throw redirect(303, '/');
  },
} satisfies Actions;
