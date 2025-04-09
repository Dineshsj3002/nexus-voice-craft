
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import ForumCategories from '@/components/forum/ForumCategories';
import ForumPosts from '@/components/forum/ForumPosts';
import ForumNewPostButton from '@/components/forum/ForumNewPostButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const ForumPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold font-display mb-2">Discussion Forum</h1>
              <p className="text-gray-600">Connect with fellow students and alumni to discuss shared interests and opportunities.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  placeholder="Search discussions..." 
                  className="pl-10 pr-4"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <ForumNewPostButton />
            </div>
          </div>
          
          <Tabs defaultValue="recent" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="recent">Recent Discussions</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="my-discussions">My Discussions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="recent">
              <ForumPosts filter="recent" searchQuery={searchQuery} />
            </TabsContent>
            
            <TabsContent value="popular">
              <ForumPosts filter="popular" searchQuery={searchQuery} />
            </TabsContent>
            
            <TabsContent value="categories">
              <ForumCategories />
            </TabsContent>
            
            <TabsContent value="my-discussions">
              <ForumPosts filter="my-discussions" searchQuery={searchQuery} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
      <ChatBot />
    </div>
  );
};

export default ForumPage;
