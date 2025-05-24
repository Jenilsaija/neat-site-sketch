
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  Folder, 
  MessageSquare, 
  Users, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Sun,
  Moon,
  Calendar,
  Clock,
  X
} from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  isMobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}

const Sidebar = ({ collapsed, setCollapsed, isMobileOpen = false, setMobileOpen }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const isMobile = useIsMobile();
  
  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Folder, label: 'Projects', path: '/projects' },
    { icon: Calendar, label: 'Calendar', path: '/calendar' },
    { icon: MessageSquare, label: 'Messages', path: '/messages' },
    { icon: Users, label: 'Team', path: '/team' },
    { icon: Clock, label: 'Time Tracking', path: '/time' },
  ];

  const isActive = (path: string) => {
    if (path === '/calendar' && location.pathname === '/gantt') {
      return true;
    }
    return location.pathname === path || 
           (path !== '/' && location.pathname.startsWith(path));
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile && setMobileOpen) {
      setMobileOpen(false);
    }
  };

  if (isMobile) {
    return (
      <div 
        className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-sidebar text-sidebar-foreground transform transition-transform duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="flex items-center justify-between px-4 h-14 border-b border-sidebar-border">
            <div 
              className="flex items-center gap-2 cursor-pointer" 
              onClick={() => handleNavigation('/')}
            >
              <div className="w-8 h-8 bg-sidebar-primary rounded flex items-center justify-center">
                <span className="text-sidebar-primary-foreground font-bold">TF</span>
              </div>
              <span className="font-semibold text-lg">TaskFlow</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileOpen?.(false)}
              className="h-8 w-8 text-sidebar-foreground"
            >
              <X size={20} />
            </Button>
          </div>
          
          {/* Navigation */}
          <div className="flex-1 overflow-y-auto py-6">
            <nav className="px-3 space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center px-3 py-3 rounded-md transition-all text-left ${
                    isActive(item.path)
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                  }`}
                >
                  <item.icon size={20} className="shrink-0" />
                  <span className="ml-3">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
          
          {/* Mobile Footer */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center justify-around">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleNavigation('/settings')}
                className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <Settings size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop Sidebar
  return (
    <div 
      className={`h-screen bg-sidebar text-sidebar-foreground flex flex-col transition-all duration-300 fixed z-30
        ${collapsed ? 'w-[4.5rem]' : 'w-64'}
      `}
    >
      {/* Desktop Header */}
      <div className="flex items-center px-4 h-16 border-b border-sidebar-border">
        {!collapsed && (
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => navigate('/')}
          >
            <div className="w-8 h-8 bg-sidebar-primary rounded flex items-center justify-center">
              <span className="text-sidebar-primary-foreground font-bold">TF</span>
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
              <span className="text-sidebar-primary-foreground font-bold">TF</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Navigation */}
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
      
      {/* Desktop Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </Button>
          
          <Link to="/settings">
            <Button
              variant="ghost"
              size="icon"
              className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <Settings size={20} />
            </Button>
          </Link>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
