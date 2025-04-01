import type { TeamCreate, Team, PaginatedResponse } from '$lib/types/sprintlog';
import { authFetch } from './sprintlog';

export const getTeams = async (
    currentPage = 1,
    pageSize = 200,
    sortOrder = 'asc'
  ): Promise<PaginatedResponse<Team>> => {
    const response = await authFetch(
      `api/teams?currentPage=${currentPage}&pageSize=${pageSize}&sortOrder=${sortOrder}`
    );
    if (!response.ok) throw response;
    const data = (await response.json()) as PaginatedResponse<Team>;
    console.log("data", data)
    return data;
  };
export const createTeam = async (team: TeamCreate): Promise<Team> => {
  let response = await authFetch(`api/teams`, {
    method: 'POST',
    body: JSON.stringify(team)
  });
  if (!response.ok) throw response;
  const data = (await response.json()) as Team;
  return data;
};
