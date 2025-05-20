
// Common types shared across models

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  password?: string;
  role?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  status: string;
  progress: number;
  start_date?: Date;
  end_date?: Date;
  owner_id: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: string;
  priority: 'high' | 'medium' | 'low';
  project_id: number;
  assignee_id?: number;
  due_date?: Date;
  created_at?: Date;
  updated_at?: Date;
}

export interface SubTask {
  id: number;
  title: string;
  completed: boolean;
  task_id: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface Comment {
  id: number;
  content: string;
  task_id: number;
  user_id: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface TeamMember {
  id: number;
  user_id: number;
  project_id: number;
  role: string;
  joined_at?: Date;
}

export interface CalendarEvent {
  id: number;
  title: string;
  description?: string;
  start_datetime: Date;
  end_datetime: Date;
  user_id: number;
  task_id?: number;
  created_at?: Date;
  updated_at?: Date;
}
