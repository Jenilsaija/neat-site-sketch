
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, ChevronRight, Clock, User } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Import for database integration demo
import { currentUser } from '@/data/mockData';

// In a real application, this would be imported from our database layer
// import { getEventsByDateRange } from '@/db/queries/calendarQueries';

const Calendar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Navigate to Gantt chart view
  const handleViewGanttChart = () => {
    navigate('/gantt');
  };

  // In a real application, this would fetch events from the database
  useEffect(() => {
    if (!date) return;
    
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        // Simulate API call to database
        // In a real app with MySQL integration:
        // const startOfDay = new Date(date);
        // startOfDay.setHours(0, 0, 0, 0);
        // const endOfDay = new Date(date);
        // endOfDay.setHours(23, 59, 59, 999);
        // const events = await getEventsByDateRange(currentUser.id, startOfDay, endOfDay);
        
        // For demo purposes, we'll use mock data
        const mockEvents = [
          {
            id: 1,
            title: 'Design Team Meeting',
            description: 'Weekly design team sync',
            start_datetime: new Date(date).setHours(10, 0),
            end_datetime: new Date(date).setHours(11, 0),
            user: {
              id: 1,
              name: 'Jane Cooper',
              avatar: 'https://i.pravatar.cc/150?img=5'
            }
          },
          {
            id: 2,
            title: 'Website Redesign Presentation',
            description: 'Present wireframes to stakeholders',
            start_datetime: new Date(date).setHours(14, 0),
            end_datetime: new Date(date).setHours(15, 30),
            user: {
              id: 1,
              name: 'Jane Cooper',
              avatar: 'https://i.pravatar.cc/150?img=5'
            }
          },
          {
            id: 3,
            title: 'User Research Review',
            description: 'Review findings from user interviews',
            start_datetime: new Date(date).setHours(13, 0),
            end_datetime: new Date(date).setHours(14, 0),
            user: {
              id: 2,
              name: 'Alex Rivera',
              avatar: 'https://i.pravatar.cc/150?img=8'
            }
          }
        ];
        
        setTimeout(() => {
          setEvents(mockEvents);
          setIsLoading(false);
        }, 500); // Simulate network delay
      } catch (error) {
        console.error('Error fetching events:', error);
        toast({
          title: 'Error',
          description: 'Failed to load events. Please try again.',
          variant: 'destructive',
        });
        setIsLoading(false);
      }
    };
    
    fetchEvents();
  }, [date, toast]);

  // Format time for display
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
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
              <Button 
                variant="outline" 
                onClick={() => setDate(new Date())}
              >
                Today
              </Button>
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
              <CardTitle>Events</CardTitle>
              <CardDescription>
                Your schedule for {date ? date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'today'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="flex items-start p-3 rounded-lg border border-border animate-pulse">
                      <div className="flex-shrink-0 w-12 h-12 bg-muted rounded-md mr-4"></div>
                      <div className="flex-grow">
                        <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-muted rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : events.length > 0 ? (
                <div className="space-y-4">
                  {events.map((event) => (
                    <div 
                      key={event.id} 
                      className="flex items-start p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center mr-4">
                        <CalendarIcon className="text-primary" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <Clock size={14} />
                          {formatTime(event.start_datetime)} - {formatTime(event.end_datetime)}
                        </p>
                        {event.description && (
                          <p className="text-sm mt-1">{event.description}</p>
                        )}
                        <div className="flex items-center gap-1 mt-2">
                          <User size={14} className="text-muted-foreground" />
                          <div className="flex items-center">
                            <Avatar className="h-5 w-5 mr-1">
                              <AvatarImage src={event.user.avatar} alt={event.user.name} />
                              <AvatarFallback>{event.user.name[0]}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-muted-foreground">{event.user.name}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <CalendarIcon className="h-12 w-12 text-muted-foreground mb-3" />
                  <h3 className="text-lg font-medium">No events for this day</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Select a different date or add a new event
                  </p>
                  <Button className="mt-4" variant="outline">
                    Add Event
                  </Button>
                </div>
              )}
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
