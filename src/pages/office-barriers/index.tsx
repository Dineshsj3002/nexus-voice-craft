
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, FileText, Users, MessageSquare, Calendar, Clock, MapPin } from 'lucide-react';

const OfficeBarriersPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold font-display mb-4">Office Barriers</h1>
          <p className="text-lg text-gray-600 mb-8">
            Breaking down workplace challenges and barriers with the help of alumni insights and experiences.
          </p>
          
          <Tabs defaultValue="resources" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="mentoring">Mentoring</TabsTrigger>
              <TabsTrigger value="stories">Success Stories</TabsTrigger>
              <TabsTrigger value="discussions">Discussions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="resources">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { 
                    title: "Navigating Office Politics", 
                    description: "Learn strategies for effectively navigating workplace dynamics and building positive relationships.", 
                    icon: <Users className="h-10 w-10 text-nexus-primary" />,
                    action: "Read Guide"
                  },
                  { 
                    title: "Communication Skills", 
                    description: "Develop essential communication skills for overcoming barriers and advancing your career.", 
                    icon: <MessageSquare className="h-10 w-10 text-nexus-primary" />,
                    action: "View Resources"
                  },
                  { 
                    title: "Overcoming Imposter Syndrome", 
                    description: "Practical advice for recognizing and addressing feelings of inadequacy in the workplace.", 
                    icon: <FileText className="h-10 w-10 text-nexus-primary" />,
                    action: "Access Toolkit"
                  }
                ].map((resource, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow hover-scale">
                    <div className="mb-4">
                      {resource.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{resource.title}</h3>
                    <p className="text-gray-600 mb-6">{resource.description}</p>
                    <Button className="bg-nexus-primary hover:bg-nexus-primary/90 text-white">
                      {resource.action}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 bg-gray-50 p-8 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Featured Workshop</h3>
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h4 className="text-lg font-semibold mb-2">Breaking Barriers: Navigating Workplace Challenges</h4>
                  <p className="text-gray-600 mb-4">
                    Join us for an interactive workshop focused on identifying and overcoming common workplace barriers. 
                    Led by experienced alumni professionals from diverse industries.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-50 p-3 rounded flex items-center">
                      <Calendar className="h-5 w-5 text-nexus-primary mr-2" />
                      <span>May 15, 2025</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded flex items-center">
                      <Clock className="h-5 w-5 text-nexus-primary mr-2" />
                      <span>6:00 PM - 8:00 PM</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded flex items-center">
                      <MapPin className="h-5 w-5 text-nexus-primary mr-2" />
                      <span>Virtual (Zoom)</span>
                    </div>
                  </div>
                  <Button className="bg-nexus-primary hover:bg-nexus-primary/90 text-white">
                    Register Now
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="mentoring">
              <div className="bg-white p-8 rounded-lg border border-gray-200 mb-8">
                <h3 className="text-xl font-bold mb-4">Mentoring for Workplace Success</h3>
                <p className="text-gray-600 mb-6">
                  Connect with alumni mentors who have successfully navigated workplace barriers and can provide 
                  personalized guidance based on their experiences.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold mb-2">One-on-One Mentoring</h4>
                    <p className="text-gray-600 mb-4">
                      Get matched with an alumni mentor for personalized guidance on specific workplace challenges.
                    </p>
                    <Button className="bg-nexus-primary hover:bg-nexus-primary/90 text-white">
                      Request a Mentor
                    </Button>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold mb-2">Group Mentoring Circles</h4>
                    <p className="text-gray-600 mb-4">
                      Join a small group led by an experienced mentor to discuss and solve common workplace barriers.
                    </p>
                    <Button className="bg-nexus-primary hover:bg-nexus-primary/90 text-white">
                      Join a Circle
                    </Button>
                  </div>
                </div>
                <div className="text-center">
                  <Button variant="outline" className="border-nexus-primary text-nexus-primary hover:bg-nexus-primary/10">
                    Learn More About Mentoring
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="stories">
              <div className="space-y-6">
                {[
                  {
                    name: "Sarah Johnson",
                    title: "Overcoming Gender Bias in Tech",
                    content: "As one of the few women in my engineering team, I faced numerous challenges...",
                    industry: "Technology",
                    year: "Class of 2015"
                  },
                  {
                    name: "Michael Chen",
                    title: "Navigating Cultural Differences in a Global Company",
                    content: "Working for an international corporation presented unique challenges in communication...",
                    industry: "Finance",
                    year: "Class of 2012"
                  },
                  {
                    name: "Priya Patel",
                    title: "From Entry-Level to Leadership",
                    content: "My journey from an entry-level position to a leadership role taught me valuable lessons...",
                    industry: "Healthcare",
                    year: "Class of 2010"
                  }
                ].map((story, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-semibold mb-2">{story.title}</h3>
                    <div className="flex items-center mb-4">
                      <div className="bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center mr-3">
                        {story.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{story.name}</p>
                        <p className="text-sm text-gray-600">{story.industry} | {story.year}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{story.content}</p>
                    <Button variant="link" className="text-nexus-primary p-0 h-auto">
                      Read Full Story
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <Button variant="outline" className="border-nexus-primary text-nexus-primary hover:bg-nexus-primary/10">
                  View All Success Stories
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="discussions">
              <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
                <h3 className="text-xl font-bold mb-4">Join the Conversation</h3>
                <p className="text-gray-600 mb-6">
                  Participate in discussions about workplace barriers and share your experiences and solutions.
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { 
                      topic: "Dealing with Difficult Colleagues", 
                      replies: 24, 
                      lastActive: "2 hours ago" 
                    },
                    { 
                      topic: "Work-Life Balance Strategies", 
                      replies: 36, 
                      lastActive: "Yesterday" 
                    },
                    { 
                      topic: "Negotiating Promotions and Raises", 
                      replies: 18, 
                      lastActive: "3 days ago" 
                    }
                  ].map((discussion, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-md flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{discussion.topic}</h4>
                        <p className="text-sm text-gray-600">{discussion.replies} replies • Last active {discussion.lastActive}</p>
                      </div>
                      <Button variant="outline" size="sm" className="border-nexus-primary text-nexus-primary hover:bg-nexus-primary/10">
                        View Thread
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <Button className="bg-nexus-primary hover:bg-nexus-primary/90 text-white">
                    Start New Discussion
                  </Button>
                  <Button variant="link" className="text-nexus-primary">
                    View All Discussions
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
      <ChatBot />
    </div>
  );
};

export default OfficeBarriersPage;
