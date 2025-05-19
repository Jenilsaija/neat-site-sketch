
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Bell, User, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';
import NotificationsPopover from './notifications/NotificationsPopover';
import { currentUser } from '@/data/mockData';

interface TopBarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const TopBar = ({ collapsed, setCollapsed }: TopBarProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();

  // Get page title based on current path
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    if (path.startsWith('/projects') && path.length > 9) return 'Project Details';
    if (path.startsWith('/tasks')) return 'Task Details';
    return path.split('/')[1].charAt(0).toUpperCase() + path.split('/')[1].slice(1);
  };

  return (
    <header className="sticky top-0 z-20 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border h-16 flex items-center px-4 md:px-6 shadow-sm">
      <div className="flex items-center w-full justify-between">
        <div className="flex items-center gap-3">
          {isMobile && (
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className="md:hidden"
            >
              <Menu size={18} />
            </Button>
          )}
          <h1 className="text-lg font-semibold">{getPageTitle()}</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex relative max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search..." 
              className="pl-9 w-[200px] lg:w-[300px] h-9 bg-background" 
            />
          </div>

          <NotificationsPopover notificationCount={3} />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                  <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{currentUser.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{currentUser.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
