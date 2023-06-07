import type { Project, Backlog, User, BacklogCreate, BacklogPagination } from '$lib/types/scrumlog'
import { PUBLIC_API_URL } from '$env/static/public'
async function authFetch(path: string, settings?: RequestInit) {
  settings = settings || {}
  settings.credentials = 'include'
  return await fetch(`${PUBLIC_API_URL}/${path}`, settings)

}
export const getProjects = async (currentPage = 1, pageSize = 20, sortOrder = "desc"): Promise<Project[]> => {
  const response = await authFetch(`api/projects?currentPage=${currentPage}&pageSize=${pageSize}&sortOrder=${sortOrder}`)
  const data = (await response.json()) as Project[]
  return data
}
export const getProjectsBySLug = async (slug: string, currentPage = 1, pageSize = 1, sortOrder = "desc"): Promise<Project> => {
  const params = new URLSearchParams([
    ["searchField", "slug"],
    ["searchString", slug],
    ["currentPage", currentPage.toString()],
    ["pageSize", pageSize.toString()],
    ["sortOrder", sortOrder]

  ])

  const response = await authFetch(`api/projects?${params.toString()}`)
  const data = (await response.json()) as Project
  return data
}
export const getUsers = async (currentPage = 1, pageSize = 20, sortOrder = "desc"): Promise<User[]> => {
  const response = await authFetch(`api/users?currentPage=${currentPage}&pageSize=${pageSize}&sortOrder=${sortOrder}`)
  const data = (await response.json()).items as User[]
  return data
}
export const createProject = async (project: Project): Promise<Project> => {
  const response = await authFetch(`api/projects/`, { method: 'POST', body: JSON.stringify(project) })
  const data = (await response.json()) as Project
  return data
}
export const getBacklogByPrjSlug = async (prjSlug: string, currentPage = 1, pageSize = 5, sortOrder = "desc"): Promise<BacklogPagination> => {
  const params = new URLSearchParams([
    ["currentPage", currentPage.toString()],
    ["pageSize", pageSize.toString()], ["sortOrder", sortOrder]

  ])

  const response = await authFetch(`api/backlogs/project/${prjSlug}_backlog?${params.toString()}`)
  const data = (await response.json())
  return data
}
export const getTaskByPrjSlug = async (prjSlug: string, currentPage = 1, pageSize = 5, sortOrder = "desc"): Promise<BacklogPagination> => {

  const params = new URLSearchParams([
    ["currentPage", currentPage.toString()],
    ["pageSize", pageSize.toString()],
    ["sortOrder", sortOrder]

  ])

  const response = await authFetch(`api/backlogs/project/${prjSlug}_task?${params.toString()}`)
  const data = (await response.json())
  return data
}
export const createBacklog = async (backlog: BacklogCreate): Promise<Backlog> => {
  const response = await authFetch(`api/backlogs/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(backlog) })
  const data = (await response.json()) as Backlog
  return data
}
export const updateBacklog = async (backlog: Backlog): Promise<Backlog> => {
  const response = await authFetch(`api/backlogs/`, { method: "PUT", body: JSON.stringify(backlog) })
  const data = (await response.json()) as Backlog
  return data
}
export const progressUpBacklog = async (backlogSlug: string): Promise<Backlog> => {
  const response = await authFetch(`api/backlogs/progress/up/slug/${backlogSlug}`, { headers: { 'Content-Type': 'application/json' }, method: "PUT" })
  const data = (await response.json()) as Backlog
  return data
}
export const progressDownBacklog = async (backlogSlug: string): Promise<Backlog> => {
  const response = await authFetch(`api/backlogs/progress/down/slug/${backlogSlug}`, { headers: { 'Content-Type': 'application/json' }, method: "PUT" })
  const data = (await response.json()) as Backlog
  return data
}

// export const getPostById = async (id: number): Promise<Post> => {
//   const response = await fetch(
//     `https://jsonplaceholder.typicode.com/posts/${id}`,
//   )
//   const data = (await response.json()) as Post
//   return data
// }
