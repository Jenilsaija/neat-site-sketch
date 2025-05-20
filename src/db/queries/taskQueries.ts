
import { executeQuery } from '../connection';
import { Task, SubTask } from '../models/types';

// Task queries
export const getTaskById = async (id: number): Promise<Task | null> => {
  const result = await executeQuery<Task[]>(
    'SELECT * FROM tasks WHERE id = ?',
    [id]
  );
  return result.length > 0 ? result[0] : null;
};

export const getTasksByProjectId = async (projectId: number): Promise<Task[]> => {
  return await executeQuery<Task[]>(
    'SELECT * FROM tasks WHERE project_id = ? ORDER BY due_date ASC',
    [projectId]
  );
};

export const getTasksByUserId = async (userId: number): Promise<Task[]> => {
  return await executeQuery<Task[]>(
    'SELECT * FROM tasks WHERE assignee_id = ? ORDER BY due_date ASC',
    [userId]
  );
};

export const createTask = async (task: Omit<Task, 'id'>): Promise<number> => {
  const result = await executeQuery<any>(
    `INSERT INTO tasks (title, description, status, priority, project_id, assignee_id, due_date) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      task.title,
      task.description || null,
      task.status,
      task.priority,
      task.project_id,
      task.assignee_id || null,
      task.due_date || null
    ]
  );
  return result.insertId;
};

export const updateTask = async (id: number, task: Partial<Task>): Promise<boolean> => {
  const fields = Object.keys(task).map(key => `${key} = ?`).join(', ');
  const values = [...Object.values(task), id];
  
  const result = await executeQuery<any>(
    `UPDATE tasks SET ${fields} WHERE id = ?`,
    values
  );
  return result.affectedRows > 0;
};

export const deleteTask = async (id: number): Promise<boolean> => {
  const result = await executeQuery<any>(
    'DELETE FROM tasks WHERE id = ?',
    [id]
  );
  return result.affectedRows > 0;
};

// Subtask queries
export const getSubtasksByTaskId = async (taskId: number): Promise<SubTask[]> => {
  return await executeQuery<SubTask[]>(
    'SELECT * FROM subtasks WHERE task_id = ? ORDER BY id ASC',
    [taskId]
  );
};

export const createSubtask = async (subtask: Omit<SubTask, 'id'>): Promise<number> => {
  const result = await executeQuery<any>(
    'INSERT INTO subtasks (title, completed, task_id) VALUES (?, ?, ?)',
    [subtask.title, subtask.completed ? 1 : 0, subtask.task_id]
  );
  return result.insertId;
};

export const updateSubtask = async (id: number, completed: boolean): Promise<boolean> => {
  const result = await executeQuery<any>(
    'UPDATE subtasks SET completed = ? WHERE id = ?',
    [completed ? 1 : 0, id]
  );
  return result.affectedRows > 0;
};

export const deleteSubtask = async (id: number): Promise<boolean> => {
  const result = await executeQuery<any>(
    'DELETE FROM subtasks WHERE id = ?',
    [id]
  );
  return result.affectedRows > 0;
};
