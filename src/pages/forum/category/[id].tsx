import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import ForumPosts from '@/components/forum/ForumPosts';
import ForumNewPostButton from '@/components/forum/ForumNewPostButton';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search, Users } from 'lucide-react';

// Mock data for categories
const categories = [
  {
    id: '1',
    name: 'General Discussion',
    description: 'Open discussions for all members of alumNexus community',
    memberCount: 532,
    postCount: 152,
    icon: <Users className="h-6 w-6 text-blue-500" />
  },
  {
    id: '2',
    name: 'Networking',
    description: 'Connect with fellow alumni and students for professional networking',
    memberCount: 423,
    postCount: 98,
    icon: <Users className="h-6 w-6 text-purple-500" />
  },
  // Other categories...
];

const ForumCategoryPage = () => {
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Find the current category based on the ID parameter
  const category = categories.find(cat => cat.id === id) || categories[0];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <Link to="/forum" className="inline-flex items-center text-gray-600 hover:text-nexus-primary mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to all categories
          </Link>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  {category.icon}
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold font-display">{category.name}</h1>
                  <p className="text-gray-600 mt-1">{category.description}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 items-center">
                <div className="text-sm text-gray-500">
                  <div><span className="font-medium">{category.memberCount}</span> members</div>
                  <div><span className="font-medium">{category.postCount}</span> discussions</div>
                </div>
                <ForumNewPostButton />
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Discussions</h2>
            
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                placeholder="Search in this category..." 
                className="pl-10 pr-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <ForumPosts filter="recent" searchQuery={searchQuery} />
        </div>
      </main>
      
      <Footer />
      <ChatBot />
    </div>
  );
};

export default ForumCategoryPage;
