
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Team from "./pages/Team";
import ProjectDetails from "./pages/ProjectDetails";
import TaskPage from "./pages/TaskPage";
import NotFound from "./pages/NotFound";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Calendar from "./pages/Calendar";
import GanttChart from "./pages/GanttChart";
import Time from "./pages/Time";
import UserSettings from "./pages/UserSettings";
import Analytics from "./pages/Analytics";
import { currentUser, projects, teamMembers, dashboardData } from './data/mockData';
import { ThemeProvider } from "./hooks/use-theme";
import Layout from "./components/Layout";

const queryClient = new QueryClient();

const AuthenticatedApp = () => {
  const location = useLocation();
  
  // Get project from URL params
  const getProjectFromPath = () => {
    const pathParts = location.pathname.split('/');
    if (pathParts[1] === 'projects' && pathParts[2]) {
      const projectId = pathParts[2];
      return projects.find(p => p.id === projectId) || projects[0];
    }
    return projects[0];
  };

  return (
    <Routes>
      <Route path="/" element={
        <Layout>
          <Dashboard 
            user={currentUser}
            stats={dashboardData.stats} 
            taskCompletionData={dashboardData.taskCompletionData}
            activities={dashboardData.activities}
          />
        </Layout>
      } />
      <Route path="/projects" element={
        <Layout>
          <Projects 
            user={currentUser} 
            projects={projects} 
          />
        </Layout>
      } />
      <Route path="/team" element={
        <Layout>
          <Team 
            user={currentUser} 
            members={teamMembers} 
          />
        </Layout>
      } />
      <Route path="/projects/:id" element={
        <Layout>
          <ProjectDetails
            user={currentUser}
            project={getProjectFromPath()}
          />
        </Layout>
      } />
      <Route path="/tasks/:id" element={
        <Layout>
          <TaskPage />
        </Layout>
      } />
      <Route path="/messages" element={
        <Layout>
          <Messages />
        </Layout>
      } />
      <Route path="/profile" element={
        <Layout>
          <Profile user={currentUser} />
        </Layout>
      } />
      <Route path="/settings" element={
        <Layout>
          <Settings />
        </Layout>
      } />
      <Route path="/user-settings" element={
        <Layout>
          <UserSettings />
        </Layout>
      } />
      <Route path="/calendar" element={
        <Layout>
          <Calendar />
        </Layout>
      } />
      <Route path="/gantt" element={
        <Layout>
          <GanttChart />
        </Layout>
      } />
      <Route path="/time" element={
        <Layout>
          <Time />
        </Layout>
      } />
      <Route path="/analytics" element={
        <Layout>
          <Analytics />
        </Layout>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  // Simulate authenticated state
  const isAuthenticated = true;

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <div className="min-h-screen bg-background">
            <Toaster />
            <Sonner />
            <BrowserRouter>
              {!isAuthenticated ? (
                <Routes>
                  <Route path="/auth/login" element={<Login />} />
                  <Route path="/auth/register" element={<Register />} />
                  <Route path="/auth/forgot-password" element={<ForgotPassword />} />
                  <Route path="*" element={<Navigate to="/auth/login" replace />} />
                </Routes>
              ) : (
                <AuthenticatedApp />
              )}
            </BrowserRouter>
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
