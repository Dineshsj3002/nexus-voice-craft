
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CampusTourPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold font-display mb-4">Campus Tour</h1>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg text-gray-700 mb-6">
                Take a virtual tour of our beautiful campus and explore the facilities that make Knowledge Institute of Technology one of the most advanced educational institutions in the region.
              </p>
              
              <p className="text-lg text-gray-700 mb-6">
                Our campus spans over 50 acres, featuring modern classrooms, specialized laboratories, sports facilities, and recreational areas designed to provide an enriching student experience.
              </p>
              
              <Button className="bg-nexus-primary hover:bg-nexus-primary/90 text-white mt-4">
                Schedule a Live Tour
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-md">
              <img 
                src="/lovable-uploads/fd080c60-30b6-4b82-b4c7-f182582f4d18.png" 
                alt="Campus aerial view" 
                className="w-full h-auto"
              />
            </div>
          </div>
          
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Explore Our Facilities</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { 
                  title: "Academic Buildings", 
                  description: "State-of-the-art classrooms and lecture halls equipped with the latest technology.",
                  image: "/lovable-uploads/87030a39-6fa7-425b-99f4-05b0abb9ded1.png"
                },
                { 
                  title: "Research Centers", 
                  description: "Advanced research facilities supporting innovation and scientific discovery.",
                  image: "/lovable-uploads/55f04ec5-8a46-435f-bfc6-06b4f7389672.png"
                },
                { 
                  title: "Student Amenities", 
                  description: "Recreational areas, cafeterias, and social spaces designed for student comfort.",
                  image: "/lovable-uploads/4bededbc-dba6-4e4a-a676-75063a634759.png"
                }
              ].map((facility, index) => (
                <div key={index} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <img 
                    src={facility.image} 
                    alt={facility.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{facility.title}</h3>
                    <p className="text-gray-600">{facility.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <ChatBot />
    </div>
  );
};

export default CampusTourPage;
