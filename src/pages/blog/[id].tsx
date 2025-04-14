
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Heart, MessageSquare, Share2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { blogPosts } from '@/data/blog-posts';
import { cn } from '@/lib/utils';

const BlogPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const postId = parseInt(id || '0');
  
  const post = blogPosts.find(post => post.id === postId);
  
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-16 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
            <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
            <Button 
              onClick={() => navigate('/blog')}
              className="bg-nexus-primary hover:bg-nexus-primary/90"
            >
              Return to Blog
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow py-8 px-4">
        <article className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm">
          <div className="p-6 md:p-8">
            <Button 
              variant="ghost" 
              className="mb-6 hover:bg-gray-100"
              onClick={() => navigate('/blog')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
            
            <div className="mb-8">
              <Badge className="mb-4 bg-nexus-primary/10 text-nexus-primary hover:bg-nexus-primary/20">
                {post.category}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">{post.title}</h1>
              
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4 border-2 border-nexus-primary/10">
                    <AvatarImage src="" alt={post.author.name} />
                    <AvatarFallback className="bg-nexus-primary/10 text-nexus-primary font-medium">
                      {post.author.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900">{post.author.name}</p>
                    <p className="text-sm text-gray-600">{post.author.role}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1.5" />
                    {post.date}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1.5" />
                    {post.readTime}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="relative mb-8 rounded-xl overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-[400px] object-cover rounded-xl"
              />
            </div>
            
            <div className="prose max-w-none">
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                {post.excerpt}
              </p>
              
              <div className="space-y-6 text-gray-700">
                <p className="leading-relaxed">
                  This is an enhanced placeholder for the full blog post content. The actual implementation
                  would pull complete article content from a database or CMS. The styling has been improved
                  to ensure better readability and visual hierarchy.
                </p>
                
                <p className="leading-relaxed">
                  The layout now features improved typography, spacing, and visual elements to create
                  a more engaging reading experience. The content area uses a clean, minimal design
                  that focuses on readability while maintaining visual interest.
                </p>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-100">
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <Badge 
                    key={tag} 
                    variant="secondary"
                    className="bg-gray-100 text-gray-700 hover:bg-gray-200"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button 
                  variant="outline"
                  className="flex items-center hover:bg-nexus-primary/10 hover:text-nexus-primary"
                >
                  <Heart className={cn(
                    "h-4 w-4 mr-2",
                    "text-gray-500 hover:text-nexus-primary"
                  )} />
                  {post.likes} Likes
                </Button>
                <Button 
                  variant="outline"
                  className="flex items-center hover:bg-nexus-primary/10 hover:text-nexus-primary"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Comments
                </Button>
              </div>
              
              <Button 
                variant="outline"
                className="flex items-center hover:bg-nexus-primary/10 hover:text-nexus-primary"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </article>
      </main>
      
      <Footer />
      <ChatBot />
    </div>
  );
};

export default BlogPostPage;
