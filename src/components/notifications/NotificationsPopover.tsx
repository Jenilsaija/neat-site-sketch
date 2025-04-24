
import React from 'react';
import { Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import NotificationItem from './NotificationItem';

interface NotificationsPopoverProps {
  notificationCount?: number;
}

const notifications = [
  {
    id: '1',
    title: 'New Message',
    message: 'Sarah Miller sent you a message',
    time: '2 minutes ago',
    isRead: false,
  },
  {
    id: '2',
    title: 'Project Update',
    message: 'Dashboard design has been updated',
    time: '1 hour ago',
    isRead: true,
  }
];

const NotificationsPopover = ({ notificationCount = 0 }: NotificationsPopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger className="relative">
        <Bell size={20} className="text-gray-600" />
        {notificationCount > 0 && (
          <Badge 
            className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-app-red text-white"
          >
            {notificationCount}
          </Badge>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <h4 className="font-medium">Notifications</h4>
            <Badge variant="secondary">{notifications.length} New</Badge>
          </div>
          <div className="max-h-[300px] overflow-y-auto">
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                title={notification.title}
                message={notification.message}
                time={notification.time}
                isRead={notification.isRead}
              />
            ))}
          </div>
          <div className="p-2 text-center border-t border-border">
            <button className="text-sm text-primary hover:underline">
              View all notifications
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsPopover;
