
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import CallToAction from '@/components/CallToAction';
import ChatBot from '@/components/ChatBot';
import RecentPosts from '@/components/RecentPosts';
import Events from '@/components/Events';
import { useToast } from '@/hooks/use-toast';
import RecommendedAlumni from '@/components/RecommendedAlumni';
import AlumniSpotlight from '@/components/AlumniSpotlight';

// Import these to make sure they're available
import { showSuccessToast, toastTypes } from '@/components/SuccessToast';
import { TooltipProvider } from '@/components/ui/tooltip';

const Index = () => {
  const { toast } = useToast();

  useEffect(() => {
    // Show a welcome toast when the page loads
    toast({
      title: "Welcome to Knowledge Institute of Technology",
      description: "Connect with alumni mentors to boost your career journey.",
    });
  }, [toast]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <Hero />
        <div className="container mx-auto px-4 py-12">
          {/* Knowledge Institute logo section */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-16 bg-gray-50 p-8 rounded-lg">
            <img 
              src="/lovable-uploads/55a35922-2575-4117-8ce8-42400a57c572.png" 
              alt="Knowledge Institute of Technology" 
              className="h-32 object-contain"
            />
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold text-nexus-primary mb-4">Excellence in Education</h2>
              <p className="text-lg text-gray-700 max-w-2xl">
                Knowledge Institute of Technology is committed to providing world-class education and 
                developing future leaders. Our alumni network brings together generations of talent 
                to inspire, mentor, and create opportunities for our students.
              </p>
            </div>
          </div>
          
          {/* Wrap components that use Tooltip with TooltipProvider */}
          <TooltipProvider>
            <AlumniSpotlight />
            <RecommendedAlumni />
          </TooltipProvider>
        </div>
        <Features />
        <Testimonials />
        <RecentPosts />
        <Events />
        <CallToAction />
      </main>
      
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
