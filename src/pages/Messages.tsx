
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { MessageSquare, Search, Menu, X } from 'lucide-react';
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
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="flex-1 h-screen overflow-hidden">
      <div className="flex items-center justify-between py-4 px-4 md:px-6 border-b border-border">
        <h1 className="text-xl font-semibold">Messages</h1>
        {isMobile && (
          <Button 
            variant="outline"
            size="sm"
            onClick={toggleSidebar}
            className="flex items-center gap-2"
          >
            {showSidebar ? <X size={16} /> : <Menu size={16} />}
            <span className="hidden sm:inline">{showSidebar ? 'Hide' : 'Show'} Conversations</span>
          </Button>
        )}
      </div>
      
      <div className="flex h-[calc(100vh-5rem)] relative">
        {/* Conversations Sidebar */}
        {(showSidebar || !isMobile) && (
          <div className={`
            ${isMobile ? 'absolute z-20 w-full h-full bg-background' : 'w-80'} 
            border-r border-border bg-card
            ${isMobile && showSidebar ? 'shadow-lg' : ''}
          `}>
            <div className="p-4 h-full flex flex-col">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  className="pl-10"
                  placeholder="Search messages..."
                  type="search"
                />
              </div>
              
              <div className="flex-1 overflow-auto">
                <MessagesList />
              </div>
              
              {isMobile && (
                <div className="mt-4 pt-4 border-t border-border">
                  <Button 
                    onClick={toggleSidebar}
                    className="w-full"
                    variant="default"
                  >
                    View Conversation
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Main Chat Area */}
        <div className={`
          flex-1 bg-background 
          ${isMobile && showSidebar ? 'hidden' : 'flex flex-col'}
        `}>
          {!isMobile || !showSidebar ? (
            <ChatArea />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <div className="text-center">
                <MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
                <p>Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
