export type ClickUpError = {
  err: string;
}

export type ClickUpResponse<T> = T | ClickUpError;

export type AsyncClickUpResponse<T> = Promise<ClickUpResponse<T>>;

export type User = {
  id: number;
  username: string;
  color: string;
  profilePicture: string;
}

export type Member = {
  user: User;
}

export type Team = {
  id: string;
  name: string;
  color: string;
  avatar: string;
  members: Member[];
}

export type Status = {
  status: string;
  type: string;
  orderindex: number;
  color: string;
}

export type DueDates = {
  enabled: boolean;
  start_date: boolean;
  remap_due_dates: boolean;
  remap_closed_due_date: boolean;
}

export type TimeTracking = {
  enabled: boolean;
}

export type Tags = {
  enabled: boolean;
}

export type TimeEstimates = {
  enabled: boolean;
}

export type Checklists = {
  enabled: boolean;
}

export type CustomFields = {
  enabled: boolean;
}

export type RemapDependencies = {
  enabled: boolean;
}

export type DependencyWarning = {
  enabled: boolean;
}

export type Portfolios = {
  enabled: boolean;
}

export type Features = {
  due_dates: DueDates;
  time_tracking: TimeTracking;
  tags: Tags;
  time_estimates: TimeEstimates;
  checklists: Checklists;
  custom_fields: CustomFields;
  remap_dependencies: RemapDependencies;
  dependency_warning: DependencyWarning;
  portfolios: Portfolios;
}

export type Space = {
  id: string;
  name: string;
  private: boolean;
  statuses: Status[];
  multiple_assignees: boolean;
  features: Features;
}

export type ListStatus = {
  status: string;
  color: string;
  hide_label: boolean;
}

export type Priority = {
  priority: string;
  color: string;
}

export type ListFolder = {
  id: string;
  name: string;
  hidden: boolean;
  access: boolean;
}

export type ListSpace = {
  id: string;
  name: string;
  access: boolean;
}

export type List = {
  id: string;
  name: string;
  orderindex: number;
  content: string;
  status: ListStatus;
  priority: Priority;
  assignee?: any;
  task_count?: any;
  due_date: string;
  start_date?: any;
  folder: ListFolder;
  space: ListSpace;
  archived: boolean;
  override_statuses: boolean;
  permission_level: string;
}

export type FolderSpace = {
  id: string;
  name: string;
  access: boolean;
}

export type Folder = {
  id: string;
  name: string;
  orderindex: number;
  override_statuses: boolean;
  hidden: boolean;
  space: FolderSpace;
  task_count: string;
  lists: any[];
}

export type Task = {
  id: string;
  custom_id: string;
  name: string;
  status: Status;
  custom_type?: any;
}

export type TimeEntryUser = {
  id: number;
  username: string;
  email: string;
  color: string;
  initials: string;
  profilePicture: string;
}

export type TaskLocation = {
  list_id: string;
  folder_id: string;
  space_id: string;
  list_name: string;
  folder_name: string;
  space_name: string;
}

export type TaskTag = {
  name: string;
  tag_fg: string;
  tag_bg: string;
  creator: number;
}

export type TimeEntry = {
  id: string;
  task: Task;
  wid: string;
  user: TimeEntryUser;
  billable: boolean;
  start: string;
  end: string;
  duration: string;
  description: string;
  tags: any[];
  source: string;
  at: string;
  task_location: TaskLocation;
  task_tags: TaskTag[];
  task_url: string;
}
