
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import MockInterviewCard from '@/components/MockInterviewCard';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Video, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { showSuccessToast } from '@/components/SuccessToast';

const MockInterviewsPage = () => {
  const navigate = useNavigate();
  
  const mockInterviewTypes = [
    {
      title: "Technical Interview",
      description: "Practice technical questions related to your field of study with alumni working in the industry. Our technical interview sessions cover coding challenges, system design questions, and domain-specific knowledge assessment.",
      image: "/lovable-uploads/4bededbc-dba6-4e4a-a676-75063a634759.png",
      duration: "45-60 minutes",
      category: "Technical",
    },
    {
      title: "Behavioral Interview",
      description: "Prepare for behavioral questions and learn how to showcase your soft skills effectively. Our behavioral interviews focus on past experiences, challenges you've overcome, and how you handle various workplace situations.",
      image: "/lovable-uploads/533e4b15-f9ff-4642-b285-c0d2f8088578.jpg",
      duration: "30-45 minutes",
      category: "Behavioral",
    },
    {
      title: "Case Study Interview",
      description: "Practice answering case study questions common in consulting, business, and technical roles. Our case interviews simulate real-world business scenarios where you'll need to analyze problems and propose solutions.",
      image: "/lovable-uploads/d4764814-25a7-4fe4-aa26-ef395ab96aea.jpg",
      duration: "60-90 minutes",
      category: "Case Study",
    },
    {
      title: "Virtual Interview Prep",
      description: "Get comfortable with online interview formats through guided practice sessions. Learn how to present yourself professionally on camera, handle technical difficulties, and maintain engagement in a virtual environment.",
      image: "/lovable-uploads/537b6c39-73ec-44a2-9243-941aeab7b27e.png",
      duration: "30-60 minutes",
      category: "Virtual",
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold font-display mb-4">Mock Interviews</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Practice with alumni who've been on both sides of the interview table. Our mock interviews
              provide realistic practice and personalized feedback to help you succeed.
            </p>
          </div>
          
          <div className="space-y-8 mb-16">
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
          
          <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="bg-nexus-primary/10 p-4 rounded-full mb-4">
                  <Calendar className="h-10 w-10 text-nexus-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">1. Schedule</h3>
                <p className="text-gray-600">Select an interview type and find available time slots with our alumni.</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="bg-nexus-primary/10 p-4 rounded-full mb-4">
                  <Video className="h-10 w-10 text-nexus-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">2. Practice</h3>
                <p className="text-gray-600">Complete a realistic interview session via video conference.</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="bg-nexus-primary/10 p-4 rounded-full mb-4">
                  <FileText className="h-10 w-10 text-nexus-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">3. Get Feedback</h3>
                <p className="text-gray-600">Receive detailed feedback and actionable tips to improve.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <ChatBot />
    </div>
  );
};

export default MockInterviewsPage;
