
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import { Separator } from '@/components/ui/separator';

const CampusHistoryPage = () => {
  const timelineEvents = [
    {
      year: "1985",
      title: "Foundation",
      description: "Knowledge Institute of Technology was established with a vision to provide quality education focused on technology and innovation."
    },
    {
      year: "1990",
      title: "First Graduation",
      description: "The institute celebrated its first graduation ceremony with 120 graduates across engineering and computer science programs."
    },
    {
      year: "1997",
      title: "Campus Expansion",
      description: "Major expansion of the campus facilities including new academic buildings and research laboratories."
    },
    {
      year: "2005",
      title: "Research Center",
      description: "Establishment of the Advanced Research Center focusing on emerging technologies and interdisciplinary research."
    },
    {
      year: "2010",
      title: "Silver Jubilee",
      description: "Celebrated 25 years of academic excellence with notable achievements in education and research."
    },
    {
      year: "2018",
      title: "Global Recognition",
      description: "Received international accreditation and ranked among the top technical institutes in the region."
    },
    {
      year: "2023",
      title: "Innovation Hub",
      description: "Launched the Innovation and Entrepreneurship Hub to foster startup culture and industry collaboration."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold font-display mb-4">Our Rich History</h1>
          <p className="text-lg text-gray-600 mb-8">
            For over three decades, Knowledge Institute of Technology has been at the forefront of technical education and innovation.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-2xl font-bold mb-4">A Legacy of Excellence</h2>
              <p className="text-gray-700 mb-4">
                Since its inception in 1985, Knowledge Institute of Technology has evolved into a leading institution for technical education, research, and innovation. Founded by a group of visionary educators and industry leaders, the institute was established with the mission to bridge the gap between theoretical knowledge and practical application.
              </p>
              <p className="text-gray-700 mb-4">
                Over the years, the institute has expanded its academic offerings, infrastructure, and research capabilities, while maintaining its commitment to providing high-quality education that prepares students for the challenges of a rapidly evolving technological landscape.
              </p>
            </div>
            <div className="col-span-1">
              <img 
                src="/lovable-uploads/8ee7877a-cbd3-4121-a549-d044b60c6f6f.png" 
                alt="Historic campus photograph" 
                className="rounded-lg shadow-md w-full h-auto"
              />
              <p className="text-sm text-gray-500 italic mt-2">Early campus photograph from the 1980s</p>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-6">Our Timeline</h2>
          <div className="space-y-8">
            {timelineEvents.map((event, index) => (
              <div key={index} className="relative">
                <div className="flex items-start gap-4">
                  <div className="bg-nexus-primary text-white px-3 py-2 rounded-md font-bold text-lg min-w-16 text-center">
                    {event.year}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{event.title}</h3>
                    <p className="text-gray-700 mt-1">{event.description}</p>
                  </div>
                </div>
                {index < timelineEvents.length - 1 && (
                  <Separator className="my-6" />
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
      <ChatBot />
    </div>
  );
};

export default CampusHistoryPage;
