
import React from 'react';
import { Alumni } from '@/data/alumni';
import { Briefcase, ArrowRight } from 'lucide-react';

interface CareerJourneyProps {
  alumni: Alumni;
}

const CareerJourney: React.FC<CareerJourneyProps> = ({ alumni }) => {
  if (!alumni.previousRoles || alumni.previousRoles.length === 0) {
    return null;
  }

  // Create a timeline including current role and previous roles
  const timelineItems = [
    ...alumni.previousRoles.map(role => ({
      company: role.company,
      role: role.role,
      startYear: role.startYear,
      endYear: role.endYear,
    })),
    {
      company: alumni.company,
      role: alumni.role,
      startYear: alumni.previousRoles[alumni.previousRoles.length - 1]?.endYear || '?',
      endYear: 'Present',
    }
  ].sort((a, b) => parseInt(a.startYear) - parseInt(b.startYear));

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-4">Career Journey</h3>
      
      <div className="relative">
        {timelineItems.map((item, index) => (
          <div key={index} className="mb-8 relative">
            <div className="flex items-start">
              <div className="min-w-[48px] flex justify-center">
                <div className="w-10 h-10 bg-nexus-primary/10 rounded-full flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-nexus-primary" />
                </div>
                {index < timelineItems.length - 1 && (
                  <div className="absolute top-10 bottom-0 w-0.5 bg-gray-200 left-[23px]" />
                )}
              </div>
              
              <div className="ml-4">
                <div className="font-medium">{item.role}</div>
                <div className="text-gray-600">{item.company}</div>
                <div className="text-sm text-gray-500 mt-1">
                  {item.startYear} - {item.endYear}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerJourney;
