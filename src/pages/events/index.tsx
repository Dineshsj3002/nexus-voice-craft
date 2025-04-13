
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import { Calendar, MapPin, Users, Clock, ArrowRight, Star, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { showSuccessToast } from '@/components/SuccessToast';

type Event = {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  type: 'Workshop' | 'Networking' | 'Panel' | 'Program' | 'Mentoring' | 'Career Fair' | 'Hackathon' | 'Competition';
  featured?: boolean;
  alumni?: boolean;
  sponsoredBy?: string;
  spotsLeft?: number;
  image?: string;
  tags?: string[];
  description?: string;
};

const events: Event[] = [
  {
    id: 1,
    title: "Annual Alumni Meet 2025",
    date: "April 20, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "KIOT Main Auditorium",
    type: 'Networking',
    featured: true,
    alumni: true,
    spotsLeft: 150,
    description: "Reconnect with classmates and faculty members at our biggest annual event. Includes lunch and special presentations from notable alumni.",
    image: "/lovable-uploads/55a35922-2575-4117-8ce8-42400a57c572.png",
    tags: ["networking", "reunion", "awards"]
  },
  {
    id: 2,
    title: "Tech Innovations Hackathon",
    date: "May 15, 2025",
    time: "9:00 AM - 6:00 PM",
    location: "KIOT Engineering Block",
    type: 'Hackathon',
    featured: true,
    sponsoredBy: "TechCorp & Alumni Association",
    spotsLeft: 75,
    description: "24-hour coding challenge sponsored by our alumni at leading tech companies. Open to all KIOT students.",
    image: "/lovable-uploads/7afe8910-5163-4ff9-a8ca-172e708ea716.png",
    tags: ["coding", "prizes", "industry-mentors"]
  },
  {
    id: 3,
    title: "Alumni-Led Resume Workshop",
    date: "May 22, 2025",
    time: "2:00 PM - 5:00 PM",
    location: "Virtual Event",
    type: 'Workshop',
    alumni: true,
    spotsLeft: 100,
    description: "Get your resume reviewed by alumni working at top companies. Bring your current resume and receive personalized feedback.",
    image: "/lovable-uploads/37d7e541-5805-4da1-9d74-ffa5f38c017e.png",
    tags: ["career-prep", "job-search"]
  },
  {
    id: 4,
    title: "Industry 4.0 Conference",
    date: "June 5, 2025",
    time: "10:00 AM - 5:00 PM",
    location: "KIOT Convention Center",
    type: 'Panel',
    alumni: true,
    featured: true,
    spotsLeft: 200,
    description: "Explore the future of manufacturing and automation with industry experts and our distinguished alumni panel.",
    image: "/lovable-uploads/3a6e2123-4764-4b3c-91f5-4e68ee7d156b.png",
    tags: ["industry4.0", "automation", "IoT"]
  },
  {
    id: 5,
    title: "Summer Career Fair",
    date: "June 15, 2025",
    time: "10:00 AM - 3:00 PM",
    location: "KIOT Student Center",
    type: 'Career Fair',
    sponsoredBy: "KIOT Alumni Association",
    spotsLeft: 300,
    description: "Connect with recruiters from over 50 companies, including many with KIOT alumni working there.",
    tags: ["recruitment", "internships", "jobs"]
  },
  {
    id: 6,
    title: "Entrepreneurship Bootcamp",
    date: "July 10, 2025",
    time: "9:00 AM - 4:00 PM",
    location: "KIOT Business School",
    type: 'Workshop',
    alumni: true,
    spotsLeft: 50,
    description: "Three-day intensive bootcamp led by successful alumni entrepreneurs. Learn how to build and scale your startup.",
    tags: ["startup", "business", "mentorship"]
  }
];

const EventsPage = () => {
  const navigate = useNavigate();

  const handleRegister = (eventId: number, eventTitle: string) => {
    showSuccessToast({
      message: `You've registered for ${eventTitle}!`,
      emoji: "🎉"
    });
  };

  // Filter featured events
  const featuredEvents = events.filter(event => event.featured);
  // Filter upcoming events (non-featured)
  const upcomingEvents = events.filter(event => !event.featured);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-display mb-4">Events & Programs</h1>
            <p className="text-lg text-gray-600 md:max-w-3xl mx-auto">
              Stay connected with Knowledge Institute of Technology through our upcoming events and programs.
              From hackathons to workshops, networking events to career fairs - there's always something happening!
            </p>
          </div>
          
          {/* Featured Events Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Star className="h-6 w-6 text-yellow-500 mr-2" />
              Featured Events
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredEvents.map(event => (
                <Card key={event.id} className="overflow-hidden flex flex-col md:flex-row h-full shadow-md hover:shadow-lg transition-shadow">
                  {event.image && (
                    <div className="md:w-2/5 h-48 md:h-auto">
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className={`p-6 flex flex-col justify-between ${event.image ? 'md:w-3/5' : 'w-full'}`}>
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold">{event.title}</h3>
                        <Badge className={`${
                          event.type === 'Hackathon' ? 'bg-purple-500' :
                          event.type === 'Workshop' ? 'bg-blue-500' : 
                          event.type === 'Networking' ? 'bg-indigo-500' : 
                          event.type === 'Panel' ? 'bg-amber-500' : 
                          event.type === 'Competition' ? 'bg-red-500' :
                          event.type === 'Career Fair' ? 'bg-pink-500' : 'bg-nexus-primary'
                        }`}>
                          {event.type}
                        </Badge>
                      </div>
                      
                      {event.description && (
                        <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                      )}
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-gray-600 text-sm">
                          <Calendar className="h-4 w-4 mr-2 text-nexus-primary" />
                          {event.date}
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                          <Clock className="h-4 w-4 mr-2 text-nexus-primary" />
                          {event.time}
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                          <MapPin className="h-4 w-4 mr-2 text-nexus-primary" />
                          {event.location}
                        </div>
                      </div>
                      
                      {event.sponsoredBy && (
                        <div className="text-sm text-gray-500 italic mb-3">
                          Sponsored by: {event.sponsoredBy}
                        </div>
                      )}
                      
                      {event.tags && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {event.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center mt-2">
                      <Button 
                        className="bg-nexus-primary hover:bg-nexus-primary/90"
                        onClick={() => handleRegister(event.id, event.title)}
                      >
                        Register Now
                      </Button>
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{event.spotsLeft} spots left</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
          
          {/* All Upcoming Events Section */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Calendar className="h-6 w-6 text-nexus-primary mr-2" />
              Upcoming Events
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map(event => (
                <Card key={event.id} className="overflow-hidden h-full shadow hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-bold">{event.title}</h3>
                      <Badge className={`${
                        event.type === 'Hackathon' ? 'bg-purple-500' :
                        event.type === 'Workshop' ? 'bg-blue-500' : 
                        event.type === 'Networking' ? 'bg-indigo-500' : 
                        event.type === 'Panel' ? 'bg-amber-500' : 
                        event.type === 'Competition' ? 'bg-red-500' :
                        event.type === 'Career Fair' ? 'bg-pink-500' : 'bg-nexus-primary'
                      }`}>
                        {event.type}
                      </Badge>
                    </div>
                    
                    {event.description && (
                      <p className="text-gray-600 mb-4 text-sm line-clamp-3">{event.description}</p>
                    )}
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600 text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-nexus-primary" />
                        {event.date}
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <Clock className="h-4 w-4 mr-2 text-nexus-primary" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-nexus-primary" />
                        {event.location}
                      </div>
                    </div>
                    
                    {event.sponsoredBy && (
                      <div className="text-sm text-gray-500 italic mb-3">
                        Sponsored by: {event.sponsoredBy}
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center mt-4">
                      <Button 
                        variant="outline" 
                        className="border-nexus-primary text-nexus-primary hover:bg-nexus-primary/10"
                        onClick={() => handleRegister(event.id, event.title)}
                      >
                        Learn More
                      </Button>
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{event.spotsLeft} spots</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            {/* Calendar CTA */}
            <div className="mt-12 bg-nexus-primary/10 p-8 rounded-lg text-center">
              <h3 className="text-xl font-bold mb-3">Want to propose an event?</h3>
              <p className="text-gray-600 mb-4 max-w-2xl mx-auto">
                Are you an alumnus interested in organizing an event, workshop, or mentorship program? 
                We welcome your ideas and initiatives to strengthen our community.
              </p>
              <Button 
                className="bg-nexus-primary hover:bg-nexus-primary/90"
                onClick={() => navigate('/contact')}
              >
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
      <ChatBot />
    </div>
  );
};

export default EventsPage;
