
// Database configuration settings
export const dbConfig = {
  host: process.env.VITE_MYSQL_HOST || 'localhost',
  user: process.env.VITE_MYSQL_USER || 'root',
  password: process.env.VITE_MYSQL_PASSWORD || '',
  database: process.env.VITE_MYSQL_DATABASE || 'taskflow',
  port: parseInt(process.env.VITE_MYSQL_PORT || '3306'),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};
