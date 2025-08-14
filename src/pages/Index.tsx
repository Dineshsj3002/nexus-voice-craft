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
import EnhancedPageTransition from '@/components/animations/EnhancedPageTransition';
import StatisticsCounter from '@/components/StatisticsCounter';
import LoadingCard from '@/components/animations/LoadingCard';
import TextReveal from '@/components/animations/TextReveal';

// Import these to make sure they're available
import { showSuccessToast, toastTypes } from '@/components/SuccessToast';
import { TooltipProvider } from '@/components/ui/tooltip';
const Index = () => {
  const {
    toast
  } = useToast();
  useEffect(() => {
    // Show a welcome toast when the page loads
    toast({
      title: "Welcome to Knowledge Institute of Technology",
      description: "Connect with alumni mentors to boost your career journey."
    });
  }, [toast]);
  return <EnhancedPageTransition>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow">
          <Hero />
          <StatisticsCounter />
          <div className="container my-[18px] mx-[7px] px-[66px] py-[18px] bg-white">
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
           {/* Skeleton Loader Demonstration */}
           <section className="container mx-auto px-4 py-12 bg-slate-200">
            <TextReveal variant="fadeIn" delay={0.2} className="text-3xl font-bold text-center mb-8 block">
              Enhancing User Experience with Loading States
            </TextReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
            </div>
          </section>
          <CallToAction />
        </main>
        
        <Footer />
        <ChatBot />
      </div>
    </EnhancedPageTransition>;
};
export default Index;