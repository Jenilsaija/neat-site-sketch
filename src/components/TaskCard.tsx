
import React from 'react';
import { Calendar, MessageSquare, Paperclip } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

export interface TaskCardProps {
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'in-review' | 'done';
  dueDate?: string;
  commentCount?: number;
  attachmentCount?: number;
  progress?: number;
  assignees?: { id: string; name: string; avatar: string }[];
  color?: 'red' | 'green' | 'blue' | 'yellow' | 'purple';
}

const TaskCard = ({
  title,
  description,
  status,
  dueDate,
  commentCount = 0,
  attachmentCount = 0,
  progress = 0,
  assignees = [],
  color = 'blue'
}: TaskCardProps) => {
  
  const statusColors = {
    'todo': 'bg-gray-200',
    'in-progress': 'bg-app-blue',
    'in-review': 'bg-app-purple',
    'done': 'bg-app-green',
  };
  
  const colorClasses = {
    'red': 'border-l-4 border-app-red',
    'green': 'border-l-4 border-app-green',
    'blue': 'border-l-4 border-app-blue',
    'yellow': 'border-l-4 border-app-yellow',
    'purple': 'border-l-4 border-app-purple',
  };
  
  return (
    <div className={`task-card ${colorClasses[color]}`}>
      <h3 className="font-medium text-base mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-gray-500 mb-3">{description}</p>
      )}
      
      {progress > 0 && (
        <div className="project-progress-bar mb-3">
          <div 
            className="progress-bar-fill bg-app-blue" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
      
      <div className="flex items-center justify-between mt-3">
        <div className="flex gap-2 items-center">
          {dueDate && (
            <div className="flex items-center text-xs text-gray-500">
              <Calendar size={12} className="mr-1" />
              <span>{dueDate}</span>
            </div>
          )}
          
          {commentCount > 0 && (
            <div className="flex items-center text-xs text-gray-500">
              <MessageSquare size={12} className="mr-1" />
              <span>{commentCount}</span>
            </div>
          )}
          
          {attachmentCount > 0 && (
            <div className="flex items-center text-xs text-gray-500">
              <Paperclip size={12} className="mr-1" />
              <span>{attachmentCount}</span>
            </div>
          )}
        </div>
        
        {assignees.length > 0 && (
          <div className="avatar-stack">
            {assignees.slice(0, 3).map((assignee) => (
              <img 
                key={assignee.id}
                src={assignee.avatar}
                alt={assignee.name}
                title={assignee.name}
              />
            ))}
            {assignees.length > 3 && (
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium border-2 border-white">
                +{assignees.length - 3}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
