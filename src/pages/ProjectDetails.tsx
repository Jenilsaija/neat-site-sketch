
import React, { useState } from 'react';
import KanbanBoard from '@/components/KanbanBoard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Users, Calendar, Plus, MoreVertical, Clock, Target } from 'lucide-react';
import { KanbanColumn } from '@/components/KanbanBoard';
import { tasks } from '@/data/mockData';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SubTaskCard, { SubTask } from '@/components/SubTaskCard';
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useIsMobile } from '@/hooks/use-mobile';

interface ProjectDetailsProps {
  user: {
    name: string;
    avatar: string;
  };
  project: {
    id: string;
    name: string;
  };
}

const ProjectDetails = ({ user, project }: ProjectDetailsProps) => {
  const isMobile = useIsMobile();
  const [subtasks, setSubtasks] = useState<SubTask[]>([]);
  const [isSubtaskDialogOpen, setIsSubtaskDialogOpen] = useState(false);
  const [newSubtask, setNewSubtask] = useState('');
  const [editingSubtask, setEditingSubtask] = useState<string | null>(null);
  const [subtaskPriority, setSubtaskPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');
  const [subtaskDueDate, setSubtaskDueDate] = useState('');
  const [isStarred, setIsStarred] = useState(false);

  // Mock project data - in real app this would come from props or API
  const projectData = {
    name: "Supermassive Black Hole",
    description: "A revolutionary project exploring the mysteries of the universe through advanced astronomical research and data analysis.",
    status: "current" as const,
    progress: 68,
    daysLeft: 12,
    totalDays: 45,
    team: [
      { id: '1', name: 'Alice Johnson', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150' },
      { id: '2', name: 'Bob Smith', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150' },
      { id: '3', name: 'Carol Davis', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' },
      { id: '4', name: 'David Wilson', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
      { id: '5', name: 'Eva Brown', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150' },
      { id: '6', name: 'Frank Miller', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
    ],
    deadline: "2024-01-15",
    budget: "$125,000",
    priority: "high" as const
  };

  // Group tasks by status
  const columns: KanbanColumn[] = [
    {
      id: 'todo',
      title: 'To Do',
      tasks: tasks.filter((task) => task.status === 'todo'),
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      tasks: tasks.filter((task) => task.status === 'in-progress'),
      color: '#0061FF'
    },
    {
      id: 'in-review',
      title: 'In Review',
      tasks: tasks.filter((task) => task.status === 'in-review'),
    },
    {
      id: 'done',
      title: 'Done',
      tasks: tasks.filter((task) => task.status === 'done'),
    }
  ];

  const handleAddSubtask = () => {
    if (!newSubtask.trim()) return;

    const subtask: SubTask = {
      id: `subtask-${Date.now()}`,
      title: newSubtask,
      status: 'pending',
      assignee: user,
      priority: subtaskPriority,
      dueDate: subtaskDueDate || undefined,
    };

    setSubtasks([...subtasks, subtask]);
    setNewSubtask('');
    setSubtaskPriority('medium');
    setSubtaskDueDate('');
    setIsSubtaskDialogOpen(false);
    toast({
      title: "Subtask added",
      description: "The subtask has been successfully added to the project.",
    });
  };

  const handleSubtaskStatusChange = (id: string) => {
    setSubtasks(subtasks.map(st => 
      st.id === id 
        ? { ...st, status: st.status === 'completed' ? 'pending' : 'completed' }
        : st
    ));
  };

  const handleSubtaskEdit = (id: string) => {
    setEditingSubtask(id);
    const subtask = subtasks.find(st => st.id === id);
    if (subtask) {
      setNewSubtask(subtask.title);
      setSubtaskPriority(subtask.priority || 'medium');
      setSubtaskDueDate(subtask.dueDate || '');
      setIsSubtaskDialogOpen(true);
    }
  };

  const handleSubtaskDelete = (id: string) => {
    setSubtasks(subtasks.filter(st => st.id !== id));
    toast({
      title: "Subtask deleted",
      description: "The subtask has been successfully removed.",
    });
  };

  const handleSubtaskSave = () => {
    if (editingSubtask) {
      setSubtasks(subtasks.map(st => 
        st.id === editingSubtask 
          ? { 
              ...st, 
              title: newSubtask,
              priority: subtaskPriority,
              dueDate: subtaskDueDate || undefined
            }
          : st
      ));
      setEditingSubtask(null);
      toast({
        title: "Subtask updated",
        description: "The subtask has been successfully updated.",
      });
    } else {
      handleAddSubtask();
    }
    setIsSubtaskDialogOpen(false);
    setNewSubtask('');
    setSubtaskPriority('medium');
    setSubtaskDueDate('');
  };

  const resetForm = () => {
    setNewSubtask('');
    setSubtaskPriority('medium');
    setSubtaskDueDate('');
    setEditingSubtask(null);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'failed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="flex-1 p-4 md:p-6 max-w-7xl mx-auto">
      {/* Project Header */}
      <div className="space-y-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-bold">{projectData.name}</h1>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsStarred(!isStarred)}
                className={isStarred ? 'text-yellow-500' : 'text-muted-foreground'}
              >
                <Star className={`h-5 w-5 ${isStarred ? 'fill-current' : ''}`} />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit Project</DropdownMenuItem>
                  <DropdownMenuItem>Share Project</DropdownMenuItem>
                  <DropdownMenuItem>Export Data</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">Archive Project</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <p className="text-muted-foreground max-w-2xl">{projectData.description}</p>
          </div>
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${getStatusColor(projectData.status)}`}>
                  <Target className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge variant="secondary" className="mt-1">
                    {projectData.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500">
                  <Clock className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Deadline</p>
                  <p className="font-medium">{projectData.daysLeft} days left</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Team</p>
                  <p className="font-medium">{projectData.team.length} members</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${getPriorityColor(projectData.priority)}`}>
                  <Star className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Priority</p>
                  <Badge variant="outline" className="mt-1 capitalize">
                    {projectData.priority}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Section */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Project Progress</h3>
                <span className="text-2xl font-bold">{projectData.progress}%</span>
              </div>
              <Progress value={projectData.progress} className="h-3" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Started {projectData.totalDays - projectData.daysLeft} days ago</span>
                <span>{projectData.daysLeft} days remaining</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Section */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Team Members</h3>
              <div className="flex flex-wrap gap-3">
                {projectData.team.map((member) => (
                  <div key={member.id} className="flex items-center gap-2 bg-muted rounded-full pr-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{member.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Tabs Section */}
      <div className="space-y-6">
        <Tabs defaultValue="tasks">
          <TabsList className={`${isMobile ? 'w-full grid grid-cols-3' : ''}`}>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="subtasks">Subtasks</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tasks" className="mt-6">
            <KanbanBoard columns={columns} />
          </TabsContent>
          
          <TabsContent value="subtasks" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Subtasks</CardTitle>
                  <Button onClick={() => {
                    resetForm();
                    setIsSubtaskDialogOpen(true);
                  }}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Subtask
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {subtasks.map(subtask => (
                    <SubTaskCard
                      key={subtask.id}
                      subtask={subtask}
                      onStatusChange={handleSubtaskStatusChange}
                      onEdit={handleSubtaskEdit}
                      onDelete={handleSubtaskDelete}
                    />
                  ))}
                  {subtasks.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      <div className="mx-auto w-24 h-24 mb-4 rounded-full bg-muted flex items-center justify-center">
                        <Plus className="w-12 h-12 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">No subtasks yet</h3>
                      <p className="text-sm">Break down this project into smaller, manageable subtasks.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="activity" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <div className="mx-auto w-24 h-24 mb-4 rounded-full bg-muted flex items-center justify-center">
                    <Clock className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No activity yet</h3>
                  <p className="text-sm">Project activity and updates will appear here.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Subtask Dialog */}
      <Dialog open={isSubtaskDialogOpen} onOpenChange={(open) => {
        if (!open) resetForm();
        setIsSubtaskDialogOpen(open);
      }}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingSubtask ? 'Edit Subtask' : 'Add New Subtask'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="subtask-title">Subtask Title *</Label>
              <Input
                id="subtask-title"
                value={newSubtask}
                onChange={(e) => setNewSubtask(e.target.value)}
                placeholder="Enter subtask title"
                className="mt-2"
              />
            </div>
            
            <div>
              <Label htmlFor="subtask-priority">Priority</Label>
              <Select value={subtaskPriority} onValueChange={(value: any) => setSubtaskPriority(value)}>
                <SelectTrigger id="subtask-priority" className="mt-2">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="subtask-duedate">Due Date (Optional)</Label>
              <Input
                id="subtask-duedate"
                type="date"
                value={subtaskDueDate}
                onChange={(e) => setSubtaskDueDate(e.target.value)}
                className="mt-2"
              />
            </div>
          </div>
          <DialogFooter className={`${isMobile ? 'flex-col gap-2' : 'flex-row gap-2'}`}>
            <Button variant="outline" onClick={() => {
              resetForm();
              setIsSubtaskDialogOpen(false);
            }} className={`${isMobile ? 'w-full' : ''}`}>
              Cancel
            </Button>
            <Button onClick={handleSubtaskSave} disabled={!newSubtask.trim()} className={`${isMobile ? 'w-full' : ''}`}>
              {editingSubtask ? 'Save Changes' : 'Add Subtask'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectDetails;
