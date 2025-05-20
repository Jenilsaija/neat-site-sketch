
import { executeQuery } from '../connection';
import { CalendarEvent } from '../models/types';

// Calendar event queries
export const getEventById = async (id: number): Promise<CalendarEvent | null> => {
  const result = await executeQuery<CalendarEvent[]>(
    'SELECT * FROM calendar_events WHERE id = ?',
    [id]
  );
  return result.length > 0 ? result[0] : null;
};

export const getEventsByUserId = async (userId: number): Promise<CalendarEvent[]> => {
  return await executeQuery<CalendarEvent[]>(
    'SELECT * FROM calendar_events WHERE user_id = ? ORDER BY start_datetime ASC',
    [userId]
  );
};

export const getEventsByDateRange = async (
  userId: number,
  startDate: Date,
  endDate: Date
): Promise<CalendarEvent[]> => {
  return await executeQuery<CalendarEvent[]>(
    `SELECT * FROM calendar_events 
     WHERE user_id = ? AND 
     ((start_datetime BETWEEN ? AND ?) OR 
      (end_datetime BETWEEN ? AND ?) OR
      (start_datetime <= ? AND end_datetime >= ?))
     ORDER BY start_datetime ASC`,
    [userId, startDate, endDate, startDate, endDate, startDate, endDate]
  );
};

export const createEvent = async (event: Omit<CalendarEvent, 'id'>): Promise<number> => {
  const result = await executeQuery<any>(
    `INSERT INTO calendar_events 
     (title, description, start_datetime, end_datetime, user_id, task_id) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      event.title,
      event.description || null,
      event.start_datetime,
      event.end_datetime,
      event.user_id,
      event.task_id || null
    ]
  );
  return result.insertId;
};

export const updateEvent = async (id: number, event: Partial<CalendarEvent>): Promise<boolean> => {
  const fields = Object.keys(event).map(key => `${key} = ?`).join(', ');
  const values = [...Object.values(event), id];
  
  const result = await executeQuery<any>(
    `UPDATE calendar_events SET ${fields} WHERE id = ?`,
    values
  );
  return result.affectedRows > 0;
};

export const deleteEvent = async (id: number): Promise<boolean> => {
  const result = await executeQuery<any>(
    'DELETE FROM calendar_events WHERE id = ?',
    [id]
  );
  return result.affectedRows > 0;
};
