
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Heart, MessageSquare, Flag, Share, Bookmark, Edit, Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { showSuccessToast } from '@/components/SuccessToast';

// Mock data for a forum post
const mockPost = {
  id: 1,
  title: 'Tips for networking with alumni in the tech industry?',
  content: `
    <p>Hello everyone,</p>
    
    <p>I'm a third-year computer science student at our university. I'm looking to connect with alumni working in tech companies like Google, Microsoft, and startups in the Bay Area. I've browsed through the alumni directory but I'm not sure how to reach out and what questions to ask.</p>
    
    <p>Some specific questions I have:</p>
    
    <ul>
      <li>What's the best approach to reach out to alumni (LinkedIn, email, the alumni portal)?</li>
      <li>How should I introduce myself? What information should I include?</li>
      <li>What are appropriate questions to ask in an initial message?</li>
      <li>How can I build a genuine connection rather than just asking for job referrals?</li>
    </ul>
    
    <p>Has anyone here had success networking with alumni in the tech industry? Any advice or personal stories would be greatly appreciated!</p>
    
    <p>Thank you!</p>
  `,
  author: {
    name: 'Alex Johnson',
    avatar: 'AJ',
    department: 'Computer Science',
    joinDate: 'Member since Sep 2023'
  },
  category: 'Networking',
  replies: 24,
  likes: 47,
  views: 312,
  timeAgo: '3 hours ago',
  datePosted: 'April 9, 2025',
  tags: ['networking', 'tech-industry', 'career-advice']
};

// Mock data for comments
const mockComments = [
  {
    id: 1,
    author: {
      name: 'Emily Chen',
      avatar: 'EC',
      department: 'Alumni - Software Engineer',
      joinDate: 'Member since Mar 2022'
    },
    content: `
      <p>Hi Alex! Great question. As an alumna working at Google, I get messages from students pretty frequently. Here's my advice:</p>
      
      <p><strong>Platform:</strong> LinkedIn is generally the best way to reach out. Make sure to add a personalized connection message mentioning you're from the same university.</p>
      
      <p><strong>Introduction:</strong> Keep it concise. Mention your name, year, major, and a brief sentence about your interests or goals. Something like: "Hi Emily, I'm Alex, a junior CS major at [University]. I'm interested in software engineering roles and noticed you work at Google."</p>
      
      <p><strong>Questions:</strong> In your first message, ask just 1-2 specific questions rather than a long list. For example: "Would you be willing to share how you prepared for technical interviews during college?" or "I'd love to hear what courses or projects you found most valuable for your career."</p>
      
      <p>Most importantly, don't immediately ask for a referral. Build a relationship first. Feel free to DM me if you want to chat more!</p>
    `,
    likes: 18,
    timeAgo: '2 hours ago',
    datePosted: 'April 9, 2025'
  },
  {
    id: 2,
    author: {
      name: 'Michael Torres',
      avatar: 'MT',
      department: 'Alumni - Product Manager',
      joinDate: 'Member since Nov 2021'
    },
    content: `
      <p>Adding to Emily's excellent advice - I've been on both sides of this as a student and now as an alum at Microsoft.</p>
      
      <p>One thing that really stands out to me is when students show they've done their research. Before reaching out, look at the person's LinkedIn profile or other public information and reference something specific about their career path that interests you.</p>
      
      <p>For example: "I noticed you transitioned from software engineering to product management after a few years. I'm curious about that career path and would love to hear about your experience."</p>
      
      <p>This shows you're genuinely interested in their specific insights rather than sending generic messages to everyone.</p>
      
      <p>Also, alumni networking events are great opportunities for more casual conversations! Check the events calendar regularly.</p>
    `,
    likes: 12,
    timeAgo: '1 hour ago',
    datePosted: 'April 9, 2025'
  }
];

