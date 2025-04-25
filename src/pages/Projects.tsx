
import React, { useState, useCallback } from 'react';
import Header from '@/components/Header';
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

interface ProjectsProps {
  user: {
    name: string;
    avatar: string;
  };
  projects: Project[];
}

const Projects = ({ user, projects: initialProjects }: ProjectsProps) => {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    icon: '📁',
    color: '#0061FF',
    status: 'pending',
    progress: 0,
    daysLeft: 30,
  });
  
  // Filter projects based on search query
  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    project.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const ProjectsGridView = ({ projects }: { projects: Project[] }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          {projects.length > 0 ? projects.map((project) => (
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
                  <span className="text-xs text-gray-500">{project.progress}%</span>
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
              <TableCell>{project.daysLeft} days</TableCell>
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
      status: 'pending',
      progress: 0,
      daysLeft: 30,
    });
    
    toast({
      title: "Project created",
      description: `${newProjectObj.name} has been created successfully.`,
    });
  }, [newProject, user]);

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
              <div className="relative">
                <Input
                  type="text" 
                  placeholder="Search a project" 
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
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon" className="ml-2">
                    <Filter className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <h4 className="font-medium">Filter Projects</h4>
                    <div className="space-y-2">
                      <Label htmlFor="status-filter">Status</Label>
                      <Select onValueChange={(value) => console.log(value)}>
                        <SelectTrigger id="status-filter">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="current">Current</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="failed">Failed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="progress-filter">Progress</Label>
                      <Select onValueChange={(value) => console.log(value)}>
                        <SelectTrigger id="progress-filter">
                          <SelectValue placeholder="Select progress" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="low">Low (0-25%)</SelectItem>
                          <SelectItem value="medium">Medium (25-75%)</SelectItem>
                          <SelectItem value="high">High (75-100%)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => console.log('reset')}>Reset</Button>
                      <Button onClick={() => console.log('apply')}>Apply Filters</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => setViewMode(viewMode === 'grid' ? 'table' : 'grid')}
                className="ml-2"
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
          
          <TabsContent value="failed">
            {viewMode === 'grid' ? 
              <ProjectsGridView projects={filteredProjects.filter(p => p.status === 'failed')} /> : 
              <ProjectsTableView projects={filteredProjects.filter(p => p.status === 'failed')} />
            }
          </TabsContent>
        </Tabs>
        
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogContent className="sm:max-w-[600px]">
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
              <div className="grid grid-cols-2 gap-4">
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
                  <div className="flex gap-2">
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
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="project-status">Status</Label>
                  <Select 
                    onValueChange={(value) => setNewProject({...newProject, status: value})}
                    defaultValue={newProject.status}
                  >
                    <SelectTrigger id="project-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="current">Current</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
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
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
              <Button 
                onClick={handleCreateProject}
                disabled={!newProject.name.trim()}
              >
                Create Project
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="fixed bottom-6 right-6">
          <DialogTrigger asChild>
            <button 
              className="w-12 h-12 bg-app-blue rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-600 transition-colors"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <Plus />
            </button>
          </DialogTrigger>
        </div>
      </div>
    </div>
  );
};

export default Projects;
