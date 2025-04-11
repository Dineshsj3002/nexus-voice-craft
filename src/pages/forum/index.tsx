
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import { ForumCategories } from '@/components/forum/ForumCategories';
import { ForumPosts } from '@/components/forum/ForumPosts';
import { ForumNewPostButton } from '@/components/forum/ForumNewPostButton';

const ForumPage = () => {
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
              <ForumPosts />
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
