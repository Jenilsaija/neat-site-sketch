
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChartContainer, ChartLegend, ChartLegendContent } from '@/components/ui/chart';

interface Task {
  id: string;
  name: string;
  start: Date;
  end: Date;
  progress: number;
  assignee: string;
  priority: 'low' | 'medium' | 'high';
  status: 'not-started' | 'in-progress' | 'completed';
}

const GanttChart = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('week');
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Sample data for the Gantt chart
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      name: 'Research & Planning',
      start: new Date(2025, 4, 15),
      end: new Date(2025, 4, 20),
      progress: 100,
      assignee: 'John Doe',
      priority: 'high',
      status: 'completed'
    },
    {
      id: '2',
      name: 'UI/UX Design',
      start: new Date(2025, 4, 18),
      end: new Date(2025, 4, 25),
      progress: 70,
      assignee: 'Alice Smith',
      priority: 'medium',
      status: 'in-progress'
    },
    {
      id: '3',
      name: 'Frontend Development',
      start: new Date(2025, 4, 22),
      end: new Date(2025, 5, 5),
      progress: 30,
      assignee: 'Bob Johnson',
      priority: 'medium',
      status: 'in-progress'
    },
    {
      id: '4',
      name: 'Backend Integration',
      start: new Date(2025, 4, 28),
      end: new Date(2025, 5, 10),
      progress: 0,
      assignee: 'Jane Wilson',
      priority: 'high',
      status: 'not-started'
    },
    {
      id: '5',
      name: 'Testing & QA',
      start: new Date(2025, 5, 6),
      end: new Date(2025, 5, 15),
      progress: 0,
      assignee: 'Mike Brown',
      priority: 'medium',
      status: 'not-started'
    }
  ]);

  // Navigate to previous Calendar view
  const handleBackToCalendar = () => {
    navigate('/calendar');
  };

  // Get dates for time scale based on view mode
  const getDatesForView = () => {
    const dates = [];
    const startDate = new Date(currentDate);
    
    // Set start date to beginning of period
    if (viewMode === 'day') {
      startDate.setDate(startDate.getDate() - 2);
      for (let i = 0; i < 5; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        dates.push(date);
      }
    } else if (viewMode === 'week') {
      startDate.setDate(startDate.getDate() - startDate.getDay());
      for (let i = 0; i < 14; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        dates.push(date);
      }
    } else if (viewMode === 'month') {
      startDate.setDate(1);
      const lastDay = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate();
      for (let i = 0; i < lastDay; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        dates.push(date);
      }
    }
    
    return dates;
  };

  // Format date based on view mode
  const formatDate = (date: Date) => {
    if (viewMode === 'day') {
      return date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
    } else if (viewMode === 'week') {
      return date.getDate().toString();
    } else {
      return date.getDate().toString();
    }
  };

  // Calculate task position and width on the timeline
  const getTaskStyle = (task: Task) => {
    const dates = getDatesForView();
    if (!dates.length) return { display: 'none' };
    
    const startTime = task.start.getTime();
    const endTime = task.end.getTime();
    const timelineStart = dates[0].getTime();
    const timelineEnd = dates[dates.length - 1].getTime();
    const timelineWidth = timelineEnd - timelineStart;
    
    // Calculate position
    let left = ((startTime - timelineStart) / timelineWidth) * 100;
    let width = ((endTime - startTime) / timelineWidth) * 100;
    
    // Ensure task is visible if it overlaps with timeline
    if (left < 0) {
      width += left; // Reduce width by the overflow amount
      left = 0;
    }
    if (left + width > 100) {
      width = 100 - left;
    }
    
    // Don't show tasks outside the timeline
    if (width <= 0 || left >= 100) {
      return { display: 'none' };
    }
    
    return {
      left: `${left}%`,
      width: `${width}%`,
    };
  };

  // Get color for task priority
  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-amber-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-blue-500';
    }
  };

  // Get color for task status
  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 border-green-500';
      case 'in-progress': return 'bg-blue-100 border-blue-500';
      case 'not-started': return 'bg-gray-100 border-gray-500';
      default: return 'bg-gray-100 border-gray-500';
    }
  };

  // Change the current view date
  const navigateTimeline = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (viewMode === 'day') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    } else {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  const dates = getDatesForView();

  return (
    <div className="container mx-auto py-6">
      <Card className="shadow-md">
        <CardHeader className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleBackToCalendar} 
              className="mb-2 sm:mb-0"
            >
              <ChevronLeft size={16} className="mr-1" />
              Back to Calendar
            </Button>
            <CardTitle className="text-xl mt-2">Project Gantt Chart</CardTitle>
            <CardDescription>
              Timeline visualization of project tasks
            </CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => navigateTimeline('prev')}
              >
                <ChevronLeft size={16} />
              </Button>
              <div className="flex items-center gap-2 px-2">
                <Calendar size={16} />
                <span>
                  {currentDate.toLocaleDateString('en-US', { 
                    month: 'short',
                    year: 'numeric',
                    ...(viewMode === 'day' && { day: 'numeric' })
                  })}
                </span>
              </div>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => navigateTimeline('next')}
              >
                <ChevronRight size={16} />
              </Button>
            </div>
            <Select 
              value={viewMode} 
              onValueChange={(value) => setViewMode(value as 'day' | 'week' | 'month')}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="View" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Day</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="month">Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Timeline Header */}
            <div className="flex border-b border-border">
              <div className="w-64 min-w-64 p-4 border-r border-border">
                <Input
                  placeholder="Search tasks..."
                  className="h-9"
                />
              </div>
              <div className="flex-1 flex">
                {dates.map((date, index) => (
                  <div 
                    key={index}
                    className={`
                      flex-1 p-2 text-center text-xs font-medium border-r border-border last:border-r-0
                      ${date.getDay() === 0 || date.getDay() === 6 ? 'bg-muted/50' : ''}
                      ${date.toDateString() === new Date().toDateString() ? 'bg-primary/10' : ''}
                    `}
                  >
                    {viewMode === 'week' && index % 7 === 0 && (
                      <div className="text-xs text-muted-foreground mb-1">
                        {date.toLocaleDateString('en-US', { month: 'short' })}
                      </div>
                    )}
                    <div className={`
                      ${date.toDateString() === new Date().toDateString() ? 'text-primary font-bold' : ''}
                    `}>
                      {formatDate(date)}
                    </div>
                    {viewMode === 'day' && (
                      <div className="text-xs text-muted-foreground mt-1">
                        {date.toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Gantt Chart Body */}
            <div className="flex flex-col">
              {tasks.map((task) => (
                <div key={task.id} className="flex border-b border-border last:border-b-0 hover:bg-accent/50 transition-colors">
                  <div className="w-64 min-w-64 p-4 border-r border-border">
                    <div className="flex flex-col">
                      <div className="font-medium">{task.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">Assigned to: {task.assignee}</div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`inline-block w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`}></span>
                        <span className="text-xs capitalize">{task.priority} Priority</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 relative h-20">
                    {/* Task Bar */}
                    <div 
                      className={`
                        absolute top-1/2 -translate-y-1/2 h-8 rounded-md border-2 cursor-pointer
                        ${getStatusColor(task.status)}
                      `}
                      style={getTaskStyle(task)}
                    >
                      <div className="px-2 py-1 text-xs truncate">
                        <div className="font-medium">{task.name}</div>
                        <div className="flex justify-between">
                          <span>{task.progress}%</span>
                          <span>
                            {task.start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - 
                            {task.end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                      </div>
                      {/* Progress Bar */}
                      <div 
                        className={`absolute bottom-0 left-0 h-1 ${task.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'}`}
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full bg-green-100 border-2 border-green-500"></span>
              <span className="text-xs">Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full bg-blue-100 border-2 border-blue-500"></span>
              <span className="text-xs">In Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full bg-gray-100 border-2 border-gray-500"></span>
              <span className="text-xs">Not Started</span>
            </div>
          </div>
          <Button variant="outline" size="sm">
            Export
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default GanttChart;
