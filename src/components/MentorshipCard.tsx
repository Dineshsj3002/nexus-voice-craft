
import React from 'react';
import { Calendar, Clock, MapPin, Briefcase, Star } from 'lucide-react';
import { showSuccessToast } from './SuccessToast';
import AnimatedCard from '@/components/animations/AnimatedCard';
import AnimatedButton from '@/components/animations/AnimatedButton';
import { motion } from 'framer-motion';

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
    showSuccessToast({ message: 'Session booked!', emoji: '📅' });
  };
  
  return (
    <AnimatedCard hoverEffect="tilt" className="h-full">
      <div className="p-6 h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <motion.img
              src={avatar}
              alt={name}
              className="h-16 w-16 rounded-full object-cover mr-4 ring-2 ring-nexus-primary/20"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', damping: 15 }}
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
          <motion.div 
            className="flex items-center bg-yellow-50 px-2 py-1 rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            <Star className="h-4 w-4 text-yellow-400" />
            <span className="ml-1 font-medium text-yellow-700">{rating}</span>
          </motion.div>
        </div>
        
        <div className="mb-4 flex-grow">
          <h4 className="font-medium text-sm text-gray-500 mb-2">Areas of expertise:</h4>
          <div className="flex flex-wrap gap-2">
            {expertise.map((skill, index) => (
              <motion.span 
                key={index}
                className="bg-nexus-primary/10 text-nexus-primary text-xs px-2 py-1 rounded-full border border-nexus-primary/20"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(40, 167, 69, 0.2)' }}
                transition={{ type: 'spring', damping: 15 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
        
        <div className="mb-4 flex items-center text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
          <Clock className="h-4 w-4 mr-1 text-nexus-primary" />
          <span>Available: {availableTime}</span>
        </div>
        
        <div className="mt-auto">
          <AnimatedButton
            animation="bounce"
            onClick={handleBookSession}
            className="bg-nexus-primary hover:bg-nexus-primary/90 w-full"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Book session
          </AnimatedButton>
        </div>
      </div>
    </AnimatedCard>
  );
};

export default MentorshipCard;
