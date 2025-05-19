
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useIsMobile();
  
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      
      <div 
        className={`
          flex-1 min-h-screen flex flex-col
          transition-all duration-300
          ${isMobile ? 'w-full' : collapsed ? 'md:ml-[4.5rem]' : 'md:ml-64'}
        `}
      >
        <TopBar collapsed={collapsed} setCollapsed={setCollapsed} />
        <div className="flex-1 p-6 bg-background">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