const ForumPostPage = () => {
  const { id } = useParams();
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(mockPost.likes);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleSubmitComment = () => {
    if (!commentText.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate posting delay
    setTimeout(() => {
      setIsSubmitting(false);
      setCommentText('');
      
      // Show success toast
      showSuccessToast({
        message: "Your reply has been posted!",
        emoji: "💬"
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8 px-4 md:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <Link to="/forum" className="inline-flex items-center text-gray-600 hover:text-nexus-primary mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to discussions
          </Link>
          
          <Card className="mb-8">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 mb-3">{mockPost.title}</h1>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="outline" className="bg-gray-100 text-gray-700">
                      {mockPost.category}
                    </Badge>
                    {mockPost.tags.map(tag => (
                      <Badge variant="outline" key={tag} className="bg-gray-50 text-gray-600 text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pb-4">
              <div className="flex items-start gap-3 mb-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="" alt={mockPost.author.name} />
                  <AvatarFallback className="bg-nexus-primary/10 text-nexus-primary">
                    {mockPost.author.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{mockPost.author.name}</p>
                  <p className="text-sm text-gray-500">{mockPost.author.department}</p>
                  <p className="text-xs text-gray-400">{mockPost.author.joinDate}</p>
                </div>
              </div>
              
              <div 
                className="prose prose-gray max-w-none"
                dangerouslySetInnerHTML={{ __html: mockPost.content }}
              />
            </CardContent>
            
            <CardFooter className="pt-2 flex flex-wrap justify-between items-center border-t border-gray-100">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>{mockPost.datePosted}</span>
                <span>•</span>
                <span>{mockPost.timeAgo}</span>
              </div>
              
              <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`gap-2 ${isLiked ? 'text-red-500' : 'text-gray-500'}`}
                  onClick={handleLike}
                >
                  <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500' : ''}`} />
                  <span>{likeCount}</span>
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="gap-2 text-gray-500"
                  onClick={() => document.getElementById('comment-area')?.focus()}
                >
                  <MessageSquare className="h-5 w-5" />
                  <span>{mockPost.replies}</span>
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`text-gray-500 ${isBookmarked ? 'text-yellow-500' : ''}`}
                  onClick={() => setIsBookmarked(!isBookmarked)}
                >
                  <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-yellow-500' : ''}`} />
                </Button>
                
                <Button variant="ghost" size="sm" className="text-gray-500">
                  <Share className="h-5 w-5" />
                </Button>
                
                <Button variant="ghost" size="sm" className="text-gray-500">
                  <Flag className="h-5 w-5" />
                </Button>
              </div>
            </CardFooter>
          </Card>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Replies ({mockComments.length})</h2>
            
            {mockComments.map((comment, index) => (
              <Card key={comment.id} className={`mb-4 ${index === 0 ? 'border-l-4 border-l-nexus-primary' : ''}`}>
                <CardHeader className="pb-2">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="" alt={comment.author.name} />
                      <AvatarFallback className="bg-gray-100 text-gray-700 text-sm">
                        {comment.author.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{comment.author.name}</p>
                      <p className="text-sm text-gray-500">{comment.author.department}</p>
                      <div className="flex items-center text-xs text-gray-400 mt-1">
                        <span>{comment.datePosted}</span>
                        <span className="mx-1">•</span>
                        <span>{comment.timeAgo}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="py-2">
                  <div 
                    className="prose prose-gray prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: comment.content }}
                  />
                </CardContent>
                
                <CardFooter className="pt-0 flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="text-gray-500 h-8">
                      <Heart className="h-4 w-4 mr-1" />
                      <span>{comment.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-500 h-8">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      <span>Reply</span>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3">Add your reply</h3>
            <Textarea 
              id="comment-area"
              placeholder="Share your thoughts or ask a follow-up question..."
              className="min-h-[120px] mb-3"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <div className="flex justify-end">
              <Button 
                className="bg-nexus-primary hover:bg-nexus-primary/90 text-white"
                onClick={handleSubmitComment}
                disabled={!commentText.trim() || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Posting...
                  </>
                ) : (
                  <>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Post Reply
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <ChatBot />
    </div>
  );
};

export default ForumPostPage;
