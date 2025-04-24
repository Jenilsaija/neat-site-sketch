
import { TaskCardProps } from "@/components/TaskCard";
import { ProjectCardProps } from "@/components/ProjectCard";
import { TeamMemberProps } from "@/components/TeamMember";

export interface Project extends ProjectCardProps {
  status: 'current' | 'pending' | 'completed' | 'failed';
}

export interface TeamMember extends TeamMemberProps {
  type: 'in-house' | 'remote';
}

export interface Activity {
  user: {
    name: string;
    avatar: string;
  };
  action: string;
  time: string;
}

// Mock team members
export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Pieter Novitsky',
    username: 'pieter',
    avatar: 'public/lovable-uploads/fcb3c783-2e8d-4257-a9cd-6de6268ec215.png',
    role: 'Art director',
    completed: 24,
    opened: 6,
    overdue: 0,
    progress: 94,
    type: 'in-house'
  },
  {
    id: '2',
    name: 'Jennifer Atkinson',
    username: 'jennyatkinson',
    avatar: '',
    role: 'Project manager',
    completed: 38,
    opened: 14,
    overdue: 0,
    progress: 92,
    type: 'in-house'
  },
  {
    id: '3',
    name: 'Maria LaGuerta',
    username: 'maria',
    avatar: '',
    role: 'Interface designer',
    completed: 29,
    opened: 9,
    overdue: 3,
    progress: 85,
    type: 'in-house'
  },
  {
    id: '4',
    name: 'Nina Green',
    username: 'ninagreen',
    avatar: '',
    role: 'Graphic designer',
    completed: 44,
    opened: 23,
    overdue: 0,
    progress: 72,
    type: 'in-house'
  },
  {
    id: '5',
    name: 'Leslie Do',
    username: 'lesliedo',
    avatar: '',
    role: 'Design intern',
    completed: 27,
    opened: 4,
    overdue: 0,
    progress: 76,
    type: 'in-house'
  },
  {
    id: '6',
    name: 'Ivan Morehan',
    username: 'ivanmorehan',
    avatar: '',
    role: 'Illustrator',
    completed: 12,
    opened: 4,
    overdue: 1,
    progress: 66,
    type: 'remote'
  },
  {
    id: '7',
    name: 'Stepan Onischenko',
    username: 'stepan',
    avatar: '',
    role: 'Interface designer',
    completed: 23,
    opened: 18,
    overdue: 0,
    progress: 62,
    type: 'remote'
  },
  {
    id: '8',
    name: 'Slavko Ternovoy',
    username: 'slavkoternovoy',
    avatar: '',
    role: 'Interface designer',
    completed: 17,
    opened: 5,
    overdue: 1,
    progress: 60,
    type: 'remote'
  }
];

// Mock projects
export const projects: Project[] = [
  {
    id: '1',
    name: 'Sports Interactive',
    description: 'Web resource which contains all about transfers in the world of sports',
    icon: 'S',
    color: '#FFCC00',
    website: 'sportsinteractive.com',
    progress: 94,
    daysLeft: 2,
    team: [
      { id: '1', name: 'Pieter Novitsky', avatar: '' },
      { id: '3', name: 'Maria LaGuerta', avatar: '' }
    ],
    status: 'current'
  },
  {
    id: '2',
    name: 'Homechoice',
    description: 'Resource that allows you to buy a cheap accommodation in a sleep place',
    icon: 'H',
    color: '#333333',
    website: 'homechoice.com',
    progress: 64,
    daysLeft: 4,
    team: [
      { id: '2', name: 'Jennifer Atkinson', avatar: '' },
      { id: '5', name: 'Leslie Do', avatar: '' },
      { id: '8', name: 'Slavko Ternovoy', avatar: '' }
    ],
    status: 'current'
  },
  {
    id: '3',
    name: 'Big Money Real Estate',
    description: 'Agency that specializes in luxury real estate in Monte Carlo',
    icon: 'B',
    color: '#FF3B30',
    website: 'bigmoneyrealestate.com',
    progress: 59,
    daysLeft: 4,
    team: [
      { id: '1', name: 'Pieter Novitsky', avatar: '' },
      { id: '6', name: 'Ivan Morehan', avatar: '' },
      { id: '3', name: 'Maria LaGuerta', avatar: '' }
    ],
    status: 'current'
  },
  {
    id: '4',
    name: 'Springfield media',
    description: 'Multimedia content studio. Simply unique',
    icon: 'S',
    color: '#7E69AB',
    website: 'springfieldmedia.com',
    progress: 48,
    daysLeft: 7,
    team: [
      { id: '2', name: 'Jennifer Atkinson', avatar: '' },
      { id: '4', name: 'Nina Green', avatar: '' }
    ],
    status: 'current'
  },
  {
    id: '5',
    name: 'Regular logistics',
    description: 'Logistic company that specializes in regular shipments within Europe',
    icon: 'R',
    color: '#FF3B30',
    website: 'regularlogistics.com',
    progress: 44,
    daysLeft: 9,
    team: [
      { id: '3', name: 'Maria LaGuerta', avatar: '' },
      { id: '7', name: 'Stepan Onischenko', avatar: '' },
      { id: '8', name: 'Slavko Ternovoy', avatar: '' }
    ],
    status: 'current'
  },
  {
    id: '6',
    name: 'Foursquares agency',
    description: 'Creative agency that deals with advertising and marketing',
    icon: 'F',
    color: '#FFCC00',
    website: 'foursquaresagency.com',
    progress: 39,
    daysLeft: 11,
    team: [
      { id: '1', name: 'Pieter Novitsky', avatar: '' },
      { id: '5', name: 'Leslie Do', avatar: '' },
      { id: '6', name: 'Ivan Morehan', avatar: '' },
      { id: '8', name: 'Slavko Ternovoy', avatar: '' }
    ],
    status: 'current'
  },
  {
    id: '7',
    name: 'Piece studio',
    description: 'Studio that specializes in interactive events',
    icon: 'P',
    color: '#0061FF',
    website: 'piecestudio.com',
    progress: 24,
    daysLeft: 12,
    team: [
      { id: '4', name: 'Nina Green', avatar: '' },
      { id: '7', name: 'Stepan Onischenko', avatar: '' }
    ],
    status: 'pending'
  },
  {
    id: '8',
    name: 'Legacy foundation',
    description: 'Foundation that helps people to be more confident and achieve their goals',
    icon: 'L',
    color: '#34C759',
    website: 'legacyfoundation.com',
    progress: 32,
    daysLeft: 12,
    team: [
      { id: '2', name: 'Jennifer Atkinson', avatar: '' },
      { id: '3', name: 'Maria LaGuerta', avatar: '' },
      { id: '5', name: 'Leslie Do', avatar: '' }
    ],
    status: 'completed'
  }
];

