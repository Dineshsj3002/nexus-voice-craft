
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import ForumCategories from '@/components/forum/ForumCategories';
import ForumPosts from '@/components/forum/ForumPosts';
import ForumNewPostButton from '@/components/forum/ForumNewPostButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const ForumPage = () => {
  const [filter, setFilter] = useState<'recent' | 'popular' | 'my-discussions'>('recent');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold font-display">Discussion Forum</h1>
            <ForumNewPostButton />
          </div>
          
          <p className="text-lg text-gray-600 mb-8">
            Connect with alumni and fellow students to discuss career paths, industry trends, and academic advice.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <ForumCategories />
            </div>
            <div className="lg:col-span-3">
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                  <Input
                    className="pl-10"
                    placeholder="Search discussions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <Tabs defaultValue="recent" className="mb-6" onValueChange={(value) => setFilter(value as 'recent' | 'popular' | 'my-discussions')}>
                <TabsList className="grid grid-cols-3 w-full max-w-md">
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                  <TabsTrigger value="popular">Popular</TabsTrigger>
                  <TabsTrigger value="my-discussions">My Discussions</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <ForumPosts filter={filter} searchQuery={searchQuery} />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <ChatBot />
    </div>
  );
};

export default ForumPage;
