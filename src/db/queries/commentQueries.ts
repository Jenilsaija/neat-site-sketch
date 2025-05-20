
import { executeQuery } from '../connection';
import { Comment } from '../models/types';

// Comment queries
export const getCommentsByTaskId = async (taskId: number): Promise<Comment[]> => {
  return await executeQuery<Comment[]>(
    `SELECT c.*, u.name, u.avatar FROM comments c
     JOIN users u ON c.user_id = u.id
     WHERE c.task_id = ?
     ORDER BY c.created_at DESC`,
    [taskId]
  );
};

export const createComment = async (comment: Omit<Comment, 'id'>): Promise<number> => {
  const result = await executeQuery<any>(
    'INSERT INTO comments (content, task_id, user_id) VALUES (?, ?, ?)',
    [comment.content, comment.task_id, comment.user_id]
  );
  return result.insertId;
};

export const updateComment = async (id: number, content: string): Promise<boolean> => {
  const result = await executeQuery<any>(
    'UPDATE comments SET content = ? WHERE id = ?',
    [content, id]
  );
  return result.affectedRows > 0;
};

export const deleteComment = async (id: number): Promise<boolean> => {
  const result = await executeQuery<any>(
    'DELETE FROM comments WHERE id = ?',
    [id]
  );
  return result.affectedRows > 0;
};
