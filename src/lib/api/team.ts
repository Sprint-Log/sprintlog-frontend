import type {
  TeamCreate,
  Team,
  PaginatedResponse,
  TeamMember, UserId,
  TeamStatistics,
  TeamMemberRead
} from '$lib/types/sprintlog';
import { authFetch } from './sprintlog';


export const getTeams = async (
  currentPage = 1,
  pageSize = 20,
  sortOrder = 'asc',
  searchTerm= '',
): Promise<PaginatedResponse<Team>> => {
  const response = await authFetch(
    `api/teams?currentPage=${currentPage}&pageSize=${pageSize}&sortOrder=${sortOrder}&searchString=${searchTerm}&searchIgnoreCase=true`   );
  if (!response.ok) throw response;
  const data = (await response.json()) as PaginatedResponse<Team>;
  return data;
};

export const getTeamBySlug = async (slug: string): Promise<Team> => {
  const response = await authFetch(`api/teams/${slug}`);
  if (!response.ok) throw response;
  const data = (await response.json()) as Team;
  return data;
};
export const getTeamStatistics = async (slug: string): Promise<TeamStatistics> => {
  const response = await authFetch(`api/teams/statistics/${slug}`);
  if (!response.ok) throw response;
  const data = (await response.json()) as TeamStatistics;
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

export const modifyMembers = async (teamId: string, members: TeamMember[]): Promise<Team> => {
  let teamMembers = members.map((member) => ({
    userId: member.userId,
    role: member.role
  }));
 
  let response = await authFetch(`api/teams/${teamId}/members/modify`, {
    method: 'PUT',
    body: JSON.stringify(teamMembers)
  });
  if (!response.ok) throw response;
  const data = (await response.json()) as Team;
  return data;
};

export const removeMember = async (teamId: string, userId: string): Promise<Team> => {
  let member: UserId = {
    userId: userId
  };
  let response = await authFetch(`api/teams/${teamId}/members/remove`, {
    method: 'POST',
    body: JSON.stringify(member)
  });
  if(!response.ok) throw response;
  const data = (await response.json()) as Team;
  return data;
}

export const updateMemberRole = async(memberId: string, role:string): Promise<TeamMemberRead> =>{
  let roleObj = {
    role: role
  };
  let response = await authFetch(`api/teams/members/${memberId}`, {
    method: 'POST',
    body: JSON.stringify(roleObj)
  });
  if (!response.ok) throw response;
  const data = (await response.json()) as TeamMemberRead;
  return data;
}
