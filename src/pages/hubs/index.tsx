
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Book, Code, Flask, Calculator, GraduationCap, Globe, ChevronRight, Users } from 'lucide-react';

// Mock data for subject hubs
const subjectHubs = [
  {
    id: 1,
    title: 'Computer Science Hub',
    description: 'Connect with students and alumni in CS. Discuss programming, software development, AI, and tech careers.',
    memberCount: 428,
    leader: {
      name: 'David Wong',
      avatar: 'DW',
      role: 'CS Professor'
    },
    icon: <Code className="h-8 w-8 text-blue-500" />,
    color: 'border-blue-200',
    topics: ['Programming', 'AI', 'Software Development']
  },
  {
    id: 2,
    title: 'Business & Management',
    description: 'Discuss business strategies, management principles, entrepreneurship, and career opportunities.',
    memberCount: 356,
    leader: {
      name: 'Sarah Miller',
      avatar: 'SM',
      role: 'MBA Alumni'
    },
    icon: <GraduationCap className="h-8 w-8 text-green-500" />,
    color: 'border-green-200',
    topics: ['Entrepreneurship', 'Finance', 'Marketing']
  },
  {
    id: 3,
    title: 'Science & Research',
    description: 'A community for science enthusiasts to discuss research, experiments, and scientific advancements.',
    memberCount: 289,
    leader: {
      name: 'James Wilson',
      avatar: 'JW',
      role: 'Research Fellow'
    },
    icon: <Flask className="h-8 w-8 text-purple-500" />,
    color: 'border-purple-200',
    topics: ['Research', 'Biology', 'Physics']
  },
  {
    id: 4,
    title: 'Mathematics Hub',
    description: 'Explore mathematical concepts, problem-solving techniques, and applications in various fields.',
    memberCount: 215,
    leader: {
      name: 'Lisa Patel',
      avatar: 'LP',
      role: 'Math Department Head'
    },
    icon: <Calculator className="h-8 w-8 text-red-500" />,
    color: 'border-red-200',
    topics: ['Pure Math', 'Statistics', 'Data Science']
  },
  {
    id: 5,
    title: 'Literature & Arts',
    description: 'Discuss literature, creative writing, visual arts, and cultural expression from diverse perspectives.',
    memberCount: 263,
    leader: {
      name: 'Robert Chen',
      avatar: 'RC',
      role: 'English Professor'
    },
    icon: <Book className="h-8 w-8 text-amber-500" />,
    color: 'border-amber-200',
    topics: ['Literature', 'Creative Writing', 'Visual Arts']
  },
  {
    id: 6,
    title: 'Global Studies',
    description: 'Explore international relations, global cultures, languages, and worldwide educational opportunities.',
    memberCount: 187,
    leader: {
      name: 'Amira Khan',
      avatar: 'AK',
      role: 'International Relations Dept'
    },
    icon: <Globe className="h-8 w-8 text-cyan-500" />,
    color: 'border-cyan-200',
    topics: ['International Relations', 'Languages', 'Culture Studies']
  }
];

const HubsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-display mb-4">Subject Hubs</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join academic communities where students and alumni connect around shared interests, exchange knowledge, and collaborate on projects.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {subjectHubs.map((hub) => (
              <Card key={hub.id} className={`hover:shadow-md transition-shadow hover-scale border-l-4 ${hub.color}`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      {hub.icon}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-500">{hub.memberCount} members</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl mt-4">{hub.title}</CardTitle>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {hub.topics.map((topic) => (
                      <Badge key={topic} variant="outline" className="bg-gray-50">{topic}</Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 min-h-[80px]">{hub.description}</CardDescription>
                </CardContent>
                <CardFooter className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src="" alt={hub.leader.name} />
                      <AvatarFallback className="bg-nexus-primary/10 text-nexus-primary text-xs">
                        {hub.leader.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{hub.leader.name}</p>
                      <p className="text-xs text-gray-500">{hub.leader.role}</p>
                    </div>
                  </div>
                  <Button variant="ghost" className="text-nexus-primary">
                    Join Hub
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Don't see a hub for your interest?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We're constantly expanding our subject hubs based on community interest. Let us know what academic field you'd like to connect around!
            </p>
            <Button className="bg-nexus-primary hover:bg-nexus-primary/90 text-white">
              Suggest a New Hub
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
      <ChatBot />
    </div>
  );
};

export default HubsPage;
