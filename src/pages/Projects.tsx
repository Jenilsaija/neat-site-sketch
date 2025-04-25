
import React, { useState } from 'react';
import Header from '@/components/Header';
import ProjectCard from '@/components/ProjectCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LayoutGrid, LayoutList } from "lucide-react";
import { Project } from '@/data/mockData';
import { 
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "@/components/ui/table";

interface ProjectsProps {
  user: {
    name: string;
    avatar: string;
  };
  projects: Project[];
}

const Projects = ({ user, projects }: ProjectsProps) => {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const ProjectsGridView = ({ projects }: { projects: Project[] }) => (
    <div className="grid grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  );

  const ProjectsTableView = ({ projects }: { projects: Project[] }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Project</TableHead>
          <TableHead>Progress</TableHead>
          <TableHead>Team</TableHead>
          <TableHead>Days Left</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((project) => (
          <TableRow key={project.id}>
            <TableCell className="font-medium">
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded flex items-center justify-center text-white"
                  style={{ backgroundColor: project.color || '#0061FF' }}
                >
                  {project.icon}
                </div>
                <div>
                  <div>{project.name}</div>
                  {project.website && (
                    <a 
                      href={project.website}
                      className="text-xs text-gray-500 hover:text-app-blue"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.website.replace(/(^\w+:|^)\/\//, '')}
                    </a>
                  )}
                </div>
              </div>
            </TableCell>
            <TableCell>{project.progress}%</TableCell>
            <TableCell>
              <div className="flex -space-x-2">
                {project.team.slice(0, 3).map((member) => (
                  <img 
                    key={member.id}
                    src={member.avatar}
                    alt={member.name}
                    className="w-8 h-8 rounded-full border-2 border-white"
                    title={member.name}
                  />
                ))}
                {project.team.length > 3 && (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium border-2 border-white">
                    +{project.team.length - 3}
                  </div>
                )}
              </div>
            </TableCell>
            <TableCell>{project.daysLeft} days</TableCell>
            <TableCell>
              <span className="capitalize">{project.status}</span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

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
            
            <div className="flex gap-3 items-center">
              <input 
                type="text" 
                placeholder="Search a project" 
                className="px-4 py-2 border border-border rounded-lg text-sm"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => setViewMode(viewMode === 'grid' ? 'table' : 'grid')}
                className="ml-2"
              >
                {viewMode === 'grid' ? <LayoutList className="h-4 w-4" /> : <LayoutGrid className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          <TabsContent value="all">
            {viewMode === 'grid' ? <ProjectsGridView projects={projects} /> : <ProjectsTableView projects={projects} />}
          </TabsContent>
          
          <TabsContent value="current">
            {viewMode === 'grid' ? 
              <ProjectsGridView projects={projects.filter(p => p.status === 'current')} /> : 
              <ProjectsTableView projects={projects.filter(p => p.status === 'current')} />
            }
          </TabsContent>
          
          <TabsContent value="pending">
            {viewMode === 'grid' ? 
              <ProjectsGridView projects={projects.filter(p => p.status === 'pending')} /> : 
              <ProjectsTableView projects={projects.filter(p => p.status === 'pending')} />
            }
          </TabsContent>
          
          <TabsContent value="completed">
            {viewMode === 'grid' ? 
              <ProjectsGridView projects={projects.filter(p => p.status === 'completed')} /> : 
              <ProjectsTableView projects={projects.filter(p => p.status === 'completed')} />
            }
          </TabsContent>
          
          <TabsContent value="failed">
            {viewMode === 'grid' ? 
              <ProjectsGridView projects={projects.filter(p => p.status === 'failed')} /> : 
              <ProjectsTableView projects={projects.filter(p => p.status === 'failed')} />
            }
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
