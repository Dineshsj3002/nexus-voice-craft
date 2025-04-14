
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Heart, MessageSquare, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import the blogPosts data from a new shared location
import { blogPosts } from '@/data/blog-posts';

const BlogPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const postId = parseInt(id || '0');
  
  const post = blogPosts.find(post => post.id === postId);
  
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
            <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/blog')}>
              Return to Blog
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-16 px-4">
        <article className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            className="mb-8"
            onClick={() => navigate('/blog')}
          >
            ← Back to Blog
          </Button>
          
          {/* Header Section */}
          <div className="mb-8">
            <Badge className="mb-4 bg-nexus-primary/10 text-nexus-primary">
              {post.category}
            </Badge>
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarImage src="" alt={post.author.name} />
                  <AvatarFallback>{post.author.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{post.author.name}</p>
                  <p className="text-sm text-gray-500">{post.author.role}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {post.date}
                </span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {post.readTime}
                </span>
              </div>
            </div>
          </div>
          
          {/* Featured Image */}
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-[400px] object-cover rounded-lg mb-8"
          />
          
          {/* Content */}
          <div className="prose max-w-none">
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {post.excerpt}
            </p>
            
            {/* Placeholder for full content */}
            <div className="space-y-6 text-gray-700">
              <p>
                This is a placeholder for the full blog post content. In a real implementation, 
                this would contain the complete article text formatted with proper typography 
                and styling.
              </p>
              
              <p>
                The content would be stored in a database or CMS and retrieved based on the 
                post ID. For now, we're displaying the excerpt as a demonstration.
              </p>
            </div>
          </div>
          
          {/* Tags */}
          <div className="mt-8 pt-8 border-t">
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <Badge 
                  key={tag} 
                  variant="outline"
                  className="text-gray-600"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Engagement Section */}
          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="flex items-center">
                <Heart className="h-4 w-4 mr-2" />
                {post.likes} Likes
              </Button>
              <Button variant="outline" className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                Comments
              </Button>
            </div>
            
            <Button variant="outline" className="flex items-center">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </article>
      </main>
      
      <Footer />
      <ChatBot />
    </div>
  );
};

export default BlogPostPage;
