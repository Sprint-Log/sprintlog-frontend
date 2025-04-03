import type {
  Project,
  Sprintlog,
  User,
  UserCreate,
  UserUpdate,
  SprintlogCreate,
  SprintlogPagination,
  Token,
  ProjectCreate,
  ProjectUpdate,
  ActiveProjectPagination,
  PaginatedResponse
} from '$lib/types/sprintlog';

import { PUBLIC_API_URL } from '$env/static/public';
export async function authFetch(path: string, settings?: RequestInit): Promise<Response> {
  settings = settings || {};

  settings.credentials = 'include';

  return await fetch(`${PUBLIC_API_URL}/${path}`, settings);
}
export const getProjects = async (
  currentPage = 1,
  pageSize = 200,
  sortOrder = 'asc'
): Promise<PaginatedResponse<Project>> => {
  const response = await authFetch(
    `api/projects?currentPage=${currentPage}&pageSize=${pageSize}&sortOrder=${sortOrder}`
  );
  if (!response.ok) throw response;
  return (await response.json()) as PaginatedResponse<Project>;
};
export const getLiveToken = async (roomId: string): Promise<Token> => {
  const response = await authFetch(`api/live/rooms/${roomId}`);
  const data = (await response.json()) as Token;
  return data;
};
export const getProjectsBySLug = async (
  slug: string,
  currentPage = 1,
  pageSize = 1,
  sortOrder = 'asc'
): Promise<Project> => {
  currentPage = currentPage + 1;
  const params = new URLSearchParams([
    ['searchField', 'slug'],
    ['searchString', slug],
    ['currentPage', currentPage.toString()],
    ['pageSize', pageSize.toString()],
    ['sortOrder', sortOrder]
  ]);

  const response = await authFetch(`api/projects?${params.toString()}`);
  if (response.ok) {
    const data = (await response.json()) as Project;
    return data;
  }
  let error = await response.json();
  if (error.message || error.detail) {
    throw new Error(error.detail || error.message);
  }
  throw new Error('Error getting project details.');
};
export const getUsers = async (
  currentPage = 1,
  pageSize = 20,
  sortOrder = 'asc'
): Promise<User[]> => {
  currentPage = 1;
  const response = await authFetch(
    `api/users?currentPage=${currentPage}&pageSize=${pageSize}&sortOrder=${sortOrder}`
  );
  if (response.ok) {
    const data = (await response.json()).items as User[];
    return data;
  }
  let error = await response.json();
  if (error.message || error.detail) {
    throw new Error(error.detail || error.message);
  }
  throw new Error('Error listing users.');
};
export const createProject = async (project: ProjectCreate): Promise<Project> => {
  const response = await authFetch(`api/projects/create`, {
    method: 'POST',
    body: JSON.stringify(project)
  });
  if (response.ok) {
    const data = (await response.json()) as Project;
    return data;
  }
  let error = await response.json();
  if (error.message || error.detail) {
    throw new Error(error.detail || error.message);
  }
  throw new Error('Error creating project.');
};

