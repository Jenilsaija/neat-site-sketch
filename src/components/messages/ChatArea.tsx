
import React from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Send } from 'lucide-react';

const messages = [
  {
    id: '1',
    sender: 'Sarah Miller',
    content: "Hi! How's the project coming along?",
    time: '10:30 AM',
    isSender: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
  },
  {
    id: '2',
    sender: 'You',
    content: "Hey Sarah! It's going well. I've completed the initial designs.",
    time: '10:32 AM',
    isSender: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You'
  },
  {
    id: '3',
    sender: 'Sarah Miller',
    content: "That's great! Can we schedule a review meeting?",
    time: '10:33 AM',
    isSender: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
  }
];

const ChatArea = () => {
  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="p-4 border-b border-border flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt="Sarah Miller" />
        </Avatar>
        <div>
          <h3 className="font-medium">Sarah Miller</h3>
          <span className="text-sm text-muted-foreground">Online</span>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.isSender ? 'flex-row-reverse' : ''}`}
          >
            <Avatar className="h-8 w-8 flex-shrink-0">
              <img src={message.avatar} alt={message.sender} />
            </Avatar>
            
            <div className={`flex flex-col ${message.isSender ? 'items-end' : ''}`}>
              <div className={`rounded-lg p-3 max-w-md ${
                message.isSender 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted'
              }`}>
                <p className="text-sm">{message.content}</p>
              </div>
              <span className="text-xs text-muted-foreground mt-1">
                {message.time}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Message Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input 
            placeholder="Type your message..." 
            className="flex-1"
          />
          <Button size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
