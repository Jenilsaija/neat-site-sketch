
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'in-review' | 'done';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  dueDate?: string;
  createdAt?: string;
  commentCount?: number;
  attachmentCount?: number;
  progress?: number;
  assignees?: { id: string; name: string; avatar: string }[];
  color?: 'red' | 'green' | 'blue' | 'yellow' | 'purple';
  projectId?: string;
}