export const deleteProject = async (id: string): Promise<{ status: number }> => {
  try {
    await authFetch(`api/projects/${id}`, { method: 'DELETE' });
    return { status: 204 };
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

export const updateProject = async (project: ProjectUpdate, id: string): Promise<Project> => {
  const response = await authFetch(`api/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(project)
  });
  const data = (await response.json()) as Project;
  return data;
};

export const getBacklogByPrjSlug = async (
  prjSlug: string,
  currentPage = 1,
  pageSize = 5,
  sortOrder = 'asc'
): Promise<SprintlogPagination> => {
  currentPage = currentPage + 1;

  const params = new URLSearchParams([
    ['currentPage', currentPage.toString()],
    ['pageSize', pageSize.toString()],
    ['sortOrder', sortOrder]
  ]);

  const response = await authFetch(
    `api/sprintlogs/project/${prjSlug}_backlog?${params.toString()}`
  );
  if (!response.ok) throw response;
  const data = await response.json();
  return data;
};
export const getTaskByPrjSlug = async (
  prjSlug: string,
  currentPage = 1,
  pageSize = 500,
  sortOrder = 'asc'
): Promise<SprintlogPagination> => {
  currentPage = currentPage + 1;

  const params = new URLSearchParams([
    ['currentPage', currentPage.toString()],
    ['pageSize', pageSize.toString()],
    ['sortOrder', sortOrder]
  ]);

  const response = await authFetch(`api/sprintlogs/project/${prjSlug}_task?${params.toString()}`);
  if (!response.ok) throw response;
  const data = await response.json();
  return data;
};
export const createSprintlog = async (sprintlog: SprintlogCreate): Promise<Sprintlog> => {
  const response = await authFetch(`api/sprintlogs/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sprintlog)
  });
  const data = (await response.json()) as Sprintlog;
  return data;
};
export const updateSprintlog = async (sprintlog: Sprintlog): Promise<Sprintlog> => {
  const response = await authFetch(`api/sprintlogs/${sprintlog.id}`, {
    method: 'PUT',
    body: JSON.stringify(sprintlog)
  });
  const data = (await response.json()) as Sprintlog;
  return data;
};
export const progressUp = async (sprintlogSlug: string): Promise<Sprintlog> => {
  const response = await authFetch(`api/sprintlogs/progress/up/${sprintlogSlug}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT'
  });
  const data = (await response.json()) as Sprintlog;
  return data;
};
export const toggleCompletion = async (sprintlogSlug: string): Promise<Sprintlog> => {
  const response = await authFetch(`api/sprintlogs/progress/complete/${sprintlogSlug}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT'
  });
  const data = (await response.json()) as Sprintlog;
  return data;
};
export const progressDown = async (sprintlogSlug: string): Promise<Sprintlog> => {
  const response = await authFetch(`api/sprintlogs/progress/down/${sprintlogSlug}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT'
  });
  const data = (await response.json()) as Sprintlog;
  return data;
};
export const progressCircle = async (sprintlogSlug: string): Promise<Sprintlog> => {
  const response = await authFetch(`api/sprintlogs/progress/circle/${sprintlogSlug}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT'
  });
  const data = (await response.json()) as Sprintlog;
  return data;
};
export const priorityCircle = async (sprintlogSlug: string): Promise<Sprintlog> => {
  const response = await authFetch(`api/sprintlogs/priority/circle/${sprintlogSlug}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT'
  });
  const data = (await response.json()) as Sprintlog;
  return data;
};
export const switchToTask = async (sprintlogSlug: string): Promise<Sprintlog> => {
  const response = await authFetch(`api/sprintlogs/switch/task/${sprintlogSlug}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT'
  });
  const data = (await response.json()) as Sprintlog;
  return data;
};
export const switchToBacklog = async (sprintlogSlug: string): Promise<Sprintlog> => {
  const response = await authFetch(`api/sprintlogs/switch/backlog/${sprintlogSlug}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT'
  });
  const data = (await response.json()) as Sprintlog;
  return data;
};

// export const getPostById = async (id: number): Promise<Post> => {
//   const response = await fetch(
//     `https://jsonplaceholder.typicode.com/posts/${id}`,
//   )
//   const data = (await response.json()) as Post
//   return data
// }

/* Functions created by Hein Min Min Maw */

export const createUser = async (user: UserCreate): Promise<User> => {
  const response = await authFetch(`api/users/`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
  return (await response.json()) as User;
};

export const updateUserPassword = async (
  id: string,
  newPassword: string,
  oldPassword: string
): Promise<Boolean> => {
  const response = await authFetch(`api/users/update/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      newPassword,
      currentPassword: oldPassword
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    return true;
  }
  let error = await response.json();

  if (error.detail) {
    throw new Error(error.detail);
  }
  throw new Error('Error updating user password');
};

export const deleteUser = async (id: string): Promise<{ status: number }> => {
  try {
    await authFetch(`api/users/${id}`, { method: 'DELETE' });
    return { status: 204 };
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

export const updateUser = async (id: string, user: UserUpdate): Promise<User> => {
  const response = await authFetch(`api/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(user),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    return (await response.json()) as User;
  }
  let error = await response.json();

  if (error.detail) {
    throw new Error(error.detail);
  }
  throw new Error('Error updating user password');
};

export const getProjectByUser = async (
  id: string,
  currentPage = 1,
  pageSize = 12,
  sortOrder = 'asc'
): Promise<ActiveProjectPagination> => {
  currentPage = currentPage + 1;

  const params = new URLSearchParams([
    ['currentPage', currentPage.toString()],
    ['pageSize', pageSize.toString()],
    ['sortOrder', sortOrder]
  ]);
  const response = await authFetch(`api/sprintlogs/projects/user/${id}?${params.toString()}`);
  if (!response.ok) throw response;
  const data = await response.json();

  return data;
};

export const getSprintlogTaskByUser = async (id: string): Promise<Sprintlog[]> => {
  const response = await authFetch(`api/sprintlogs/tasks/user/${id}`);
  if (!response.ok) throw response;
  const data = await response.json();
  return data;
};

export const getUserById = async (user_id: string): Promise<User> => {
  const response = await authFetch(`api/users/${user_id}`);
  if (!response.ok) throw response;
  const data = await response.json();
  return data;
};

export const updateProjectStatus = async (project_id: string, status: string): Promise<Project> => {
  const response = await authFetch(`api/projects/status/${project_id}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ status })
  });
  const data = (await response.json()) as Project;
  return data;
};

export const uploadProfile = async (userId: string, profileImg: File): Promise<User> => {
  const formData = new FormData();
  formData.append('file', profileImg);
  let response = await authFetch(`/api/users/profile`, {
    method: 'POST',
    body: formData
  });
  if (!response.ok) throw response;
  const data = (await response.json()) as User;
  return data;
};

export const getProfileFile = async (): Promise<Blob> => {
  const response = await authFetch(`/api/users/profile`);
  if (!response.ok) throw response;
  const data = await response.blob();
  return data;
};

export const getProjectAssigneeBySlug = async (slug: string): Promise<PaginatedResponse<User>> => {
  const response = await authFetch(`api/projects/assignees/${slug}`);
  if (!response.ok) throw response;
  const data = (await response.json()) as PaginatedResponse<User>;

  return data;
};
