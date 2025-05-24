
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Mobile Layout */}
      {isMobile ? (
        <>
          <TopBar 
            collapsed={collapsed} 
            setCollapsed={setCollapsed}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          
          {/* Mobile Sidebar Overlay */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          
          <Sidebar 
            collapsed={false}
            setCollapsed={() => {}}
            isMobileOpen={sidebarOpen}
            setMobileOpen={setSidebarOpen}
          />
          
          <main className="flex-1 bg-background overflow-auto pb-16 safe-area-padding">
            {children}
          </main>
        </>
      ) : (
        /* Desktop Layout */
        <div className="flex min-h-screen">
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
          
          <div 
            className={`
              flex-1 min-h-screen flex flex-col
              transition-all duration-300 ease-in-out
              ${collapsed ? 'ml-[4.5rem]' : 'ml-64'}
            `}
          >
            <TopBar collapsed={collapsed} setCollapsed={setCollapsed} />
            <main className="flex-1 bg-background overflow-auto">
              {children}
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
