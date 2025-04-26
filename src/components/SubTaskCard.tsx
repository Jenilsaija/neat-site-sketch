
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Edit, Trash2, Calendar, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

export interface SubTask {
  id: string;
  title: string;
  status: 'pending' | 'completed';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  dueDate?: string;
  assignee?: {
    name: string;
    avatar: string;
  };
}

interface SubTaskCardProps {
  subtask: SubTask;
  onStatusChange: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const SubTaskCard = ({ subtask, onStatusChange, onEdit, onDelete }: SubTaskCardProps) => {
  // Helper function to get priority badge variant
  const getPriorityVariant = (priority?: string) => {
    switch (priority) {
      case 'low': return 'outline';
      case 'medium': return 'secondary';
      case 'high': return 'default';
      case 'urgent': return 'destructive';
      default: return 'outline';
    }
  };

  // Helper function to get priority icon
  const getPriorityIcon = (priority?: string) => {
    if (priority === 'high' || priority === 'urgent') {
      return <AlertCircle className="h-3 w-3 mr-1" />;
    }
    return null;
  };

  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-lg border mb-2 hover:shadow-sm transition-shadow">
      <div className="flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => onStatusChange(subtask.id)}
          className={subtask.status === 'completed' ? 'text-green-500' : 'text-gray-400'}
        >
          <Check className="h-4 w-4" />
        </Button>
        <div>
          <p className={`text-sm ${subtask.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
            {subtask.title}
          </p>
          {subtask.assignee && (
            <div className="flex items-center gap-2 mt-1">
              <img 
                src={subtask.assignee.avatar} 
                alt={subtask.assignee.name} 
                className="w-5 h-5 rounded-full"
              />
              <span className="text-xs text-gray-500">{subtask.assignee.name}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {subtask.dueDate && (
          <div className="flex items-center text-xs text-gray-500 mr-2">
            <Calendar size={12} className="mr-1" />
            <span>{subtask.dueDate}</span>
          </div>
        )}
        
        {subtask.priority && (
          <Badge variant={getPriorityVariant(subtask.priority)} className="mr-1 flex items-center">
            {getPriorityIcon(subtask.priority)}
            <span className="capitalize">{subtask.priority}</span>
          </Badge>
        )}
        
        <Badge variant={subtask.status === 'completed' ? 'success' : 'secondary'}>
          {subtask.status}
        </Badge>
        <Button variant="ghost" size="icon" onClick={() => onEdit(subtask.id)}>
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => onDelete(subtask.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default SubTaskCard;
