
import fs from 'fs';
import path from 'path';
import { getPool } from './connection';

const executeScript = async (scriptPath: string): Promise<void> => {
  try {
    // Read SQL file
    const script = fs.readFileSync(scriptPath, 'utf8');
    
    // Split into separate statements
    const statements = script
      .split(';')
      .filter(statement => statement.trim() !== '');
    
    const connection = await getPool().getConnection();
    
    try {
      // Execute each statement
      for (const statement of statements) {
        await connection.query(statement);
      }
      console.log(`Successfully executed SQL script: ${path.basename(scriptPath)}`);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error(`Error executing SQL script ${scriptPath}:`, error);
    throw error;
  }
};

export const initializeDatabase = async (): Promise<void> => {
  try {
    console.log('Initializing database...');
    
    // Execute schema setup
    await executeScript(path.join(__dirname, 'schema', 'setup.sql'));
    
    // Execute seed data script
    await executeScript(path.join(__dirname, 'schema', 'seed.sql'));
    
    console.log('Database initialization completed successfully.');
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
};
