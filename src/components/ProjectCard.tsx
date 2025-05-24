
import React from 'react';
import { ExternalLink, Calendar, MoreVertical } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'current':
        return 'default' as const;
      case 'completed':
        return 'secondary' as const;
      case 'pending':
        return 'outline' as const;
      case 'failed':
        return 'destructive' as const;
      default:
        return 'outline' as const;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current': return 'text-blue-600';
      case 'completed': return 'text-green-600';
      case 'pending': return 'text-yellow-600';
      case 'failed': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-border bg-card">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <Link to={`/projects/${id}`} className="flex items-center gap-3 flex-1 min-w-0">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg flex-shrink-0 shadow-md transition-transform group-hover:scale-110"
              style={{ backgroundColor: color }}
            >
              {icon}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors truncate">
                {name}
              </h3>
              {website && (
                <a 
                  href={website} 
                  className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 mt-1"
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={10} />
                  {website.replace(/(^\w+:|^)\/\//, '')}
                </a>
              )}
            </div>
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to={`/projects/${id}`}>View Details</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Edit Project</DropdownMenuItem>
              <DropdownMenuItem>Share Project</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Archive Project</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
          {description}
        </p>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground">Progress</span>
              <span className="text-xs font-bold" style={{ color }}>{progress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="h-2 rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${progress}%`, backgroundColor: color }}
              ></div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant={getStatusVariant(status)} className={`capitalize ${getStatusColor(status)}`}>
                {status}
              </Badge>
              <div className="flex items-center text-xs text-muted-foreground gap-1">
                <Calendar size={12} />
                <span>{daysLeft} days left</span>
              </div>
            </div>
            
            <div className="flex -space-x-2">
              {team.slice(0, 3).map((member) => (
                <img 
                  key={member.id}
                  src={member.avatar}
                  alt={member.name}
                  className="w-7 h-7 rounded-full border-2 border-background shadow-sm"
                  title={member.name}
                />
              ))}
              {team.length > 3 && (
                <div className="w-7 h-7 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium shadow-sm">
                  +{team.length - 3}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
