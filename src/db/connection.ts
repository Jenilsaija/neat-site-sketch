
import mysql from 'mysql2/promise';
import { dbConfig } from './config';

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Test the database connection
export const testConnection = async (): Promise<boolean> => {
  try {
    const connection = await pool.getConnection();
    connection.release();
    console.log('Database connection established successfully.');
    return true;
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    return false;
  }
};

// Export the connection pool for use in queries
export const getPool = () => pool;

// Helper function to execute queries
export const executeQuery = async <T>(
  query: string, 
  params?: any[]
): Promise<T> => {
  try {
    const [results] = await pool.execute(query, params);
    return results as T;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
};
