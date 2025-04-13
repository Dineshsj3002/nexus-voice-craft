
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Award } from 'lucide-react';
import { getSpotlightAlumni } from '@/data/alumni';
import { useToast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const AlumniSpotlight = () => {
  const { toast } = useToast();
  const spotlightAlumni = getSpotlightAlumni();
  
  if (spotlightAlumni.length === 0) {
    return null;
  }
  
  const alumni = spotlightAlumni[0];
  
  const handleConnect = () => {
    toast({
      title: "Connection Request Sent!",
      description: `Your request to connect with ${alumni.name} has been sent.`,
    });
  };

  return (
    <div className="my-8">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
          <Star className="h-5 w-5 mr-2 text-yellow-500 fill-yellow-500" />
          Alumni Spotlight
        </h2>
      </div>
      
      <Card className="overflow-hidden border-yellow-200 shadow-md bg-gradient-to-r from-amber-50 to-white">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex items-center justify-center">
              <div className="relative">
                <img 
                  src={alumni.avatar} 
                  alt={alumni.name} 
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-2 border-yellow-300"
                />
                {/* Each TooltipProvider must be self-contained */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="absolute -top-2 -right-2 bg-yellow-400 text-white p-1.5 rounded-full">
                        <Award className="h-4 w-4" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>This alumnus is highlighted based on your academic focus in Computer Science and their experience at {alumni.company}. They've helped students like you navigate similar career paths.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-xl font-semibold">{alumni.name}</h3>
                  <p className="text-gray-600">{alumni.role} at {alumni.company}</p>
                </div>
                <Button 
                  className="bg-yellow-500 hover:bg-yellow-600 text-white"
                  onClick={handleConnect}
                >
                  Connect with {alumni.name.split(' ')[0]}
                </Button>
              </div>
              
              <p className="text-gray-700 mb-4">{alumni.bio}</p>
              
              <div className="flex flex-wrap gap-y-2">
                <div className="w-full md:w-1/2">
                  <span className="text-sm font-medium text-gray-500">Industry:</span>
                  <span className="ml-2 text-sm">{alumni.industry}</span>
                </div>
                <div className="w-full md:w-1/2">
                  <span className="text-sm font-medium text-gray-500">Class of:</span>
                  <span className="ml-2 text-sm">{alumni.graduationYear}</span>
                </div>
                <div className="w-full md:w-1/2">
                  <span className="text-sm font-medium text-gray-500">Degree:</span>
                  <span className="ml-2 text-sm">{alumni.degree}</span>
                </div>
                <div className="w-full md:w-1/2">
                  <span className="text-sm font-medium text-gray-500">Location:</span>
                  <span className="ml-2 text-sm">{alumni.location}</span>
                </div>
              </div>
              
              {alumni.achievements && alumni.achievements.length > 0 && (
                <div className="mt-3">
                  <span className="text-sm font-medium text-gray-500">Key Achievement:</span>
                  <span className="ml-2 text-sm">{alumni.achievements[0]}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlumniSpotlight;
