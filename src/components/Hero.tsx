
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { showSuccessToast } from '@/components/SuccessToast';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Hero = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroImages = [
    {
      src: "/lovable-uploads/ab858792-d735-4fc0-a440-d2e156796358.png",
      alt: "Modern classroom with students and lecturer"
    },
    {
      src: "/lovable-uploads/681b8611-5081-4d74-9a73-6c535d892f2f.png",
      alt: "Campus building with landscaped gardens"
    },
    {
      src: "/lovable-uploads/181717b9-41b3-44d5-99a2-941c42a2b7d9.png",
      alt: "Main entrance gate of Knowledge Institute of Technology"
    },
    {
      src: "/lovable-uploads/ec8f2a48-2d56-4532-82f0-ec1ecb10ea9d.png",
      alt: "Aerial view of the campus complex"
    }
  ];

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
      {/* Hero carousel */}
      <div className="w-full border-t border-b border-gray-200">
        <Carousel className="w-full relative">
          <CarouselContent>
            {heroImages.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative">
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute bottom-4 right-4 bg-white/80 px-3 py-1 rounded text-sm font-medium">
                    {index + 1}/{heroImages.length}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 bg-white/80 hover:bg-white" />
          <CarouselNext className="absolute right-4 bg-white/80 hover:bg-white" />
        </Carousel>
      </div>
      
      {/* Mission statement */}
      <div className="max-w-7xl mx-auto py-12 px-4 md:px-8">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">Our Mission</h2>
        
        <p className="text-xl text-gray-700 text-center max-w-4xl mx-auto leading-relaxed">
          At Knowledge Institute of Technology, we are dedicated to fostering a strong and lasting bond between 
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
            Join our community today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
