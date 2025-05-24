
import React, { useState, useCallback } from 'react';
import ProjectCard from '@/components/ProjectCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LayoutGrid, LayoutList, Plus, Search } from "lucide-react";
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
        <div className="col-span-full text-center py-12 text-muted-foreground">
          <div className="mx-auto w-24 h-24 mb-4 rounded-full bg-muted flex items-center justify-center">
            <Search className="w-12 h-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">No projects found</h3>
          <p className="text-sm">No projects match your search criteria. Try adjusting your filters.</p>
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
              <TableRow key={project.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded flex items-center justify-center text-white flex-shrink-0"
                      style={{ backgroundColor: project.color || '#0061FF' }}
                    >
                      {project.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="truncate font-medium">{project.name}</div>
                      {project.website && (
                        <a 
                          href={project.website}
                          className="text-xs text-muted-foreground hover:text-primary truncate block"
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
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all" 
                        style={{ 
                          width: `${project.progress}%`,
                          backgroundColor: project.color || '#0061FF' 
                        }}
                      ></div>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{project.progress}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex -space-x-2">
                    {project.team.slice(0, 3).map((member) => (
                      <img 
                        key={member.id}
                        src={member.avatar}
                        alt={member.name}
                        className="w-8 h-8 rounded-full border-2 border-background"
                        title={member.name}
                      />
                    ))}
                    {project.team.length > 3 && (
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium border-2 border-background">
                        +{project.team.length - 3}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap text-sm">{project.daysLeft} days</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(project.status)}>
                    <span className="capitalize">{project.status}</span>
                  </Badge>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                  <div className="flex flex-col items-center">
                    <Search className="w-12 h-12 mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">No projects found</h3>
                    <p className="text-sm">No projects match your search criteria.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'current':
        return 'default' as const;
      case 'completed':
        return 'secondary' as const;
      case 'pending':
        return 'outline' as const;
      case 'failed':
        return 'destructive' as const;
      default:
        return 'outline' as const;
    }
  };

  const handleCreateProject = useCallback(() => {
    if (!newProject.name.trim()) {
      toast({
        title: "Error",
        description: "Project name is required.",
        variant: "destructive",
      });
      return;
    }

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

  const resetForm = () => {
    setNewProject({
      name: '',
      description: '',
      icon: '📁',
      color: '#0061FF',
      status: 'pending',
      progress: 0,
      daysLeft: 30,
    });
  };

  return (
    <div className="flex-1 p-4 md:p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground mt-1">Manage and track your projects</p>
        </div>
        {!isMobile && (
          <Button onClick={() => setIsCreateModalOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        )}
      </div>
      
      <div className="space-y-6">
        <Tabs defaultValue="all" className="w-full">
          <div className={`flex ${isMobile ? 'flex-col gap-4' : 'justify-between items-center'} mb-6`}>
            <TabsList className={`${isMobile ? 'w-full grid grid-cols-2' : 'grid grid-cols-4'}`}>
              <TabsTrigger value="all" className="text-xs md:text-sm">
                All ({projects.length})
              </TabsTrigger>
              <TabsTrigger value="current" className="text-xs md:text-sm">
                Current ({projects.filter(p => p.status === 'current').length})
              </TabsTrigger>
              <TabsTrigger value="pending" className="text-xs md:text-sm">
                Pending ({projects.filter(p => p.status === 'pending').length})
              </TabsTrigger>
              <TabsTrigger value="completed" className="text-xs md:text-sm">
                Done ({projects.filter(p => p.status === 'completed').length})
              </TabsTrigger>
            </TabsList>
            
            <div className={`flex gap-2 items-center ${isMobile ? 'w-full' : ''}`}>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text" 
                  placeholder="Search projects..." 
                  className="pl-10 h-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {!isMobile && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setViewMode(viewMode === 'grid' ? 'table' : 'grid')}
                  title={viewMode === 'grid' ? 'Switch to table view' : 'Switch to grid view'}
                >
                  {viewMode === 'grid' ? <LayoutList className="h-4 w-4" /> : <LayoutGrid className="h-4 w-4" />}
                </Button>
              )}
            </div>
          </div>
          
          <TabsContent value="all" className="space-y-4">
            {viewMode === 'grid' ? <ProjectsGridView projects={filteredProjects} /> : <ProjectsTableView projects={filteredProjects} />}
          </TabsContent>
          
          <TabsContent value="current" className="space-y-4">
            {viewMode === 'grid' ? 
              <ProjectsGridView projects={filteredProjects.filter(p => p.status === 'current')} /> : 
              <ProjectsTableView projects={filteredProjects.filter(p => p.status === 'current')} />
            }
          </TabsContent>
          
          <TabsContent value="pending" className="space-y-4">
            {viewMode === 'grid' ? 
              <ProjectsGridView projects={filteredProjects.filter(p => p.status === 'pending')} /> : 
              <ProjectsTableView projects={filteredProjects.filter(p => p.status === 'pending')} />
            }
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-4">
            {viewMode === 'grid' ? 
              <ProjectsGridView projects={filteredProjects.filter(p => p.status === 'completed')} /> : 
              <ProjectsTableView projects={filteredProjects.filter(p => p.status === 'completed')} />
            }
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={isCreateModalOpen} onOpenChange={(open) => {
        if (!open) resetForm();
        setIsCreateModalOpen(open);
      }}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="project-name">Project Name *</Label>
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
                rows={3}
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
                <Label>Color</Label>
                <div className="flex gap-2 flex-wrap">
                  {['#0061FF', '#FF3030', '#30CF5B', '#FFCB30', '#9B30FF'].map(color => (
                    <div
                      key={color}
                      className={`h-8 w-8 rounded-full cursor-pointer transition-all ${newProject.color === color ? 'ring-2 ring-offset-2 ring-primary' : 'hover:scale-110'}`}
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
                <Label htmlFor="project-days">Timeline (Days)</Label>
                <Input 
                  id="project-days" 
                  type="number" 
                  min="1"
                  max="365"
                  value={newProject.daysLeft}
                  onChange={(e) => setNewProject({...newProject, daysLeft: parseInt(e.target.value) || 30})}
                />
              </div>
            </div>
          </div>
          <DialogFooter className={`${isMobile ? 'flex-col gap-2' : 'flex-row gap-2'}`}>
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)} className={`${isMobile ? 'w-full' : ''}`}>
              Cancel
            </Button>
            <Button 
              onClick={handleCreateProject}
              disabled={!newProject.name.trim()}
              className={`${isMobile ? 'w-full' : ''}`}
            >
              Create Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {isMobile && (
        <div className="fixed bottom-20 right-4 z-40">
          <Button 
            onClick={() => setIsCreateModalOpen(true)}
            size="lg"
            className="rounded-full w-14 h-14 shadow-lg"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Projects;
