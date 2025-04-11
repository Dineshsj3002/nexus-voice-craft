
import React from 'react';
import { Button } from '@/components/ui/button';
import { Clock, CalendarPlus, Video, Star, Award, Briefcase } from 'lucide-react';
import { showSuccessToast } from './SuccessToast';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type MockInterviewProps = {
  title: string;
  description: string;
  image: string;
  duration: string;
  category: string;
  featured?: boolean;
};

const MockInterviewCard = ({
  title,
  description,
  image,
  duration,
  category,
  featured = false,
}: MockInterviewProps) => {
  const handleBookSchedule = () => {
    showSuccessToast({ message: 'Interview scheduled!', emoji: '🎯' });
  };

  const handleJoinCall = () => {
    showSuccessToast({ message: 'Joining interview call...', emoji: '📞' });
  };

  // Use a different layout for featured interviews
  if (featured) {
    return (
      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-green-50 to-white">
        <div className="flex flex-col md:flex-row">
          {/* Featured Image - Larger on featured card */}
          <div className="w-full md:w-1/2 relative">
            <img
              src={image}
              alt={title}
              className="w-full h-[400px] md:h-full object-cover"
            />
            <Badge className="absolute top-4 right-4 bg-yellow-500 text-white">
              Premium
            </Badge>
          </div>
          
          {/* Content Side - Enhanced for featured interview */}
          <div className="w-full md:w-1/2 flex flex-col p-8">
            <div className="flex items-center mb-4">
              <Award className="h-6 w-6 text-yellow-500 mr-2" />
              <span className="text-sm font-medium text-yellow-600">Featured Opportunity</span>
            </div>
            
            <CardHeader className="pb-2 px-0 pt-0">
              <h3 className="text-3xl font-bold">{title}</h3>
            </CardHeader>
            
            <CardContent className="px-0 py-4 flex-grow">
              <p className="text-gray-700 mb-6 text-lg">{description}</p>
              
              <div className="flex items-center text-gray-700 mb-4">
                <Clock className="h-5 w-5 mr-2 text-green-600" />
                <span className="font-medium">Duration: {duration}</span>
              </div>
              
              <div className="flex items-center text-gray-700 mb-6">
                <Briefcase className="h-5 w-5 mr-2 text-green-600" />
                <span className="font-medium">Category: {category}</span>
              </div>
              
              <div className="bg-white p-5 rounded-lg mb-4 shadow-sm">
                <h4 className="font-semibold mb-3 text-lg">What you'll gain:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span>Expert guidance on executive presence</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span>Strategic thinking assessment</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span>Leadership competency feedback</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span>Personalized improvement plan</span>
                  </li>
                </ul>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col sm:flex-row gap-4 px-0 pb-0 pt-4">
              <Button
                onClick={handleBookSchedule}
                className="bg-green-600 hover:bg-green-700 w-full sm:w-auto text-white"
                size="lg"
              >
                <CalendarPlus className="mr-2 h-5 w-5" />
                Book Your Session
              </Button>
              
              <Button
                onClick={handleJoinCall}
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50 w-full sm:w-auto"
                size="lg"
              >
                <Video className="mr-2 h-5 w-5" />
                Learn More
              </Button>
            </CardFooter>
          </div>
        </div>
      </Card>
    );
  }

  // Original layout for non-featured interviews
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
