
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Edit, ChevronDown, Check, Clipboard, MessageSquare, Clock, Calendar, Users, Activity } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TaskComments from "@/components/TaskComments";

// Import mock data
import { projects, tasks } from '@/data/mockData';
import SubTaskCard from '@/components/SubTaskCard';

// Updated interface to match SubTaskCard component props
interface SubTask {
  id: string;
  name: string;
  completed: boolean;
}

// Modified interface to include missing properties
interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: 'high' | 'medium' | 'low';
  assignee: {
    id: string;
    name: string;
    avatar: string;
  };
  dueDate: string;
  comments?: number;
  completedSubtasks?: number;
  totalSubtasks?: number;
}

const TaskPage = () => {
  const { id } = useParams<{ id: string }>();
  
  // Find the task in the mock data
  const task: Task = {
    id: "task-1",
    title: "Create new dashboard wireframes",
    description: "Design new wireframes for the project dashboard based on the approved mockups. Include both mobile and desktop versions.",
    status: "In Progress",
    priority: "high",
    assignee: {
      id: "user-1",
      name: "Jane Cooper",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    dueDate: "2025-06-10",
    comments: 8,
    completedSubtasks: 2,
    totalSubtasks: 5
  };
  
  // State for edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState<Task>(task);
  
  // State for subtasks
  const [subTasks, setSubTasks] = useState([
    { id: 'sub-1', name: 'Research competitor dashboards', completed: true },
    { id: 'sub-2', name: 'Create low-fidelity wireframes', completed: true },
    { id: 'sub-3', name: 'Design high-fidelity mockups', completed: false },
    { id: 'sub-4', name: 'Get approval from stakeholders', completed: false },
    { id: 'sub-5', name: 'Finalize design specs for developers', completed: false }
  ]);
  
  // Handle status change
  const handleStatusChange = (status: string) => {
    setEditedTask({ ...editedTask, status });
  };
  
  // Get badge variant based on priority
  const getPriorityBadgeVariant = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      case 'low':
        return 'secondary';
      default:
        return 'outline';
    }
  };
  
  // Get color for status
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-500';
      case 'in progress':
        return 'bg-blue-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'canceled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  // Calculate completion percentage
  const completionPercentage = task.completedSubtasks && task.totalSubtasks 
    ? Math.round((task.completedSubtasks / task.totalSubtasks) * 100) 
    : 0;
  
  // Toggle subtask completion
  const toggleSubtaskCompletion = (id: string) => {
    setSubTasks(subTasks.map(st => 
      st.id === id ? { ...st, completed: !st.completed } : st
    ));
  };
  
  // Handle save changes
  const handleSaveChanges = () => {
    setIsEditing(false);
    // Here we would typically make an API call to save the changes
    console.log('Saving changes:', editedTask);
  };
  
  // Format due date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  // Mock activity data
  const activityItems = [
    {
      id: 1,
      user: { name: 'Jane Cooper', avatar: 'https://i.pravatar.cc/150?img=5', id: 'user-1' },
      action: 'created',
      target: 'this task',
      timestamp: '2025-05-15T09:30:00Z'
    },
    {
      id: 2,
      user: { name: 'Alex Rivera', avatar: 'https://i.pravatar.cc/150?img=8', id: 'user-2' },
      action: 'changed the status to',
      target: 'In Progress',
      timestamp: '2025-05-18T14:22:00Z'
    },
    {
      id: 3,
      user: { name: 'Jane Cooper', avatar: 'https://i.pravatar.cc/150?img=5', id: 'user-1' },
      action: 'completed subtask',
      target: 'Research competitor dashboards',
      timestamp: '2025-05-19T11:05:00Z'
    }
  ];
  
  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    }) + ' at ' + date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Sample comments for TaskComments component
  const sampleComments = [
    {
      id: '1',
      user: { name: 'Jane Cooper', avatar: 'https://i.pravatar.cc/150?img=5' },
      content: 'I've started on the research. Looking at dashboards from XYZ and ABC companies.',
      timestamp: '2025-05-15T09:30:00Z'
    },
    {
      id: '2',
      user: { name: 'Alex Rivera', avatar: 'https://i.pravatar.cc/150?img=8' },
      content: 'Make sure to include mobile views in the wireframes.',
      timestamp: '2025-05-15T10:15:00Z'
    }
  ];
  
  return (
    <div className="flex flex-col space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main task card */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div className="space-y-1.5">
              {!isEditing ? (
                <CardTitle className="text-2xl font-bold">{editedTask.title}</CardTitle>
              ) : (
                <Textarea 
                  className="text-2xl font-bold resize-none h-12 p-0 border-none focus-visible:ring-0"
                  value={editedTask.title}
                  onChange={(e) => setEditedTask({...editedTask, title: e.target.value})}
                />
              )}
              <CardDescription className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${getStatusColor(editedTask.status)}`}></div>
                <span className="font-medium">{editedTask.status}</span>
                <Badge variant={getPriorityBadgeVariant(editedTask.priority)}>
                  {editedTask.priority.charAt(0).toUpperCase() + editedTask.priority.slice(1)}
                </Badge>
              </CardDescription>
            </div>
            {!isEditing ? (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                <Edit className="mr-1 h-3.5 w-3.5" />
                Edit
              </Button>
            ) : (
              <Button variant="default" size="sm" onClick={handleSaveChanges}>
                <Check className="mr-1 h-3.5 w-3.5" />
                Save
              </Button>
            )}
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Task description */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
              {!isEditing ? (
                <p className="text-sm">{editedTask.description}</p>
              ) : (
                <Textarea 
                  className="min-h-[100px]"
                  value={editedTask.description}
                  onChange={(e) => setEditedTask({...editedTask, description: e.target.value})}
                  placeholder="Enter task description"
                />
              )}
            </div>
            
            {/* Task status */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
              {!isEditing ? (
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(editedTask.status)}`}></div>
                  <span>{editedTask.status}</span>
                </div>
              ) : (
                <Select onValueChange={handleStatusChange} defaultValue={editedTask.status}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todo">Todo</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="In Review">In Review</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Canceled">Canceled</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
            
            {/* Task priority */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Priority</h3>
              {!isEditing ? (
                <Badge variant={getPriorityBadgeVariant(editedTask.priority)}>
                  {editedTask.priority.charAt(0).toUpperCase() + editedTask.priority.slice(1)}
                </Badge>
              ) : (
                <Select 
                  onValueChange={(value: 'high' | 'medium' | 'low') => setEditedTask({...editedTask, priority: value})} 
                  defaultValue={editedTask.priority}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
            
            {/* Task metadata */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-xs text-muted-foreground">Due Date</div>
                  <div className="text-sm font-medium">{formatDate(editedTask.dueDate)}</div>
                </div>
              </div>
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-xs text-muted-foreground">Assignee</div>
                  <div className="text-sm font-medium flex items-center">
                    <Avatar className="h-5 w-5 mr-1">
                      <AvatarImage src={editedTask.assignee.avatar} alt={editedTask.assignee.name} />
                      <AvatarFallback>{editedTask.assignee.name[0]}</AvatarFallback>
                    </Avatar>
                    {editedTask.assignee.name}
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <Activity className="mr-2 h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-xs text-muted-foreground">Progress</div>
                  <div className="text-sm font-medium">{completionPercentage}% Complete</div>
                </div>
              </div>
            </div>
          </CardContent>
          
          <Separator />
          
          <CardFooter className="pt-4">
            <Tabs defaultValue="subtasks" className="w-full">
              <TabsList className="mb-2">
                <TabsTrigger value="subtasks" className="flex items-center">
                  <Clipboard className="mr-1 h-4 w-4" />
                  Subtasks ({subTasks.filter(st => st.completed).length}/{subTasks.length})
                </TabsTrigger>
                <TabsTrigger value="comments" className="flex items-center">
                  <MessageSquare className="mr-1 h-4 w-4" />
                  Comments ({task.comments})
                </TabsTrigger>
                <TabsTrigger value="activity" className="flex items-center">
                  <Activity className="mr-1 h-4 w-4" />
                  Activity
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="subtasks">
                <div className="space-y-2">
                  <Progress value={completionPercentage} className="h-2" />
                  <div className="space-y-2 mt-4">
                    {subTasks.map(subtask => (
                      <SubTaskCard 
                        key={subtask.id} 
                        name={subtask.name}
                        completed={subtask.completed}
                        onToggle={() => toggleSubtaskCompletion(subtask.id)}
                      />
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="comments">
                <TaskComments 
                  initialComments={sampleComments}
                  currentUser={{
                    name: 'Current User',
                    avatar: 'https://i.pravatar.cc/150?img=1'
                  }}
                />
              </TabsContent>
              
              <TabsContent value="activity">
                <div className="space-y-4">
                  {activityItems.map(item => (
                    <div key={item.id} className="flex items-start space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={item.user.avatar} alt={item.user.name} />
                        <AvatarFallback>{item.user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-0.5">
                        <p className="text-sm">
                          <span className="font-medium">{item.user.name}</span>
                          {' '}{item.action}{' '}
                          <span className="font-medium">{item.target}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">{formatTimestamp(item.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardFooter>
        </Card>
        
        {/* Sidebar with additional info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Task Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Project info */}
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Project</h4>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-app-blue rounded"></div>
                <span>Website Redesign</span>
              </div>
            </div>
            
            {/* Tags */}
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Tags</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20">UI Design</Badge>
                <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20">Dashboard</Badge>
                <Badge variant="outline" className="bg-purple-50 dark:bg-purple-900/20">UX</Badge>
              </div>
            </div>
            
            {/* Watchers */}
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Watchers</h4>
              <div className="flex -space-x-2">
                <Avatar className="h-8 w-8 border-2 border-background">
                  <AvatarImage src="https://i.pravatar.cc/150?img=1" alt="User 1" />
                  <AvatarFallback>U1</AvatarFallback>
                </Avatar>
                <Avatar className="h-8 w-8 border-2 border-background">
                  <AvatarImage src="https://i.pravatar.cc/150?img=2" alt="User 2" />
                  <AvatarFallback>U2</AvatarFallback>
                </Avatar>
                <Avatar className="h-8 w-8 border-2 border-background">
                  <AvatarImage src="https://i.pravatar.cc/150?img=3" alt="User 3" />
                  <AvatarFallback>U3</AvatarFallback>
                </Avatar>
                <Avatar className="h-8 w-8 border-2 border-background bg-muted">
                  <AvatarFallback>+2</AvatarFallback>
                </Avatar>
              </div>
            </div>
            
            {/* Time tracking */}
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Time Tracking</h4>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Logged time</span>
                  <span className="font-medium">4h 15m</span>
                </div>
                <Progress value={70} className="h-1" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Estimate: 6h</span>
                  <span>Remaining: 1h 45m</span>
                </div>
              </div>
            </div>
            
            {/* Attachments */}
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Attachments</h4>
              <div className="space-y-2">
                <div className="flex items-center p-2 rounded-md border">
                  <div className="bg-muted w-10 h-10 rounded flex items-center justify-center mr-3">
                    PDF
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">design_requirements.pdf</div>
                    <div className="text-xs text-muted-foreground">1.2 MB • Added 2 days ago</div>
                  </div>
                </div>
                <div className="flex items-center p-2 rounded-md border">
                  <div className="bg-muted w-10 h-10 rounded flex items-center justify-center mr-3">
                    IMG
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">mockup_v2.png</div>
                    <div className="text-xs text-muted-foreground">3.8 MB • Added yesterday</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TaskPage;
