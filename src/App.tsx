
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Team from "./pages/Team";
import ProjectDetails from "./pages/ProjectDetails";
import TaskPage from "./pages/TaskPage";
import NotFound from "./pages/NotFound";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import { currentUser, projects, teamMembers, dashboardData } from './data/mockData';
import { useIsMobile } from "./hooks/use-mobile";

const queryClient = new QueryClient();

const App = () => {
  // Simulate authenticated state
  const isAuthenticated = true; // Using false to show auth pages
  const isMobile = useIsMobile();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {!isAuthenticated ? (
              <>
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />
                <Route path="/auth/forgot-password" element={<ForgotPassword />} />
                <Route path="*" element={<Navigate to="/auth/login" replace />} />
              </>
            ) : (
              <>
                <Route path="/" element={
                  <div className="flex min-h-screen flex-col md:flex-row">
                    <Sidebar />
                    <div className={`flex-1 ${isMobile ? 'w-full' : 'md:ml-16'}`}>
                      <Dashboard 
                        user={currentUser}
                        stats={dashboardData.stats} 
                        taskCompletionData={dashboardData.taskCompletionData}
                        activities={dashboardData.activities}
                      />
                    </div>
                  </div>
                } />
                <Route path="/projects" element={
                  <div className="flex min-h-screen flex-col md:flex-row">
                    <Sidebar />
                    <div className={`flex-1 ${isMobile ? 'w-full' : 'md:ml-16'}`}>
                      <Projects 
                        user={currentUser} 
                        projects={projects} 
                      />
                    </div>
                  </div>
                } />
                <Route path="/team" element={
                  <div className="flex min-h-screen flex-col md:flex-row">
                    <Sidebar />
                    <div className={`flex-1 ${isMobile ? 'w-full' : 'md:ml-16'}`}>
                      <Team 
                        user={currentUser} 
                        members={teamMembers} 
                      />
                    </div>
                  </div>
                } />
                <Route path="/projects/:id" element={
                  <div className="flex min-h-screen flex-col md:flex-row">
                    <Sidebar />
                    <div className={`flex-1 ${isMobile ? 'w-full' : 'md:ml-16'}`}>
                      <ProjectDetails
                        user={currentUser}
                        project={projects[0]}
                      />
                    </div>
                  </div>
                } />
                <Route path="/tasks/:id" element={
                  <div className="flex min-h-screen flex-col md:flex-row">
                    <Sidebar />
                    <div className={`flex-1 ${isMobile ? 'w-full' : 'md:ml-16'}`}>
                      <TaskPage />
                    </div>
                  </div>
                } />
                <Route path="/messages" element={
                  <div className="flex min-h-screen flex-col md:flex-row">
                    <Sidebar />
                    <div className={`flex-1 ${isMobile ? 'w-full' : 'md:ml-16'}`}>
                      <Messages />
                    </div>
                  </div>
                } />
                <Route path="/profile" element={
                  <div className="flex min-h-screen flex-col md:flex-row">
                    <Sidebar />
                    <div className={`flex-1 ${isMobile ? 'w-full' : 'md:ml-16'}`}>
                      <Profile user={currentUser} />
                    </div>
                  </div>
                } />
                <Route path="/settings" element={
                  <div className="flex min-h-screen flex-col md:flex-row">
                    <Sidebar />
                    <div className={`flex-1 ${isMobile ? 'w-full' : 'md:ml-16'}`}>
                      <Settings />
                    </div>
                  </div>
                } />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            )}
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
