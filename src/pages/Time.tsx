
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Play, Pause, Clock, Calendar, BarChart2, Plus, Filter } from 'lucide-react';
import { currentUser } from '@/data/mockData';
import { format } from 'date-fns';
import Layout from '@/components/Layout';

// Define interface for time entry
interface TimeEntry {
  id: number;
  project: string;
  task: string;
  startTime: Date;
  endTime: Date;
  color: string;
}

// Mock time entries data
const timeEntries: TimeEntry[] = [
  { 
    id: 1, 
    project: 'Website Redesign', 
    task: 'Homepage UI Design', 
    startTime: new Date('2025-05-20T09:30:00'), 
    endTime: new Date('2025-05-20T12:15:00'),
    color: '#8B5CF6'
  },
  { 
    id: 2, 
    project: 'Mobile App', 
    task: 'User Authentication Flow', 
    startTime: new Date('2025-05-20T13:00:00'), 
    endTime: new Date('2025-05-20T15:45:00'),
    color: '#F97316'
  },
  { 
    id: 3, 
    project: 'Website Redesign', 
    task: 'Responsive Testing', 
    startTime: new Date('2025-05-19T10:00:00'), 
    endTime: new Date('2025-05-19T12:30:00'),
    color: '#8B5CF6'
  },
  { 
    id: 4, 
    project: 'Database Migration', 
    task: 'Schema Planning', 
    startTime: new Date('2025-05-19T14:15:00'), 
    endTime: new Date('2025-05-19T17:00:00'),
    color: '#0EA5E9'
  }
];

// Define interface for grouped entries
interface GroupedTimeEntries {
  date: string;
  formattedDate: string;
  entries: TimeEntry[];
  totalTime: number;
}

// Group entries by date
const groupEntriesByDate = (entries: TimeEntry[]): GroupedTimeEntries[] => {
  const grouped: Record<string, TimeEntry[]> = {};
  
  entries.forEach(entry => {
    const dateKey = format(entry.startTime, 'yyyy-MM-dd');
    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }
    grouped[dateKey].push(entry);
  });
  
  return Object.entries(grouped)
    .map(([date, entries]) => ({
      date,
      formattedDate: format(new Date(date), 'EEEE, MMMM d, yyyy'),
      entries,
      totalTime: entries.reduce((total, entry) => {
        const duration = (entry.endTime.getTime() - entry.startTime.getTime()) / (1000 * 60);
        return total + duration;
      }, 0)
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  return `${hours}h ${mins}m`;
};

const TimePage = () => {
  const [activeTimer, setActiveTimer] = useState<number | null>(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const groupedEntries = groupEntriesByDate(timeEntries);
  
  const toggleTimer = () => {
    setTimerRunning(!timerRunning);
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Time Tracking</h1>
            <p className="text-muted-foreground">Monitor and manage your work hours across projects</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Time Entry
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="timeline" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="timeline">
              <Calendar className="h-4 w-4 mr-2" />
              Timeline
            </TabsTrigger>
            <TabsTrigger value="reports">
              <BarChart2 className="h-4 w-4 mr-2" />
              Reports
            </TabsTrigger>
            <TabsTrigger value="timer">
              <Clock className="h-4 w-4 mr-2" />
              Timer
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="timeline" className="space-y-4 mt-4">
            {/* Active timer card */}
            {timerRunning && (
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-lg">Mobile App</h3>
                      <p className="text-muted-foreground">API Integration</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-lg font-mono">02:45:18</div>
                      <Button variant="outline" size="icon" onClick={toggleTimer} className="h-9 w-9">
                        <Pause className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Time entries by date */}
            {groupedEntries.map((group) => (
              <div key={group.date} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{group.formattedDate}</h3>
                  <p className="text-sm text-muted-foreground">Total: {formatDuration(group.totalTime)}</p>
                </div>
                
                <div className="space-y-2">
                  {group.entries.map((entry) => (
                    <Card key={entry.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex">
                          <div 
                            className="w-1.5 h-full" 
                            style={{ backgroundColor: entry.color }}
                          />
                          <div className="p-4 flex-1">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                              <div>
                                <h4 className="font-medium">{entry.task}</h4>
                                <p className="text-sm text-muted-foreground">{entry.project}</p>
                              </div>
                              <div className="flex items-center gap-4">
                                <p className="text-sm">
                                  {format(entry.startTime, 'h:mm a')} - {format(entry.endTime, 'h:mm a')}
                                </p>
                                <p className="font-medium">
                                  {formatDuration((entry.endTime.getTime() - entry.startTime.getTime()) / (1000 * 60))}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Time Reports</CardTitle>
                <CardDescription>Analyze your time allocation across projects and tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center border border-dashed rounded-lg">
                  <p className="text-muted-foreground">Charts and reports will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="timer" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Timer</CardTitle>
                <CardDescription>Track time for your current task</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center space-y-4 py-6">
                  <div className="text-5xl font-mono font-light">
                    {timerRunning ? "02:45:18" : "00:00:00"}
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant={timerRunning ? "outline" : "default"} 
                      size="lg" 
                      onClick={toggleTimer}
                    >
                      {timerRunning ? (
                        <>
                          <Pause className="h-4 w-4 mr-2" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Start
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div>
                  <p className="text-sm font-medium">Project</p>
                  <p className="text-sm text-muted-foreground">Mobile App</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Task</p>
                  <p className="text-sm text-muted-foreground">API Integration</p>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default TimePage;
