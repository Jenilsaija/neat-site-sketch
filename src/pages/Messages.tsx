
import React, { useState } from 'react';
import { MessageSquare, Search, Menu, X, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import MessagesList from '@/components/messages/MessagesList';
import ChatArea from '@/components/messages/ChatArea';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';

const Messages = () => {
  const isMobile = useIsMobile();
  const [showSidebar, setShowSidebar] = useState(!isMobile);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleConversationSelect = (conversationId: string) => {
    setSelectedConversation(conversationId);
    if (isMobile) {
      setShowSidebar(false);
    }
  };

  const handleBackToList = () => {
    setSelectedConversation(null);
    setShowSidebar(true);
  };

  if (isMobile) {
    return (
      <div className="flex-1 h-screen overflow-hidden">
        {/* Mobile: Show conversations list or chat */}
        {(!selectedConversation || showSidebar) ? (
          // Conversations List
          <div className="h-full bg-card">
            <div className="mobile-container border-b border-border">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  className="pl-10 mobile-input"
                  placeholder="Search messages..."
                  type="search"
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-auto mobile-scroll">
              <div className="mobile-container">
                <MessagesList onConversationSelect={handleConversationSelect} />
              </div>
            </div>
          </div>
        ) : (
          // Chat Area
          <div className="h-full bg-background flex flex-col">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-card">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBackToList}
                className="touch-button"
              >
                <ArrowLeft size={20} />
              </Button>
              <h2 className="font-medium">Conversation</h2>
            </div>
            <ChatArea />
          </div>
        )}
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className="flex-1 h-screen overflow-hidden">
      <div className="flex items-center justify-between py-4 px-4 md:px-6 border-b border-border">
        <h1 className="text-xl font-semibold">Messages</h1>
        <Button 
          variant="outline"
          size="sm"
          onClick={toggleSidebar}
          className="flex items-center gap-2 md:hidden"
        >
          {showSidebar ? <X size={16} /> : <Menu size={16} />}
          <span className="hidden sm:inline">{showSidebar ? 'Hide' : 'Show'} Conversations</span>
        </Button>
      </div>
      
      <div className="flex h-[calc(100vh-5rem)] relative">
        {/* Conversations Sidebar */}
        {showSidebar && (
          <div className="w-80 border-r border-border bg-card">
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
                <MessagesList onConversationSelect={handleConversationSelect} />
              </div>
            </div>
          </div>
        )}
        
        {/* Main Chat Area */}
        <div className="flex-1 bg-background flex flex-col">
          {selectedConversation ? (
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
