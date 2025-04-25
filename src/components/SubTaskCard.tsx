
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Edit, Trash2 } from 'lucide-react';

export interface SubTask {
  id: string;
  title: string;
  status: 'pending' | 'completed';
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
  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-lg border mb-2">
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
