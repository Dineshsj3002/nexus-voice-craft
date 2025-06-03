import React, { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, User, Users, MessageSquare, Clock, ChevronLeft, Plus, Phone, Video, Info, MoreVertical, Archive, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { TooltipProvider } from '@/components/ui/tooltip';
import MessageBubble from '@/components/chat/MessageBubble';
import ContactListItem from '@/components/chat/ContactListItem';
import ChatInput from '@/components/chat/ChatInput';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

// Message type interface
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: Date;
  status: 'sending' | 'sent' | 'delivered' | 'read';
  type?: 'text' | 'image' | 'document' | 'voice';
  replyTo?: {
    text: string;
    sender: string;
  };
  reactions?: Array<{
    emoji: string;
    count: number;
    users: string[];
  }>;
  isEdited?: boolean;
}

// Contact interface
interface Contact {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'away';
  avatar?: string;
  unread: number;
  lastMessage: string;
  lastMessageTime: Date;
  typing?: boolean;
  isGroup?: boolean;
  groupMembers?: number;
  isPinned?: boolean;
  isMuted?: boolean;
}

// Group interface
interface Group {
  id: string;
  name: string;
  members: number;
  lastActivity: string;
  avatar?: string;
  description?: string;
}

const ChatPage = () => {
  const [message, setMessage] = useState('');
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [replyingTo, setReplyingTo] = useState<{ id: string; text: string; sender: string } | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([
    { 
      id: '1', 
      name: 'John Smith', 
      status: 'online', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      unread: 2, 
      lastMessage: 'Let me know if you need any help with that project.', 
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 5),
      isPinned: true
    },
    { 
      id: '2', 
      name: 'Emily Johnson', 
      status: 'offline', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
      unread: 0, 
      lastMessage: 'The alumni event is next Friday at 7 PM.', 
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 30),
    },
    { 
      id: '3', 
      name: 'Michael Chen', 
      status: 'online', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
      unread: 0, 
      lastMessage: 'I can introduce you to my team lead if you\'re interested.', 
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60),
      typing: true 
    },
    { 
      id: '4', 
      name: 'Sarah Williams', 
      status: 'away', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      unread: 5, 
      lastMessage: 'Would you be available for a mentoring session next week?', 
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2),
      isMuted: true
    }
  ]);
  
  const [groups, setGroups] = useState<Group[]>([
    { 
      id: 'g1', 
      name: 'Software Development', 
      members: 24, 
      lastActivity: '10 minutes ago',
      description: 'Discuss latest trends in software development',
      avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=SoftwareDev'
    },
    { 
      id: 'g2', 
      name: 'Business Network', 
      members: 42, 
      lastActivity: '1 hour ago',
      description: 'Connect with business professionals',
      avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=Business'
    },
    { 
      id: 'g3', 
      name: 'Class of 2020', 
      members: 68, 
      lastActivity: 'Yesterday',
      description: 'Reconnect with your classmates',
      avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=Class2020'
    },
    { 
      id: 'g4', 
      name: 'Career Transitions', 
      members: 31, 
      lastActivity: '2 days ago',
      description: 'Support for career changes',
      avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=Career'
    }
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
      status: 'sending',
      replyTo: replyingTo ? {
        text: replyingTo.text,
        sender: replyingTo.sender
      } : undefined
    };
    
    // Add to messages state
    setMessages(prev => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), newMessage]
    }));
    
    // Clear input and reply
    setMessage('');
    setReplyingTo(null);
    
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
  
  const handleReply = (messageId: string) => {
    const chatMessages = messages[activeChat!] || [];
    const messageToReply = chatMessages.find(msg => msg.id === messageId);
    if (messageToReply) {
      setReplyingTo({
        id: messageId,
        text: messageToReply.text,
        sender: messageToReply.sender === 'user' ? 'You' : getContactName(activeChat!)
      });
    }
  };

  const handleReact = (messageId: string, emoji: string) => {
    if (!activeChat) return;
    
    setMessages(prev => ({
      ...prev,
      [activeChat]: prev[activeChat]?.map(msg => {
        if (msg.id === messageId) {
          const existingReactions = msg.reactions || [];
          const existingReaction = existingReactions.find(r => r.emoji === emoji);
          
          if (existingReaction) {
            // Toggle reaction
            return {
              ...msg,
              reactions: existingReactions.filter(r => r.emoji !== emoji)
            };
          } else {
            // Add new reaction
            return {
              ...msg,
              reactions: [...existingReactions, { emoji, count: 1, users: ['You'] }]
            };
          }
        }
        return msg;
      }) || []
    }));
  };

  const getContactName = (contactId: string) => {
    if (contactId.startsWith('g')) {
      return groups.find(g => g.id === contactId)?.name || 'Group';
    }
    return contacts.find(c => c.id === contactId)?.name || 'Contact';
  };

  const getCurrentContact = () => {
    if (!activeChat) return null;
    if (activeChat.startsWith('g')) {
      return groups.find(g => g.id === activeChat);
    }
    return contacts.find(c => c.id === activeChat);
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen flex flex-col bg-whatsapp-background">
        <Header />
        
        <main className="flex-grow bg-whatsapp-background">
          <div className="max-w-7xl mx-auto h-[calc(100vh-8rem)] flex bg-white shadow-lg">
            {/* Sidebar */}
            <div className={`${activeChat && isMobile ? 'hidden' : 'block'} w-full md:w-80 border-r border-whatsapp-border bg-whatsapp-panel flex flex-col`}>
              {/* Sidebar Header */}
              <div className="p-4 bg-whatsapp-panel border-b border-whatsapp-border">
                <div className="flex items-center justify-between mb-3">
                  <h1 className="text-xl font-semibold text-whatsapp-text font-whatsapp">Chats</h1>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-whatsapp-textSecondary">
                      <Plus className="h-5 w-5" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-whatsapp-textSecondary">
                          <MoreVertical className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Archive className="h-4 w-4 mr-2" />
                          Archived
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Settings className="h-4 w-4 mr-2" />
                          Settings
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-whatsapp-textSecondary" size={18} />
                  <Input 
                    placeholder="Search or start new chat" 
                    className="pl-10 pr-4 bg-white border-whatsapp-border focus:border-whatsapp-primary rounded-lg font-whatsapp" 
                  />
                </div>
              </div>
              
              <Tabs defaultValue="direct" className="flex-1 flex flex-col">
                <TabsList className="w-full grid grid-cols-2 bg-whatsapp-panel border-b border-whatsapp-border rounded-none">
                  <TabsTrigger value="direct" className="flex items-center justify-center font-whatsapp data-[state=active]:bg-white">
                    <User className="mr-2 h-4 w-4" />
                    Chats
                  </TabsTrigger>
                  <TabsTrigger value="groups" className="flex items-center justify-center font-whatsapp data-[state=active]:bg-white">
                    <Users className="mr-2 h-4 w-4" />
                    Groups
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="direct" className="flex-1 overflow-y-auto m-0">
                  <div className="divide-y divide-whatsapp-border/50">
                    {contacts.map((contact) => (
                      <ContactListItem
                        key={contact.id}
                        contact={contact}
                        isActive={activeChat === contact.id}
                        onClick={() => setActiveChat(contact.id)}
                      />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="groups" className="flex-1 overflow-y-auto m-0">
                  <div className="divide-y divide-whatsapp-border/50">
                    {groups.map((group) => (
                      <ContactListItem
                        key={group.id}
                        contact={{
                          id: group.id,
                          name: group.name,
                          status: 'online',
                          avatar: group.avatar,
                          unread: 0,
                          lastMessage: `Last activity: ${group.lastActivity}`,
                          lastMessageTime: new Date(),
                          isGroup: true,
                          groupMembers: group.members
                        }}
                        isActive={activeChat === group.id}
                        onClick={() => setActiveChat(group.id)}
                      />
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
                  <div className="p-4 bg-whatsapp-panel border-b border-whatsapp-border flex items-center justify-between">
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
                      <div className="h-10 w-10 bg-whatsapp-primary rounded-full flex items-center justify-center text-white mr-3 overflow-hidden">
                        {getCurrentContact()?.avatar ? (
                          <img src={getCurrentContact()?.avatar} alt="" className="w-full h-full object-cover" />
                        ) : activeChat.startsWith('g') ? (
                          <Users size={20} />
                        ) : (
                          contacts.find(c => c.id === activeChat)?.name?.[0] || '👤'
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-whatsapp-text font-whatsapp">
                          {getContactName(activeChat)}
                        </h3>
                        <p className="text-sm text-whatsapp-textSecondary font-whatsapp">
                          {activeChat.startsWith('g') ? 
                            `${groups.find(g => g.id === activeChat)?.members} members` : 
                            contacts.find(c => c.id === activeChat)?.status === 'online' ? 'online' :
                            contacts.find(c => c.id === activeChat)?.status === 'away' ? 'away' : 'last seen recently'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="text-whatsapp-textSecondary">
                        <Video className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-whatsapp-textSecondary">
                        <Phone className="h-5 w-5" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-whatsapp-textSecondary">
                            <MoreVertical className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Contact info</DropdownMenuItem>
                          <DropdownMenuItem>Select messages</DropdownMenuItem>
                          <DropdownMenuItem>Mute notifications</DropdownMenuItem>
                          <DropdownMenuItem>Clear messages</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Delete chat</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto bg-whatsapp-pattern p-4">
                    <div className="text-center mb-4">
                      <span className="bg-white/80 text-whatsapp-textSecondary text-xs px-3 py-1 rounded-lg font-whatsapp">
                        Today
                      </span>
                    </div>
                    
                    {/* Display messages */}
                    <div className="space-y-1">
                      {messages[activeChat]?.map((msg) => (
                        <MessageBubble
                          key={msg.id}
                          message={msg}
                          onReply={handleReply}
                          onReact={handleReact}
                          onForward={(id) => console.log('Forward:', id)}
                          onDelete={(id) => console.log('Delete:', id)}
                          onEdit={(id) => console.log('Edit:', id)}
                        />
                      ))}
                      
                      {/* Typing indicator */}
                      {contacts.find(c => c.id === activeChat)?.typing && (
                        <div className="flex justify-start">
                          <div className="bg-whatsapp-incoming rounded-lg rounded-bl-sm p-3 shadow-sm max-w-xs">
                            <div className="flex space-x-1 items-center">
                              <div className="h-2 w-2 bg-whatsapp-textSecondary rounded-full animate-typing" style={{ animationDelay: '0ms' }}></div>
                              <div className="h-2 w-2 bg-whatsapp-textSecondary rounded-full animate-typing" style={{ animationDelay: '200ms' }}></div>
                              <div className="h-2 w-2 bg-whatsapp-textSecondary rounded-full animate-typing" style={{ animationDelay: '400ms' }}></div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Invisible element to scroll to */}
                      <div ref={messageEndRef} />
                    </div>
                  </div>
                  
                  {/* Message Input */}
                  <ChatInput
                    value={message}
                    onChange={setMessage}
                    onSend={handleSendMessage}
                    replyingTo={replyingTo}
                    onCancelReply={() => setReplyingTo(null)}
                    onVoiceMessage={(audioBlob) => console.log('Voice message:', audioBlob)}
                    onFileAttach={(files) => console.log('Files:', files)}
                    onImageAttach={(files) => console.log('Images:', files)}
                  />
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-whatsapp-background">
                  <div className="text-center">
                    <div className="mx-auto h-32 w-32 bg-whatsapp-primary/10 rounded-full flex items-center justify-center mb-6">
                      <MessageSquare className="h-16 w-16 text-whatsapp-primary" />
                    </div>
                    <h3 className="text-2xl font-medium mb-2 text-whatsapp-text font-whatsapp">Welcome to alumNexus Chat</h3>
                    <p className="text-whatsapp-textSecondary max-w-md mx-auto mb-6 font-whatsapp">
                      Connect with alumni mentors, fellow students, and industry professionals through our WhatsApp-style messaging platform.
                    </p>
                    <Button className="bg-whatsapp-primary hover:bg-whatsapp-dark text-white font-whatsapp">
                      Start a conversation
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </TooltipProvider>
  );
};

export default ChatPage;
