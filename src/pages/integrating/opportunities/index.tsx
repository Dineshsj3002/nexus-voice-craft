
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import { Button } from '@/components/ui/button';
import { ArrowRight, Briefcase, GraduationCap, Users } from 'lucide-react';

const IntegratingOpportunitiesPage = () => {
  const opportunities = [
    {
      title: "Internship Programs",
      description: "Gain real-world experience through internships with our partner companies and alumni-led organizations.",
      icon: <Briefcase className="h-10 w-10 text-nexus-primary" />,
      action: "Browse Internships"
    },
    {
      title: "Mentorship Connections",
      description: "Connect with alumni mentors who can guide you through career decisions and professional development.",
      icon: <GraduationCap className="h-10 w-10 text-nexus-primary" />,
      action: "Find a Mentor"
    },
    {
      title: "Networking Events",
      description: "Participate in events designed to connect students with alumni and industry professionals.",
      icon: <Users className="h-10 w-10 text-nexus-primary" />,
      action: "View Upcoming Events"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold font-display mb-4">Career Opportunities</h1>
          <p className="text-lg text-gray-600 mb-8">
            Discover opportunities to advance your career through our alumni network and industry partnerships.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {opportunities.map((opportunity, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow hover-scale">
                <div className="mb-4">
                  {opportunity.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{opportunity.title}</h3>
                <p className="text-gray-600 mb-6">{opportunity.description}</p>
                <Button variant="outline" className="border-nexus-primary text-nexus-primary hover:bg-nexus-primary/10">
                  {opportunity.action}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-50 rounded-lg p-8 mt-16">
            <h2 className="text-2xl font-bold mb-4">Featured Opportunities</h2>
            <div className="space-y-4">
              {[
                {
                  company: "TechInnovate Solutions",
                  position: "Software Development Intern",
                  location: "Remote",
                  posted: "2 days ago"
                },
                {
                  company: "Global Finance Group",
                  position: "Financial Analyst",
                  location: "New York, NY",
                  posted: "1 week ago"
                },
                {
                  company: "Healthcare Innovations",
                  position: "Biomedical Engineer",
                  location: "Boston, MA",
                  posted: "3 days ago"
                }
              ].map((job, index) => (
                <div key={index} className="bg-white p-4 rounded-md border border-gray-200 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{job.position}</h3>
                    <p className="text-gray-600 text-sm">{job.company} • {job.location}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-4">{job.posted}</span>
                    <Button size="sm" className="bg-nexus-primary hover:bg-nexus-primary/90 text-white">
                      Apply
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <Button variant="outline" className="border-nexus-primary text-nexus-primary hover:bg-nexus-primary/10">
                View All Opportunities
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <ChatBot />
    </div>
  );
};

export default IntegratingOpportunitiesPage;
