
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Folder, MessageSquare, Users, Calendar, Clock } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const BottomNavigation = () => {
  const location = useLocation();
  const isMobile = useIsMobile();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Folder, label: 'Projects', path: '/projects' },
    { icon: Calendar, label: 'Calendar', path: '/calendar' },
    { icon: MessageSquare, label: 'Messages', path: '/messages' },
    { icon: Users, label: 'Team', path: '/team' },
  ];

  const isActive = (path: string) => {
    if (path === '/calendar' && location.pathname === '/gantt') {
      return true;
    }
    return location.pathname === path || 
           (path !== '/' && location.pathname.startsWith(path));
  };

  if (!isMobile) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border safe-area-padding">
      <div className="flex items-center justify-around px-2 py-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center p-2 min-w-[60px] rounded-lg transition-colors ${
              isActive(item.path)
                ? 'text-primary bg-primary/10'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            }`}
          >
            <item.icon size={20} className="mb-1" />
            <span className="text-xs font-medium truncate">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
