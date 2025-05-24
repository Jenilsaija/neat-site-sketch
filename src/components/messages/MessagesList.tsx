
import React from 'react';
import { Avatar } from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';

const conversations = [
  {
    id: '1',
    name: 'Sarah Miller',
    lastMessage: "Sure, let's meet at 3 PM",
    time: '2m ago',
    unread: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
  },
  {
    id: '2',
    name: 'John Cooper',
    lastMessage: 'The project looks great!',
    time: '1h ago',
    unread: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
  },
  {
    id: '3',
    name: 'Emma Wilson',
    lastMessage: 'Can you review the latest changes?',
    time: '3h ago',
    unread: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma'
  }
];

interface MessagesListProps {
  onConversationSelect?: (id: string) => void;
}

const MessagesList = ({ onConversationSelect }: MessagesListProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="space-y-2">
      {conversations.map((conversation) => (
        <button
          key={conversation.id}
          onClick={() => onConversationSelect?.(conversation.id)}
          className={`w-full flex items-start gap-3 rounded-lg transition-colors hover:bg-accent touch-button
            ${isMobile ? 'p-3' : 'p-3'} 
            ${conversation.unread ? 'bg-accent/50' : ''}
          `}
        >
          <Avatar className={`${isMobile ? 'h-12 w-12' : 'h-10 w-10'} shrink-0`}>
            <img src={conversation.avatar} alt={conversation.name} />
          </Avatar>
          
          <div className="flex-1 text-left min-w-0">
            <div className="flex justify-between items-center mb-1">
              <span className={`font-medium truncate ${isMobile ? 'text-base' : 'text-sm'}`}>
                {conversation.name}
              </span>
              <span className={`text-muted-foreground shrink-0 ml-2 ${isMobile ? 'text-sm' : 'text-xs'}`}>
                {conversation.time}
              </span>
            </div>
            <p className={`text-muted-foreground truncate ${isMobile ? 'text-sm' : 'text-sm'}`}>
              {conversation.lastMessage}
            </p>
            {conversation.unread && (
              <div className={`w-2 h-2 bg-blue-500 rounded-full mt-1 ${isMobile ? '' : ''}`} />
            )}
          </div>
        </button>
      ))}
    </div>
  );
};

export default MessagesList;
