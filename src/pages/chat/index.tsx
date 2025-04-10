
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send, Search, User, Users } from 'lucide-react';

const ChatPage = () => {
  const [message, setMessage] = useState('');
  const [activeChat, setActiveChat] = useState<string | null>(null);
  
  const contacts = [
    { id: '1', name: 'John Smith', status: 'online', avatar: '👨‍💼', unread: 2, lastMessage: 'Let me know if you need any help with that project.' },
    { id: '2', name: 'Emily Johnson', status: 'offline', avatar: '👩‍🎓', unread: 0, lastMessage: 'The alumni event is next Friday at 7 PM.' },
    { id: '3', name: 'Michael Chen', status: 'online', avatar: '👨‍💻', unread: 0, lastMessage: 'I can introduce you to my team lead if you\'re interested.' },
    { id: '4', name: 'Sarah Williams', status: 'away', avatar: '👩‍⚕️', unread: 5, lastMessage: 'Would you be available for a mentoring session next week?' }
  ];
  
  const groups = [
    { id: 'g1', name: 'Software Development', members: 24, lastActivity: '10 minutes ago' },
    { id: 'g2', name: 'Business Network', members: 42, lastActivity: '1 hour ago' },
    { id: 'g3', name: 'Class of 2020', members: 68, lastActivity: 'Yesterday' },
    { id: 'g4', name: 'Career Transitions', members: 31, lastActivity: '2 days ago' }
  ];
  
  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, this would send the message to a backend
      console.log(`Sending message to ${activeChat}: ${message}`);
      setMessage('');
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-6 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold font-display mb-6">Chat</h1>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 min-h-[600px] flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="w-full md:w-80 border-r border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input placeholder="Search contacts..." className="pl-10 pr-4" />
                </div>
              </div>
              
              <Tabs defaultValue="direct" className="w-full">
                <TabsList className="w-full grid grid-cols-2">
                  <TabsTrigger value="direct" className="flex items-center justify-center">
                    <User className="mr-2 h-4 w-4" />
                    Direct
                  </TabsTrigger>
                  <TabsTrigger value="groups" className="flex items-center justify-center">
                    <Users className="mr-2 h-4 w-4" />
                    Groups
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="direct" className="max-h-[500px] overflow-y-auto">
                  <div className="divide-y divide-gray-100">
                    {contacts.map((contact) => (
                      <div 
                        key={contact.id}
                        className={`p-4 hover:bg-gray-50 cursor-pointer ${activeChat === contact.id ? 'bg-gray-50' : ''}`}
                        onClick={() => setActiveChat(contact.id)}
                      >
                        <div className="flex items-start">
                          <div className="relative mr-3">
                            <div className="h-10 w-10 bg-nexus-primary/10 rounded-full flex items-center justify-center text-lg">
                              {contact.avatar}
                            </div>
                            <div className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full ${
                              contact.status === 'online' ? 'bg-green-500' : 
                              contact.status === 'away' ? 'bg-amber-500' : 'bg-gray-400'
                            } border-2 border-white`}></div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium truncate">{contact.name}</h3>
                              {contact.unread > 0 && (
                                <span className="bg-nexus-primary text-white text-xs font-semibold rounded-full h-5 min-w-5 flex items-center justify-center px-1">
                                  {contact.unread}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="groups" className="max-h-[500px] overflow-y-auto">
                  <div className="divide-y divide-gray-100">
                    {groups.map((group) => (
                      <div 
                        key={group.id}
                        className={`p-4 hover:bg-gray-50 cursor-pointer ${activeChat === group.id ? 'bg-gray-50' : ''}`}
                        onClick={() => setActiveChat(group.id)}
                      >
                        <div className="flex items-start">
                          <div className="mr-3">
                            <div className="h-10 w-10 bg-nexus-primary rounded-full flex items-center justify-center text-white">
                              <Users size={20} />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium">{group.name}</h3>
                            <div className="flex text-sm text-gray-500">
                              <span className="mr-2">{group.members} members</span>
                              <span>Last active: {group.lastActivity}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {activeChat ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 flex items-center">
                    <div className="h-10 w-10 bg-nexus-primary/10 rounded-full flex items-center justify-center text-lg mr-3">
                      {activeChat.startsWith('g') ? <Users size={20} /> : 
                        contacts.find(c => c.id === activeChat)?.avatar || '👤'}
                    </div>
                    <div>
                      <h3 className="font-medium">
                        {activeChat.startsWith('g') ? 
                          groups.find(g => g.id === activeChat)?.name : 
                          contacts.find(c => c.id === activeChat)?.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {activeChat.startsWith('g') ? 
                          `${groups.find(g => g.id === activeChat)?.members} members` : 
                          contacts.find(c => c.id === activeChat)?.status}
                      </p>
                    </div>
                  </div>
                  
                  {/* Messages */}
                  <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                    <div className="text-center text-sm text-gray-500 mb-4">Today</div>
                    
                    {/* Sample messages - in a real app, these would be dynamically loaded */}
                    <div className="space-y-4">
                      <div className="flex justify-start">
                        <div className="bg-white rounded-lg p-3 shadow-sm max-w-xs md:max-w-md">
                          <p className="text-gray-700">Hi there! How can I help you with your career questions?</p>
                          <p className="text-right text-xs text-gray-500 mt-1">10:30 AM</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <div className="bg-nexus-primary text-white rounded-lg p-3 shadow-sm max-w-xs md:max-w-md">
                          <p>I'm looking for advice on transitioning to a new industry. Do you have any resources?</p>
                          <p className="text-right text-xs text-white/80 mt-1">10:32 AM</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-start">
                        <div className="bg-white rounded-lg p-3 shadow-sm max-w-xs md:max-w-md">
                          <p className="text-gray-700">Absolutely! I'd be happy to share some resources. Let's schedule a call to discuss your specific situation in more detail.</p>
                          <p className="text-right text-xs text-gray-500 mt-1">10:35 AM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200 flex">
                    <Input 
                      placeholder="Type a message..." 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={handleKeyPress}
                      className="flex-1 mr-2"
                    />
                    <Button 
                      onClick={handleSendMessage}
                      className="bg-nexus-primary hover:bg-nexus-primary/90 text-white"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-gray-50 p-6">
                  <div className="text-center">
                    <div className="mx-auto h-16 w-16 bg-nexus-primary/10 rounded-full flex items-center justify-center mb-4">
                      <MessageSquare className="h-8 w-8 text-nexus-primary" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Start a conversation</h3>
                    <p className="text-gray-600 max-w-md mx-auto mb-6">
                      Connect with alumni mentors, fellow students, and industry professionals through direct messages or group chats.
                    </p>
                    <Button className="bg-nexus-primary hover:bg-nexus-primary/90 text-white">
                      Select a contact
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ChatPage;
