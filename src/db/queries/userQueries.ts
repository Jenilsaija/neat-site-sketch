
import { executeQuery } from '../connection';
import { User } from '../models/types';

// User queries
export const getUserById = async (id: number): Promise<User | null> => {
  const result = await executeQuery<User[]>(
    'SELECT id, name, email, avatar, role FROM users WHERE id = ?',
    [id]
  );
  return result.length > 0 ? result[0] : null;
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const result = await executeQuery<User[]>(
    'SELECT id, name, email, avatar, role, password FROM users WHERE email = ?',
    [email]
  );
  return result.length > 0 ? result[0] : null;
};

export const createUser = async (user: Omit<User, 'id'>): Promise<number> => {
  const result = await executeQuery<any>(
    'INSERT INTO users (name, email, avatar, password, role) VALUES (?, ?, ?, ?, ?)',
    [user.name, user.email, user.avatar || null, user.password, user.role || 'user']
  );
  return result.insertId;
};

export const updateUser = async (id: number, user: Partial<User>): Promise<boolean> => {
  const fields = Object.keys(user).map(key => `${key} = ?`).join(', ');
  const values = [...Object.values(user), id];
  
  const result = await executeQuery<any>(
    `UPDATE users SET ${fields} WHERE id = ?`,
    values
  );
  return result.affectedRows > 0;
};

export const deleteUser = async (id: number): Promise<boolean> => {
  const result = await executeQuery<any>(
    'DELETE FROM users WHERE id = ?',
    [id]
  );
  return result.affectedRows > 0;
};

export const getAllUsers = async (): Promise<User[]> => {
  return await executeQuery<User[]>(
    'SELECT id, name, email, avatar, role FROM users ORDER BY name'
  );
};
