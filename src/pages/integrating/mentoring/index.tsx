
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Users, Calendar, Award } from 'lucide-react';

const MentoringPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-display mb-4">Mentoring Programs</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Connect with experienced alumni mentors who can provide guidance, 
              share insights, and help you navigate your academic and professional journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="hover-scale">
              <CardHeader className="flex flex-col items-center">
                <Users className="h-12 w-12 text-nexus-primary mb-4" />
                <CardTitle>One-on-One Mentoring</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base">
                  Get paired with an alumni mentor for personalized guidance and regular check-ins.
                </CardDescription>
                <div className="text-center mt-6">
                  <Button className="bg-nexus-primary hover:bg-nexus-primary/90 text-white">
                    Find a Mentor
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover-scale">
              <CardHeader className="flex flex-col items-center">
                <Calendar className="h-12 w-12 text-nexus-primary mb-4" />
                <CardTitle>Group Mentorship</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base">
                  Join small group sessions with mentors and peers to discuss shared challenges and goals.
                </CardDescription>
                <div className="text-center mt-6">
                  <Button className="bg-nexus-primary hover:bg-nexus-primary/90 text-white">
                    Join a Group
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover-scale">
              <CardHeader className="flex flex-col items-center">
                <Award className="h-12 w-12 text-nexus-primary mb-4" />
                <CardTitle>Become a Mentor</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base">
                  Alumni can give back by sharing their experience and knowledge with current students.
                </CardDescription>
                <div className="text-center mt-6">
                  <Button className="bg-nexus-primary hover:bg-nexus-primary/90 text-white">
                    Apply to Mentor
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-8 mb-16">
            <h2 className="text-2xl font-bold mb-6">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { step: "1", title: "Sign Up", description: "Create a profile and specify your interests and goals." },
                { step: "2", title: "Get Matched", description: "We'll connect you with mentors based on your preferences." },
                { step: "3", title: "Schedule Sessions", description: "Set up regular meetings with your mentor." },
                { step: "4", title: "Grow Together", description: "Learn, share, and develop your skills and network." }
              ].map((item) => (
                <div key={item.step} className="bg-white p-6 rounded-md border border-gray-200">
                  <div className="w-10 h-10 bg-nexus-primary text-white rounded-full flex items-center justify-center font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <Tabs defaultValue="mentees" className="w-full">
            <TabsList className="mb-6 justify-center">
              <TabsTrigger value="mentees">For Mentees</TabsTrigger>
              <TabsTrigger value="mentors">For Mentors</TabsTrigger>
            </TabsList>
            
            <TabsContent value="mentees">
              <div className="bg-white rounded-lg p-8 border border-gray-200">
                <h3 className="text-xl font-bold mb-4">Benefits for Mentees</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="mr-2 text-nexus-primary">•</div>
                    <p>Gain insights from professionals who've navigated similar career paths</p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 text-nexus-primary">•</div>
                    <p>Develop skills and knowledge through personalized guidance</p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 text-nexus-primary">•</div>
                    <p>Expand your professional network with introductions from your mentor</p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 text-nexus-primary">•</div>
                    <p>Receive feedback on your resume, portfolio, and interview skills</p>
                  </li>
                </ul>
                <div className="mt-6">
                  <Button className="bg-nexus-primary hover:bg-nexus-primary/90 text-white">
                    Apply as a Mentee
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="mentors">
              <div className="bg-white rounded-lg p-8 border border-gray-200">
                <h3 className="text-xl font-bold mb-4">Benefits for Mentors</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="mr-2 text-nexus-primary">•</div>
                    <p>Give back to your alma mater and support the next generation</p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 text-nexus-primary">•</div>
                    <p>Develop your leadership and coaching skills</p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 text-nexus-primary">•</div>
                    <p>Expand your own network with other mentors and alumni</p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 text-nexus-primary">•</div>
                    <p>Stay connected with current trends and perspectives from students</p>
                  </li>
                </ul>
                <div className="mt-6">
                  <Button className="bg-nexus-primary hover:bg-nexus-primary/90 text-white">
                    Become a Mentor
                    <ArrowRight className="ml-2 h-4 w-4" />
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

export default MentoringPage;
