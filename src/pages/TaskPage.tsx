
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import Header from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon, Clock, AlertCircle, MessageSquare, Paperclip, Tag, CheckCircle, Edit, Trash2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { tasks, currentUser, teamMembers } from '@/data/mockData';
import SubTaskCard, { SubTask } from '@/components/SubTaskCard';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TaskComments from '@/components/TaskComments';

// Find the task using URL parameter
const TaskPage = () => {
  const { id } = useParams<{ id: string }>();
  // Find the task or use a default task if not found
  const task = tasks.find(t => t.id === id) || tasks[0];
  const [isEditMode, setIsEditMode] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task.title || '');
  const [taskDescription, setTaskDescription] = useState(task.description || '');
  const [taskStatus, setTaskStatus] = useState(task.status || 'todo');
  const [taskPriority, setTaskPriority] = useState(task.priority || 'medium');
  const [taskDueDate, setTaskDueDate] = useState(task.dueDate || '');
  const [assignees, setAssignees] = useState(task.assignees || []);
  const [comments, setComments] = useState([
    {
      id: '1',
      user: currentUser,
      content: 'Let\'s start working on this. I\'ll take the first part.',
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      user: teamMembers[0],
      content: 'I\'ve started on the design mockups, will share by tomorrow.',
      timestamp: '1 hour ago'
    }
  ]);
  const [subtasks, setSubtasks] = useState<SubTask[]>([
    {
      id: 'subtask-1',
      title: 'Create wireframes',
      status: 'completed',
      priority: 'high',
      dueDate: '2025-05-22',
      assignee: teamMembers[0]
    },
    {
      id: 'subtask-2',
      title: 'Review with stakeholders',
      status: 'pending',
      priority: 'medium',
      dueDate: '2025-05-24',
      assignee: currentUser
    }
  ]);
  const [newComment, setNewComment] = useState('');
  const [isSubtaskDialogOpen, setIsSubtaskDialogOpen] = useState(false);
  const [newSubtask, setNewSubtask] = useState('');
  const [editingSubtask, setEditingSubtask] = useState<string | null>(null);
  const [subtaskPriority, setSubtaskPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');
  const [subtaskDueDate, setSubtaskDueDate] = useState('');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleStatusChange = (status: string) => {
    setTaskStatus(status);
    toast({
      title: "Status updated",
      description: `Task status changed to ${status}.`,
    });
  };

  const handleSaveTask = () => {
    // In a real app, you would save to API
    setIsEditMode(false);
    toast({
      title: "Task updated",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleDeleteTask = () => {
    // In a real app, you would delete via API
    setIsDeleteDialogOpen(false);
    toast({
      title: "Task deleted",
      description: "The task has been successfully deleted.",
    });
    // Here you would typically redirect to projects or tasks list
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    const comment = {
      id: `comment-${Date.now()}`,
      user: currentUser,
      content: newComment,
      timestamp: 'Just now'
    };
    
    setComments([...comments, comment]);
    setNewComment('');
    toast({
      title: "Comment added",
      description: "Your comment has been added to the task.",
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

  const handleAddSubtask = () => {
    if (!newSubtask.trim()) return;

    const subtask: SubTask = {
      id: `subtask-${Date.now()}`,
      title: newSubtask,
      status: 'pending',
      assignee: currentUser,
      priority: subtaskPriority,
      dueDate: subtaskDueDate || undefined,
    };

    setSubtasks([...subtasks, subtask]);
    resetSubtaskForm();
    toast({
      title: "Subtask added",
      description: "The subtask has been successfully added to the task.",
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
      toast({
        title: "Subtask updated",
        description: "The subtask has been successfully updated.",
      });
    } else {
      handleAddSubtask();
    }
    setIsSubtaskDialogOpen(false);
  };

  const resetSubtaskForm = () => {
    setNewSubtask('');
    setSubtaskPriority('medium');
    setSubtaskDueDate('');
    setEditingSubtask(null);
  };

  // Priority badge color
  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-blue-100 text-blue-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex-1 p-6">
      <Header 
        title={isEditMode ? "Edit Task" : task.title}
        user={currentUser} 
        notificationCount={3} 
      />
      
      <div className="mt-6 bg-white rounded-lg border p-6">
        {isEditMode ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="task-title">Task Title</Label>
              <Input
                id="task-title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="task-description">Description</Label>
              <Textarea
                id="task-description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                className="mt-1 min-h-[100px]"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="task-status">Status</Label>
                <Select value={taskStatus} onValueChange={setTaskStatus}>
                  <SelectTrigger id="task-status" className="mt-1">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="in-review">In Review</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="task-priority">Priority</Label>
                <Select value={taskPriority} onValueChange={setTaskPriority}>
                  <SelectTrigger id="task-priority" className="mt-1">
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
                <Label htmlFor="task-duedate">Due Date</Label>
                <Input
                  id="task-duedate"
                  type="date"
                  value={taskDueDate}
                  onChange={(e) => setTaskDueDate(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="task-assignee">Assignee</Label>
                <Select>
                  <SelectTrigger id="task-assignee" className="mt-1">
                    <SelectValue placeholder="Select assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={currentUser.id}>{currentUser.name}</SelectItem>
                    {teamMembers.map(member => (
                      <SelectItem key={member.id} value={member.id}>
                        {member.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsEditMode(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveTask}>
                Save Changes
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={getPriorityColor(task.priority)}>
                    {task.priority || 'Medium'}
                  </Badge>
                  <Badge variant={taskStatus === 'done' ? 'outline' : 'secondary'}>
                    {taskStatus === 'todo' ? 'To Do' : 
                     taskStatus === 'in-progress' ? 'In Progress' : 
                     taskStatus === 'in-review' ? 'In Review' : 'Done'}
                  </Badge>
                </div>
                
                <h1 className="text-xl font-semibold mb-2">{task.title}</h1>
                <p className="text-gray-600 mb-4">{task.description}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  {task.dueDate && (
                    <div className="flex items-center">
                      <CalendarIcon size={16} className="mr-1" />
                      <span>Due: {task.dueDate}</span>
                    </div>
                  )}
                  
                  {task.priority && (
                    <div className="flex items-center">
                      <AlertCircle size={16} className="mr-1" />
                      <span>Priority: {task.priority}</span>
                    </div>
                  )}
                  
                  {task.attachmentCount > 0 && (
                    <div className="flex items-center">
                      <Paperclip size={16} className="mr-1" />
                      <span>{task.attachmentCount} attachments</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setIsEditMode(true)}>
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-red-500 hover:text-red-700"
                  onClick={() => setIsDeleteDialogOpen(true)}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Tabs defaultValue="subtasks">
                  <TabsList>
                    <TabsTrigger value="subtasks">Subtasks</TabsTrigger>
                    <TabsTrigger value="comments">Comments</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="subtasks" className="mt-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Subtasks</h3>
                      <Button size="sm" onClick={() => {
                        resetSubtaskForm();
                        setIsSubtaskDialogOpen(true);
                      }}>
                        Add Subtask
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
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
                        <div className="text-center py-8 text-gray-500">
                          No subtasks yet. Add one to break down this task.
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="comments" className="mt-6">
                    <div className="space-y-4">
                      {comments.map(comment => (
                        <div key={comment.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                          <Avatar>
                            <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                            <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <p className="font-medium">{comment.user.name}</p>
                              <span className="text-xs text-gray-500">{comment.timestamp}</span>
                            </div>
                            <p className="text-sm mt-1">{comment.content}</p>
                          </div>
                        </div>
                      ))}
                      
                      <div className="pt-4">
                        <Label htmlFor="new-comment">Add Comment</Label>
                        <div className="flex gap-2 mt-1">
                          <Textarea
                            id="new-comment"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Type your comment here..."
                            className="flex-1"
                          />
                          <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                            Post
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="activity" className="mt-6">
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center">
                          <Edit size={14} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Alex Johnson</span>
                            <span className="text-gray-500">updated the status</span>
                          </div>
                          <p className="text-sm text-gray-600">Changed status from "To Do" to "In Progress"</p>
                          <span className="text-xs text-gray-500">Today at 10:30 AM</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center">
                          <CheckCircle size={14} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Sarah Miller</span>
                            <span className="text-gray-500">completed a subtask</span>
                          </div>
                          <p className="text-sm text-gray-600">Completed "Create wireframes"</p>
                          <span className="text-xs text-gray-500">Yesterday at 4:15 PM</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <div className="bg-purple-100 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center">
                          <MessageSquare size={14} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">John Davis</span>
                            <span className="text-gray-500">commented</span>
                          </div>
                          <p className="text-sm text-gray-600">Added a comment on this task</p>
                          <span className="text-xs text-gray-500">2 days ago</span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Status</h4>
                      <Select value={taskStatus} onValueChange={handleStatusChange}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todo">To Do</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="in-review">In Review</SelectItem>
                          <SelectItem value="done">Done</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Assignees</h4>
                      <div className="mt-2 space-y-2">
                        {task.assignees && task.assignees.map((assignee, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={assignee.avatar} alt={assignee.name} />
                              <AvatarFallback>{assignee.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{assignee.name}</span>
                          </div>
                        ))}
                        <Button variant="outline" size="sm" className="w-full mt-2">
                          Add Assignee
                        </Button>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Tags</h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="outline" className="bg-blue-50">Feature</Badge>
                        <Badge variant="outline" className="bg-green-50">Frontend</Badge>
                        <Button variant="outline" size="sm" className="h-6">
                          <Tag className="h-3 w-3 mr-1" />
                          Add Tag
                        </Button>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Dates</h4>
                      <div className="space-y-2 mt-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Created</span>
                          <span>May 15, 2025</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Due Date</span>
                          <span>{task.dueDate || 'Not set'}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Subtask Dialog */}
      <Dialog open={isSubtaskDialogOpen} onOpenChange={(open) => {
        if (!open) resetSubtaskForm();
        setIsSubtaskDialogOpen(open);
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingSubtask ? 'Edit Subtask' : 'Add New Subtask'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="subtask-title">Subtask Title</Label>
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
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              resetSubtaskForm();
              setIsSubtaskDialogOpen(false);
            }}>
              Cancel
            </Button>
            <Button onClick={handleSubtaskSave} disabled={!newSubtask.trim()}>
              {editingSubtask ? 'Save Changes' : 'Add Subtask'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this task? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteTask}>
              Delete Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskPage;
