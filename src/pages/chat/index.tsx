import React, { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send, Search, User, Users, MessageSquare, Clock, ChevronLeft, Plus, Phone, Video, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import TypingIndicator from '@/components/TypingIndicator';

// Message type interface
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: Date;
  status: 'sending' | 'sent' | 'delivered' | 'read';
}

// Contact interface
interface Contact {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'away';
  avatar: string;
  unread: number;
  lastMessage: string;
  typing?: boolean;
}

// Group interface
interface Group {
  id: string;
  name: string;
  members: number;
  lastActivity: string;
}

const ChatPage = () => {
  const [message, setMessage] = useState('');
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [contacts, setContacts] = useState<Contact[]>([
    { id: '1', name: 'John Smith', status: 'online', avatar: '👨‍💼', unread: 2, lastMessage: 'Let me know if you need any help with that project.' },
    { id: '2', name: 'Emily Johnson', status: 'offline', avatar: '👩‍🎓', unread: 0, lastMessage: 'The alumni event is next Friday at 7 PM.' },
    { id: '3', name: 'Michael Chen', status: 'online', avatar: '👨‍💻', unread: 0, lastMessage: 'I can introduce you to my team lead if you\'re interested.', typing: true },
    { id: '4', name: 'Sarah Williams', status: 'away', avatar: '👩‍⚕️', unread: 5, lastMessage: 'Would you be available for a mentoring session next week?' }
  ]);
  
  const [groups, setGroups] = useState<Group[]>([
    { id: 'g1', name: 'Software Development', members: 24, lastActivity: '10 minutes ago' },
    { id: 'g2', name: 'Business Network', members: 42, lastActivity: '1 hour ago' },
    { id: 'g3', name: 'Class of 2020', members: 68, lastActivity: 'Yesterday' },
    { id: 'g4', name: 'Career Transitions', members: 31, lastActivity: '2 days ago' }
  ]);
  
  const { toast } = useToast();
  const messageEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  // Initialize chat data
  useEffect(() => {
    // Sample messages for John Smith chat
    const johnMessages: Message[] = [
      {
        id: '1',
        text: 'Hi there! How can I help you with your career questions?',
        sender: 'other',
        timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
        status: 'read'
      },
      {
        id: '2',
        text: 'I\'m looking for advice on transitioning to a new industry. Do you have any resources?',
        sender: 'user',
        timestamp: new Date(Date.now() - 1000 * 60 * 3), // 3 minutes ago
        status: 'read'
      },
      {
        id: '3',
        text: 'Absolutely! I\'d be happy to share some resources. Let\'s schedule a call to discuss your specific situation in more detail.',
        sender: 'other',
        timestamp: new Date(Date.now() - 1000 * 60), // 1 minute ago
        status: 'read'
      }
    ];
    
    // Initialize with sample data
    setMessages({
      '1': johnMessages
    });
    
    // Simulate receiving a new message
    const messageTimer = setTimeout(() => {
      if (activeChat === '1') {
        const contact = contacts.find(c => c.id === '1');
        if (contact) {
          // Show typing indicator
          setContacts(prev => prev.map(c => c.id === '1' ? { ...c, typing: true } : c));
          
          // Then send message after delay
          setTimeout(() => {
            const newMessage: Message = {
              id: Date.now().toString(),
              text: 'I just remembered that we have an industry transition workshop next month. Would you be interested in attending?',
              sender: 'other',
              timestamp: new Date(),
              status: 'delivered'
            };
            
            setMessages(prev => ({
              ...prev,
              '1': [...(prev['1'] || []), newMessage]
            }));
            
            // Remove typing indicator
            setContacts(prev => prev.map(c => c.id === '1' ? { ...c, typing: false } : c));
            
            // Show toast notification
            toast({
              title: "New message",
              description: `${contact.name}: ${newMessage.text.substring(0, 50)}${newMessage.text.length > 50 ? '...' : ''}`,
            });
          }, 3000);
        }
      }
    }, 10000);
    
    return () => clearTimeout(messageTimer);
  }, [activeChat, toast]);
  
  // Scroll to bottom of messages
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeChat]);
  
  const formatMessageTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const handleSendMessage = () => {
    if (!message.trim() || !activeChat) return;
    
    // Create new message
    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date(),
      status: 'sending'
    };
    
    // Add to messages state
    setMessages(prev => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), newMessage]
    }));
    
    // Clear input
    setMessage('');
    
    // Simulate message being sent and delivered
    setTimeout(() => {
      setMessages(prev => ({
        ...prev,
        [activeChat]: prev[activeChat].map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'sent' } : msg
        )
      }));
      
      // Then delivered
      setTimeout(() => {
        setMessages(prev => ({
          ...prev,
          [activeChat]: prev[activeChat].map(msg => 
            msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
          )
        }));
        
        // Mark as read after some time
        setTimeout(() => {
          setMessages(prev => ({
            ...prev,
            [activeChat]: prev[activeChat].map(msg => 
              msg.id === newMessage.id ? { ...msg, status: 'read' } : msg
            )
          }));
        }, 2000);
      }, 1000);
    }, 500);
    
    // Simulate reply for demo purposes
    if (activeChat === '1') {
      // Show typing indicator
      setTimeout(() => {
        setContacts(prev => prev.map(c => c.id === activeChat ? { ...c, typing: true } : c));
        
        // Send reply after a delay
        setTimeout(() => {
          const replyMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: 'Thanks for your message! I\'ll get back to you shortly.',
            sender: 'other',
            timestamp: new Date(),
            status: 'delivered'
          };
          
          setMessages(prev => ({
            ...prev,
            [activeChat]: [...prev[activeChat], replyMessage]
          }));
          
          // Remove typing indicator
          setContacts(prev => prev.map(c => c.id === activeChat ? { ...c, typing: false } : c));
          
          // Update last message in contact list
          setContacts(prev => prev.map(c => 
            c.id === activeChat 
              ? { ...c, lastMessage: replyMessage.text, typing: false } 
              : c
          ));
        }, 3000);
      }, 1500);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent form submission
      handleSendMessage();
    }
  };
  
  const getMessageStatusIcon = (status: Message['status']) => {
    switch (status) {
      case 'sending':
        return <Clock className="h-3 w-3 text-gray-400" />;
      case 'sent':
        return <div className="h-3 w-3 text-gray-400">✓</div>;
      case 'delivered':
        return <div className="h-3 w-3 text-gray-400">✓✓</div>;
      case 'read':
        return <div className="h-3 w-3 text-blue-500">✓✓</div>;
      default:
        return null;
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow py-6 px-4 md:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold font-display mb-6 animate-fade-in">Chat</h1>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 min-h-[600px] flex flex-col md:flex-row animate-scale-in">
              {/* Sidebar */}
              <div className={`${activeChat && isMobile ? 'hidden' : 'block'} w-full md:w-80 border-r border-gray-200`}>
                <div className="p-4 border-b border-gray-200">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-all duration-200" size={18} />
                    <Input placeholder="Search contacts..." className="pl-10 pr-4 transition-all duration-200 focus:ring-2 focus:ring-nexus-primary/20" />
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
                      {contacts.map((contact, index) => (
                        <div 
                          key={contact.id}
                          className={`p-4 hover:bg-gray-50 cursor-pointer transition-all duration-200 hover:scale-[1.02] ${activeChat === contact.id ? 'bg-gray-50' : ''}`}
                          onClick={() => setActiveChat(contact.id)}
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="flex items-start animate-fade-in">
                            <div className="relative mr-3">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback className="bg-nexus-primary/10 text-nexus-primary">
                                  {contact.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <div className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full ${
                                contact.status === 'online' ? 'bg-green-500' : 
                                contact.status === 'away' ? 'bg-amber-500' : 'bg-gray-400'
                              } border-2 border-white transition-all duration-300`}></div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start">
                                <h3 className="font-medium truncate">{contact.name}</h3>
                                {contact.unread > 0 && (
                                  <span className="bg-nexus-primary text-white text-xs font-semibold rounded-full h-5 min-w-5 flex items-center justify-center px-1 animate-smooth-bounce">
                                    {contact.unread}
                                  </span>
                                )}
                              </div>
                              {contact.typing ? (
                                <p className="text-sm text-nexus-primary font-medium">typing...</p>
                              ) : (
                                <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
                              )}
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
              <div className={`flex-1 flex flex-col ${activeChat && isMobile ? 'block' : 'hidden md:flex'}`}>
                {activeChat ? (
                  <>
                    {/* Chat Header */}
                    <div className="p-4 border-b border-gray-200 flex items-center justify-between animate-fade-in">
                      <div className="flex items-center">
                        {isMobile && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => setActiveChat(null)} 
                            className="mr-2"
                          >
                            <ChevronLeft className="h-5 w-5" />
                          </Button>
                        )}
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
                              contacts.find(c => c.id === activeChat)?.status === 'online' ? 'Online' :
                              contacts.find(c => c.id === activeChat)?.status === 'away' ? 'Away' : 'Offline'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon">
                          <Phone className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Video className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Info className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                      <div className="text-center text-sm text-gray-500 mb-4">Today</div>
                      
                      {/* Display messages */}
                      <div className="space-y-4">
                        {messages[activeChat]?.map((msg, index) => (
                          <div 
                            key={msg.id} 
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-message-appear`}
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <div 
                              className={`relative rounded-lg p-3 shadow-sm max-w-xs md:max-w-md transition-all duration-300 hover:shadow-md ${
                                msg.sender === 'user' 
                                  ? 'bg-nexus-primary text-white' 
                                  : 'bg-white text-gray-700'
                              }`}
                            >
                              <p>{msg.text}</p>
                              <div className={`flex items-center justify-end ${msg.sender === 'user' ? 'text-white/80' : 'text-gray-500'} text-xs mt-1 gap-1`}>
                                <span>{formatMessageTime(msg.timestamp)}</span>
                                {msg.sender === 'user' && getMessageStatusIcon(msg.status)}
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {/* Enhanced Typing indicator */}
                        {contacts.find(c => c.id === activeChat)?.typing && (
                          <div className="flex justify-start animate-fade-in">
                            <TypingIndicator className="max-w-xs md:max-w-md" />
                          </div>
                        )}
                        
                        {/* Invisible element to scroll to */}
                        <div ref={messageEndRef} />
                      </div>
                    </div>
                    
                    {/* Message Input */}
                    <div className="p-4 border-t border-gray-200 animate-fade-in">
                      <div className="flex">
                        <Button variant="ghost" size="icon" className="mr-1 hover:scale-110 transition-transform duration-200">
                          <Plus className="h-5 w-5" />
                        </Button>
                        <Input 
                          placeholder="Type a message..." 
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyDown={handleKeyPress}
                          className="flex-1 mr-2 transition-all duration-200 focus:ring-2 focus:ring-nexus-primary/20"
                        />
                        <Button 
                          onClick={handleSendMessage}
                          className="bg-nexus-primary hover:bg-nexus-primary/90 text-white transition-all duration-200 hover:scale-105"
                          disabled={!message.trim()}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center bg-gray-50 p-6">
                    <div className="text-center animate-scale-in">
                      <div className="mx-auto h-16 w-16 bg-nexus-primary/10 rounded-full flex items-center justify-center mb-4 animate-smooth-bounce">
                        <MessageSquare className="h-8 w-8 text-nexus-primary" />
                      </div>
                      <h3 className="text-xl font-medium mb-2">Start a conversation</h3>
                      <p className="text-gray-600 max-w-md mx-auto mb-6">
                        Connect with alumni mentors, fellow students, and industry professionals through direct messages or group chats.
                      </p>
                      <Button className="bg-nexus-primary hover:bg-nexus-primary/90 text-white transition-all duration-200 hover:scale-105">
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
    </TooltipProvider>
  );
};

export default ChatPage;
