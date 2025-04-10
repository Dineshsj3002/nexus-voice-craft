
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import AlumniPrivacySettings from '@/components/AlumniPrivacySettings';

const PrivacySettingsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Alumni Privacy Settings</h1>
          <p className="text-lg text-gray-600 mb-10 text-center max-w-2xl mx-auto">
            Control how your profile appears to students and how they can contact you through the platform.
          </p>
          
          <AlumniPrivacySettings />
        </div>
      </main>
      
      <Footer />
      <ChatBot />
    </div>
  );
};

export default PrivacySettingsPage;
