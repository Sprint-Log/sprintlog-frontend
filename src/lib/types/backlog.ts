export enum PriorityEnum {
  low = "🟢",
  med = "🟡",
  hi = "🔴"
}

export enum ProgressEnum {
  empty = "🟨🟨🟨",
  a_third = "🟩🟨🟨",
  two_third = "🟩🟩🟨",
  full = "🟩🟩🟩"
}

export enum StatusEnum {
  new = "🔅",
  started = "🚧",
  checked_in = "✔️",
  completed = "✅",
  cancelled = "🚫"
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
export type Backlog = {
  id: string
  status: StatusEnum
  priority: PriorityEnum
  category: TagEnum
  title: string
  assignee: string
  estimated_time: Date
  due_date: Date
  start_date: Date
  created: Date
  updated: Date
  sprint: number
  progress: ProgressEnum
  description: string
  project: Project

}

export type Project = {
  slug: string
  name: string
  description: string
  start_date: Date
  end_date: Date
}