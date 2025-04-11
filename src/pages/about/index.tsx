
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, Award, Users, BookOpen, GraduationCap, Landmark, Building, History } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold font-display mb-4">About Us</h1>
          <p className="text-lg text-gray-600 mb-8">
            Knowledge Institute of Technology (KIT) is a premier educational institution committed to excellence in teaching, 
            research, and fostering strong connections between students and alumni.
          </p>
          
          <div className="mb-12">
            <img 
              src="/lovable-uploads/ec8f2a48-2d56-4532-82f0-ec1ecb10ea9d.png" 
              alt="Aerial view of Knowledge Institute of Technology campus" 
              className="w-full h-80 md:h-96 object-cover rounded-lg shadow-md mb-4"
            />
            <p className="text-sm text-center text-gray-500">Aerial view of our main campus</p>
          </div>
          
          <Tabs defaultValue="history" className="mb-12">
            <TabsList className="grid grid-cols-1 md:grid-cols-4 w-full mb-8">
              <TabsTrigger value="history">Our History</TabsTrigger>
              <TabsTrigger value="mission">Mission & Vision</TabsTrigger>
              <TabsTrigger value="leadership">Leadership</TabsTrigger>
              <TabsTrigger value="alumni">Alumni Network</TabsTrigger>
            </TabsList>
            
            <TabsContent value="history" className="p-6 bg-gray-50 rounded-lg">
              <div className="flex items-start gap-4">
                <History className="h-8 w-8 text-nexus-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-4">Our History</h2>
                  <p className="mb-4">
                    Founded in 1965, Knowledge Institute of Technology began as a small technical college with just 120 students and 15 faculty members. 
                    Our founder, Dr. Richard Thompson, envisioned an institution that would bridge the gap between academic learning and industry needs.
                  </p>
                  <p className="mb-4">
                    Through the decades, KIT has grown into a comprehensive university with over 15,000 students across five schools: Engineering, Business, 
                    Liberal Arts, Sciences, and Graduate Studies. Our campus has expanded from a single building to a 250-acre campus with state-of-the-art 
                    facilities.
                  </p>
                  <p>
                    Throughout our history, our commitment to innovation, research excellence, and student success has remained unwavering. Today, KIT is 
                    recognized as a leading institution for both education and research, with strong ties to industry partners around the world.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="mission" className="p-6 bg-gray-50 rounded-lg">
              <div className="flex items-start gap-4">
                <Landmark className="h-8 w-8 text-nexus-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-4">Mission & Vision</h2>
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                    <p>
                      To provide exceptional education that prepares students for successful careers and lifelong learning, to conduct research 
                      that advances knowledge and addresses societal challenges, and to foster a vibrant community of scholars, innovators, and leaders.
                    </p>
                  </div>
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
                    <p>
                      To be a world-renowned institution known for academic excellence, innovative research, and graduates who lead and transform 
                      their communities and professions.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Core Values</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li><span className="font-medium">Excellence</span> - Pursuing the highest standards in all we do</li>
                      <li><span className="font-medium">Innovation</span> - Embracing creativity and forward-thinking approaches</li>
                      <li><span className="font-medium">Integrity</span> - Upholding honesty, ethics, and transparency</li>
                      <li><span className="font-medium">Inclusion</span> - Valuing diversity and ensuring access for all</li>
                      <li><span className="font-medium">Community</span> - Fostering collaboration and meaningful connections</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="leadership" className="p-6 bg-gray-50 rounded-lg">
              <div className="flex items-start gap-4">
                <Users className="h-8 w-8 text-nexus-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-4">Leadership Team</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-4 rounded shadow-sm">
                      <h3 className="font-semibold text-lg">Dr. Eleanor Mitchell</h3>
                      <p className="text-nexus-primary font-medium">President</p>
                      <p className="text-sm text-gray-600 mt-2">
                        Dr. Mitchell has led KIT since 2018, bringing extensive experience from her previous roles at Stanford University and MIT.
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded shadow-sm">
                      <h3 className="font-semibold text-lg">Dr. James Chen</h3>
                      <p className="text-nexus-primary font-medium">Provost & Vice President, Academic Affairs</p>
                      <p className="text-sm text-gray-600 mt-2">
                        With over 25 years in higher education leadership, Dr. Chen oversees all academic programs and faculty development.
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded shadow-sm">
                      <h3 className="font-semibold text-lg">Dr. Sarah Johnson</h3>
                      <p className="text-nexus-primary font-medium">Dean, School of Engineering</p>
                      <p className="text-sm text-gray-600 mt-2">
                        An accomplished researcher in AI and robotics, Dr. Johnson has published over 150 papers and holds 12 patents.
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded shadow-sm">
                      <h3 className="font-semibold text-lg">Dr. Michael Rodriguez</h3>
                      <p className="text-nexus-primary font-medium">Dean, School of Business</p>
                      <p className="text-sm text-gray-600 mt-2">
                        Former CEO of a Fortune 500 company, Dr. Rodriguez brings real-world business expertise to academic leadership.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="alumni" className="p-6 bg-gray-50 rounded-lg">
              <div className="flex items-start gap-4">
                <GraduationCap className="h-8 w-8 text-nexus-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-4">Alumni Network</h2>
                  <p className="mb-4">
                    With over 100,000 alumni across the globe, KIT graduates form a powerful network of professionals making an impact in every industry.
                    Our alumni association actively engages graduates through mentorship programs, networking events, continuing education, and opportunities
                    to give back to the KIT community.
                  </p>
                  
                  <h3 className="text-xl font-semibold mb-3">Alumni Impact</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg text-center">
                      <p className="text-3xl font-bold text-nexus-primary">100K+</p>
                      <p className="text-sm">Global Alumni</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg text-center">
                      <p className="text-3xl font-bold text-nexus-primary">120+</p>
                      <p className="text-sm">Countries Represented</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg text-center">
                      <p className="text-3xl font-bold text-nexus-primary">250+</p>
                      <p className="text-sm">Fortune 500 CEOs</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg text-center">
                      <p className="text-3xl font-bold text-nexus-primary">$50M+</p>
                      <p className="text-sm">Annual Giving</p>
                    </div>
                  </div>
                  
                  <p>
                    Through the alumNexus platform, we continue to strengthen these connections, providing value to both current students and
                    our accomplished alumni community. Together, we're building on KIT's legacy of excellence and innovation.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="bg-nexus-primary/10 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Facts & Figures</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <CalendarDays className="h-10 w-10 mx-auto text-nexus-primary mb-2" />
                <p className="text-3xl font-bold">1965</p>
                <p className="text-sm text-gray-600">Year Founded</p>
              </div>
              <div className="text-center">
                <Users className="h-10 w-10 mx-auto text-nexus-primary mb-2" />
                <p className="text-3xl font-bold">15,000+</p>
                <p className="text-sm text-gray-600">Students</p>
              </div>
              <div className="text-center">
                <BookOpen className="h-10 w-10 mx-auto text-nexus-primary mb-2" />
                <p className="text-3xl font-bold">120+</p>
                <p className="text-sm text-gray-600">Academic Programs</p>
              </div>
              <div className="text-center">
                <Award className="h-10 w-10 mx-auto text-nexus-primary mb-2" />
                <p className="text-3xl font-bold">Top 50</p>
                <p className="text-sm text-gray-600">Global Ranking</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <ChatBot />
    </div>
  );
};

export default AboutPage;
