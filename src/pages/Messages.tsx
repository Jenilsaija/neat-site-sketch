
import React from 'react';
import Header from '@/components/Header';
import { Card } from '@/components/ui/card';
import { MessageSquare, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { currentUser } from '@/data/mockData';
import MessagesList from '@/components/messages/MessagesList';
import ChatArea from '@/components/messages/ChatArea';

const Messages = () => {
  return (
    <div className="flex-1 h-screen overflow-hidden">
      <Header 
        title="Messages" 
        user={currentUser}
        notificationCount={2}
      />
      
      <div className="flex h-[calc(100vh-5rem)]">
        {/* Conversations Sidebar */}
        <div className="w-80 border-r border-border bg-card">
          <div className="p-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input
                className="pl-10"
                placeholder="Search messages..."
                type="search"
              />
            </div>
            <MessagesList />
          </div>
        </div>
        
        {/* Main Chat Area */}
        <div className="flex-1 bg-background">
          <ChatArea />
        </div>
      </div>
    </div>
  );
};

export default Messages;
