import { ClickUp } from "$lib/clickup/clickup";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ cookies }) => {
  const token = cookies.get('clickup-token');

  if (!token) {
    throw redirect(307, '/login');
  }

  const response = await ClickUp.getTeams(token);

  if (ClickUp.isError(response)) {
    cookies.delete('clickup-token');
    throw redirect(307, '/login');
  }

  return { success: true, teams: response.teams };
}) satisfies PageServerLoad;
 
