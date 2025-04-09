
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Award, Users, MessageSquare } from 'lucide-react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 pt-16 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
              Your path to success, <span className="text-nexus-primary">together.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
              Connect with alumni mentors who've walked your path and are ready to guide your journey from classroom to career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-nexus-primary hover:bg-nexus-primary/90 text-white text-lg px-6 py-6 rounded-md flex items-center">
                Join our community
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="border-nexus-primary text-nexus-primary hover:bg-nexus-primary/10 text-lg px-6 py-6 rounded-md">
                Explore mentorship
              </Button>
            </div>
            
            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-4">
              <div className="text-center p-4">
                <div className="flex justify-center mb-2">
                  <Users className="h-6 w-6 text-nexus-primary" />
                </div>
                <div className="font-bold text-2xl">2,500+</div>
                <div className="text-sm text-gray-500">Active alumni</div>
              </div>
              <div className="text-center p-4">
                <div className="flex justify-center mb-2">
                  <MessageSquare className="h-6 w-6 text-nexus-primary" />
                </div>
                <div className="font-bold text-2xl">15,000+</div>
                <div className="text-sm text-gray-500">Mentorship sessions</div>
              </div>
              <div className="text-center p-4">
                <div className="flex justify-center mb-2">
                  <Award className="h-6 w-6 text-nexus-primary" />
                </div>
                <div className="font-bold text-2xl">92%</div>
                <div className="text-sm text-gray-500">Satisfaction rate</div>
              </div>
            </div>
          </div>
          
          {/* Image */}
          <div className="relative animate-fade-in">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="/lovable-uploads/1cf21656-76ea-4e9e-8f14-fb51ef8a84f7.png" 
                alt="Students connecting with alumni" 
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Floating cards */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 max-w-[200px] animate-pulse-green">
              <div className="flex items-center mb-2">
                <div className="h-8 w-8 rounded-full bg-nexus-primary text-white flex items-center justify-center mr-2">✓</div>
                <span className="font-medium">Mock Interview</span>
              </div>
              <p className="text-sm text-gray-600">Booked with Sarah J., Senior Developer at Google</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
