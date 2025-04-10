
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alumni } from '@/data/alumni';
import { 
  Briefcase, 
  MapPin, 
  GraduationCap, 
  Mail, 
  Linkedin, 
  MessageSquare 
} from 'lucide-react';
import { showSuccessToast } from './SuccessToast';

interface AlumniCardProps {
  alumni: Alumni;
}

const AlumniCard = ({ alumni }: AlumniCardProps) => {
  const handleContactClick = () => {
    showSuccessToast({ 
      message: `Contact request sent to ${alumni.name}!`, 
      emoji: '📧' 
    });
  };

  const handleMentorshipClick = () => {
    showSuccessToast({ 
      message: `Mentorship request sent to ${alumni.name}!`, 
      emoji: '🎓' 
    });
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-start gap-4">
          <img 
            src={alumni.avatar} 
            alt={alumni.name} 
            className="w-16 h-16 rounded-full object-cover border-2 border-nexus-primary/20"
          />
          <div>
            <h3 className="font-semibold text-lg">{alumni.name}</h3>
            <div className="flex items-center text-gray-600 text-sm">
              <Briefcase className="h-3.5 w-3.5 mr-1" />
              <span>{alumni.role} at {alumni.company}</span>
            </div>
            <div className="flex items-center text-gray-600 text-sm mt-1">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              <span>{alumni.location}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-grow">
        <div className="flex items-center text-sm mb-2">
          <GraduationCap className="h-4 w-4 mr-1 text-gray-500" />
          <span className="text-gray-600">
            Class of {alumni.graduationYear} • {alumni.degree}
          </span>
        </div>

        <p className="text-gray-700 text-sm line-clamp-3 mb-3">
          {alumni.bio}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-2">
          {alumni.industry && (
            <Badge variant="outline" className="bg-nexus-primary/10 text-nexus-primary border-nexus-primary/30">
              {alumni.industry}
            </Badge>
          )}
          {alumni.willingToMentor && (
            <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
              Available to mentor
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="border-t pt-4 flex justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1"
          onClick={handleContactClick}
        >
          <Mail className="h-3.5 w-3.5" />
          Contact
        </Button>
        
        {alumni.willingToMentor && (
          <Button 
            variant="default" 
            size="sm" 
            className="flex items-center gap-1 bg-nexus-primary hover:bg-nexus-primary/90"
            onClick={handleMentorshipClick}
          >
            <MessageSquare className="h-3.5 w-3.5" />
            Request Mentorship
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default AlumniCard;
