
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold font-display mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 mb-8">
            This page is under development. Check back soon!
          </p>
        </div>
      </main>
      
      <Footer />
      <ChatBot />
    </div>
  );
};

export default ContactPage;
