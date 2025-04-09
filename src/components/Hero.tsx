
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { showSuccessToast } from '@/components/SuccessToast';

const Hero = () => {
  const navigate = useNavigate();

  const handleJoinCommunity = () => {
    showSuccessToast({
      message: "Welcome to the community!",
      emoji: "👋"
    });
    // For demo, show a toast and navigate to a page
    setTimeout(() => navigate('/mentorship'), 1000);
  };

  const handleExploreMentorship = () => {
    navigate('/mentorship');
  };

  return (
    <section className="bg-white">
      {/* Main hero image */}
      <div className="w-full border-t border-b border-gray-200">
        <img 
          src="/lovable-uploads/fd080c60-30b6-4b82-b4c7-f182582f4d18.png" 
          alt="Campus aerial view" 
          className="w-full h-[400px] object-cover"
        />
      </div>
      
      {/* Mission statement */}
      <div className="max-w-7xl mx-auto py-12 px-4 md:px-8">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">Our Mission</h2>
        
        <p className="text-xl text-gray-700 text-center max-w-4xl mx-auto leading-relaxed">
          At alumNexus, we are dedicated to fostering a strong and lasting bond between 
          students and alumni, creating a network where knowledge, experience, and 
          opportunities flow seamlessly. Our mission is to empower students by providing 
          direct access to mentorship, career guidance, and professional development through 
          our alumni community.
        </p>
        
        <div className="flex justify-center mt-8">
          <Button 
            className="bg-nexus-primary hover:bg-nexus-primary/90 text-white text-lg px-6 py-6 rounded-md flex items-center"
            onClick={handleJoinCommunity}
          >
            Join our community
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
