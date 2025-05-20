
-- Sample data for development and testing

-- Insert users
INSERT INTO users (name, email, password, avatar, role) VALUES
('Jane Cooper', 'jane@example.com', 'hashed_password123', 'https://i.pravatar.cc/150?img=5', 'admin'),
('Alex Rivera', 'alex@example.com', 'hashed_password123', 'https://i.pravatar.cc/150?img=8', 'user'),
('Sarah Palmer', 'sarah@example.com', 'hashed_password123', 'https://i.pravatar.cc/150?img=2', 'user'),
('Mike Johnson', 'mike@example.com', 'hashed_password123', 'https://i.pravatar.cc/150?img=3', 'user'),
('Lisa Rogers', 'lisa@example.com', 'hashed_password123', 'https://i.pravatar.cc/150?img=4', 'user');

-- Insert projects
INSERT INTO projects (title, description, status, progress, start_date, end_date, owner_id) VALUES
('Website Redesign', 'Comprehensive redesign of the company website to improve user experience', 'In Progress', 45.5, '2025-01-15', '2025-08-30', 1),
('Mobile App Development', 'Develop a cross-platform mobile app for our services', 'Planning', 10.0, '2025-05-01', '2025-12-15', 1),
('Marketing Campaign', 'Q3 Marketing campaign for new product launch', 'Completed', 100.0, '2025-03-01', '2025-05-15', 2),
('Database Migration', 'Migrate from legacy database to new cloud solution', 'In Progress', 65.0, '2025-04-10', '2025-07-25', 3),
('Product Launch', 'Coordinate launch of the new product lineup', 'On Hold', 35.0, '2025-06-01', '2025-09-30', 1);

-- Insert team members
INSERT INTO team_members (user_id, project_id, role) VALUES
(1, 1, 'owner'),
(2, 1, 'member'),
(3, 1, 'member'),
(2, 2, 'member'),
(3, 2, 'member'),
(4, 2, 'member'),
(2, 3, 'owner'),
(5, 3, 'member'),
(3, 4, 'owner'),
(1, 4, 'member'),
(4, 4, 'member'),
(1, 5, 'owner'),
(2, 5, 'member'),
(3, 5, 'member'),
(4, 5, 'member'),
(5, 5, 'member');

-- Insert tasks
INSERT INTO tasks (title, description, status, priority, project_id, assignee_id, due_date) VALUES
('Create new dashboard wireframes', 'Design new wireframes for the project dashboard based on the approved mockups', 'In Progress', 'high', 1, 1, '2025-06-10'),
('User Research', 'Conduct user interviews and create personas', 'Completed', 'medium', 1, 2, '2025-05-05'),
('Competitor Analysis', 'Research and document competitor websites', 'Completed', 'low', 1, 3, '2025-04-20'),
('Frontend Development', 'Implement the new design in React', 'Todo', 'high', 1, 1, '2025-07-15'),
('Backend API', 'Create RESTful API for the new features', 'Todo', 'high', 1, 3, '2025-07-20'),
('QA Testing', 'Test all new features and fix bugs', 'Todo', 'medium', 1, 2, '2025-08-05'),
('App Architecture Design', 'Design the overall architecture for the mobile app', 'In Progress', 'high', 2, 4, '2025-06-01'),
('UI/UX Design', 'Create mockups for the mobile interface', 'Todo', 'medium', 2, 1, '2025-06-30'),
('Campaign Strategy', 'Define strategy for Q3 marketing', 'Completed', 'high', 3, 2, '2025-03-15'),
('Content Creation', 'Create blog posts and social media content', 'Completed', 'medium', 3, 5, '2025-04-10'),
('Data Mapping', 'Create mapping between old and new database schemas', 'In Progress', 'high', 4, 3, '2025-05-30'),
('Data Migration Scripts', 'Write scripts for automated data migration', 'Todo', 'high', 4, 1, '2025-06-20'),
('Product Specifications', 'Finalize specifications for the new product line', 'In Progress', 'medium', 5, 1, '2025-06-25'),
('Pricing Strategy', 'Develop pricing strategy for the new products', 'On Hold', 'high', 5, 2, '2025-07-10');

-- Insert subtasks
INSERT INTO subtasks (title, completed, task_id) VALUES
('Research competitor dashboards', TRUE, 1),
('Create low-fidelity wireframes', TRUE, 1),
('Design high-fidelity mockups', FALSE, 1),
('Get approval from stakeholders', FALSE, 1),
('Finalize design specs for developers', FALSE, 1),
('Schedule user interviews', TRUE, 2),
('Conduct 5 user interviews', TRUE, 2),
('Analyze interview results', TRUE, 2),
('Create user personas', TRUE, 2),
('Identify top 5 competitors', TRUE, 3),
('Document features and pricing', TRUE, 3),
('Write SWOT analysis', TRUE, 3),
('Set up project repository', FALSE, 4),
('Create component library', FALSE, 4),
('Setup API integration', FALSE, 4);

-- Insert comments
INSERT INTO comments (content, task_id, user_id, created_at) VALUES
('I\'ve started on the research. Looking at dashboards from XYZ and ABC companies.', 1, 1, '2025-05-15 09:30:00'),
('Make sure to include mobile views in the wireframes.', 1, 2, '2025-05-15 10:15:00'),
('I\'ve attached the initial sketches. Let me know what you think.', 1, 1, '2025-05-16 14:20:00'),
('These look great! Can we discuss the navigation approach?', 1, 3, '2025-05-16 15:45:00'),
('I\'ll schedule a meeting for tomorrow to discuss.', 1, 1, '2025-05-16 16:30:00'),
('User interviews are complete. We had some interesting findings.', 2, 2, '2025-05-01 11:20:00'),
('Can you share the interview recordings?', 2, 1, '2025-05-01 13:05:00'),
('I\'ve uploaded them to the shared drive.', 2, 2, '2025-05-01 14:10:00');

-- Insert calendar events
INSERT INTO calendar_events (title, description, start_datetime, end_datetime, user_id, task_id) VALUES
('Design Team Meeting', 'Weekly design team sync', '2025-05-21 10:00:00', '2025-05-21 11:00:00', 1, NULL),
('Website Redesign Presentation', 'Present wireframes to stakeholders', '2025-05-23 14:00:00', '2025-05-23 15:30:00', 1, 1),
('User Research Review', 'Review findings from user interviews', '2025-05-22 13:00:00', '2025-05-22 14:00:00', 2, 2),
('App Architecture Planning', 'Initial planning meeting for mobile app', '2025-05-22 15:00:00', '2025-05-22 17:00:00', 4, 7),
('Marketing Strategy Session', 'Plan Q3 marketing activities', '2025-05-24 09:00:00', '2025-05-24 12:00:00', 2, 9),
('Data Migration Planning', 'Discuss migration approach and timeline', '2025-05-25 10:00:00', '2025-05-25 11:30:00', 3, 11);
