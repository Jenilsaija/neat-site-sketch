import React, { useState } from 'react';
import KanbanBoard from '@/components/KanbanBoard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Users, Calendar, Plus, AlertCircle } from 'lucide-react';
import { KanbanColumn } from '@/components/KanbanBoard';
import { tasks } from '@/data/mockData';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SubTaskCard, { SubTask } from '@/components/SubTaskCard';
import { toast } from "@/components/ui/use-toast";

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
  const [subtasks, setSubtasks] = useState<SubTask[]>([]);
  const [isSubtaskDialogOpen, setIsSubtaskDialogOpen] = useState(false);
  const [newSubtask, setNewSubtask] = useState('');
  const [editingSubtask, setEditingSubtask] = useState<string | null>(null);
  const [subtaskPriority, setSubtaskPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');
  const [subtaskDueDate, setSubtaskDueDate] = useState('');

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

  return (
    <div className="flex-1 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Supermassive black hole</h1>
      </div>
      
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
              <TabsTrigger value="subtasks">Subtasks</TabsTrigger>
              <TabsTrigger value="people">People</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tasks" className="mt-6">
              <KanbanBoard columns={columns} />
            </TabsContent>
            
            <TabsContent value="subtasks" className="mt-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">Subtasks</h3>
                  <Button onClick={() => {
                    resetForm();
                    setIsSubtaskDialogOpen(true);
                  }}>
                    <Plus className="h-4 w-4 mr-2" />
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
                      No subtasks yet. Click the button above to add one.
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="people">
              <div className="text-center py-12 text-gray-500">
                <p>Team members will be displayed here</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Dialog open={isSubtaskDialogOpen} onOpenChange={(open) => {
        if (!open) resetForm();
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
              resetForm();
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
    </div>
  );
};

export default ProjectDetails;
