export enum PriorityEnum {
  low = "🟢",
  med = "🟡",
  hi = "🔴"
}

export enum ProgressEnum {
  empty = "⬜⬜⬜",
  a_third = "🟩⬜⬜",
  two_third = "🟩🟩⬜",
  full = "🟩🟩🟩"

}

export enum StatusEnum {
  new = "☀️",
  started = "🛠️",
  checked_in = "📩",
  completed = "✅",
  cancelled = "🚫",
}

export enum TagEnum {
  ideas = "💡",
  issues = "⚠️",
  maintenance = "🔨",
  finances = "💰",
  innovation = "🚀",
  bugs = "🐞",
  features = "🎁",
  security = "🔒",
  attention = "🚩",
  backend = "📡",
  database = "💾",
  desktop = "🖥️",
  mobile = "📱",
  intl = "🌍",
  design = "🎨",
  analytics = "📈",
  automation = "🤖"
}
export type Token = {
  rooms: string
  token: string
}
export type Backlog = {
  id: string
  title: string
  description: string | null
  slug: string
  progress: ProgressEnum
  sprint_number: number
  priority: PriorityEnum
  status: StatusEnum
  type: string
  category: TagEnum
  labels?: string[]
  est_days: number
  beg_date: Date
  end_date: Date
  due_date: Date
  created_at: Date
  updated_at: Date
  // Relationships
  assignee_id?: string
  assignee_name?: string
  owner_id?: string
  owner_name?: string
  project_slug: string
}
export type BacklogCreate = {
  title: string
  description: string | null
  progress: ProgressEnum
  sprint_number: number
  priority: PriorityEnum
  status: StatusEnum
  type: string
  labels?: string[]
  category: TagEnum
  est_days: number
  beg_date?: string
  end_date?: string
  due_date?: string
  // Relationships
  assignee_id?: string
  owner_id?: string
  project_slug: string
}

export type BacklogPagination = {
  total: number
  limit: number
  offset: number
  items: Backlog[]
}

export type Project = {
  id: string,
  slug: string
  name: string
  description: string
  start_date: Date
  end_date: Date
  sprint_weeks?: number | null
  sprint_amount?: number | null
  sprint_checkup_day?: number | null
  repo_urls?: string[] | null
}
export type ProjectCreate = {
  slug: string
  name: string
  description?: string
  start_date?: Date
  end_date?: Date
  sprint_weeks?: number | null
  sprint_amount?: number | null
  sprint_checkup_day?: number | null
  repo_urls?: string[] | null
}

export interface OAuth2Login {
  access_token: string
  token_type: string
  refresh_token?: null | string
  expires_in?: null | number
}

export interface UserTeam {
  teamId: string
  teamName: string
  isOwner?: boolean
  role?: "ADMIN" | "MEMBER"
}

export interface User {
  id: string
  email: string
  name?: null | string
  isSuperuser: boolean
  isActive: boolean
  isVerified: boolean
  created_at: string
  updated_at: string
  teams?: UserTeam[]
}

export interface UserRegister {
  email: string
  password: string
  name?: null | string
}

export interface UserCreate {
  email: string
  password: string
  name?: null | string
  isSuperuser?: null | boolean
  isActive?: null | boolean
  isVerified?: null | boolean
}

export interface UserUpdate {
  email?: null | string
  name?: null | string
  isSuperuser?: null | boolean
  isActive?: null | boolean
  isVerified?: null | boolean
}

export interface TeamCreate {
  name: string
  description?: null | string
}

export interface TeamMember {
  id: string
  userId: string
  userEmail: string
  userName?: null | string
  role?: "ADMIN" | "MEMBER"
  isOwner?: boolean
}

export interface Team {
  id: string
  slug: string
  name: string
  description?: null | string
  members?: TeamMember[]
}

export interface TeamUpdate {
  name?: null | string
  description?: null | string
}

export interface NewUsersByWeek {
  week: string
  newUsers: number
}

export interface SystemHealth {
  app?: string
  version?: string
  databaseStatus: "online" | "offline"
  cacheStatus: "online" | "offline"
  workerStatus: "online" | "offline"
}
