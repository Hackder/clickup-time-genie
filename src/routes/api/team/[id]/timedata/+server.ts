import { ClickUp } from '$lib/clickup/clickup';
import { error, json, redirect, type RequestHandler } from '@sveltejs/kit';
import { z } from 'zod';

const searchParamsSchema = z.object({
  from: z.string(),
  to: z.string(),
});

export const GET: RequestHandler = async ({ cookies, url, params }) => {
  const token = cookies.get('clickup-token');

  if (!token) {
    throw redirect(307, '/login');
  }

  const rawTimeRange = {
    from: url.searchParams.get('from'),
    to: url.searchParams.get('to'),
  };

  const timeRange = searchParamsSchema.safeParse(rawTimeRange);

  if (!timeRange.success) {
    console.error(timeRange.error);
    throw error(400, 'Invalid time range');
  }

  const teamId = params.id;

  if (!teamId) {
    throw error(400, 'Missing team id');
  }

  const response = await ClickUp.getTimeEntries(token, teamId, timeRange.data.from, timeRange.data.to);

  if (ClickUp.isError(response)) {
    cookies.delete('clickup-token');
    throw error(500, response.err);
  }

  return json(response.data);
}
