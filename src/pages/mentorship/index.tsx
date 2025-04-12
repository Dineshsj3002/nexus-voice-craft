
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MentorshipCard from '@/components/MentorshipCard';
import CallToAction from '@/components/CallToAction';
import { Input } from '@/components/ui/input';
import { ArrowRight, Users, Calendar, Award, Search, Filter } from 'lucide-react';

const MentorshipPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('all');
  
  // Sample mentors data - in a real app, this would come from an API
  const mentors = [
    {
      id: 1,
      name: "Dr. Anand Sharma",
      role: "Senior Software Engineer",
      company: "Google",
      location: "Bangalore, India",
      availableTime: "Evenings & Weekends",
      rating: 4.9,
      avatar: "/lovable-uploads/681b8611-5081-4d74-9a73-6c535d892f2f.png",
      expertise: ["Web Development", "Machine Learning", "Career Guidance"]
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "UX Design Lead",
      company: "Microsoft",
      location: "Seattle, USA",
      availableTime: "Weekends",
      rating: 4.7,
      avatar: "/lovable-uploads/533e4b15-f9ff-4642-b285-c0d2f8088578.jpg",
      expertise: ["UI/UX Design", "User Research", "Portfolio Review"]
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Product Manager",
      company: "Amazon",
      location: "New York, USA",
      availableTime: "Weekday Evenings",
      rating: 4.8,
      avatar: "/lovable-uploads/d4764814-25a7-4fe4-aa26-ef395ab96aea.jpg",
      expertise: ["Product Strategy", "Career Transitions", "Networking"]
    }
  ];
  
  // Filter mentors based on search and area
  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = 
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      mentor.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.role.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesArea = selectedArea === 'all' || 
      mentor.expertise.some(skill => skill.toLowerCase().includes(selectedArea.toLowerCase()));
    
    return matchesSearch && matchesArea;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-display mb-4">Find Your Perfect Mentor</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Connect with experienced alumni mentors who can provide guidance, 
              share insights, and help you navigate your academic and professional journey.
            </p>
          </div>
          
          {/* Mentorship Programs */}
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
          
          {/* Search and Filter for Mentors */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6">Available Mentors</h2>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search mentors by name, company, or role"
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="w-full md:w-64">
                <select 
                  className="w-full rounded-md border border-gray-300 p-2"
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                >
                  <option value="all">All Areas of Expertise</option>
                  <option value="web">Web Development</option>
                  <option value="design">Design</option>
                  <option value="product">Product Management</option>
                  <option value="career">Career Guidance</option>
                </select>
              </div>
            </div>
            
            {/* Mentors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMentors.map((mentor) => (
                <MentorshipCard 
                  key={mentor.id}
                  name={mentor.name}
                  role={mentor.role}
                  company={mentor.company}
                  location={mentor.location}
                  availableTime={mentor.availableTime}
                  rating={mentor.rating}
                  avatar={mentor.avatar}
                  expertise={mentor.expertise}
                />
              ))}
            </div>
            
            {filteredMentors.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No mentors found matching your criteria. Try adjusting your search.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedArea('all');
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </div>
          
          {/* How It Works Section */}
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
          
          {/* Tabs for Benefits */}
          <Tabs defaultValue="mentees" className="w-full mb-16">
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
          
          {/* Call to Action */}
          <CallToAction />
        </div>
      </main>
      
      <Footer />
      <ChatBot />
    </div>
  );
};

export default MentorshipPage;
