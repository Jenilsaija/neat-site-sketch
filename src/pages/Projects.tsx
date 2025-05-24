
import React, { useState, useCallback } from 'react';
import ProjectCard from '@/components/ProjectCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LayoutGrid, LayoutList, Plus, Filter } from "lucide-react";
import { Project } from '@/data/mockData';
import { 
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "@/components/ui/table";
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useIsMobile } from '@/hooks/use-mobile';

interface ProjectsProps {
  user: {
    name: string;
    avatar: string;
  };
  projects: Project[];
}

const Projects = ({ user, projects: initialProjects }: ProjectsProps) => {
  const isMobile = useIsMobile();
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    icon: '📁',
    color: '#0061FF',
    status: 'pending' as 'current' | 'pending' | 'completed' | 'failed',
    progress: 0,
    daysLeft: 30,
  });
  
  // Filter projects based on search query
  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    project.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const ProjectsGridView = ({ projects }: { projects: Project[] }) => (
    <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
      {projects.length > 0 ? projects.map((project) => (
        <ProjectCard key={project.id} {...project} />
      )) : (
        <div className="col-span-full text-center py-8 text-gray-500">
          No projects found matching your search criteria.
        </div>
      )}
    </div>
  );

  const ProjectsTableView = ({ projects }: { projects: Project[] }) => (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[200px]">Project</TableHead>
              <TableHead className="min-w-[120px]">Progress</TableHead>
              <TableHead className="min-w-[100px]">Team</TableHead>
              <TableHead className="min-w-[100px]">Days Left</TableHead>
              <TableHead className="min-w-[100px]">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length > 0 ? projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded flex items-center justify-center text-white flex-shrink-0"
                      style={{ backgroundColor: project.color || '#0061FF' }}
                    >
                      {project.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="truncate">{project.name}</div>
                      {project.website && (
                        <a 
                          href={project.website}
                          className="text-xs text-gray-500 hover:text-app-blue truncate block"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {project.website.replace(/(^\w+:|^)\/\//, '')}
                        </a>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full" 
                        style={{ 
                          width: `${project.progress}%`,
                          backgroundColor: project.color || '#0061FF' 
                        }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap">{project.progress}%</span>
                  </div>
                </TableCell>
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
                <TableCell className="whitespace-nowrap">{project.daysLeft} days</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(project.status)}>
                    <span className="capitalize">{project.status}</span>
                  </Badge>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                  No projects found matching your search criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );

  // Helper function to determine badge variant based on project status
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'current':
        return 'default';
      case 'completed':
        return 'success';
      case 'pending':
        return 'secondary';
      case 'failed':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  // Handle new project creation
  const handleCreateProject = useCallback(() => {
    const id = `project-${Date.now()}`;
    const newProjectObj: Project = {
      ...newProject,
      id,
      team: [
        {
          id: '1',
          name: user.name,
          avatar: user.avatar
        }
      ]
    };
    
    setProjects(prev => [newProjectObj, ...prev]);
    setIsCreateModalOpen(false);
    setNewProject({
      name: '',
      description: '',
      icon: '📁',
      color: '#0061FF',
      status: 'pending' as 'current' | 'pending' | 'completed' | 'failed',
      progress: 0,
      daysLeft: 30,
    });
    
    toast({
      title: "Project created",
      description: `${newProjectObj.name} has been created successfully.`,
    });
  }, [newProject, user]);

  return (
    <div className="flex-1 p-4 md:p-6">
      <div className="flex items-center justify-between py-4">
        <h1 className="text-xl md:text-2xl font-semibold">Projects</h1>
      </div>
      
      <div className="mt-6">
        <Tabs defaultValue="all">
          <div className={`flex ${isMobile ? 'flex-col gap-4' : 'justify-between items-center'} mb-6`}>
            <TabsList className={`${isMobile ? 'w-full grid grid-cols-2' : ''}`}>
              <TabsTrigger value="all" className="text-xs md:text-sm">ALL ({projects.length})</TabsTrigger>
              <TabsTrigger value="current" className="text-xs md:text-sm">CURRENT ({projects.filter(p => p.status === 'current').length})</TabsTrigger>
              <TabsTrigger value="pending" className="text-xs md:text-sm">PENDING ({projects.filter(p => p.status === 'pending').length})</TabsTrigger>
              <TabsTrigger value="completed" className="text-xs md:text-sm">COMPLETED ({projects.filter(p => p.status === 'completed').length})</TabsTrigger>
            </TabsList>
            
            <div className={`flex gap-2 items-center ${isMobile ? 'w-full' : ''}`}>
              <div className="relative flex-1">
                <Input
                  type="text" 
                  placeholder="Search projects..." 
                  className="px-4 py-2 border border-border rounded-lg text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <Button 
                    variant="ghost" 
                    className="absolute right-0 top-0 h-full w-10" 
                    onClick={() => setSearchQuery('')}
                  >
                    ×
                  </Button>
                )}
              </div>
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => setViewMode(viewMode === 'grid' ? 'table' : 'grid')}
                title={viewMode === 'grid' ? 'Switch to table view' : 'Switch to grid view'}
              >
                {viewMode === 'grid' ? <LayoutList className="h-4 w-4" /> : <LayoutGrid className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          <TabsContent value="all">
            {viewMode === 'grid' ? <ProjectsGridView projects={filteredProjects} /> : <ProjectsTableView projects={filteredProjects} />}
          </TabsContent>
          
          <TabsContent value="current">
            {viewMode === 'grid' ? 
              <ProjectsGridView projects={filteredProjects.filter(p => p.status === 'current')} /> : 
              <ProjectsTableView projects={filteredProjects.filter(p => p.status === 'current')} />
            }
          </TabsContent>
          
          <TabsContent value="pending">
            {viewMode === 'grid' ? 
              <ProjectsGridView projects={filteredProjects.filter(p => p.status === 'pending')} /> : 
              <ProjectsTableView projects={filteredProjects.filter(p => p.status === 'pending')} />
            }
          </TabsContent>
          
          <TabsContent value="completed">
            {viewMode === 'grid' ? 
              <ProjectsGridView projects={filteredProjects.filter(p => p.status === 'completed')} /> : 
              <ProjectsTableView projects={filteredProjects.filter(p => p.status === 'completed')} />
            }
          </TabsContent>
        </Tabs>
        
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="project-name">Project Name</Label>
                <Input 
                  id="project-name" 
                  value={newProject.name} 
                  onChange={(e) => setNewProject({...newProject, name: e.target.value})} 
                  placeholder="Enter project name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="project-description">Description</Label>
                <Textarea 
                  id="project-description" 
                  value={newProject.description} 
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})} 
                  placeholder="Enter project description"
                />
              </div>
              <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-2 gap-4'}`}>
                <div className="grid gap-2">
                  <Label htmlFor="project-icon">Icon</Label>
                  <Select 
                    onValueChange={(value) => setNewProject({...newProject, icon: value})}
                    defaultValue={newProject.icon}
                  >
                    <SelectTrigger id="project-icon">
                      <SelectValue placeholder="Select icon" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="📁">📁 Folder</SelectItem>
                      <SelectItem value="🚀">🚀 Rocket</SelectItem>
                      <SelectItem value="💡">💡 Light Bulb</SelectItem>
                      <SelectItem value="🛠️">🛠️ Tools</SelectItem>
                      <SelectItem value="📊">📊 Chart</SelectItem>
                      <SelectItem value="🌐">🌐 Globe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="project-color">Color</Label>
                  <div className="flex gap-2 flex-wrap">
                    {['#0061FF', '#FF3030', '#30CF5B', '#FFCB30', '#9B30FF'].map(color => (
                      <div
                        key={color}
                        className={`h-8 w-8 rounded-full cursor-pointer ${newProject.color === color ? 'ring-2 ring-offset-2 ring-app-blue' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => setNewProject({...newProject, color})}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-2 gap-4'}`}>
                <div className="grid gap-2">
                  <Label htmlFor="project-status">Status</Label>
                  <Select 
                    onValueChange={(value: 'pending' | 'current' | 'completed' | 'failed') => 
                      setNewProject({...newProject, status: value})
                    }
                    defaultValue={newProject.status}
                  >
                    <SelectTrigger id="project-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="current">Current</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="project-days">Days Timeline</Label>
                  <Input 
                    id="project-days" 
                    type="number" 
                    value={newProject.daysLeft}
                    onChange={(e) => setNewProject({...newProject, daysLeft: parseInt(e.target.value) || 0})}
                  />
                </div>
              </div>
            </div>
            <DialogFooter className={`${isMobile ? 'flex-col gap-2' : ''}`}>
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)} className={`${isMobile ? 'w-full' : ''}`}>Cancel</Button>
              <Button 
                onClick={handleCreateProject}
                disabled={!newProject.name.trim()}
                className={`${isMobile ? 'w-full' : ''}`}
              >
                Create Project
              </Button>
            </DialogFooter>
          </DialogContent>

          <div className="fixed bottom-6 right-6">
            <DialogTrigger asChild>
              <button 
                className="w-12 h-12 bg-app-blue rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-600 transition-colors"
              >
                <Plus />
              </button>
            </DialogTrigger>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default Projects;
