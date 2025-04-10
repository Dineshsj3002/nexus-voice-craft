import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Clock, Video, Award, MessageSquare, Code, Briefcase } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
const MockInterviewsPage = () => {
  const upcomingInterviews = [{
    id: 1,
    title: "Software Engineering Interview",
    mentor: "Sarah Johnson",
    company: "Google",
    date: "April 15, 2025",
    time: "2:00 PM - 3:00 PM",
    status: "confirmed",
    image: "/lovable-uploads/55f04ec5-8a46-435f-bfc6-06b4f7389672.png"
  }, {
    id: 2,
    title: "Product Management Interview",
    mentor: "Michael Chen",
    company: "Microsoft",
    date: "April 18, 2025",
    time: "11:00 AM - 12:00 PM",
    status: "pending",
    image: "/lovable-uploads/87030a39-6fa7-425b-99f4-05b0abb9ded1.png"
  }];
  const mockInterviewTypes = [{
    title: "Technical Interviews",
    description: "Practice coding problems, system design, and technical questions with experienced engineers.",
    icon: <Code className="h-10 w-10 text-nexus-primary" />
  }, {
    title: "Behavioral Interviews",
    description: "Master the art of telling your story and showcasing your soft skills with HR professionals.",
    icon: <Users className="h-10 w-10 text-nexus-primary" />
  }, {
    title: "Case Interviews",
    description: "Tackle business problems and demonstrate analytical thinking with consultants and managers.",
    icon: <Briefcase className="h-10 w-10 text-nexus-primary" />
  }];
  return <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="animate-fade-in">
                <h1 className="text-3xl md:text-4xl font-bold font-display mb-4">Master Your Interview Skills</h1>
                <p className="text-lg text-gray-600 mb-6">
                  Practice with alumni who've been in your shoes and now work at top companies. Get personalized feedback to land your dream job.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-nexus-primary hover:bg-nexus-primary/90 text-white">
                    Book a Mock Interview
                  </Button>
                  <Button size="lg" variant="outline" className="border-nexus-primary text-nexus-primary hover:bg-nexus-primary/10">
                    Browse Interview Types
                  </Button>
                </div>
                
                {/* Stats */}
                <div className="mt-8 grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="font-bold text-2xl text-nexus-primary">94%</div>
                    <div className="text-sm text-gray-500">Success rate</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-2xl text-nexus-primary">2,300+</div>
                    <div className="text-sm text-gray-500">Mock interviews</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-2xl text-nexus-primary">120+</div>
                    <div className="text-sm text-gray-500">Company experts</div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="rounded-lg overflow-hidden shadow-xl">
                  <img alt="Students in mock interview" className="w-full h-auto object-fill" src="/lovable-uploads/d4764814-25a7-4fe4-aa26-ef395ab96aea.jpg" />
                </div>
                
                {/* Floating card */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 max-w-[240px] animate-pulse-green">
                  <div className="flex items-center mb-2">
                    <div className="h-8 w-8 rounded-full bg-nexus-primary text-white flex items-center justify-center mr-2">
                      <Award className="h-4 w-4" />
                    </div>
                    <span className="font-medium text-sm">Interview Success</span>
                  </div>
                  <p className="text-xs text-gray-600">
                    "The mock interview was exactly like my real interview at Amazon!" — Jamie S.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Upcoming Interviews */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold font-display mb-6">Your Upcoming Interviews</h2>
            
            {upcomingInterviews.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingInterviews.map(interview => <Card key={interview.id} className="hover-scale">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{interview.title}</CardTitle>
                          <CardDescription>with {interview.mentor} ({interview.company})</CardDescription>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${interview.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {interview.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        {interview.date}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <Clock className="h-4 w-4 mr-2" />
                        {interview.time}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm" className="text-nexus-primary border-nexus-primary">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                      <Button size="sm" className="bg-nexus-primary hover:bg-nexus-primary/90 text-white">
                        <Video className="h-4 w-4 mr-2" />
                        Join Call
                      </Button>
                    </CardFooter>
                  </Card>)}
                
                {/* Add Card */}
                <Card className="border-dashed border-2 hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-center min-h-[220px]">
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                    <div className="rounded-full bg-gray-100 p-3 mb-4">
                      <Calendar className="h-8 w-8 text-nexus-primary" />
                    </div>
                    <h3 className="font-medium text-lg mb-2">Book Another Interview</h3>
                    <p className="text-sm text-gray-500">Choose from 100+ mock interview types with alumni experts.</p>
                  </CardContent>
                </Card>
              </div> : <Card className="border-dashed border-2 p-8 text-center">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div className="rounded-full bg-gray-100 p-3 mb-4">
                    <Calendar className="h-8 w-8 text-nexus-primary" />
                  </div>
                  <h3 className="font-medium text-xl mb-2">No Interviews Scheduled</h3>
                  <p className="text-gray-500 mb-6">Book your first mock interview and get personalized feedback from alumni who work at your dream companies.</p>
                  <Button className="bg-nexus-primary hover:bg-nexus-primary/90 text-white">
                    Schedule Your First Interview
                  </Button>
                </CardContent>
              </Card>}
          </div>
          
          {/* Interview Types */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold font-display mb-6">Mock Interview Types</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockInterviewTypes.map((type, index) => <Card key={index} className="hover-scale">
                  <CardHeader>
                    <div className="mb-2">
                      {type.icon}
                    </div>
                    <CardTitle>{type.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{type.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full text-nexus-primary border-nexus-primary">
                      Learn More
                    </Button>
                  </CardFooter>
                </Card>)}
            </div>
          </div>
          
          {/* How It Works */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-10">
            <h2 className="text-2xl font-bold font-display mb-6 text-center">How Mock Interviews Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="rounded-full bg-nexus-primary/10 h-16 w-16 flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-nexus-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">1. Book a Session</h3>
                <p className="text-gray-600">Choose a time that works for you and select an alumni interviewer from your target company.</p>
              </div>
              
              <div className="text-center">
                <div className="rounded-full bg-nexus-primary/10 h-16 w-16 flex items-center justify-center mx-auto mb-4">
                  <Video className="h-8 w-8 text-nexus-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">2. Complete Interview</h3>
                <p className="text-gray-600">Join a video call and experience a realistic interview just like you would at the actual company.</p>
              </div>
              
              <div className="text-center">
                <div className="rounded-full bg-nexus-primary/10 h-16 w-16 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-8 w-8 text-nexus-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">3. Get Feedback</h3>
                <p className="text-gray-600">Receive detailed feedback, a scorecard, and actionable tips to improve your performance.</p>
              </div>
            </div>
          </div>
          
          {/* Testimonials */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold font-display mb-6">Success Stories</h2>
            <div className="bg-gray-100 rounded-lg p-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-full md:w-1/3 flex-shrink-0">
                  <img src="/lovable-uploads/4bededbc-dba6-4e4a-a676-75063a634759.png" alt="Student testimonial" className="rounded-lg w-full h-auto object-cover shadow-md" />
                </div>
                <div>
                  <p className="text-lg italic mb-4">
                    "After three mock interviews with alumNexus mentors, I felt so prepared for my actual interview at Facebook. The feedback was specific and actionable, and I ended up getting an offer!"
                  </p>
                  <div className="flex items-center">
                    <div className="font-semibold">Alex Rivera</div>
                    <div className="mx-2">•</div>
                    <div className="text-gray-600">Software Engineer at Meta</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA */}
          <div className="bg-nexus-primary text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold font-display mb-4">Ready to ace your next interview?</h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Join thousands of students who have practiced with alumni mentors and landed their dream jobs.
            </p>
            <Button size="lg" variant="outline" className="bg-white text-nexus-primary hover:bg-gray-100 border-white">
              Book Your Mock Interview Now
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
      <ChatBot />
    </div>;
};
export default MockInterviewsPage;