
import React from 'react';
import { Avatar } from '@/components/ui/avatar';

const conversations = [
  {
    id: '1',
    name: 'Sarah Miller',
    lastMessage: 'Sure, let's meet at 3 PM',
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

const MessagesList = () => {
  return (
    <div className="space-y-2">
      {conversations.map((conversation) => (
        <button
          key={conversation.id}
          className={`w-full p-3 flex items-start gap-3 rounded-lg transition-colors hover:bg-accent ${
            conversation.unread ? 'bg-accent/50' : ''
          }`}
        >
          <Avatar className="h-10 w-10">
            <img src={conversation.avatar} alt={conversation.name} />
          </Avatar>
          
          <div className="flex-1 text-left">
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium">{conversation.name}</span>
              <span className="text-xs text-muted-foreground">{conversation.time}</span>
            </div>
            <p className="text-sm text-muted-foreground truncate">
              {conversation.lastMessage}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default MessagesList;
