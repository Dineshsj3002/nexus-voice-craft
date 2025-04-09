
import React from 'react';
import { Button } from '@/components/ui/button';
import { Clock, Calendar, ArrowRight } from 'lucide-react';
import { showSuccessToast } from './SuccessToast';

type MockInterviewProps = {
  title: string;
  description: string;
  image: string;
  duration: string;
  category: string;
};

const MockInterviewCard = ({
  title,
  description,
  image,
  duration,
  category,
}: MockInterviewProps) => {
  const handleStartInterview = () => {
    // Here you would handle the interview starting logic
    showSuccessToast({ message: 'Interview scheduled!', emoji: '🎯' });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:border-nexus-primary/30 transition-all hover-scale">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-cover"
        />
        <div className="absolute top-4 right-4 bg-nexus-primary text-white text-xs font-semibold px-2 py-1 rounded-full">
          {category}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        
        <div className="flex items-center text-sm text-gray-600 mb-6">
          <Clock className="h-4 w-4 mr-1" />
          <span>Duration: {duration}</span>
        </div>
        
        <Button
          onClick={handleStartInterview}
          className="bg-nexus-primary hover:bg-nexus-primary/90 w-full"
        >
          Start
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default MockInterviewCard;
