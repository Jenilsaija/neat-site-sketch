
import React from 'react';
import Header from '@/components/Header';
import ProjectCard from '@/components/ProjectCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Project } from '@/data/mockData';

interface ProjectsProps {
  user: {
    name: string;
    avatar: string;
  };
  projects: Project[];
}

const Projects = ({ user, projects }: ProjectsProps) => {
  return (
    <div className="flex-1 p-6">
      <Header 
        title="Projects" 
        user={user} 
        notificationCount={3} 
      />
      
      <div className="mt-6">
        <Tabs defaultValue="all">
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="all">ALL ({projects.length})</TabsTrigger>
              <TabsTrigger value="current">CURRENT ({projects.filter(p => p.status === 'current').length})</TabsTrigger>
              <TabsTrigger value="pending">PENDING ({projects.filter(p => p.status === 'pending').length})</TabsTrigger>
              <TabsTrigger value="completed">COMPLETED ({projects.filter(p => p.status === 'completed').length})</TabsTrigger>
              <TabsTrigger value="failed">FAILED</TabsTrigger>
            </TabsList>
            
            <div className="flex gap-3">
              <input 
                type="text" 
                placeholder="Search a project" 
                className="px-4 py-2 border border-border rounded-lg text-sm"
              />
            </div>
          </div>
          
          <TabsContent value="all">
            <div className="grid grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="current">
            <div className="grid grid-cols-3 gap-6">
              {projects
                .filter(p => p.status === 'current')
                .map((project) => (
                  <ProjectCard key={project.id} {...project} />
                ))
              }
            </div>
          </TabsContent>
          
          <TabsContent value="pending">
            <div className="grid grid-cols-3 gap-6">
              {projects
                .filter(p => p.status === 'pending')
                .map((project) => (
                  <ProjectCard key={project.id} {...project} />
                ))
              }
            </div>
          </TabsContent>
          
          <TabsContent value="completed">
            <div className="grid grid-cols-3 gap-6">
              {projects
                .filter(p => p.status === 'completed')
                .map((project) => (
                  <ProjectCard key={project.id} {...project} />
                ))
              }
            </div>
          </TabsContent>
          
          <TabsContent value="failed">
            <div className="grid grid-cols-3 gap-6">
              {projects
                .filter(p => p.status === 'failed')
                .map((project) => (
                  <ProjectCard key={project.id} {...project} />
                ))
              }
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="fixed bottom-6 right-6">
          <button className="w-12 h-12 bg-app-blue rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-600 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Projects;
