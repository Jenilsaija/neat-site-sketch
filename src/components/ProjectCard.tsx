
import React from 'react';
import { ExternalLink, Calendar, MoreVertical } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link } from 'react-router-dom';

export interface ProjectCardProps {
  id: string;
  name: string;
  description: string;
  icon: string;
  color?: string;
  website?: string;
  progress: number;
  daysLeft: number;
  status?: string;
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
  status = 'pending',
  team
}: ProjectCardProps) => {
  // Helper function to determine badge variant based on project status
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'current':
        return 'default';
      case 'completed':
        return 'success';
      case 'pending':
        return 'secondary';
      case 'failed':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md border-border bg-card">
      <CardContent className="p-6">
        <div className="flex items-start mb-4">
          <Link to={`/projects/${id}`}>
            <div 
              className="w-10 h-10 rounded flex items-center justify-center text-white mr-3 flex-shrink-0 hover:scale-105 transition-transform cursor-pointer"
              style={{ backgroundColor: color }}
            >
              {icon}
            </div>
          </Link>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <Link to={`/projects/${id}`} className="hover:text-primary transition-colors">
                <h3 className="font-semibold">{name}</h3>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger className="hover:bg-muted rounded-full h-8 w-8 flex items-center justify-center">
                  <MoreVertical size={16} className="text-muted-foreground" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to={`/projects/${id}`}>View Details</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Edit Project</DropdownMenuItem>
                  <DropdownMenuItem>Archive Project</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {website && (
              <a 
                href={website} 
                className="text-xs text-muted-foreground flex items-center hover:text-primary transition-colors"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <ExternalLink size={10} className="mr-1" />
                {website.replace(/(^\w+:|^)\/\//, '')}
              </a>
            )}
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>
        
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground">{progress}% Complete</span>
            <Badge variant={getStatusVariant(status)}>
              <span className="capitalize">{status}</span>
            </Badge>
          </div>
          <div className="w-full bg-muted rounded-full h-1.5">
            <div 
              className="h-1.5 rounded-full" 
              style={{ width: `${progress}%`, backgroundColor: color }}
            ></div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar size={12} className="mr-1" />
            <span>{daysLeft} days left</span>
          </div>
          
          <div className="flex -space-x-2">
            {team.slice(0, 3).map((member) => (
              <img 
                key={member.id}
                src={member.avatar}
                alt={member.name}
                className="w-6 h-6 rounded-full border-2 border-background"
                title={member.name}
              />
            ))}
            {team.length > 3 && (
              <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium border-2 border-background">
                +{team.length - 3}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
