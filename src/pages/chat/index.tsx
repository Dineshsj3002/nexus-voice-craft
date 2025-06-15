import React, { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MessageSquare } from "lucide-react";
import ChatSidebar from "./ChatSidebar";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { Message, Contact, Group } from "./chatTypes";

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
  const [message, setMessage] = useState("");
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [contacts, setContacts] = useState<Contact[]>([
    { id: "1", name: "John Smith", status: "online", avatar: "👨‍💼", unread: 2, lastMessage: "Let me know if you need any help with that project." },
    { id: "2", name: "Emily Johnson", status: "offline", avatar: "👩‍🎓", unread: 0, lastMessage: "The alumni event is next Friday at 7 PM." },
    { id: "3", name: "Michael Chen", status: "online", avatar: "👨‍💻", unread: 0, lastMessage: "I can introduce you to my team lead if you're interested.", typing: true },
    { id: "4", name: "Sarah Williams", status: "away", avatar: "👩‍⚕️", unread: 5, lastMessage: "Would you be available for a mentoring session next week?" }
  ]);
  
  const [groups, setGroups] = useState<Group[]>([
    { id: "g1", name: "Software Development", members: 24, lastActivity: "10 minutes ago" },
    { id: "g2", name: "Business Network", members: 42, lastActivity: "1 hour ago" },
    { id: "g3", name: "Class of 2020", members: 68, lastActivity: "Yesterday" },
    { id: "g4", name: "Career Transitions", members: 31, lastActivity: "2 days ago" }
  ]);
  
  const { toast } = useToast();
  const messageEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  // Initialize chat data
  useEffect(() => {
    // Sample messages for John Smith chat
    const johnMessages: Message[] = [
      {
        id: "1",
        text: "Hi there! How can I help you with your career questions?",
        sender: "other",
        timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
        status: "read"
      },
      {
        id: "2",
        text: "I'm looking for advice on transitioning to a new industry. Do you have any resources?",
        sender: "user",
        timestamp: new Date(Date.now() - 1000 * 60 * 3), // 3 minutes ago
        status: "read"
      },
      {
        id: "3",
        text: "Absolutely! I'd be happy to share some resources. Let's schedule a call to discuss your specific situation in more detail.",
        sender: "other",
        timestamp: new Date(Date.now() - 1000 * 60), // 1 minute ago
        status: "read"
      }
    ];
    
    // Initialize with sample data
    setMessages({
      "1": johnMessages
    });
    
    // Simulate receiving a new message
    const messageTimer = setTimeout(() => {
      if (activeChat === "1") {
        const contact = contacts.find(c => c.id === "1");
        if (contact) {
          // Show typing indicator
          setContacts(prev => prev.map(c => c.id === "1" ? { ...c, typing: true } : c));
          
          // Then send message after delay
          setTimeout(() => {
            const newMessage: Message = {
              id: Date.now().toString(),
              text: "I just remembered that we have an industry transition workshop next month. Would you be interested in attending?",
              sender: "other",
              timestamp: new Date(),
              status: "delivered"
            };
            
            setMessages(prev => ({
              ...prev,
              "1": [...(prev["1"] || []), newMessage]
            }));
            
            // Remove typing indicator
            setContacts(prev => prev.map(c => c.id === "1" ? { ...c, typing: false } : c));
            
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
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeChat]);
  
  const formatMessageTime = (date: Date) => date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  
  const handleSendMessage = () => {
    if (!message.trim() || !activeChat) return;
    
    // Create new message
    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: "user",
      timestamp: new Date(),
      status: "sending"
    };
    
    // Add to messages state
    setMessages(prev => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), newMessage]
    }));
    
    // Clear input
    setMessage("");
    
    // Simulate message being sent and delivered
    setTimeout(() => {
      setMessages(prev => ({
        ...prev,
        [activeChat]: prev[activeChat].map(msg => 
          msg.id === newMessage.id ? { ...msg, status: "sent" } : msg
        )
      }));
      
      // Then delivered
      setTimeout(() => {
        setMessages(prev => ({
          ...prev,
          [activeChat]: prev[activeChat].map(msg => 
            msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg
          )
        }));
        
        // Mark as read after some time
        setTimeout(() => {
          setMessages(prev => ({
            ...prev,
            [activeChat]: prev[activeChat].map(msg => 
              msg.id === newMessage.id ? { ...msg, status: "read" } : msg
            )
          }));
        }, 2000);
      }, 1000);
    }, 500);
    
    // Simulate reply for demo purposes
    if (activeChat === "1") {
      // Show typing indicator
      setTimeout(() => {
        setContacts(prev => prev.map(c => c.id === activeChat ? { ...c, typing: true } : c));
        
        // Send reply after a delay
        setTimeout(() => {
          const replyMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: "Thanks for your message! I'll get back to you shortly.",
            sender: "other",
            timestamp: new Date(),
            status: "delivered"
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
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const getMessageStatusIcon = (status: Message["status"]) => {
    switch (status) {
      case "sending":
        return <span className="h-3 w-3 text-gray-400">🕓</span>;
      case "sent":
        return <div className="h-3 w-3 text-gray-400">✓</div>;
      case "delivered":
        return <div className="h-3 w-3 text-gray-400">✓✓</div>;
      case "read":
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
              {/* Sidebar split out */}
              <ChatSidebar
                contacts={contacts}
                groups={groups}
                activeChat={activeChat}
                isMobile={isMobile}
                onSelectChat={setActiveChat}
              />
              
              {/* Chat Area */}
              <div className={`flex-1 flex flex-col ${activeChat && isMobile ? "block" : "hidden md:flex"}`}>
                {activeChat ? (
                  <>
                    <ChatHeader
                      activeChat={activeChat}
                      isMobile={isMobile}
                      onBack={() => setActiveChat(null)}
                      contacts={contacts}
                      groups={groups}
                    />
                    <ChatMessages
                      messages={messages[activeChat] || []}
                      activeChat={activeChat}
                      contacts={contacts}
                      messageEndRef={messageEndRef}
                      formatMessageTime={formatMessageTime}
                      getMessageStatusIcon={getMessageStatusIcon}
                    />
                    <ChatInput
                      message={message}
                      onMessageChange={setMessage}
                      onSendMessage={handleSendMessage}
                      onKeyPress={handleKeyPress}
                    />
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
                      <button className="bg-nexus-primary hover:bg-nexus-primary/90 text-white transition-all duration-200 hover:scale-105 rounded-md px-4 py-2 text-base font-medium">Select a contact</button>
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
