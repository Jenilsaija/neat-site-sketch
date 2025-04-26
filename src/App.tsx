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
import NotFound from "./pages/NotFound";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import { currentUser, projects, teamMembers, dashboardData } from './data/mockData';

const queryClient = new QueryClient();

const App = () => {
  // Simulate authenticated state
  const isAuthenticated = true;

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
              <Route element={
                <div className="flex min-h-screen">
                  <Sidebar />
                  <div className="flex-1 ml-16">
                    <Routes>
                      <Route path="/" element={
                        <Dashboard 
                          user={currentUser}
                          stats={dashboardData.stats} 
                          taskCompletionData={dashboardData.taskCompletionData}
                          activities={dashboardData.activities}
                        />
                      } />
                      <Route path="/projects" element={
                        <Projects 
                          user={currentUser} 
                          projects={projects} 
                        />
                      } />
                      <Route path="/team" element={
                        <Team 
                          user={currentUser} 
                          members={teamMembers} 
                        />
                      } />
                      <Route path="/projects/:id" element={
                        <ProjectDetails
                          user={currentUser}
                          project={projects[0]}
                        />
                      } />
                      <Route path="/messages" element={
                        <Messages />
                      } />
                      <Route path="/profile" element={
                        <Profile user={currentUser} />
                      } />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </div>
                </div>
              }>
              </Route>
            )}
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
