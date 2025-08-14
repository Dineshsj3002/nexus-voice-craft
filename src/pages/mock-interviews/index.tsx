import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import MockInterviewCard from '@/components/MockInterviewCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, Video, FileText, Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { showSuccessToast } from '@/components/SuccessToast';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
const MockInterviewsPage = () => {
  const navigate = useNavigate();
  const featuredInterview = {
    title: "Executive Leadership Interview",
    description: "Practice advanced leadership questions with a senior executive coach. This premium mock interview focuses on strategic thinking, executive presence, and leadership vision for senior roles.",
    image: "/lovable-uploads/406a5129-2322-40b0-9114-de6d65cb59df.png",
    duration: "60 minutes",
    category: "Executive",
    featured: true
  };
  const mockInterviewTypes = [{
    title: "Technical Interview",
    description: "Practice technical questions related to your field of study with alumni working in the industry. Our technical interview sessions cover coding challenges, system design questions, and domain-specific knowledge assessment.",
    image: "/lovable-uploads/4bededbc-dba6-4e4a-a676-75063a634759.png",
    duration: "45-60 minutes",
    category: "Technical"
  }, {
    title: "Behavioral Interview",
    description: "Prepare for behavioral questions and learn how to showcase your soft skills effectively. Our behavioral interviews focus on past experiences, challenges you've overcome, and how you handle various workplace situations.",
    image: "/lovable-uploads/533e4b15-f9ff-4642-b285-c0d2f8088578.jpg",
    duration: "30-45 minutes",
    category: "Behavioral"
  }, {
    title: "Case Study Interview",
    description: "Practice answering case study questions common in consulting, business, and technical roles. Our case interviews simulate real-world business scenarios where you'll need to analyze problems and propose solutions.",
    image: "/lovable-uploads/d4764814-25a7-4fe4-aa26-ef395ab96aea.jpg",
    duration: "60-90 minutes",
    category: "Case Study"
  }, {
    title: "Virtual Interview Prep",
    description: "Get comfortable with online interview formats through guided practice sessions. Learn how to present yourself professionally on camera, handle technical difficulties, and maintain engagement in a virtual environment.",
    image: "/lovable-uploads/537b6c39-73ec-44a2-9243-941aeab7b27e.png",
    duration: "30-60 minutes",
    category: "Virtual"
  }];
  return <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 px-4 md:px-8 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold font-display mb-4">Mock Interviews</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Practice with alumni who've been on both sides of the interview table. Our mock interviews
              provide realistic practice and personalized feedback to help you succeed.
            </p>
          </div>
          
          {/* Featured Interview - Full Width Special Layout */}
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-4">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              <h2 className="text-2xl font-bold">Featured Interview</h2>
            </div>
            <MockInterviewCard key="featured" title={featuredInterview.title} description={featuredInterview.description} image={featuredInterview.image} duration={featuredInterview.duration} category={featuredInterview.category} featured={true} />
          </div>
          
          <Separator className="my-8" />
          
          {/* Other Interview Types */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">More Interview Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockInterviewTypes.map((type, index) => <Card key={index} className="overflow-hidden hover:shadow-md transition-all duration-300">
                  <div className="flex h-full">
                    <div className="w-1/3 relative bg-gray-100">
                      <img src={type.image} alt={type.title} className="w-full h-full object-cover" />
                      <Badge className="absolute top-2 right-2 bg-nexus-primary">{type.category}</Badge>
                    </div>
                    <CardContent className="w-2/3 p-4 bg-green-100">
                      <h3 className="text-lg font-bold mb-2">{type.title}</h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{type.description}</p>
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{type.duration}</span>
                      </div>
                      <Button variant="outline" size="sm" className="mt-auto" onClick={() => showSuccessToast({
                    message: `Selected ${type.title}`,
                    emoji: '✅'
                  })}>
                        Select
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardContent>
                  </div>
                </Card>)}
            </div>
          </div>
          
          <div className="rounded-lg shadow-sm p-8 mb-12 bg-green-100">
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
    </div>;
};
export default MockInterviewsPage;