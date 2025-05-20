
# MySQL Database Setup for TaskFlow Application

## Prerequisites
- MySQL Server (v8.0 or higher recommended)
- Node.js (v14+ recommended)
- npm or yarn package manager

## Database Configuration

1. Create a new MySQL database:
```sql
CREATE DATABASE taskflow;
```

2. Create a dedicated user (optional but recommended):
```sql
CREATE USER 'taskflow_user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON taskflow.* TO 'taskflow_user'@'localhost';
FLUSH PRIVILEGES;
```

3. Set up environment variables in your .env file:
```
VITE_MYSQL_HOST=localhost
VITE_MYSQL_USER=taskflow_user
VITE_MYSQL_PASSWORD=your_secure_password
VITE_MYSQL_DATABASE=taskflow
VITE_MYSQL_PORT=3306
```

## Database Initialization

The database schema and sample data are defined in:
- `src/db/schema/setup.sql`: Creates all required tables
- `src/db/schema/seed.sql`: Populates tables with sample data

To initialize the database, you can either:

1. Use the provided utility:
```javascript
import { initializeDatabase } from './db/initDb';

// Call when your application starts
initializeDatabase()
  .then(() => console.log('Database initialized successfully'))
  .catch(err => console.error('Database initialization failed:', err));
```

2. Run the SQL scripts manually:
```bash
# From MySQL command line client
mysql -u your_username -p taskflow < src/db/schema/setup.sql
mysql -u your_username -p taskflow < src/db/schema/seed.sql
```

## Database Schema

The application uses the following tables:

1. **users**: Stores user information and authentication details
2. **projects**: Contains project metadata and ownership information
3. **tasks**: Stores tasks with their properties and relationships
4. **subtasks**: Contains small actionable items within tasks
5. **team_members**: Maps users to projects with role information
6. **comments**: Stores comments made on tasks
7. **calendar_events**: Contains calendar events with optional task linking

## Services and Queries

The database layer is organized into:

1. **connection.ts**: Manages the database connection pool
2. **queries/[entity]Queries.ts**: Contains CRUD operations for each entity
3. **services/[name]Service.ts**: Business logic that may use multiple query files

## Usage Example

```javascript
import { executeQuery } from './db/connection';
import { getUserById, createUser } from './db/queries/userQueries';
import { getProjectsByUserId } from './db/queries/projectQueries';

// Example of fetching a user
const user = await getUserById(1);

// Example of creating a user
const newUserId = await createUser({
  name: 'New User',
  email: 'newuser@example.com',
  password: 'hashedpassword',
  role: 'user'
});

// Example of fetching projects for a user
const userProjects = await getProjectsByUserId(1);

// Example of a custom query
const results = await executeQuery('SELECT * FROM tasks WHERE due_date < NOW()');
```

## Important Notes

1. Password hashing is currently mocked in `src/utils/passwordUtils.ts` - in a production environment, use a proper password hashing library like bcrypt.

2. Authentication token generation is also mocked - in a production environment, implement JWT token generation and validation.

3. Connection pooling is configured with default values - adjust the pool settings in `src/db/config.ts` based on your specific deployment needs.
