
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Card } from '@/components/ui/card';
import { MessageSquare, Search, Menu } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { currentUser } from '@/data/mockData';
import MessagesList from '@/components/messages/MessagesList';
import ChatArea from '@/components/messages/ChatArea';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';

const Messages = () => {
  const isMobile = useIsMobile();
  const [showSidebar, setShowSidebar] = useState(!isMobile);

  // Toggle sidebar visibility on mobile
  const toggleSidebar = () => {
    if (isMobile) {
      setShowSidebar(!showSidebar);
    }
  };

  return (
    <div className="flex-1 h-screen overflow-hidden">
      <Header 
        title="Messages" 
        user={currentUser}
        notificationCount={2}
      />
      
      <div className="flex h-[calc(100vh-5rem)] relative">
        {isMobile && (
          <Button 
            variant="outline"
            className="absolute top-2 right-2 z-10"
            onClick={toggleSidebar}
          >
            <Menu size={18} />
          </Button>
        )}
        
        {/* Conversations Sidebar */}
        {(showSidebar || !isMobile) && (
          <div className={`${isMobile ? 'absolute z-10 w-full h-full' : 'w-80'} border-r border-border bg-card`}>
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
              
              {isMobile && (
                <div className="mt-4 flex justify-center">
                  <Button onClick={toggleSidebar}>
                    View Conversation
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Main Chat Area */}
        <div className={`flex-1 bg-background ${isMobile && showSidebar ? 'hidden' : 'block'}`}>
          <ChatArea />
        </div>
      </div>
    </div>
  );
};

export default Messages;
