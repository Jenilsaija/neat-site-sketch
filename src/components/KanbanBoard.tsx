
import React from 'react';
import TaskCard, { TaskCardProps } from './TaskCard';
import { MoreHorizontal, Plus } from 'lucide-react';

export interface KanbanColumn {
  id: string;
  title: string;
  tasks: TaskCardProps[];
  color?: string;
}

export interface KanbanBoardProps {
  columns: KanbanColumn[];
}

const KanbanBoard = ({ columns }: KanbanBoardProps) => {
  return (
    <div className="flex gap-6 overflow-x-auto pb-6">
      {columns.map((column) => (
        <div key={column.id} className="w-80 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{column.title}</h3>
              <div className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                {column.tasks.length}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-1 text-gray-500 hover:bg-gray-100 rounded">
                <Plus size={16} />
              </button>
              <button className="p-1 text-gray-500 hover:bg-gray-100 rounded">
                <MoreHorizontal size={16} />
              </button>
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            {column.tasks.map((task, index) => (
              <TaskCard key={`${column.id}-${index}`} {...task} />
            ))}
            
            {column.tasks.length === 0 && (
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-500">No tasks yet</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
