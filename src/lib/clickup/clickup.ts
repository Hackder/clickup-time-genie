import type { AsyncClickUpResponse, ClickUpError, ClickUpResponse, Space, Team, User, Folder, List, TimeTracking } from "./clickup.types";

export const ClickUp = {
  isError: <T>(response: ClickUpResponse<T>): response is ClickUpError => {
    return (response as ClickUpError).err !== undefined;
  },

  getUser: async (
    token: string
  ): AsyncClickUpResponse<{
    user: User;
  }> => {
    const res = await fetch("https://api.clickup.com/api/v2/user", {
      headers: {
        Authorization: token,
      },
    });
    return await res.json();
  },

  getTeams: async (
    token: string
  ): AsyncClickUpResponse<{
    teams: Team[];
  }> => {
    const res = await fetch("https://api.clickup.com/api/v2/team", {
      headers: {
        Authorization: token,
      },
    });
    return await res.json();
  },

  getSpaces: async (
    token: string,
    teamId: string,
  ): AsyncClickUpResponse<{
    spaces: Space[];
  }> => {
    const res = await fetch(`https://api.clickup.com/api/v2/team/${teamId}/space`, {
      headers: {
        Authorization: token,
      },
    });
    return await res.json();
  },

  getFolderlessLists: async (
    token: string,
    spaceId: string,
  ): AsyncClickUpResponse<{
    lists: List[];
  }> => {
    const res = await fetch(`https://api.clickup.com/api/v2/space/${spaceId}/list`, {
      headers: {
        Authorization: token,
      },
    });
    return await res.json();
  },

  getFolders: async (
    token: string,
    spaceId: string,
  ): AsyncClickUpResponse<{
    folders: Folder[];
  }> => {
    const res = await fetch(`https://api.clickup.com/api/v2/space/${spaceId}/folder`, {
      headers: {
        Authorization: token,
      },
    });
    return await res.json();
  },

  getLists: async (
    token: string,
    folderId: string,
  ): AsyncClickUpResponse<{
    lists: List[];
  }> => {
    const res = await fetch(`https://api.clickup.com/api/v2/folder/${folderId}/list`, {
      headers: {
        Authorization: token,
      },
    });
    return await res.json();
  }, 

  getTimeEntries: async (
    token: string,
    teamId: string,
    from: string,
    to: string,
  ): AsyncClickUpResponse<{
    data: TimeTracking[];
  }> => {
    const res = await fetch(`https://api.clickup.com/api/v2/team/${teamId}/time_entries?start_date=${from}&end_date=${to}`, {
      headers: {
        Authorization: token,
      },
    });
    return await res.json();
  }
};
