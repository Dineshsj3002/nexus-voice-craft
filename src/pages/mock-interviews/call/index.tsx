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
  ChevronLeft, Volume2, VolumeX, Share2
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
  
  const userVideoRef = useRef<HTMLVideoElement>(null);
  const interviewerVideoRef = useRef<HTMLVideoElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsConnected(true);
      showSuccessToast({ message: 'Connected to interview call!', emoji: '🎯' });
      
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
      
      setTimeout(() => {
        addMessage('Interviewer', 'Hello there! Thank you for joining this mock interview session.', new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        
        setTimeout(() => {
          addMessage('Interviewer', 'Before we begin, I want to let you know that this is a safe space to practice. I\'ll be asking you standard interview questions for your field.', new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
          
          setTimeout(() => {
            addMessage('Interviewer', `First question: Can you tell me about your background and why you're interested in ${interviewCategory}?`, new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
          }, 5000);
        }, 3000);
      }, 2000);
    }, 2000);
    
    const intervalTimer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(intervalTimer);
      
      if (userVideoRef.current && userVideoRef.current.srcObject) {
        const stream = userVideoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [callType, interviewCategory]);
  
  const addMessage = (sender: string, text: string, time: string) => {
    setMessages(prev => [...prev, { sender, text, time }]);
  };
  
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    addMessage('You', newMessage, time);
    setNewMessage('');
    
    setTimeout(() => {
      const responses = [
        "That's a good point. Could you elaborate more on that?",
        "Interesting perspective. How would you apply that in a real-world scenario?",
        "I see. And how does that relate to your previous experience?",
        "Great answer. Let's move on to the next question.",
        "Can you provide a specific example of that from your past work or projects?"
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      addMessage('Interviewer', randomResponse, new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 3000 + Math.random() * 2000);
  };
  
  const handleEndCall = () => {
    showSuccessToast({ message: 'Interview call ended', emoji: '👋' });
    if (userVideoRef.current && userVideoRef.current.srcObject) {
      const stream = userVideoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    
    navigate('/mock-interviews', { state: { callEnded: true } });
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
              onClick={() => navigate('/mock-interviews')}
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
            <div className="lg:col-span-2">
              <Card className="overflow-hidden h-[500px] bg-gray-900 flex items-center justify-center relative">
                {isLoading ? (
                  <div className="text-center text-white">
                    <div className="animate-spin h-10 w-10 border-4 border-nexus-primary border-opacity-50 border-t-white rounded-full mx-auto mb-4"></div>
                    <p>Connecting to interview...</p>
                  </div>
                ) : (
                  <>
                    {callType === 'video' ? (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="h-24 w-24 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <Users className="h-12 w-12" />
                          </div>
                          <p className="text-xl">Interviewer</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-white">
                        <div className="h-32 w-32 bg-gray-700 rounded-full flex items-center justify-center mb-4">
                          <Phone className="h-16 w-16" />
                        </div>
                        <p className="text-2xl mb-2">Audio Call</p>
                        <p className="text-gray-400">{interviewCategory} Interview</p>
                      </div>
                    )}
                    
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
                  variant={isScreenSharing ? "default" : "outline"}
                  size="lg"
                  className="mx-2 h-12 w-12 rounded-full"
                  onClick={() => setIsScreenSharing(!isScreenSharing)}
                >
                  <ScreenShare />
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
                      <p className="text-sm">Chat with your interviewer here</p>
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
                <Button variant="outline" className="flex-1" onClick={() => showSuccessToast({ message: 'Settings updated!', emoji: '⚙��' })}>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
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
