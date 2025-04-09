
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, CheckCircle, UserPlus, BookOpen, CalendarClock } from 'lucide-react';
import { cn } from '@/lib/utils';

type Step = {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  ctaText: string;
};

const steps: Step[] = [
  {
    id: 1,
    title: "Welcome to alumNexus!",
    description: "Your bridge to career success through alumni connections. Let's get started on your journey.",
    icon: <CheckCircle className="h-8 w-8 text-nexus-primary" />,
    ctaText: "Let's get started",
  },
  {
    id: 2,
    title: "Find your mentor",
    description: "Connect with alumni who share your interests and can guide you on your career path.",
    icon: <UserPlus className="h-8 w-8 text-nexus-primary" />,
    ctaText: "Explore mentors",
  },
  {
    id: 3,
    title: "Join subject hubs",
    description: "Connect with communities focused on your areas of interest for targeted advice.",
    icon: <BookOpen className="h-8 w-8 text-nexus-primary" />,
    ctaText: "Browse hubs",
  },
  {
    id: 4,
    title: "Book your first session",
    description: "Schedule a mock interview or mentorship session to kick-start your journey.",
    icon: <CalendarClock className="h-8 w-8 text-nexus-primary" />,
    ctaText: "Book now",
  },
];

const OnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0);
  
  const handleNext = () => {
    if (currentStep < steps.length) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };
  
  const currentStepData = steps.find((step) => step.id === currentStep) || steps[0];
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      {/* Progress indicator */}
      <div className="flex justify-center mb-8">
        {steps.map((step) => (
          <div
            key={step.id}
            className={cn(
              "h-2 rounded-full mx-1 transition-all",
              currentStep >= step.id ? "bg-nexus-primary w-8" : "bg-gray-200 w-4"
            )}
          />
        ))}
      </div>
      
      {/* Step content */}
      <div
        key={currentStep}
        className={`text-center transition-all duration-300 ${
          direction > 0 ? 'animate-fade-in' : 'animate-fade-in'
        }`}
      >
        <div className="mb-6 flex justify-center">
          {currentStepData.icon}
        </div>
        <h3 className="text-2xl font-bold mb-2">{currentStepData.title}</h3>
        <p className="text-gray-600 mb-8">{currentStepData.description}</p>
      </div>
      
      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        <Button
          variant="ghost"
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className={cn(currentStep === 1 && "invisible")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <Button 
          onClick={handleNext}
          className="bg-nexus-primary hover:bg-nexus-primary/90"
        >
          {currentStep === steps.length ? "Get started" : currentStepData.ctaText}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default OnboardingFlow;
