
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
        <div className="container mx-auto px-4">
          <AlumniSpotlight />
          <RecommendedAlumni />
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
