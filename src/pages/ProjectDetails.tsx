
import React from 'react';
import Header from '@/components/Header';
import KanbanBoard from '@/components/KanbanBoard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Users, Calendar } from 'lucide-react';
import { KanbanColumn } from '@/components/KanbanBoard';
import { tasks } from '@/data/mockData';

interface ProjectDetailsProps {
  user: {
    name: string;
    avatar: string;
  };
  project: {
    id: string;
    name: string;
    // Removing the tasks requirement from here since our Project type doesn't have it
    // We're already using the tasks from the imported mockData
  };
}

const ProjectDetails = ({ user, project }: ProjectDetailsProps) => {
  // Group tasks by status
  const columns: KanbanColumn[] = [
    {
      id: 'todo',
      title: 'ToDo',
      tasks: tasks.filter((task) => task.status === 'todo'),
    },
    {
      id: 'in-progress',
      title: 'In progress',
      tasks: tasks.filter((task) => task.status === 'in-progress'),
      color: '#0061FF'
    },
    {
      id: 'in-review',
      title: 'In review',
      tasks: tasks.filter((task) => task.status === 'in-review'),
    },
    {
      id: 'done',
      title: 'Done',
      tasks: tasks.filter((task) => task.status === 'done'),
    }
  ];

  return (
    <div className="flex-1 p-6">
      <Header 
        title="Supermassive black hole" 
        user={user} 
        notificationCount={3} 
      />
      
      <div className="mt-6 flex items-center gap-4">
        <button className="text-gray-400 hover:text-yellow-500">
          <Star />
        </button>
        
        <div className="flex items-center">
          <Users size={16} className="text-gray-500 mr-1" />
          <span className="text-sm text-gray-600">6 people</span>
        </div>
        
        <div className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">
          2 days left
        </div>
      </div>
      
      <div className="mt-6">
        <h2 className="font-semibold text-lg mb-1">December, 2018</h2>
        
        <div className="mt-6">
          <Tabs defaultValue="tasks">
            <TabsList>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="people">People</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tasks" className="mt-6">
              <KanbanBoard columns={columns} />
            </TabsContent>
            
            <TabsContent value="people">
              <div className="text-center py-12 text-gray-500">
                <p>Team members will be displayed here</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
