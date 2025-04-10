
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Calendar, Users, Globe } from 'lucide-react';

const LocalNetworkingPage = () => {
  const upcomingEvents = [
    {
      title: "Tech Meetup",
      date: "April 25, 2025",
      location: "Downtown Innovation Hub",
      attendees: 45,
      type: "In-Person"
    },
    {
      title: "Alumni Happy Hour",
      date: "May 10, 2025",
      location: "Riverside Lounge",
      attendees: 30,
      type: "In-Person"
    },
    {
      title: "Industry Panel Discussion",
      date: "May 17, 2025",
      location: "Virtual",
      attendees: 120,
      type: "Online"
    }
  ];

  const localChapters = [
    { city: "San Francisco", members: 120 },
    { city: "New York", members: 95 },
    { city: "Chicago", members: 70 },
    { city: "Boston", members: 65 },
    { city: "Austin", members: 55 },
    { city: "Seattle", members: 50 }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold font-display mb-4">Local Networking</h1>
          <p className="text-lg text-gray-600 mb-8">
            Connect with alumni in your area through local chapters and networking events.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-nexus-primary" />
                  Local Chapters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-600">
                  Join an alumni chapter in your city to connect with fellow graduates and build your local network.
                </p>
                <Button className="bg-nexus-primary hover:bg-nexus-primary/90 text-white w-full">
                  Find a Chapter
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-nexus-primary" />
                  Local Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-600">
                  Attend networking events, social gatherings, and professional development workshops in your area.
                </p>
                <Button className="bg-nexus-primary hover:bg-nexus-primary/90 text-white w-full">
                  Browse Events
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Globe className="mr-2 h-5 w-5 text-nexus-primary" />
                  Start a Chapter
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-600">
                  No chapter in your city? Take the initiative to create one and connect the alumni community.
                </p>
                <Button className="bg-nexus-primary hover:bg-nexus-primary/90 text-white w-full">
                  Learn How
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Upcoming Local Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow hover-scale">
                  <div className={`py-2 px-4 text-white ${event.type === "Online" ? "bg-blue-500" : "bg-nexus-primary"}`}>
                    {event.type}
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-xl mb-3">{event.title}</h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        {event.date}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Users className="h-4 w-4 mr-2" />
                        {event.attendees} attending
                      </div>
                    </div>
                    <Button className="w-full bg-nexus-primary hover:bg-nexus-primary/90 text-white">
                      RSVP
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Active Alumni Chapters</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {localChapters.map((chapter, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                  <h3 className="font-semibold">{chapter.city}</h3>
                  <p className="text-gray-600 text-sm">{chapter.members} members</p>
                  <Button variant="link" className="text-nexus-primary p-0 h-auto mt-2">
                    Join
                  </Button>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="outline" className="border-nexus-primary text-nexus-primary hover:bg-nexus-primary/10">
                View All Chapters
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <ChatBot />
    </div>
  );
};

export default LocalNetworkingPage;
