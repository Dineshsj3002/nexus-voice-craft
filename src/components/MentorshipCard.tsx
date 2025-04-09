
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Briefcase, Star } from 'lucide-react';
import { showSuccessToast } from './SuccessToast';

type MentorProps = {
  name: string;
  role: string;
  company: string;
  location: string;
  availableTime: string;
  rating: number;
  avatar: string;
  expertise: string[];
};

const MentorshipCard = ({
  name,
  role,
  company,
  location,
  availableTime,
  rating,
  avatar,
  expertise,
}: MentorProps) => {
  const handleBookSession = () => {
    // Here you would handle the booking logic
    showSuccessToast({ message: 'Session booked!', emoji: '📅' });
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:border-nexus-primary/30 transition-all hover-scale">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <img
              src={avatar}
              alt={name}
              className="h-16 w-16 rounded-full object-cover mr-4"
            />
            <div>
              <h3 className="font-semibold text-lg">{name}</h3>
              <p className="text-gray-600 flex items-center">
                <Briefcase className="h-4 w-4 mr-1 text-gray-400" />
                {role} at {company}
              </p>
              <p className="text-gray-600 flex items-center mt-1">
                <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                {location}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400" />
            <span className="ml-1 font-medium">{rating}</span>
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="font-medium text-sm text-gray-500 mb-2">Areas of expertise:</h4>
          <div className="flex flex-wrap gap-2">
            {expertise.map((skill, index) => (
              <span 
                key={index}
                className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mt-4 flex items-center text-sm text-gray-600">
          <Clock className="h-4 w-4 mr-1" />
          <span>Available: {availableTime}</span>
        </div>
        
        <div className="mt-6 flex justify-between items-center">
          <Button
            onClick={handleBookSession}
            className="bg-nexus-primary hover:bg-nexus-primary/90 w-full"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Book session
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MentorshipCard;
