
import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

type Event = {
  id: number;
  title: string;
  date: string;
  location: string;
  type: 'Workshop' | 'Networking' | 'Panel' | 'Program';
};

const events: Event[] = [
  {
    id: 1,
    title: "Career Development",
    date: "April 20, 2025",
    location: "San Francisco, CA",
    type: "Workshop"
  },
  {
    id: 2,
    title: "Mentorship Program",
    date: "May 4, 2025",
    location: "Chicago, IL",
    type: "Program"
  },
  {
    id: 3,
    title: "Annual Alumni Meet up",
    date: "May 15, 2025",
    location: "New York, NY",
    type: "Networking"
  },
  {
    id: 4,
    title: "Industry Panel Discussion",
    date: "June 1, 2025",
    location: "Virtual Event",
    type: "Panel"
  }
];

const Events = () => {
  const navigate = useNavigate();

  const handleLearnMore = (eventId: number) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <section className="py-16 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-display mb-4">Events and Programs</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with the alumNexus community through our upcoming events and programs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event) => (
            <div 
              key={event.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow p-6 relative hover-scale"
            >
              <div className={`
                absolute top-0 left-6 px-3 py-1 text-xs font-medium text-white rounded-b-md
                ${event.type === 'Workshop' ? 'bg-blue-500' : 
                  event.type === 'Networking' ? 'bg-purple-500' : 
                  event.type === 'Panel' ? 'bg-amber-500' : 'bg-nexus-primary'}
              `}>
                {event.type}
              </div>
              
              <div className="pt-6">
                <h3 className="font-semibold text-xl mb-3">{event.title}</h3>
                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  {event.date}
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <MapPin className="h-4 w-4 mr-2" />
                  {event.location}
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <Button 
                    variant="outline" 
                    className="border-nexus-primary text-nexus-primary hover:bg-nexus-primary/10"
                    onClick={() => handleLearnMore(event.id)}
                  >
                    Learn more
                  </Button>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-1" />
                    <span>12 spots left</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
