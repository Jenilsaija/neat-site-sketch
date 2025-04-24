
import React from 'react';

export interface TeamMemberProps {
  id: string;
  name: string;
  avatar: string;
  username: string;
  role: string;
  completed: number;
  opened: number;
  overdue: number;
  progress: number;
}

const TeamMember = ({
  id,
  name,
  avatar,
  username,
  role,
  completed,
  opened,
  overdue,
  progress
}: TeamMemberProps) => {
  
  const getRoleColor = (role: string) => {
    const roles: Record<string, string> = {
      'Project manager': 'text-app-yellow',
      'Art director': 'text-app-purple',
      'Interface designer': 'text-app-red',
      'Graphic designer': 'text-app-green',
      'Design intern': 'text-pink-500',
      'Illustrator': 'text-app-orange'
    };
    
    return roles[role] || 'text-app-blue';
  };
  
  return (
    <div className="bg-white rounded-lg border border-border p-6 flex flex-col items-center">
      <div className="relative mb-3">
        <img 
          src={avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`}
          alt={name}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div className="absolute bottom-1 right-1 w-3 h-3 bg-app-green rounded-full border-2 border-white"></div>
      </div>
      
      <h3 className="font-semibold text-lg mb-1">{name}</h3>
      <p className="text-gray-500 text-sm mb-2">@{username}</p>
      
      <p className={`text-sm font-medium mb-4 ${getRoleColor(role)}`}>
        {role}
      </p>
      
      <div className="project-progress-bar w-full mb-3">
        <div 
          className="progress-bar-fill bg-app-green" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="w-full grid grid-cols-3 gap-2 text-center mt-4">
        <div className="flex flex-col">
          <span className="font-semibold">{completed}</span>
          <span className="text-xs text-gray-500">Completed</span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">{opened}</span>
          <span className="text-xs text-gray-500">Opened</span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">{overdue}</span>
          <span className="text-xs text-gray-500">Overdue</span>
        </div>
      </div>
    </div>
  );
};

export default TeamMember;
