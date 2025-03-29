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

export type Token = {
  rooms: string;
  token: string;
};

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
  project_name:string;
  description: string;
  pin: boolean;
  labels?: string[];
  documents?: string[];
  start_date: Date;
  end_date: Date;
  sprint_weeks: number | null;
  sprint_amount: number | null;
  sprint_checkup_day: number | null;
  repo_urls: string[];
  plugin_meta: Record<string, any>;
  owner_id: string | null;
  created_at: Date;
  updated_at: Date;
};
export type ProjectCreate = {
  slug: string;
  name: string;
  description: string;
  pin: boolean;
  labels?: string[];
  documents?: string[];
  start_date: string;
  end_date: string;
  sprint_weeks: number | null;
  sprint_amount: number | null;
  sprint_checkup_day: number | null;
  repo_urls: string[];
  owner_id?: string | null;
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
  isOwner?: boolean;
  role?: 'ADMIN' | 'MEMBER';
}

export interface User {
  id: string;
  email: string;
  name?: null | string;
  isSuperuser: boolean;
  isActive: boolean;
  isVerified: boolean;
  created_at: string;
  updated_at: string;
  teams?: UserTeam[];
  address?: string;
  position?:string;
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
}

export interface TeamMember {
  id: string;
  userId: string;
  userEmail: string;
  userName?: null | string;
  role?: 'ADMIN' | 'MEMBER';
  isOwner?: boolean;
}

export interface Team {
  id: string;
  slug: string;
  name: string;
  description?: null | string;
  members?: TeamMember[];
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