
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, ChevronRight } from 'lucide-react';

const Calendar = () => {
  const navigate = useNavigate();
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  // Navigate to Gantt chart view
  const handleViewGanttChart = () => {
    navigate('/gantt');
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>
                View and manage your schedule
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Today</Button>
              <Button onClick={handleViewGanttChart} className="flex items-center gap-2">
                <span>View as Gantt Chart</span>
                <ChevronRight size={16} />
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="md:w-1/2">
          <Card className="shadow-md h-full">
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>
                Your schedule for {date ? date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'today'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((_, index) => (
                  <div key={index} className="flex items-start p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center mr-4">
                      <CalendarIcon className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Meeting with Design Team</h4>
                      <p className="text-sm text-muted-foreground">
                        {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} - 
                        {new Date(Date.now() + 3600000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Events
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
