
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const CampusFacilitiesPage = () => {
  const facilities = [
    {
      title: "Library",
      description: "Our extensive library houses over 100,000 books, digital resources, and quiet study spaces.",
      icon: "📚"
    },
    {
      title: "Laboratories",
      description: "Cutting-edge science, engineering, and computer labs equipped with the latest technology.",
      icon: "🧪"
    },
    {
      title: "Sports Complex",
      description: "Indoor and outdoor sports facilities including basketball courts, swimming pool, and athletics track.",
      icon: "🏀"
    },
    {
      title: "Student Center",
      description: "A hub for student activities, clubs, and organizations with meeting rooms and event spaces.",
      icon: "🎭"
    },
    {
      title: "Cafeteria",
      description: "Multiple dining options with nutritious and diverse food choices for students and staff.",
      icon: "🍽️"
    },
    {
      title: "Innovation Hub",
      description: "Creative spaces for entrepreneurship, innovation, and collaborative projects.",
      icon: "💡"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold font-display mb-4">Campus Facilities</h1>
          <p className="text-lg text-gray-600 mb-8">
            Knowledge Institute of Technology offers world-class facilities to enhance the learning experience and campus life.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {facilities.map((facility, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="text-4xl mb-2">{facility.icon}</div>
                  <CardTitle>{facility.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{facility.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-16 bg-white p-8 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Facility Booking</h2>
            <p className="text-gray-700 mb-4">
              Many of our facilities are available for booking by students, faculty, and alumni. 
              Please contact the facilities management office or use the online booking system.
            </p>
            <div className="flex justify-center">
              <button className="bg-nexus-primary text-white px-6 py-3 rounded-md hover:bg-nexus-primary/90 transition-colors">
                Check Availability
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <ChatBot />
    </div>
  );
};

export default CampusFacilitiesPage;
