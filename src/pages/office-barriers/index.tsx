import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GlassCard } from '@/components/ui/glass-card';
import AnimatedButton from '@/components/animations/AnimatedButton';
import { ArrowRight, FileText, Users, MessageSquare, Calendar, Clock, MapPin, Target, Lightbulb, TrendingUp } from 'lucide-react';
const OfficeBarriersPage = () => {
  return <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-16 px-4 md:px-8 bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] bg-green-50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl opacity-20" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary font-medium mb-6">
              <Target className="h-4 w-4 mr-2" />
              Professional Development Hub
            </div>
            <h1 className="text-5xl md:text-6xl font-bold font-display mb-6 bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
              Office Barriers
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform workplace challenges into career opportunities with expert guidance, proven strategies, and a supportive alumni community.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <AnimatedButton animation="glow" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Lightbulb className="h-4 w-4 mr-2" />
                Explore Resources
              </AnimatedButton>
              <AnimatedButton variant="outline" animation="float" className="border-primary text-primary hover:bg-primary/10">
                <TrendingUp className="h-4 w-4 mr-2" />
                Success Stories
              </AnimatedButton>
            </div>
          </div>
          
          <Tabs defaultValue="resources" className="w-full">
            <TabsList className="mb-6 bg-emerald-200">
              <TabsTrigger value="resources" className="text-gray-600">Resources</TabsTrigger>
              <TabsTrigger value="mentoring">Mentoring</TabsTrigger>
              <TabsTrigger value="stories">Success Stories</TabsTrigger>
              <TabsTrigger value="discussions">Discussions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="resources">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[{
                title: "Navigating Office Politics",
                description: "Learn strategies for effectively navigating workplace dynamics and building positive relationships.",
                icon: <Users className="h-10 w-10 text-primary" />,
                action: "Read Guide",
                gradient: "from-blue-500/20 to-indigo-600/20"
              }, {
                title: "Communication Skills",
                description: "Develop essential communication skills for overcoming barriers and advancing your career.",
                icon: <MessageSquare className="h-10 w-10 text-primary" />,
                action: "View Resources",
                gradient: "from-green-500/20 to-emerald-600/20"
              }, {
                title: "Overcoming Imposter Syndrome",
                description: "Practical advice for recognizing and addressing feelings of inadequacy in the workplace.",
                icon: <FileText className="h-10 w-10 text-primary" />,
                action: "Access Toolkit",
                gradient: "from-purple-500/20 to-violet-600/20"
              }].map((resource, index) => <GlassCard key={index} hoverEffect={true} intensity="medium" className="group relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${resource.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className="relative p-8">
                      <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                        {resource.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-4 text-foreground">{resource.title}</h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed">{resource.description}</p>
                      <AnimatedButton animation="pulse" className="bg-primary text-primary-foreground hover:bg-primary/90 w-full">
                        {resource.action}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </AnimatedButton>
                    </div>
                  </GlassCard>)}
              </div>
              
              <GlassCard className="mt-16" intensity="heavy">
                <div className="p-8">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary font-medium mb-4">
                      <Calendar className="h-4 w-4 mr-2" />
                      Featured Workshop
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Breaking Barriers: Navigating Workplace Challenges</h3>
                    <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                      Join us for an interactive workshop focused on identifying and overcoming common workplace barriers. 
                      Led by experienced alumni professionals from diverse industries.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-background/50 backdrop-blur-sm p-4 rounded-lg border border-border/50 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-primary mr-3" />
                      <span className="font-medium">May 15, 2025</span>
                    </div>
                    <div className="bg-background/50 backdrop-blur-sm p-4 rounded-lg border border-border/50 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-primary mr-3" />
                      <span className="font-medium">6:00 PM - 8:00 PM</span>
                    </div>
                    <div className="bg-background/50 backdrop-blur-sm p-4 rounded-lg border border-border/50 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-primary mr-3" />
                      <span className="font-medium">Virtual (Zoom)</span>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <AnimatedButton animation="glow" size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Register Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </AnimatedButton>
                  </div>
                </div>
              </GlassCard>
            </TabsContent>
            
            <TabsContent value="mentoring">
              <GlassCard intensity="medium">
                <div className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-4">Mentoring for Workplace Success</h3>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      Connect with alumni mentors who have successfully navigated workplace barriers and can provide 
                      personalized guidance based on their experiences.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <GlassCard hoverEffect={true} intensity="light" className="group">
                      <div className="p-6">
                        <h4 className="font-semibold mb-3 text-lg">One-on-One Mentoring</h4>
                        <p className="text-muted-foreground mb-6">
                          Get matched with an alumni mentor for personalized guidance on specific workplace challenges.
                        </p>
                        <AnimatedButton animation="pulse" className="bg-primary text-primary-foreground hover:bg-primary/90 w-full">
                          Request a Mentor
                        </AnimatedButton>
                      </div>
                    </GlassCard>
                    
                    <GlassCard hoverEffect={true} intensity="light" className="group">
                      <div className="p-6">
                        <h4 className="font-semibold mb-3 text-lg">Group Mentoring Circles</h4>
                        <p className="text-muted-foreground mb-6">
                          Join a small group led by an experienced mentor to discuss and solve common workplace barriers.
                        </p>
                        <AnimatedButton animation="pulse" className="bg-primary text-primary-foreground hover:bg-primary/90 w-full">
                          Join a Circle
                        </AnimatedButton>
                      </div>
                    </GlassCard>
                  </div>
                  
                  <div className="text-center">
                    <AnimatedButton variant="outline" animation="float" className="border-primary text-primary hover:bg-primary/10">
                      Learn More About Mentoring
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </AnimatedButton>
                  </div>
                </div>
              </GlassCard>
            </TabsContent>
            
            <TabsContent value="stories">
              <div className="space-y-8">
                {[{
                name: "Sarah Johnson",
                title: "Overcoming Gender Bias in Tech",
                content: "As one of the few women in my engineering team, I faced numerous challenges...",
                industry: "Technology",
                year: "Class of 2015",
                gradient: "from-pink-500/20 to-rose-600/20"
              }, {
                name: "Michael Chen",
                title: "Navigating Cultural Differences in a Global Company",
                content: "Working for an international corporation presented unique challenges in communication...",
                industry: "Finance",
                year: "Class of 2012",
                gradient: "from-blue-500/20 to-cyan-600/20"
              }, {
                name: "Priya Patel",
                title: "From Entry-Level to Leadership",
                content: "My journey from an entry-level position to a leadership role taught me valuable lessons...",
                industry: "Healthcare",
                year: "Class of 2010",
                gradient: "from-green-500/20 to-emerald-600/20"
              }].map((story, index) => <GlassCard key={index} hoverEffect={true} intensity="light" className="group relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${story.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className="relative p-6">
                      <h3 className="text-xl font-semibold mb-4">{story.title}</h3>
                      <div className="flex items-center mb-4">
                        <div className="bg-primary/20 text-primary rounded-full h-12 w-12 flex items-center justify-center mr-4 font-semibold text-lg">
                          {story.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{story.name}</p>
                          <p className="text-sm text-muted-foreground">{story.industry} | {story.year}</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-6 leading-relaxed">{story.content}</p>
                      <AnimatedButton variant="link" animation="pulse" className="text-primary p-0 h-auto">
                        Read Full Story
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </AnimatedButton>
                    </div>
                  </GlassCard>)}
              </div>
              <div className="text-center mt-12">
                <AnimatedButton variant="outline" animation="glow" className="border-primary text-primary hover:bg-primary/10">
                  View All Success Stories
                </AnimatedButton>
              </div>
            </TabsContent>
            
            <TabsContent value="discussions">
              <GlassCard intensity="medium">
                <div className="p-8 bg-emerald-50">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-4">Join the Conversation</h3>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      Participate in discussions about workplace barriers and share your experiences and solutions.
                    </p>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    {[{
                    topic: "Dealing with Difficult Colleagues",
                    replies: 24,
                    lastActive: "2 hours ago"
                  }, {
                    topic: "Work-Life Balance Strategies",
                    replies: 36,
                    lastActive: "Yesterday"
                  }, {
                    topic: "Negotiating Promotions and Raises",
                    replies: 18,
                    lastActive: "3 days ago"
                  }].map((discussion, index) => <GlassCard key={index} hoverEffect={true} intensity="light" className="group">
                        <div className="p-4 flex justify-between items-center">
                          <div>
                            <h4 className="font-medium text-foreground">{discussion.topic}</h4>
                            <p className="text-sm text-muted-foreground">{discussion.replies} replies • Last active {discussion.lastActive}</p>
                          </div>
                          <AnimatedButton variant="outline" size="sm" animation="pulse" className="border-primary text-primary hover:bg-primary/10">
                            View Thread
                          </AnimatedButton>
                        </div>
                      </GlassCard>)}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <AnimatedButton animation="glow" className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto">
                      Start New Discussion
                    </AnimatedButton>
                    <AnimatedButton variant="link" animation="float" className="text-primary">
                      View All Discussions
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </AnimatedButton>
                  </div>
                </div>
              </GlassCard>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
      <ChatBot />
    </div>;
};
export default OfficeBarriersPage;