
import React from 'react';
import { Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NotificationItemProps {
  title: string;
  message: string;
  time: string;
  isRead?: boolean;
}

const NotificationItem = ({ title, message, time, isRead = false }: NotificationItemProps) => {
  return (
    <div className={cn(
      "flex gap-3 p-4 transition-colors hover:bg-accent",
      !isRead && "bg-accent/50"
    )}>
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">{title}</p>
        <p className="text-sm text-muted-foreground">{message}</p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
    </div>
  );
};

export default NotificationItem;
