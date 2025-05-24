
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Grid2x2, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity } from '@/data/mockData';
import { useIsMobile } from '@/hooks/use-mobile';

interface DashboardProps {
  user: {
    name: string;
    avatar: string;
  };
  stats: {
    totalProjects: number;
    completedProjects: number;
    inProgressProjects: number;
    delayedProjects: number;
  };
  taskCompletionData: { name: string; value: number }[];
  activities: Activity[];
}

const Dashboard = ({ user, stats, taskCompletionData, activities }: DashboardProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`flex-1 ${isMobile ? 'mobile-container' : 'desktop-container'}`}>
      {!isMobile && (
        <div className="flex items-center justify-between py-4">
          <div>
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </div>
        </div>
      )}
      
      <div className={isMobile ? 'mobile-section' : 'mt-6'}>
        {!isMobile && <h2 className="font-semibold mb-4 text-gray-800">PROJECTS OVERVIEW</h2>}
        
        <div className={`${isMobile ? 'mobile-stats-grid mb-6' : 'grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'}`}>
          <Card className={isMobile ? 'mobile-card' : ''}>
            <CardContent className={isMobile ? 'pt-4' : 'pt-6'}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-bold ${isMobile ? 'text-2xl' : 'text-3xl'}`}>{stats.totalProjects}</p>
                  <p className={`text-gray-500 ${isMobile ? 'text-xs' : 'text-sm'}`}>Total projects</p>
                </div>
                <div className={`bg-blue-100 rounded-md flex items-center justify-center text-app-blue ${isMobile ? 'w-8 h-8' : 'w-10 h-10'}`}>
                  <Grid2x2 size={isMobile ? 16 : 20} />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className={isMobile ? 'mobile-card' : ''}>
            <CardContent className={isMobile ? 'pt-4' : 'pt-6'}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-bold ${isMobile ? 'text-2xl' : 'text-3xl'}`}>{stats.completedProjects}</p>
                  <p className={`text-gray-500 ${isMobile ? 'text-xs' : 'text-sm'}`}>Completed</p>
                </div>
                <div className={`bg-green-100 rounded-md flex items-center justify-center text-app-green ${isMobile ? 'w-8 h-8' : 'w-10 h-10'}`}>
                  <CheckCircle size={isMobile ? 16 : 20} />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className={isMobile ? 'mobile-card' : ''}>
            <CardContent className={isMobile ? 'pt-4' : 'pt-6'}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-bold ${isMobile ? 'text-2xl' : 'text-3xl'}`}>{stats.inProgressProjects}</p>
                  <p className={`text-gray-500 ${isMobile ? 'text-xs' : 'text-sm'}`}>In progress</p>
                </div>
                <div className={`bg-yellow-100 rounded-md flex items-center justify-center text-app-yellow ${isMobile ? 'w-8 h-8' : 'w-10 h-10'}`}>
                  <Clock size={isMobile ? 16 : 20} />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className={isMobile ? 'mobile-card' : ''}>
            <CardContent className={isMobile ? 'pt-4' : 'pt-6'}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-bold ${isMobile ? 'text-2xl' : 'text-3xl'}`}>{stats.delayedProjects}</p>
                  <p className={`text-gray-500 ${isMobile ? 'text-xs' : 'text-sm'}`}>Out of schedule</p>
                </div>
                <div className={`bg-red-100 rounded-md flex items-center justify-center text-app-red ${isMobile ? 'w-8 h-8' : 'w-10 h-10'}`}>
                  <AlertCircle size={isMobile ? 16 : 20} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className={`${isMobile ? 'space-y-4' : 'grid grid-cols-1 md:grid-cols-3 gap-6'}`}>
          <div className={`${isMobile ? '' : 'col-span-2'}`}>
            <Card className={isMobile ? 'mobile-card' : ''}>
              <CardHeader className={isMobile ? 'pb-3' : ''}>
                <CardTitle className={`font-medium ${isMobile ? 'text-sm' : 'text-base'}`}>
                  {isMobile ? 'Tasks Completion' : 'TASKS COMPLETION'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`${isMobile ? 'h-40' : 'h-64'}`}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={taskCompletionData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis 
                        dataKey="name" 
                        fontSize={isMobile ? 10 : 12}
                        tick={{ fontSize: isMobile ? 10 : 12 }}
                      />
                      <YAxis 
                        fontSize={isMobile ? 10 : 12}
                        tick={{ fontSize: isMobile ? 10 : 12 }}
                      />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#0061FF" 
                        strokeWidth={2}
                        dot={{ r: isMobile ? 3 : 4 }}
                        activeDot={{ r: isMobile ? 4 : 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className={`h-full ${isMobile ? 'mobile-card' : ''}`}>
              <CardHeader className={isMobile ? 'pb-3' : ''}>
                <div className="flex justify-between items-center">
                  <CardTitle className={`font-medium ${isMobile ? 'text-sm' : 'text-base'}`}>
                    {isMobile ? 'Activity Feed' : 'ACTIVITY FEED'}
                  </CardTitle>
                  <div className={`bg-blue-100 text-app-blue rounded-full ${isMobile ? 'text-xs px-2 py-0.5' : 'text-xs px-3 py-1'}`}>
                    LIVE
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className={`${isMobile ? 'space-y-3' : 'space-y-4'}`}>
                  {activities.map((activity, index) => (
                    <div key={index} className={`flex gap-3 ${isMobile ? 'items-start' : ''}`}>
                      <img
                        src={activity.user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${activity.user.name}`}
                        alt={activity.user.name}
                        className={`rounded-full ${isMobile ? 'w-6 h-6 mt-0.5' : 'w-8 h-8'}`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} leading-tight`}>
                          <span className="font-medium">{activity.user.name}</span>
                          {' '}{activity.action}
                        </p>
                        <p className={`text-gray-500 ${isMobile ? 'text-xs mt-0.5' : 'text-xs'}`}>{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
