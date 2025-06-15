import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MessageSquare, Calendar, BookOpen, Award, Bell, User, Settings, LogOut, CheckCircle2, Clock, Users, GraduationCap } from 'lucide-react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useUserAchievements } from "@/hooks/useUserAchievements";
import { useUserPoints } from "@/hooks/useUserPoints";
import { useNotificationPreferences } from "@/hooks/useNotificationPreferences";
import AchievementSummary from "@/components/dashboard/AchievementSummary";
import { PointsSummary } from "@/components/dashboard/PointsSummary";
import { NotificationPreferencesCard } from "@/components/dashboard/NotificationPreferencesCard";

// Mock data for charts
const mentorshipData = [
  { name: 'Active', value: 4 },
  { name: 'Completed', value: 7 },
  { name: 'Pending', value: 2 },
];

const activityData = [
  { name: 'Jan', sessions: 2 },
  { name: 'Feb', sessions: 3 },
  { name: 'Mar', sessions: 1 },
  { name: 'Apr', sessions: 4 },
  { name: 'May', sessions: 3 },
  { name: 'Jun', sessions: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

// Mock user data
const userData = {
  name: 'Sarah Johnson',
  email: 'sarah.johnson@example.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
};

// Mock upcoming sessions
const upcomingSessions = [
  { id: 1, type: 'Mentorship', title: 'Career Path Discussion', mentor: 'David Chen', date: 'April 15, 2025', time: '3:00 PM', status: 'confirmed' },
  { id: 2, type: 'Mock Interview', title: 'Technical Interview Prep', mentor: 'Priya Sharma', date: 'April 18, 2025', time: '2:00 PM', status: 'pending' },
];

// Mock notifications
const notifications = [
  { id: 1, type: 'message', content: 'New message from David Chen', time: '2 hours ago' },
  { id: 2, type: 'event', content: 'Upcoming webinar: "Breaking into Tech"', time: '1 day ago' },
  { id: 3, type: 'mentorship', content: 'Mentorship request accepted by Priya Sharma', time: '2 days ago' },
];

// Mock achievements
const achievements = [
  { id: 1, title: 'First Mentorship Session', description: 'Completed your first mentorship session', date: 'March 10, 2025' },
  { id: 2, title: 'Network Builder', description: 'Connected with 5 alumni', date: 'March 25, 2025' },
];

// TODO: Replace this with real authentication.
const userId = "placeholder-user-id"; // Replace with logic to get current user's id.

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Use live hooks for achievements, points, notification preferences.
  const {
    data: earnedAchievements,
    isLoading: achievementsLoading,
  } = useUserAchievements(userId);
  const {
    data: userPoints,
    isLoading: pointsLoading,
  } = useUserPoints(userId);
  const {
    data: notifPrefs,
    updatePreferences,
    updating: notifUpdating,
    isLoading: notifLoading,
  } = useNotificationPreferences(userId);

  return (
    <TooltipProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow py-8 px-4 bg-gray-50">
          <div className="container mx-auto">
            {/* Extra: Show points summary on dashboard */}
            <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <PointsSummary points={userPoints?.points ?? 0} />
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Achievements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {achievementsLoading ? (
                      <div>Loading…</div>
                    ) : (
                      <AchievementSummary achievements={earnedAchievements ?? []} />
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Notification Preferences */}
            <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage what and how you get notified</CardDescription>
                </CardHeader>
                <CardContent>
                  <NotificationPreferencesCard
                    preferences={notifPrefs || {}}
                    onUpdate={updatePreferences}
                    updating={notifUpdating}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="mb-8 flex flex-col md:flex-row justify-between items-start gap-4">
              <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-gray-600">Welcome back, {userData.name}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Bell className="h-4 w-4" />
                  <span className="hidden sm:inline">Notifications</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Settings</span>
                </Button>
              </div>
            </div>
            
            {/* User Profile Card */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
              <Card className="lg:col-span-1 w-full">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src={userData.avatar} alt={userData.name} />
                      <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-semibold">{userData.name}</h2>
                    <p className="text-gray-500 mb-2">{userData.email}</p>
                    <Badge className="mb-4">Student</Badge>
                    
                    <div className="w-full border-t mt-4 pt-4">
                      <Button variant="outline" className="w-full mb-2 justify-start">
                        <User className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Button>
                      <Button variant="outline" className="w-full mb-2 justify-start">
                        <Settings className="mr-2 h-4 w-4" />
                        Account Settings
                      </Button>
                      <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50">
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="lg:col-span-3">
                <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
                  <TabsList className="mb-6">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
                    <TabsTrigger value="resources">Resources</TabsTrigger>
                    <TabsTrigger value="achievements">Achievements</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Activity Summary */}
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle>Activity Summary</CardTitle>
                          <CardDescription>Your recent platform activity</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={activityData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="sessions" stroke="#8884d8" />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </CardContent>
                      </Card>
                      
                      {/* Mentorship Status */}
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle>Mentorship Status</CardTitle>
                          <CardDescription>Overview of your mentorship sessions</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="h-64 flex items-center justify-center">
                            <PieChart width={200} height={200}>
                              <Pie
                                data={mentorshipData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              >
                                {mentorshipData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                            </PieChart>
                          </div>
                          <div className="flex flex-wrap justify-center gap-4 mt-4">
                            {mentorshipData.map((entry, index) => (
                              <div key={entry.name} className="flex items-center">
                                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                                <span className="text-sm">{entry.name}: {entry.value}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                      
                      {/* Upcoming Sessions */}
                      <Card className="md:col-span-2">
                        <CardHeader className="pb-2">
                          <CardTitle>Upcoming Sessions</CardTitle>
                          <CardDescription>Your scheduled mentorship sessions and mock interviews</CardDescription>
                        </CardHeader>
                        <CardContent>
                          {upcomingSessions.length > 0 ? (
                            <div className="space-y-4">
                              {upcomingSessions.map((session) => (
                                <div key={session.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border rounded-lg">
                                  <div className="bg-primary/10 p-3 rounded-full">
                                    {session.type === 'Mentorship' ? (
                                      <Users className="h-6 w-6 text-primary" />
                                    ) : (
                                      <GraduationCap className="h-6 w-6 text-primary" />
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                      <div>
                                        <h3 className="font-medium">{session.title}</h3>
                                        <p className="text-sm text-gray-500">with {session.mentor}</p>
                                      </div>
                                      <Badge variant={session.status === 'confirmed' ? 'default' : 'outline'}>
                                        {session.status === 'confirmed' ? (
                                          <CheckCircle2 className="mr-1 h-3 w-3" />
                                        ) : (
                                          <Clock className="mr-1 h-3 w-3" />
                                        )}
                                        {session.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                                      </Badge>
                                    </div>
                                    <div className="flex items-center mt-2 text-sm text-gray-500">
                                      <Calendar className="mr-1 h-3 w-3" />
                                      <span>{session.date}, {session.time}</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-8">
                              <p className="text-gray-500">No upcoming sessions scheduled</p>
                              <Button variant="outline" className="mt-2">Schedule a Session</Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="mentorship">
                    <Card>
                      <CardHeader>
                        <CardTitle>Mentorship Program</CardTitle>
                        <CardDescription>
                          Your mentorship connections and progress
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <Alert>
                            <MessageSquare className="h-4 w-4" />
                            <AlertTitle>Your mentorship journey</AlertTitle>
                            <AlertDescription>
                              You have completed 7 mentorship sessions so far. Your next scheduled session is on April 15, 2025.
                            </AlertDescription>
                          </Alert>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="border rounded-lg p-4">
                              <h3 className="font-medium mb-2">Your Mentors</h3>
                              <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                  <Avatar>
                                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=David" />
                                    <AvatarFallback>DC</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium">David Chen</p>
                                    <p className="text-sm text-gray-500">Software Engineer at Google</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <Avatar>
                                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Priya" />
                                    <AvatarFallback>PS</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium">Priya Sharma</p>
                                    <p className="text-sm text-gray-500">Product Manager at Adobe</p>
                                  </div>
                                </div>
                              </div>
                              <Button variant="outline" className="w-full mt-3">Find More Mentors</Button>
                            </div>
                            
                            <div className="border rounded-lg p-4">
                              <h3 className="font-medium mb-2">Recommended Programs</h3>
                              <div className="space-y-3">
                                <div className="border rounded p-3">
                                  <h4 className="font-medium">Career Transitions</h4>
                                  <p className="text-sm text-gray-500 mb-2">5-week program for career changers</p>
                                  <Button size="sm">Learn More</Button>
                                </div>
                                <div className="border rounded p-3">
                                  <h4 className="font-medium">Technical Interview Prep</h4>
                                  <p className="text-sm text-gray-500 mb-2">8-week mock interview program</p>
                                  <Button size="sm">Learn More</Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="resources">
                    <Card>
                      <CardHeader>
                        <CardTitle>Learning Resources</CardTitle>
                        <CardDescription>
                          Personalized resources based on your career interests
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-lg">Resume Builder</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-sm mb-4">Create an industry-standard resume with our AI-powered tool</p>
                                <Button variant="outline" size="sm">Get Started</Button>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-lg">Interview Guides</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-sm mb-4">Practice with our comprehensive interview preparation guides</p>
                                <Button variant="outline" size="sm">Access Guides</Button>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-lg">Career Paths</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-sm mb-4">Explore different career paths based on your degree and interests</p>
                                <Button variant="outline" size="sm">Explore Paths</Button>
                              </CardContent>
                            </Card>
                          </div>
                          
                          <div className="mt-6 border rounded-lg p-4">
                            <h3 className="font-medium mb-3">Recommended Readings</h3>
                            <div className="space-y-3">
                              <div className="flex items-start gap-3">
                                <BookOpen className="h-5 w-5 text-primary mt-0.5" />
                                <div>
                                  <p className="font-medium">The Effective Engineer</p>
                                  <p className="text-sm text-gray-500">How to leverage your efforts for maximum impact</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <BookOpen className="h-5 w-5 text-primary mt-0.5" />
                                <div>
                                  <p className="font-medium">Cracking the Coding Interview</p>
                                  <p className="text-sm text-gray-500">189 programming questions and solutions</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <BookOpen className="h-5 w-5 text-primary mt-0.5" />
                                <div>
                                  <p className="font-medium">Designing Your Life</p>
                                  <p className="text-sm text-gray-500">How to build a well-lived, joyful life</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="achievements">
                    <Card>
                      <CardHeader>
                        <CardTitle>Your Achievements</CardTitle>
                        <CardDescription>
                          Track your progress and accomplishments
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {achievements.map((achievement) => (
                            <div key={achievement.id} className="flex items-start gap-4 border-b pb-6 last:border-0">
                              <div className="bg-primary/10 p-2 rounded-full">
                                <Award className="h-6 w-6 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-medium">{achievement.title}</h3>
                                <p className="text-sm text-gray-500 mb-1">{achievement.description}</p>
                                <p className="text-xs text-gray-400">Achieved on {achievement.date}</p>
                              </div>
                            </div>
                          ))}
                          
                          <div className="border rounded-lg p-4 bg-gray-50">
                            <h3 className="font-medium mb-2">Upcoming Achievements</h3>
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                                  <span className="text-xs">3/5</span>
                                </div>
                                <div>
                                  <p className="font-medium">Networking Pro</p>
                                  <p className="text-sm text-gray-500">Connect with 5 alumni - 3/5 completed</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                                  <span className="text-xs">1/3</span>
                                </div>
                                <div>
                                  <p className="font-medium">Mock Interview Master</p>
                                  <p className="text-sm text-gray-500">Complete 3 mock interviews - 1/3 completed</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            
            {/* Notifications Section */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle>Recent Notifications</CardTitle>
                  <CardDescription>Stay updated with your latest activity</CardDescription>
                </CardHeader>
                <CardContent>
                  {notifications.length > 0 ? (
                    <div className="space-y-4">
                      {notifications.map((notification) => (
                        <div key={notification.id} className="flex items-start gap-4 p-3 border rounded-lg">
                          <div className={`rounded-full p-2 ${
                            notification.type === 'message' ? 'bg-blue-100' : 
                            notification.type === 'event' ? 'bg-purple-100' : 'bg-green-100'
                          }`}>
                            {notification.type === 'message' ? (
                              <MessageSquare className={`h-5 w-5 ${
                                notification.type === 'message' ? 'text-blue-600' : 
                                notification.type === 'event' ? 'text-purple-600' : 'text-green-600'
                              }`} />
                            ) : notification.type === 'event' ? (
                              <Calendar className="h-5 w-5 text-purple-600" />
                            ) : (
                              <Users className="h-5 w-5 text-green-600" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <p className="font-medium">{notification.content}</p>
                              <span className="text-xs text-gray-500">{notification.time}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center py-4 text-gray-500">No new notifications</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </TooltipProvider>
  );
};

export default Dashboard;
