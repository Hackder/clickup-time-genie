import { ClickUp } from '$lib/clickup/clickup';
import type { Item } from '$lib/tree/tree.types';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, cookies }) => {
  await new Promise(resolve => setTimeout(resolve, 3000));

  const token = cookies.get('clickup-token');

  if (!token) {
    throw redirect(307, '/login');
  }

  const response = await ClickUp.getSpaces(token, params.id);

  if (ClickUp.isError(response)) {
    cookies.delete('clickup-token');
    throw redirect(307, '/login');
  }

  const spaces: Item[] = response.spaces.map(space => ({
    id: space.id,
    type: 'space',
    name: space.name,
    selected: false,
    children: [],
  }));

  for (const space of spaces) {
    const listsResponse = await ClickUp.getFolderlessLists(token, space.id);

    if (ClickUp.isError(listsResponse)) {
      cookies.delete('clickup-token');
      throw redirect(307, '/login');
    }

    space.children = listsResponse.lists.map(list => ({
      id: list.id,
      type: 'list',
      name: list.name,
      selected: false,
      children: [],
    }));

    const foldersResponse = await ClickUp.getFolders(token, space.id);

    if (ClickUp.isError(foldersResponse)) {
      cookies.delete('clickup-token');
      throw redirect(307, '/login');
    }

    const folders: Item[] = foldersResponse.folders.map(folder => ({
      id: folder.id,
      type: 'folder',
      name: folder.name,
      selected: false,
      children: [],
    }));

    for (const folder of folders) {
      const listsResponse = await ClickUp.getLists(token, folder.id);

      if (ClickUp.isError(listsResponse)) {
        cookies.delete('clickup-token');
        throw redirect(307, '/login');
      }

      folder.children = listsResponse.lists.map(list => ({
        id: list.id,
        type: 'list',
        name: list.name,
        selected: false,
        children: [],
      }));
    }

    space.children = space.children.concat(folders);
  }

  return { success: true, spaces };
}) satisfies PageServerLoad;
