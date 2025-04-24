import React from 'react';
import { Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import NotificationsPopover from './notifications/NotificationsPopover';
import UserMenu from './user/UserMenu';

export interface HeaderProps {
  title: string;
  subtitle?: string;
  user: {
    name: string;
    avatar: string;
  };
  notificationCount?: number;
}

const Header = ({ title, subtitle, user, notificationCount = 0 }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between py-4 px-6 border-b border-border">
      <div>
        <h1 className="text-xl font-semibold">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 rounded-lg border border-border text-sm w-64"
          />
        </div>
        
        <NotificationsPopover notificationCount={notificationCount} />
        <UserMenu user={user} />
      </div>
    </header>
  );
};

export default Header;
