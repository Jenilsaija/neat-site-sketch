
import React from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Grid2x2, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity } from '@/data/mockData';

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
  return (
    <div className="flex-1 p-6">
      <Header 
        title="Dashboard" 
        user={user} 
        notificationCount={3} 
      />
      
      <div className="mt-6">
        <h2 className="font-semibold mb-4 text-gray-800">PROJECTS OVERVIEW</h2>
        
        <div className="grid grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold">{stats.totalProjects}</p>
                  <p className="text-sm text-gray-500">Total projects</p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-md flex items-center justify-center text-app-blue">
                  <Grid2x2 />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold">{stats.completedProjects}</p>
                  <p className="text-sm text-gray-500">Completed</p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-md flex items-center justify-center text-app-green">
                  <CheckCircle />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold">{stats.inProgressProjects}</p>
                  <p className="text-sm text-gray-500">In progress</p>
                </div>
                <div className="w-10 h-10 bg-yellow-100 rounded-md flex items-center justify-center text-app-yellow">
                  <Clock />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold">{stats.delayedProjects}</p>
                  <p className="text-sm text-gray-500">Out of schedule</p>
                </div>
                <div className="w-10 h-10 bg-red-100 rounded-md flex items-center justify-center text-app-red">
                  <AlertCircle />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">TASKS COMPLETION</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={taskCompletionData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#0061FF" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="h-full">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base font-medium">ACTIVITY FEED</CardTitle>
                  <div className="bg-blue-100 text-app-blue text-xs px-3 py-1 rounded-full">
                    LIVE
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity, index) => (
                    <div key={index} className="flex gap-3">
                      <img
                        src={activity.user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${activity.user.name}`}
                        alt={activity.user.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">{activity.user.name}</span>
                          {' '}{activity.action}
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
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
