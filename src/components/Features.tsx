
import React from 'react';
import { Users, Calendar, PenTool, BookOpen, MessageCircle, Award } from 'lucide-react';

const features = [
  {
    icon: <Users className="h-6 w-6 text-nexus-primary" />,
    title: "Connect with Mentors",
    description: "Book 1:1 sessions with alumni who are leaders in your field of interest."
  },
  {
    icon: <Calendar className="h-6 w-6 text-nexus-primary" />,
    title: "Mock Interviews",
    description: "Practice with real industry professionals and receive actionable feedback."
  },
  {
    icon: <BookOpen className="h-6 w-6 text-nexus-primary" />,
    title: "Subject Hubs",
    description: "Join specialized communities for your major or interest area."
  },
  {
    icon: <MessageCircle className="h-6 w-6 text-nexus-primary" />,
    title: "Discussion Forums",
    description: "Ask questions and share insights with peers and alumni."
  },
  {
    icon: <PenTool className="h-6 w-6 text-nexus-primary" />,
    title: "Career Resources",
    description: "Access resume reviews, interview tips, and industry insights."
  },
  {
    icon: <Award className="h-6 w-6 text-nexus-primary" />,
    title: "Networking Events",
    description: "Attend virtual and in-person events to expand your professional circle."
  }
];

const Features = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-display mb-4">How alumNexus helps you succeed</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We've designed a platform that makes connecting with alumni mentors easy, 
            meaningful, and tailored to your career goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow hover:border-nexus-primary/30 hover-scale"
            >
              <div className="h-12 w-12 rounded-full bg-nexus-primary/10 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
