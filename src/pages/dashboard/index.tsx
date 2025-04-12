
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/components/auth/AuthDialog';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  Calendar, 
  MessageSquare, 
  Users, 
  Award, 
  BookOpen, 
  Bell, 
  Briefcase, 
  UserPlus, 
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { getCurrentStudent } from '@/data/students';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate('/');
    toast({
      title: "Access denied",
      description: "Please login to view your dashboard",
      variant: "destructive"
    });
    return null;
  }

  // Get current student data (in a real app, this would come from an API)
  const studentData = getCurrentStudent();
  
  // Upcoming events (sample data)
  const upcomingEvents = [
    {
      id: 1,
      title: "Mock Interview Session",
      date: "June 15, 2025",
      time: "3:00 PM",
      type: "interview",
      mentor: "Dr. Anand Sharma"
    },
    {
      id: 2,
      title: "Tech Career Workshop",
      date: "June 20, 2025",
      time: "5:30 PM",
      type: "workshop",
      host: "Knowledge Institute Alumni Association"
    }
  ];
  
  // Mentorship connections (sample data)
  const mentorshipConnections = [
    {
      id: 1,
      name: "Dr. Anand Sharma",
      role: "Senior Software Engineer",
      company: "Google",
      avatar: "/lovable-uploads/681b8611-5081-4d74-9a73-6c535d892f2f.png",
      lastInteraction: "2 days ago",
      nextSession: "June 15, 2025"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "UX Design Lead",
      company: "Microsoft",
      avatar: "/lovable-uploads/533e4b15-f9ff-4642-b285-c0d2f8088578.jpg",
      lastInteraction: "1 week ago",
      nextSession: "June 25, 2025"
    }
  ];
  
  // Recent forum activity (sample data)
  const forumActivity = [
    {
      id: 1,
      title: "Tips for software engineering interviews",
      date: "May 28, 2025",
      category: "Career Advice",
      replies: 12
    },
    {
      id: 2,
      title: "Alumni meetup in Bangalore",
      date: "May 25, 2025",
      category: "Events",
      replies: 8
    }
  ];
  
  // Progress metrics (sample data)
  const progressMetrics = {
    mentorshipSessions: 5,
    mockInterviews: 2,
    eventsAttended: 3,
    forumPosts: 8
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Dashboard Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold font-display mb-2">Welcome back, {user?.name || "Alumni"}</h1>
            <p className="text-gray-600">
              Track your mentorship journey, upcoming events, and engagement with the alumni community.
            </p>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { title: "Mentorship Sessions", value: progressMetrics.mentorshipSessions, icon: Users, color: "bg-blue-100 text-blue-700" },
              { title: "Mock Interviews", value: progressMetrics.mockInterviews, icon: Briefcase, color: "bg-green-100 text-green-700" },
              { title: "Events Attended", value: progressMetrics.eventsAttended, icon: Calendar, color: "bg-purple-100 text-purple-700" },
              { title: "Forum Posts", value: progressMetrics.forumPosts, icon: MessageSquare, color: "bg-orange-100 text-orange-700" }
            ].map((stat, index) => (
              <Card key={index} className="hover-scale">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.color}`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Alert for Incomplete Profile (if needed) */}
          {!user?.major && (
            <Alert className="mb-8 border-yellow-300 bg-yellow-50">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <AlertTitle className="text-yellow-800">Complete your profile</AlertTitle>
              <AlertDescription className="text-yellow-700">
                Adding more details to your profile will help us connect you with relevant mentors and opportunities.
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-yellow-800 font-semibold ml-2"
                  onClick={() => navigate("/alumni")}
                >
                  Update now
                </Button>
              </AlertDescription>
            </Alert>
          )}
          
          {/* Main Dashboard Tabs */}
          <Tabs defaultValue="overview" className="mb-8" onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="forum">Forum Activity</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Upcoming Sessions & Events */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-nexus-primary" />
                    Upcoming Events & Sessions
                  </CardTitle>
                  <CardDescription>
                    Your scheduled mentorship sessions and upcoming alumni events
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {upcomingEvents.length > 0 ? (
                    <ul className="space-y-4">
                      {upcomingEvents.map(event => (
                        <li key={event.id} className="flex flex-col md:flex-row md:items-center justify-between p-3 border rounded-md hover:bg-gray-50">
                          <div>
                            <h4 className="font-medium text-lg">{event.title}</h4>
                            <p className="text-gray-600">{event.date} at {event.time}</p>
                            {event.mentor && <p className="text-sm text-nexus-primary">With: {event.mentor}</p>}
                          </div>
                          <Button 
                            variant="outline" 
                            className="mt-2 md:mt-0"
                            onClick={() => {
                              toast({
                                title: "Calendar synced",
                                description: `${event.title} has been added to your calendar.`
                              })
                            }}
                          >
                            Add to Calendar
                          </Button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-center py-6">No upcoming events. Check the Events page to sign up!</p>
                  )}
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="ghost" className="text-nexus-primary" onClick={() => navigate("/events")}>
                    View All Events <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Mentorship Connections */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="mr-2 h-5 w-5 text-nexus-primary" />
                    Your Mentorship Connections
                  </CardTitle>
                  <CardDescription>
                    Stay in touch with your mentors and track your progress
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {mentorshipConnections.length > 0 ? (
                    <ul className="space-y-4">
                      {mentorshipConnections.map(connection => (
                        <li key={connection.id} className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50">
                          <div className="flex items-center">
                            <img 
                              src={connection.avatar} 
                              alt={connection.name} 
                              className="h-12 w-12 rounded-full mr-3 object-cover"
                            />
                            <div>
                              <h4 className="font-medium">{connection.name}</h4>
                              <p className="text-sm text-gray-600">{connection.role} at {connection.company}</p>
                              <p className="text-xs text-gray-500">Next session: {connection.nextSession}</p>
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            className="text-nexus-primary"
                            onClick={() => navigate("/chat")}
                          >
                            Message
                          </Button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-gray-500 mb-3">You haven't connected with any mentors yet.</p>
                      <Button onClick={() => navigate("/mentorship")}>Find a Mentor</Button>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="ghost" className="text-nexus-primary" onClick={() => navigate("/mentorship")}>
                    Find More Mentors <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Recent Forum Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5 text-nexus-primary" />
                    Recent Forum Activity
                  </CardTitle>
                  <CardDescription>
                    Stay updated with discussions in the alumni community
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {forumActivity.length > 0 ? (
                    <ul className="space-y-2">
                      {forumActivity.map(post => (
                        <li key={post.id} className="p-3 border rounded-md hover:bg-gray-50">
                          <h4 className="font-medium">{post.title}</h4>
                          <div className="flex justify-between text-sm">
                            <span className="text-nexus-primary">{post.category}</span>
                            <span className="text-gray-500">{post.date} • {post.replies} replies</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-center py-6">No recent forum activity.</p>
                  )}
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="ghost" className="text-nexus-primary" onClick={() => navigate("/forum")}>
                    Visit Forum <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Mentorship Tab */}
            <TabsContent value="mentorship">
              <Card>
                <CardHeader>
                  <CardTitle>Your Mentorship Journey</CardTitle>
                  <CardDescription>
                    Track your progress and manage your mentorship relationships
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Mentorship Goals */}
                    <div>
                      <h3 className="text-lg font-medium mb-3">Your Goals</h3>
                      <div className="border rounded-md p-4">
                        <ul className="space-y-2">
                          {studentData.careerGoals?.map((goal, index) => (
                            <li key={index} className="flex items-center">
                              <div className="h-2 w-2 bg-nexus-primary rounded-full mr-2"></div>
                              <span>{goal}</span>
                            </li>
                          ))}
                        </ul>
                        <Button variant="outline" className="mt-4 w-full">Edit Goals</Button>
                      </div>
                    </div>
                    
                    {/* Session History */}
                    <div>
                      <h3 className="text-lg font-medium mb-3">Session History</h3>
                      {studentData.sessionHistory && studentData.sessionHistory.length > 0 ? (
                        <Accordion type="single" collapsible className="border rounded-md">
                          {studentData.sessionHistory.map((session, index) => (
                            <AccordionItem value={`session-${index}`} key={index}>
                              <AccordionTrigger className="px-4">
                                <div className="flex flex-col items-start">
                                  <span className="font-medium">{session.topic}</span>
                                  <span className="text-sm text-gray-500">{session.date}</span>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="px-4">
                                <div className="space-y-2">
                                  <p><strong>Status:</strong> {session.status}</p>
                                  {session.rating && <p><strong>Rating:</strong> {session.rating}/5</p>}
                                  {session.notes && <p><strong>Notes:</strong> {session.notes}</p>}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      ) : (
                        <div className="text-center py-6 border rounded-md">
                          <p className="text-gray-500 mb-3">No session history yet.</p>
                          <Button onClick={() => navigate("/mentorship")}>Schedule a Session</Button>
                        </div>
                      )}
                    </div>
                    
                    {/* Recommended Mentors */}
                    <div>
                      <h3 className="text-lg font-medium mb-3">Recommended Mentors</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { 
                            name: "Michael Chen", 
                            role: "Product Manager", 
                            company: "Amazon",
                            avatar: "/lovable-uploads/d4764814-25a7-4fe4-aa26-ef395ab96aea.jpg",
                            match: "95% match" 
                          },
                          { 
                            name: "Priya Sharma", 
                            role: "Data Scientist", 
                            company: "Microsoft",
                            avatar: "/lovable-uploads/8ee7877a-cbd3-4121-a549-d044b60c6f6f.png",
                            match: "92% match" 
                          }
                        ].map((mentor, index) => (
                          <Card key={index} className="hover-scale">
                            <CardContent className="pt-6">
                              <div className="flex items-center">
                                <img 
                                  src={mentor.avatar} 
                                  alt={mentor.name} 
                                  className="h-12 w-12 rounded-full mr-3 object-cover"
                                />
                                <div>
                                  <h4 className="font-medium">{mentor.name}</h4>
                                  <p className="text-sm text-gray-600">{mentor.role} at {mentor.company}</p>
                                  <p className="text-xs text-green-600 font-medium">{mentor.match}</p>
                                </div>
                              </div>
                              <Button 
                                variant="outline" 
                                className="w-full mt-4"
                                onClick={() => navigate("/mentorship")}
                              >
                                View Profile
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Events Tab */}
            <TabsContent value="events">
              <Card>
                <CardHeader>
                  <CardTitle>Your Events</CardTitle>
                  <CardDescription>
                    Track your registered events and find new ones to attend
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Registered Events */}
                  <div>
                    <h3 className="text-lg font-medium mb-3">Registered Events</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {upcomingEvents.map(event => (
                        <Card key={event.id} className="hover-scale">
                          <CardContent className="pt-6">
                            <div className="flex justify-between">
                              <div>
                                <h4 className="font-medium">{event.title}</h4>
                                <p className="text-sm text-gray-600">{event.date} at {event.time}</p>
                                {event.mentor && <p className="text-xs text-nexus-primary">With: {event.mentor}</p>}
                              </div>
                              <div className={`p-2 rounded-full ${event.type === 'interview' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                                {event.type === 'interview' ? (
                                  <Briefcase className="h-5 w-5" />
                                ) : (
                                  <Users className="h-5 w-5" />
                                )}
                              </div>
                            </div>
                            <div className="flex gap-2 mt-4">
                              <Button 
                                variant="outline" 
                                className="flex-1"
                                onClick={() => {
                                  toast({
                                    title: "Calendar reminder set",
                                    description: `You'll receive a reminder before ${event.title}.`
                                  })
                                }}
                              >
                                Set Reminder
                              </Button>
                              <Button 
                                variant="outline" 
                                className="flex-1 text-red-600 hover:text-red-600"
                                onClick={() => {
                                  toast({
                                    title: "Event canceled",
                                    description: "You have been removed from this event."
                                  })
                                }}
                              >
                                Cancel
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                  
                  {/* Recommended Events */}
                  <div>
                    <h3 className="text-lg font-medium mb-3">Recommended for You</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { 
                          title: "Resume Building Workshop", 
                          date: "June 30, 2025", 
                          time: "2:00 PM",
                          host: "Career Services",
                          type: "workshop"
                        },
                        { 
                          title: "Alumni Networking Mixer", 
                          date: "July 5, 2025", 
                          time: "6:00 PM",
                          host: "Alumni Association",
                          type: "networking"
                        }
                      ].map((event, index) => (
                        <Card key={index} className="hover-scale">
                          <CardContent className="pt-6">
                            <div className="flex justify-between">
                              <div>
                                <h4 className="font-medium">{event.title}</h4>
                                <p className="text-sm text-gray-600">{event.date} at {event.time}</p>
                                <p className="text-xs text-gray-500">Hosted by: {event.host}</p>
                              </div>
                              <div className={`p-2 rounded-full ${event.type === 'workshop' ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'}`}>
                                {event.type === 'workshop' ? (
                                  <BookOpen className="h-5 w-5" />
                                ) : (
                                  <Users className="h-5 w-5" />
                                )}
                              </div>
                            </div>
                            <Button 
                              className="w-full mt-4"
                              onClick={() => {
                                toast({
                                  title: "Registration successful",
                                  description: `You're now registered for ${event.title}.`
                                })
                              }}
                            >
                              Register
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="ghost" className="text-nexus-primary" onClick={() => navigate("/events")}>
                    View All Events <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Forum Activity Tab */}
            <TabsContent value="forum">
              <Card>
                <CardHeader>
                  <CardTitle>Your Forum Activity</CardTitle>
                  <CardDescription>
                    Track your posts, replies and favorite discussions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Your Posts */}
                  <div>
                    <h3 className="text-lg font-medium mb-3">Your Posts</h3>
                    {forumActivity.length > 0 ? (
                      <ul className="space-y-3">
                        {forumActivity.map(post => (
                          <li key={post.id} className="p-3 border rounded-md hover:bg-gray-50">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{post.title}</h4>
                                <div className="flex text-sm">
                                  <span className="text-nexus-primary mr-3">{post.category}</span>
                                  <span className="text-gray-500">{post.date}</span>
                                </div>
                              </div>
                              <div className="bg-gray-100 px-2 py-1 rounded text-sm">
                                {post.replies} replies
                              </div>
                            </div>
                            <div className="flex gap-2 mt-3">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => navigate(`/forum/post/${post.id}`)}
                              >
                                View Discussion
                              </Button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-center py-6 border rounded-md">
                        <p className="text-gray-500 mb-3">You haven't created any posts yet.</p>
                        <Button onClick={() => navigate("/forum")}>Start a Discussion</Button>
                      </div>
                    )}
                  </div>
                  
                  {/* Popular Topics */}
                  <div>
                    <h3 className="text-lg font-medium mb-3">Popular Topics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { category: "Career Advice", posts: 156 },
                        { category: "Technical Discussions", posts: 89 },
                        { category: "Alumni Networking", posts: 122 }
                      ].map((topic, index) => (
                        <Card key={index} className="hover-scale">
                          <CardContent className="pt-6 text-center">
                            <h4 className="font-medium text-lg">{topic.category}</h4>
                            <p className="text-gray-500">{topic.posts} posts</p>
                            <Button 
                              variant="outline" 
                              className="mt-4 w-full"
                              onClick={() => navigate(`/forum/category/${topic.category.toLowerCase().replace(/\s+/g, '-')}`)}
                            >
                              Browse
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="ghost" className="text-nexus-primary" onClick={() => navigate("/forum")}>
                    Go to Forum <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Dashboard;
