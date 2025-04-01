import type { TeamCreate, Team, PaginatedResponse, TeamMember } from '$lib/types/sprintlog';
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
    return data;
  };


export const getTeamBySlug = async(
  slug: string,
): Promise<Team> => {
  const response = await authFetch(
    `api/teams/${slug}`
  );
  if (!response.ok) throw response;
  const data = (await response.json()) as Team;
  return data;
}

export const createTeam = async (team: TeamCreate): Promise<Team> => {
  let response = await authFetch(`api/teams`, {
    method: 'POST',
    body: JSON.stringify(team)
  });
  if (!response.ok) throw response;
  const data = (await response.json()) as Team;
  return data;
};

export const addMembers = async (teamId: string, members: TeamMember[]): Promise<Team> => {
  let response = await authFetch(`api/teams/${teamId}/members/add`, {
    method: 'POST',
    body: JSON.stringify(members)
  });
  if (!response.ok) throw response;
  const data = (await response.json()) as Team;
  return data;
};