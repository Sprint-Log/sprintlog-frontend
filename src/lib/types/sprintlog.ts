export enum PriorityEnum {
  low = '🟢',
  med = '🟡',
  hi = '🔴'
}

export enum ProgressEnum {
  empty = '⬜⬜⬜',
  a_third = '🟩⬜⬜',
  two_third = '🟩🟩⬜',
  full = '🟩🟩🟩'
}

export enum StatusEnum {
  new = '☀️',
  started = '🛠️',
  // checked_in = '📩',
  checked_in = '🔳',
  completed = '✅',
  cancelled = '🚫',
}

export enum TagEnum {
  ideas = '💡',
  issues = '⚠️',
  maintenance = '🔨',
  finances = '💰',
  innovation = '🚀',
  bugs = '🐞',
  features = '🎁',
  security = '🔒',
  attention = '🚩',
  backend = '📡',
  database = '💾',
  desktop = '🖥️',
  mobile = '📱',
  intl = '🌍',
  design = '🎨',
  analytics = '📈',
  automation = '🤖'
}

export enum PaymentMethodEnum{
  K_PAY = "k-pay",
  AYA_PAY = "aya-pay",
  WAVE_PAY = "wave-pay"
}

export enum ProjectStatus{
    NOT_STARTED = "not_started",
    INITIATED = "initiated",
    ACTIVE = "active", 
    COMPLETED = "completed", 
    ON_HOLD = "on_hold",  
    CANCELLED = "cancelled"
}

export type Token = {
  rooms: string;
  token: string;
};

export type PaginatedResponse <T> ={
  items: T[];
  total: number;
  offset:number;
  limit: number;
}

export type Sprintlog = {
  id: string;
  title: string;
  description: string | null;
  slug: string;
  progress: ProgressEnum;
  sprint_number: number;
  priority: PriorityEnum;
  status: StatusEnum;
  type: string;
  category: TagEnum;
  labels?: string[];
  est_days: number;
  beg_date: Date;
  end_date: Date;
  due_date: Date;
  created_at: Date;
  updated_at: Date;
  // Relationships
  assignee?: User;
  owner?: User;
  assignee_id?: string;
  assignee_name?: string;
  owner_id?: string;
  owner_name?: string;
  project_slug: string;
};
export type SprintlogCreate = {
  title: string;
  description: string | null;
  progress: ProgressEnum;
  sprint_number: number;
  priority: PriorityEnum;
  status: StatusEnum;
  type: string;
  labels?: string[];
  category: TagEnum;
  est_days: number;
  beg_date?: string;
  end_date?: string;
  due_date?: string;
  // Relationships
  assignee_id?: string;
  owner_id?: string;
  project_slug: string;
};

export type SprintlogPagination = {
  total: number;
  limit: number;
  offset: number;
  items: Sprintlog[];
};


export type ActiveProjectPagination = {
  total: number;
  limit: number;
  offset: number;
  items: ActiveProject[];
};

export type sprintlogPagination = {
  total: number;
  limit: number;
  offset: number;
  items: Sprintlog[];
};
export type Project = {
  id: string;
  slug: string;
  name: string;
  description: string;
  pin: boolean;
  labels?: string[];
  documents?: string[];
  startDate: string;
  endDate: string;
  sprintWeeks: number | null;
  sprintAmount: number | null;
  sprintCheckupDay: number | null;
  repoUrls: string[];
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
  status: ProjectStatus;
  pluginMeta?: Record<string, any>;
  teams?: ProjectTeam[];
};

export type ProjectTeam = {
  id: string;
  name?: string;
  description?: string;
}

export type ProjectCreate = {
  slug: string;
  name: string;
  description: string;
  pin: boolean;
  labels?: string[];
  documents?: string[];
  startDate: string;
  endDate: string;
  sprintWeeks: number | null;
  sprintAmount: number | null;
  sprintCheckupDay: number | null;
  repoUrls: string[];
  ownerId?: string | null;
  status?: ProjectStatus;
  teams?: ProjectTeam[];
  teamIds?: string[];
};

 

export type ActiveProject ={
  project_slug:string;
  task_assigned:number;
  completed_task:number;
  remaining_task:number;
  task_due:number;
}

export interface OAuth2Login {
  access_token: string;
  token_type: string;
  refresh_token?: null | string;
  expires_in?: null | number;
}

export interface UserTeam {
  teamId: string;
  teamName: string;
  role?: 'ADMIN' | 'MEMBER';
}

export interface User {
  id: string;
  email: string;
  name?: null | string;
  isSuperuser: boolean;
  isActive: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  teams?: UserTeam[];
  address?: string;
  position?:string;
  avatarUrl?:string;
  bankAccounts?:BankAccount[];
}

export interface UserRegister {
  email: string;
  password: string;
  name?: null | string;
}

export interface UserCreate {
  email: string;
  password: string;
  name?: null | string;
  isSuperuser?: null | boolean;
  isActive?: null | boolean;
  isVerified?: null | boolean;
  address?: string;
  position?:string;
  bankAccounts?:BankAccount[];
}

export interface BankAccount {
  method: string;
  accountNumber: string;
}

export interface UserUpdate {
  id: string;
  email?: null | string;
  name?: null | string;
  password?: null | string;
  isSuperuser?: null | boolean;
  isActive?: null | boolean;
  isVerified?: null | boolean;
  address?: string;
  position?:string;
  bankAccounts?:BankAccount[];
}

export interface TeamCreate {
  name: string;
  description?: null | string;
  tags?: string[];
}

export interface TeamMemberRead {
  id: string;
  name?: string;
  email?: string;
  role: 'ADMIN' | 'MEMBER';
  isOwner?: boolean;
  userId: string;
  avatarUrl?: string | null;
}
 
export interface TeamMember {
  name?: string;
  email?: string;
  role: 'ADMIN' | 'MEMBER';
  isOwner?: boolean;
  userId: string;
  avatarUrl?:string | null;
}

export interface TeamProject {
  id: string;
  slug: string;
  name: string;
  description: string;
  pin: boolean;
  labels?: string[];
  documents?: string[];
  startDate: string;
  endDate: string;
  sprintWeeks: number | null;
  sprintAmount: number | null;
  sprintCheckupDay: number | null;
  repoUrls: string[];
  ownerId: string | null;
  createdAt: Date;
  updatedAt: Date;
  status: ProjectStatus;
  pluginMeta?: Record<string, any>;
}

export interface Team {
  id: string;
  slug: string;
  name: string;
  description?: null | string;
  members: TeamMemberRead[];
  createdAt:string;
  updatedAt: string;
  projects?: TeamProject[] | [];
}

export interface UserId{
  userId: string;
}

export interface TeamUpdate {
  name?: null | string;
  description?: null | string;
}

export interface NewUsersByWeek {
  week: string;
  newUsers: number;
}

export interface SystemHealth {
  app?: string;
  version?: string;
  databaseStatus: 'online' | 'offline';
  cacheStatus: 'online' | 'offline';
  workerStatus: 'online' | 'offline';
}
export interface ProjectItems {
  text: string;
  href?: string;
}

export interface TeamStatistics{
  taskCount: number;
  memberCount: number;
  inProgressTaskCount: number;
  idleTaskCount: number;
  completedTaskCount: number;
}


export interface UserProfileUpdate{
  userId: string;
  file: File;
}