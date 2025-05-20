
import { executeQuery } from '../connection';
import { Project } from '../models/types';

// Project queries
export const getProjectById = async (id: number): Promise<Project | null> => {
  const result = await executeQuery<Project[]>(
    'SELECT * FROM projects WHERE id = ?',
    [id]
  );
  return result.length > 0 ? result[0] : null;
};

export const getProjectsByUserId = async (userId: number): Promise<Project[]> => {
  return await executeQuery<Project[]>(
    `SELECT p.* FROM projects p 
     JOIN team_members tm ON p.id = tm.project_id 
     WHERE tm.user_id = ? OR p.owner_id = ?
     ORDER BY p.created_at DESC`,
    [userId, userId]
  );
};

export const createProject = async (project: Omit<Project, 'id'>): Promise<number> => {
  const result = await executeQuery<any>(
    `INSERT INTO projects (title, description, status, progress, start_date, end_date, owner_id) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      project.title, 
      project.description, 
      project.status, 
      project.progress, 
      project.start_date, 
      project.end_date, 
      project.owner_id
    ]
  );
  return result.insertId;
};

export const updateProject = async (id: number, project: Partial<Project>): Promise<boolean> => {
  const fields = Object.keys(project).map(key => `${key} = ?`).join(', ');
  const values = [...Object.values(project), id];
  
  const result = await executeQuery<any>(
    `UPDATE projects SET ${fields} WHERE id = ?`,
    values
  );
  return result.affectedRows > 0;
};

export const deleteProject = async (id: number): Promise<boolean> => {
  const result = await executeQuery<any>(
    'DELETE FROM projects WHERE id = ?',
    [id]
  );
  return result.affectedRows > 0;
};

export const getAllProjects = async (): Promise<Project[]> => {
  return await executeQuery<Project[]>(
    'SELECT * FROM projects ORDER BY created_at DESC'
  );
};
