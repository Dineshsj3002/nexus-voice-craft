
import React from 'react';
import { Button } from '@/components/ui/button';
import { Clock, CalendarPlus, Video } from 'lucide-react';
import { showSuccessToast } from './SuccessToast';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';

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
  const handleBookSchedule = () => {
    showSuccessToast({ message: 'Interview scheduled!', emoji: '🎯' });
  };

  const handleJoinCall = () => {
    showSuccessToast({ message: 'Joining interview call...', emoji: '📞' });
  };

  return (
    <Card className="flex flex-col md:flex-row overflow-hidden border-gray-200 hover:shadow-lg transition-all">
      {/* Interviewer Image Side */}
      <div className="w-full md:w-1/2 relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-nexus-primary text-white text-xs font-semibold px-2 py-1 rounded-full">
          {category}
        </div>
      </div>
      
      {/* Content Side */}
      <div className="w-full md:w-1/2 flex flex-col p-6">
        <CardHeader className="pb-2 px-0 pt-0">
          <h3 className="text-2xl font-bold">{title}</h3>
        </CardHeader>
        
        <CardContent className="px-0 py-2 flex-grow">
          <p className="text-gray-600 mb-4">{description}</p>
          
          <div className="flex items-center text-gray-600 mb-4">
            <Clock className="h-5 w-5 mr-2 text-nexus-primary" />
            <span>Duration: {duration}</span>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold mb-2">What to expect:</h4>
            <ul className="list-disc list-inside text-sm text-gray-600">
              <li>Tailored questions based on your field</li>
              <li>Real-time feedback on your responses</li>
              <li>Guidance on areas for improvement</li>
              <li>Follow-up resources to enhance your skills</li>
            </ul>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col sm:flex-row gap-3 px-0 pb-0 pt-4">
          <Button
            onClick={handleBookSchedule}
            className="bg-nexus-primary hover:bg-nexus-primary/90 w-full sm:w-auto"
          >
            <CalendarPlus className="mr-2 h-4 w-4" />
            Book a Schedule
          </Button>
          
          <Button
            onClick={handleJoinCall}
            variant="outline"
            className="border-nexus-primary text-nexus-primary hover:bg-nexus-primary/10 w-full sm:w-auto"
          >
            <Video className="mr-2 h-4 w-4" />
            Join Call
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default MockInterviewCard;
