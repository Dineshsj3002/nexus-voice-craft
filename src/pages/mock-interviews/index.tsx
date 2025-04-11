
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import MockInterviewCard from '@/components/MockInterviewCard';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Video, FileText, Code } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { showSuccessToast } from '@/components/SuccessToast';

const MockInterviewsPage = () => {
  const navigate = useNavigate();
  
  const mockInterviewTypes = [
    {
      title: "Technical Interview",
      description: "Practice technical questions related to your field of study with alumni working in the industry.",
      image: "/lovable-uploads/4bededbc-dba6-4e4a-a676-75063a634759.png",
      duration: "45-60 minutes",
      category: "Technical",
    },
    {
      title: "Behavioral Interview",
      description: "Prepare for behavioral questions and learn how to showcase your soft skills effectively.",
      image: "/lovable-uploads/533e4b15-f9ff-4642-b285-c0d2f8088578.jpg",
      duration: "30-45 minutes",
      category: "Behavioral",
    },
    {
      title: "Case Study Interview",
      description: "Practice answering case study questions common in consulting, business, and technical roles.",
      image: "/lovable-uploads/d4764814-25a7-4fe4-aa26-ef395ab96aea.jpg",
      duration: "60-90 minutes",
      category: "Case Study",
    },
    {
      title: "Virtual Interview Prep",
      description: "Get comfortable with online interview formats through guided practice sessions.",
      image: "/lovable-uploads/0b7ef1b4-903b-465d-bc9c-410dde9d9ea6.jpg",
      duration: "30-60 minutes",
      category: "Virtual",
    }
  ];

  const handleBookInterview = () => {
    showSuccessToast({
      message: "Your mock interview has been scheduled!",
      emoji: "🎯"
    });
    // For demo purposes, we'd navigate to a confirmation page in a real app
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold font-display mb-4">Mock Interviews</h1>
          <p className="text-lg text-gray-600 mb-8">
            Practice with alumni who've been on both sides of the interview table. Our mock interviews
            provide realistic practice and personalized feedback to help you succeed.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {mockInterviewTypes.map((type, index) => (
              <MockInterviewCard 
                key={index}
                title={type.title}
                description={type.description}
                image={type.image}
                duration={type.duration}
                category={type.category}
              />
            ))}
          </div>
          
          <div className="bg-gray-50 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <Calendar className="h-12 w-12 text-nexus-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">1. Schedule</h3>
                <p className="text-gray-600">Select an interview type and find available time slots with our alumni.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Video className="h-12 w-12 text-nexus-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">2. Practice</h3>
                <p className="text-gray-600">Complete a realistic interview session via video conference.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <FileText className="h-12 w-12 text-nexus-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">3. Get Feedback</h3>
                <p className="text-gray-600">Receive detailed feedback and actionable tips to improve.</p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Button 
              className="bg-nexus-primary hover:bg-nexus-primary/90 text-white text-lg px-8 py-6"
              onClick={handleBookInterview}
            >
              Book a Mock Interview
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
      <ChatBot />
    </div>
  );
};

export default MockInterviewsPage;
