
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, MessageSquare, Users, BarChart, BookOpen, Code, Globe, Briefcase, Lightbulb } from 'lucide-react';

const categories = [
  {
    id: '1',
    name: 'General Discussion',
    description: 'Open discussions for all members of alumNexus community',
    icon: <MessageSquare className="h-6 w-6 text-blue-500" />,
    count: 152,
    color: 'bg-blue-50 border-blue-200'
  },
  {
    id: '2',
    name: 'Networking',
    description: 'Connect with fellow alumni and students for professional networking',
    icon: <Users className="h-6 w-6 text-purple-500" />,
    count: 98,
    color: 'bg-purple-50 border-purple-200'
  },
  {
    id: '3',
    name: 'Career Advice',
    description: 'Seek and share career guidance and job opportunities',
    icon: <Briefcase className="h-6 w-6 text-green-500" />,
    count: 124,
    color: 'bg-green-50 border-green-200'
  },
  {
    id: '4',
    name: 'Industry Insights',
    description: 'Discussions about trends and developments in various industries',
    icon: <BarChart className="h-6 w-6 text-orange-500" />,
    count: 87,
    color: 'bg-orange-50 border-orange-200'
  },
  {
    id: '5',
    name: 'Academic Resources',
    description: 'Share and discover academic resources and study materials',
    icon: <BookOpen className="h-6 w-6 text-red-500" />,
    count: 73,
    color: 'bg-red-50 border-red-200'
  },
  {
    id: '6',
    name: 'Technology',
    description: 'Discuss the latest in technology, coding, and digital innovation',
    icon: <Code className="h-6 w-6 text-indigo-500" />,
    count: 109,
    color: 'bg-indigo-50 border-indigo-200'
  },
  {
    id: '7',
    name: 'Global Opportunities',
    description: 'Explore global study, work, and volunteer opportunities',
    icon: <Globe className="h-6 w-6 text-cyan-500" />,
    count: 62,
    color: 'bg-cyan-50 border-cyan-200'
  },
  {
    id: '8',
    name: 'Innovation & Entrepreneurship',
    description: 'Discuss startups, innovation, and entrepreneurial ventures',
    icon: <Lightbulb className="h-6 w-6 text-amber-500" />,
    count: 95,
    color: 'bg-amber-50 border-amber-200'
  },
];

const ForumCategories = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-2">Categories</h2>
      <div className="grid grid-cols-1 gap-4">
        {categories.map((category) => (
          <Link to={`/forum/category/${category.id}`} key={category.id} className="hover:shadow-md transition-shadow">
            <Card className={`h-full border ${category.color}`}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center gap-3">
                  {category.icon}
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">{category.description}</CardDescription>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <span className="text-sm text-gray-500">{category.count} discussions</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ForumCategories;