// Mock tasks
export const tasks: TaskCardProps[] = [
  {
    title: 'Research',
    status: 'todo',
    color: 'blue'
  },
  {
    title: 'Graphical direction',
    description: 'Search references for multicolored background',
    status: 'in-progress',
    progress: 100,
    color: 'red'
  },
  {
    title: 'Typefaces research',
    status: 'todo',
    progress: 30,
    color: 'yellow'
  },
  {
    title: 'Color palette',
    status: 'in-progress',
    progress: 60,
    color: 'yellow'
  },
  {
    title: 'Grid settings',
    status: 'in-progress',
    progress: 100,
    color: 'yellow'
  },
  {
    title: 'Illustrations style',
    status: 'in-progress',
    progress: 100,
    color: 'purple'
  },
  {
    title: 'SBH research',
    status: 'in-progress',
    progress: 100,
    color: 'blue'
  },
  {
    title: 'UI kit developing',
    status: 'in-progress',
    progress: 80,
    color: 'purple'
  },
  {
    title: 'Interview with users',
    status: 'in-progress',
    progress: 15,
    color: 'green'
  },
  {
    title: 'Prepare detailed brief',
    status: 'done',
    progress: 0,
    color: 'red'
  },
  {
    title: 'Prototype',
    status: 'done',
    progress: 0,
    color: 'blue'
  },
  {
    title: 'UI direction search',
    status: 'done',
    progress: 0,
    color: 'purple'
  },
  {
    title: 'Prototype presentation',
    status: 'done',
    progress: 0,
    color: 'green'
  }
];

// Mock dashboard data
export const dashboardData = {
  stats: {
    totalProjects: 27,
    completedProjects: 12,
    inProgressProjects: 13,
    delayedProjects: 2
  },
  taskCompletionData: [
    { name: 'Jun', value: 10 },
    { name: 'Jul', value: 20 },
    { name: 'Aug', value: 15 },
    { name: 'Sep', value: 25 },
    { name: 'Oct', value: 22 },
    { name: 'Nov', value: 30 },
  ],
  activities: [
    {
      user: { name: 'Pieter Novitsky', avatar: '' },
      action: 'completed task UI kit Development',
      time: '10:30'
    },
    {
      user: { name: 'Maria LaGuerta', avatar: '' },
      action: 'commented on task Prepare moodboard for website branding',
      time: '10:30'
    },
    {
      user: { name: 'Maria McTaylor', avatar: '' },
      action: 'is overdue task Prepare moodboard for website branding',
      time: '10:29'
    },
    {
      user: { name: 'Sarah Wilson', avatar: '' },
      action: 'attached a file to task Search references for multicolored background',
      time: '10:27'
    },
    {
      user: { name: 'Slavko Ternovoy', avatar: '' },
      action: 'completed task Prepare detailed brief for devs & designers',
      time: '10:30'
    }
  ]
};

// Default user
export const currentUser = {
  name: 'Pieter Novitsky',
  avatar: 'public/lovable-uploads/fcb3c783-2e8d-4257-a9cd-6de6268ec215.png'
};
