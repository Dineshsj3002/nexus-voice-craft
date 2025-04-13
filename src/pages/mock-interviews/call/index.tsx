
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Mic, MicOff, Video, VideoOff, Phone, PhoneOff, 
  MessageSquare, Users, ScreenShare, Settings, 
  ChevronLeft, Volume2, VolumeX, Share2, Brain
} from 'lucide-react';
import { showSuccessToast } from '@/components/SuccessToast';

const CallPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { interviewTitle, interviewCategory, callType } = location.state || {
    interviewTitle: 'Mock Interview Session',
    interviewCategory: 'General',
    callType: 'video'
  };
  
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(callType !== 'video');
  const [isSpeakerMuted, setIsSpeakerMuted] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [messages, setMessages] = useState<{ sender: string; text: string; time: string }[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [conversationContext, setConversationContext] = useState<string[]>([]);
  
  const userVideoRef = useRef<HTMLVideoElement>(null);
  const interviewerVideoRef = useRef<HTMLVideoElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const speechRecognitionRef = useRef<SpeechRecognition | null>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  
  // Format time in MM:SS format
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Auto-scroll chat to bottom when new messages come in
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  
  // Setup speech recognition
  useEffect(() => {
    // Check if browser supports SpeechRecognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.onresult = (event) => {
        const transcript = event.results[event.resultIndex][0].transcript;
        console.log('Speech recognized:', transcript);
        
        // Add user message to chat
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        addMessage('You', transcript, time);
        
        // Process the voice input and generate AI response
        handleAIResponse(transcript);
      };
      
      recognition.onend = () => {
        if (isListening) {
          // If still in listening mode, restart recognition
          try {
            recognition.start();
          } catch (error) {
            console.error('Error restarting speech recognition:', error);
          }
        }
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        if (isListening) {
          setIsListening(false);
          // Try to restart if there was an error
          setTimeout(() => {
            if (isListening) {
              try {
                recognition.start();
              } catch (error) {
                console.error('Error restarting speech recognition after error:', error);
              }
            }
          }, 1000);
        }
      };
      
      speechRecognitionRef.current = recognition;
    } else {
      console.error('Speech recognition not supported in this browser');
      showSuccessToast({ 
        message: 'Speech recognition not supported in your browser. Try Chrome or Edge.', 
        emoji: '⚠️' 
      });
    }
    
    // Setup speech synthesis
    speechSynthesisRef.current = new SpeechSynthesisUtterance();
    speechSynthesisRef.current.lang = 'en-US';
    speechSynthesisRef.current.rate = 1;
    speechSynthesisRef.current.pitch = 1;
    
    speechSynthesisRef.current.onstart = () => {
      setIsAISpeaking(true);
    };
    
    speechSynthesisRef.current.onend = () => {
      setIsAISpeaking(false);
    };
    
    return () => {
      if (speechRecognitionRef.current) {
        speechRecognitionRef.current.abort();
      }
      window.speechSynthesis.cancel();
    };
  }, []);
  
  // Toggle speech recognition on/off
  const toggleListening = () => {
    if (!speechRecognitionRef.current) return;
    
    if (isListening) {
      speechRecognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        speechRecognitionRef.current.start();
        setIsListening(true);
        showSuccessToast({ message: 'Listening...', emoji: '🎤' });
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        showSuccessToast({ 
          message: 'Could not start listening. Please try again.', 
          emoji: '⚠️' 
        });
      }
    }
  };
  
  // Speak text using speech synthesis
  const speakText = (text: string) => {
    if (!speechSynthesisRef.current) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Set the text to be spoken
    speechSynthesisRef.current.text = text;
    
    // Speak the text
    window.speechSynthesis.speak(speechSynthesisRef.current);
  };
  
  // Handle AI response based on user input
  const handleAIResponse = (userInput: string) => {
    // Add to conversation context to maintain continuity
    setConversationContext(prev => [...prev, `User: ${userInput}`]);
    
    // Generate a more contextual response based on conversation history
    let aiResponse = '';
    const input = userInput.toLowerCase();
    
    // Update the context with past interactions to maintain continuity
    const recentContext = conversationContext.slice(-5); // Keep last 5 interactions for context
    
    if (recentContext.length === 0 && (input.includes('hello') || input.includes('hi') || input.includes('hey'))) {
      aiResponse = "Hello there! I'm your AI interviewer. How are you feeling about today's interview?";
    } else if (input.includes('background') || input.includes('experience') || input.includes('about me')) {
      aiResponse = `Thank you for sharing your background. Could you elaborate more on your experience in ${interviewCategory}?`;
    } else if (input.includes('strength') || input.includes('good at')) {
      aiResponse = "That's a great strength to have. Can you provide a specific example where you demonstrated this skill?";
    } else if (input.includes('weakness') || input.includes('improve')) {
      aiResponse = "It's good that you're self-aware about areas to improve. How are you working on addressing this?";
    } else if (input.includes('thank') || input.includes('bye') || input.includes('goodbye')) {
      aiResponse = "You're welcome! Thank you for participating in this mock interview. I hope it was helpful. Would you like to practice another type of interview question?";
    } else {
      // Use a set of generic followup questions if we don't have a specific response
      const genericResponses = [
        "That's interesting. Could you tell me more about that?",
        "Great point. How does that relate to your previous work experience?",
        "I see. And how would you apply that approach in a real-world scenario?",
        "Could you provide a specific example of when you've done that?",
        "How did that experience shape your professional development?",
        "What lessons did you learn from that situation?",
        "That's valuable insight. How do you think that would help in this role?",
        "If you faced a similar challenge in the future, would you approach it differently?",
        "How would you explain this concept to someone with no technical background?",
        "What metrics would you use to measure success in this scenario?"
      ];
      
      // If we have context, try to make the response more contextual
      if (recentContext.length > 2) {
        aiResponse = "Based on what you've shared so far, " + genericResponses[Math.floor(Math.random() * genericResponses.length)].toLowerCase();
      } else {
        aiResponse = genericResponses[Math.floor(Math.random() * genericResponses.length)];
      }
    }
    
    // Add AI response to conversation context
    setConversationContext(prev => [...prev, `AI: ${aiResponse}`]);
    
    // Add AI response to chat with delay to simulate thinking
    setTimeout(() => {
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      addMessage('Interviewer', aiResponse, time);
      
      // Speak the AI response
      if (!isSpeakerMuted) {
        speakText(aiResponse);
      }
    }, 1500);
  };
  
  // Simulate connection and video streams
  useEffect(() => {
    // Show connecting state
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsConnected(true);
      showSuccessToast({ message: 'Connected to interview call!', emoji: '🎯' });
      
      // Set up local video if we're doing a video call
      if (callType === 'video' && userVideoRef.current && navigator.mediaDevices) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          .then(stream => {
            if (userVideoRef.current) {
              userVideoRef.current.srcObject = stream;
            }
          })
          .catch(err => {
            console.error('Error accessing media devices', err);
            showSuccessToast({ message: 'Could not access camera/microphone', emoji: '⚠️' });
            setIsVideoOff(true);
          });
      }
      
      // Simulate interviewer first message only if there are no messages yet
      if (messages.length === 0) {
        setTimeout(() => {
          const greeting = 'Hello there! Thank you for joining this mock interview session.';
          const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          addMessage('Interviewer', greeting, time);
          
          // Speak the greeting
          if (!isSpeakerMuted) {
            speakText(greeting);
          }
          
          setTimeout(() => {
            const introduction = "Before we begin, I want to let you know that this is a safe space to practice. I'll be asking you standard interview questions for your field.";
            const newTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            addMessage('Interviewer', introduction, newTime);
            
            // Speak the introduction
            if (!isSpeakerMuted) {
              speakText(introduction);
            }
            
            setTimeout(() => {
              const firstQuestion = `First question: Can you tell me about your background and why you're interested in ${interviewCategory}?`;
              const questionTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              addMessage('Interviewer', firstQuestion, questionTime);
              
              // Add to conversation context
              setConversationContext([
                `AI: ${greeting}`,
                `AI: ${introduction}`,
                `AI: ${firstQuestion}`
              ]);
              
              // Speak the first question
              if (!isSpeakerMuted) {
                speakText(firstQuestion);
              }
            }, 5000);
          }, 5000);
        }, 2000);
      }
    }, 2000);
    
    // Set up timer for call duration
    const intervalTimer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(intervalTimer);
      
      // Clean up video streams
      if (userVideoRef.current && userVideoRef.current.srcObject) {
        const stream = userVideoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [callType, interviewCategory, isSpeakerMuted, messages.length]);
  
  const addMessage = (sender: string, text: string, time: string) => {
    setMessages(prev => [...prev, { sender, text, time }]);
  };
  
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    addMessage('You', newMessage, time);
    
    // Process the text input and generate AI response
    handleAIResponse(newMessage);
    
    setNewMessage('');
  };
  
  const handleEndCall = () => {
    showSuccessToast({ message: 'Interview call ended', emoji: '👋' });
    // Stop speech recognition and synthesis
    if (speechRecognitionRef.current) {
      speechRecognitionRef.current.abort();
    }
    window.speechSynthesis.cancel();
    
    // Clean up any streams
    if (userVideoRef.current && userVideoRef.current.srcObject) {
      const stream = userVideoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    
    navigate('/mock-interviews', { state: { callEnded: true } });
  };
  
  const navigateToMoreInterviews = () => {
    // Stop speech recognition and synthesis
    if (speechRecognitionRef.current) {
      speechRecognitionRef.current.abort();
    }
    window.speechSynthesis.cancel();
    
    // Clean up any streams
    if (userVideoRef.current && userVideoRef.current.srcObject) {
      const stream = userVideoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    
    navigate('/mock-interviews');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-6 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-6">
            <Button 
              variant="outline" 
              size="icon" 
              className="mr-2"
              onClick={navigateToMoreInterviews}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{interviewTitle}</h1>
              <p className="text-gray-500">{interviewCategory} Interview</p>
            </div>
            <div className="ml-auto bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center">
              <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
              <span>{isConnected ? 'Connected' : 'Connecting...'}</span>
              <span className="ml-2">{formatTime(elapsedTime)}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main video area - takes up 2/3 on desktop */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden h-[500px] bg-gray-900 flex items-center justify-center relative">
                {isLoading ? (
                  <div className="text-center text-white">
                    <div className="animate-spin h-10 w-10 border-4 border-nexus-primary border-opacity-50 border-t-white rounded-full mx-auto mb-4"></div>
                    <p>Connecting to interview...</p>
                  </div>
                ) : (
                  <>
                    {/* Interviewer video (or placeholder) */}
                    {callType === 'video' ? (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="relative h-24 w-24 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <Users className="h-12 w-12" />
                            {isAISpeaking && (
                              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white text-black text-xs px-2 py-1 rounded-full">
                                Speaking...
                              </div>
                            )}
                          </div>
                          <p className="text-xl">AI Interviewer</p>
                          <p className="text-sm text-gray-400 mt-1">Powered by LLM</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-white">
                        <div className="relative h-32 w-32 bg-gray-700 rounded-full flex items-center justify-center mb-4">
                          <Brain className="h-16 w-16" />
                          {isAISpeaking && (
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white text-black text-xs px-2 py-1 rounded-full">
                              Speaking...
                            </div>
                          )}
                        </div>
                        <p className="text-2xl mb-2">AI Interview</p>
                        <p className="text-gray-400">{interviewCategory} Interview</p>
                      </div>
                    )}
                    
                    {/* Visualization for speech */}
                    {isListening && (
                      <div className="absolute top-4 left-4 bg-black bg-opacity-50 rounded-lg p-2 flex items-center">
                        <div className="flex space-x-1">
                          <div className="w-1 h-3 bg-white animate-[pulse_0.8s_ease-in-out_infinite] rounded-full"></div>
                          <div className="w-1 h-4 bg-white animate-[pulse_0.8s_ease-in-out_0.2s_infinite] rounded-full"></div>
                          <div className="w-1 h-5 bg-white animate-[pulse_0.8s_ease-in-out_0.4s_infinite] rounded-full"></div>
                          <div className="w-1 h-3 bg-white animate-[pulse_0.8s_ease-in-out_0.6s_infinite] rounded-full"></div>
                        </div>
                        <span className="ml-2 text-white text-xs">Listening...</span>
                      </div>
                    )}
                    
                    {/* User video (picture-in-picture) */}
                    {callType === 'video' && !isVideoOff && (
                      <div className="absolute bottom-4 right-4 w-40 h-30 rounded-lg overflow-hidden border-2 border-white shadow-lg">
                        <video 
                          ref={userVideoRef} 
                          autoPlay 
                          muted 
                          playsInline 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </>
                )}
              </Card>
              
              {/* Call controls */}
              <div className="flex justify-center mt-4 bg-white p-4 rounded-lg shadow-sm">
                <Button
                  variant={isMuted ? "destructive" : "outline"}
                  size="lg"
                  className="mx-2 h-12 w-12 rounded-full"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? <MicOff /> : <Mic />}
                </Button>
                
                {callType === 'video' && (
                  <Button
                    variant={isVideoOff ? "destructive" : "outline"}
                    size="lg"
                    className="mx-2 h-12 w-12 rounded-full"
                    onClick={() => setIsVideoOff(!isVideoOff)}
                  >
                    {isVideoOff ? <VideoOff /> : <Video />}
                  </Button>
                )}
                
                <Button
                  variant={isSpeakerMuted ? "destructive" : "outline"}
                  size="lg"
                  className="mx-2 h-12 w-12 rounded-full"
                  onClick={() => setIsSpeakerMuted(!isSpeakerMuted)}
                >
                  {isSpeakerMuted ? <VolumeX /> : <Volume2 />}
                </Button>
                
                <Button
                  variant={isListening ? "default" : "outline"}
                  size="lg"
                  className="mx-2 h-12 w-12 rounded-full relative"
                  onClick={toggleListening}
                >
                  <Mic />
                  {isListening && (
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full"></span>
                  )}
                </Button>
                
                <Button
                  variant="destructive"
                  size="lg"
                  className="mx-2 h-12 w-12 rounded-full"
                  onClick={handleEndCall}
                >
                  <PhoneOff />
                </Button>
              </div>
            </div>
            
            {/* Chat/Interview questions area - takes up 1/3 on desktop */}
            <div className="lg:col-span-1">
              <Card className="h-[500px] flex flex-col">
                <div className="p-4 border-b flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  <h3 className="font-semibold">Interview Chat</h3>
                </div>
                
                <div 
                  ref={chatContainerRef}
                  className="flex-grow overflow-auto p-4 space-y-4"
                >
                  {messages.map((msg, idx) => (
                    <div 
                      key={idx} 
                      className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-xs rounded-lg p-3 ${
                          msg.sender === 'You' 
                            ? 'bg-nexus-primary text-white' 
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <div className="font-semibold text-xs mb-1">
                          {msg.sender} • {msg.time}
                        </div>
                        <p>{msg.text}</p>
                      </div>
                    </div>
                  ))}
                  
                  {messages.length === 0 && !isLoading && (
                    <div className="text-center text-gray-500 py-6">
                      <MessageSquare className="h-10 w-10 mx-auto mb-2 opacity-20" />
                      <p>No messages yet</p>
                      <p className="text-sm">
                        Chat with your AI interviewer using voice or text
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="p-3 border-t flex">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-grow border rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-nexus-primary"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button 
                    className="rounded-l-none"
                    onClick={handleSendMessage}
                  >
                    Send
                  </Button>
                </div>
              </Card>
              
              <div className="mt-4 flex space-x-3">
                <Button variant="outline" className="flex-1" onClick={() => showSuccessToast({ message: 'Interview shared!', emoji: '🔗' })}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" className="flex-1" onClick={navigateToMoreInterviews}>
                  <Settings className="h-4 w-4 mr-2" />
                  More Interviews
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CallPage;
