
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  LayoutDashboard, 
  Folder, 
  MessageSquare, 
  Users, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Sun,
  Moon
} from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const { theme, setTheme } = useTheme();
  
  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Folder, label: 'Projects', path: '/projects' },
    { icon: MessageSquare, label: 'Messages', path: '/messages' },
    { icon: Users, label: 'Team', path: '/team' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const isActive = (path) => {
    return location.pathname === path || 
           (path !== '/' && location.pathname.startsWith(path));
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <div 
      className={`h-screen bg-sidebar text-sidebar-foreground flex flex-col transition-all duration-300 ${
        collapsed ? 'w-[4.5rem]' : 'w-64'
      } fixed left-0 top-0 z-10`}
    >
      <div className="flex items-center px-4 h-16 border-b border-sidebar-border">
        {!collapsed && (
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => navigate('/')}
          >
            <div className="w-8 h-8 bg-sidebar-primary rounded flex items-center justify-center">
              <LayoutDashboard size={16} className="text-sidebar-primary-foreground" />
            </div>
            <span className="font-semibold text-lg">TaskFlow</span>
          </div>
        )}
        {collapsed && (
          <div 
            className="w-full flex justify-center cursor-pointer" 
            onClick={() => navigate('/')}
          >
            <div className="w-8 h-8 bg-sidebar-primary rounded flex items-center justify-center">
              <LayoutDashboard size={16} className="text-sidebar-primary-foreground" />
            </div>
          </div>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto py-6">
        <nav className="px-3 space-y-1">
          {menuItems.map((item) => (
            <TooltipProvider key={item.path} delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to={item.path}
                    className={`flex items-center px-3 py-2.5 rounded-md transition-all ${
                      isActive(item.path)
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                        : 'hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                    }`}
                  >
                    <item.icon size={collapsed ? 20 : 18} className="shrink-0" />
                    {!collapsed && <span className="ml-3 truncate">{item.label}</span>}
                  </Link>
                </TooltipTrigger>
                {collapsed && <TooltipContent side="right">{item.label}</TooltipContent>}
              </Tooltip>
            </TooltipProvider>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            {theme === 'light' ? (
              <Moon size={20} />
            ) : (
              <Sun size={20} />
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            {collapsed ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
