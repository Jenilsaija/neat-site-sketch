import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
