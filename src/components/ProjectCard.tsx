
import React from 'react';
import { ExternalLink, Calendar } from 'lucide-react';

export interface ProjectCardProps {
  id: string;
  name: string;
  description: string;
  icon: string;
  color?: string;
  website?: string;
  progress: number;
  daysLeft: number;
  team: { id: string; name: string; avatar: string }[];
}

const ProjectCard = ({
  id,
  name,
  description,
  icon,
  color = '#0061FF',
  website,
  progress,
  daysLeft,
  team
}: ProjectCardProps) => {
  return (
    <div className="project-card">
      <div className="flex items-start mb-4">
        <div 
          className="w-10 h-10 rounded flex items-center justify-center text-white mr-3"
          style={{ backgroundColor: color }}
        >
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold">{name}</h3>
            <div className="text-gray-400">···</div>
          </div>
          {website && (
            <a 
              href={website} 
              className="text-xs text-gray-500 flex items-center hover:text-app-blue"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <ExternalLink size={10} className="mr-1" />
              {website.replace(/(^\w+:|^)\/\//, '')}
            </a>
          )}
        </div>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      
      <div className="project-progress-bar mb-3">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${progress}%`, backgroundColor: color }}
        ></div>
      </div>
      
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center text-xs text-gray-500">
          <Calendar size={12} className="mr-1" />
          <span>{daysLeft} days left</span>
        </div>
        
        <div className="avatar-stack">
          {team.slice(0, 3).map((member) => (
            <img 
              key={member.id}
              src={member.avatar}
              alt={member.name}
              title={member.name}
            />
          ))}
          {team.length > 3 && (
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium border-2 border-white">
              +{team.length - 3}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
