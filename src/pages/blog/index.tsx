import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Search, ChevronRight, BookOpen, Award, Bookmark, Clock, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { blogPosts, BlogPost } from '@/data/blog-posts';

const categories = [
  "All", "Career", "Mentorship", "Networking", "Education", "Philanthropy", "Alumni Spotlight", "Events"
];

const BlogPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter posts based on active category and search query
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });
  
  // Get featured posts
  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold font-display mb-4">Alumni Blog</h1>
          <p className="text-lg text-gray-600 mb-8">
            Stay connected with insights, stories, and updates from our alumni community.
          </p>
          
          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Award className="h-5 w-5 text-nexus-primary mr-2" />
                Featured Articles
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {featuredPosts.map(post => (
                  <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-6">
                      <Badge className="mb-3 bg-nexus-primary/10 text-nexus-primary hover:bg-nexus-primary/20 border-none">
                        {post.category}
                      </Badge>
                      <h3 className="text-2xl font-bold mb-3 hover:text-nexus-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src="" alt={post.author.name} />
                            <AvatarFallback className="bg-nexus-primary text-white">
                              {post.author.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{post.author.name}</p>
                            <p className="text-sm text-gray-500">{post.author.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {post.date}
                        </div>
                      </div>
                      
                      <div className="mt-4 flex justify-between items-center pt-4 border-t border-gray-100">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {post.readTime}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Heart className="h-4 w-4 mr-1 text-red-500" />
                          {post.likes} likes
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          className="text-nexus-primary hover:text-nexus-primary/90 p-0"
                          onClick={() => navigate(`/blog/${post.id}`)}
                        >
                          Read more
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Search and Category Filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input
                  className="pl-10"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                {categories.map(category => (
                  <Button 
                    key={category}
                    variant={activeCategory === category ? "default" : "outline"}
                    className={activeCategory === category ? 
                      "bg-nexus-primary hover:bg-nexus-primary/90" : 
                      "hover:bg-gray-100"
                    }
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Blog Post Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredPosts.length > 0 ? (
              filteredPosts.map(post => (
                <div 
                  key={post.id} 
                  className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-5px] flex flex-col"
                  onClick={() => navigate(`/blog/${post.id}`)}
                >
                  <div className="relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-3 left-3 bg-nexus-primary/90 hover:bg-nexus-primary text-white border-none">
                      {post.category}
                    </Badge>
                  </div>
                  
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-semibold text-xl mb-2 hover:text-nexus-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm line-clamp-3 flex-grow">
                      {post.excerpt}
                    </p>
                    
                    <div className="mt-auto">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarFallback className="bg-nexus-primary/10 text-nexus-primary">
                              {post.author.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">{post.author.name}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          {post.date}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                        <div className="flex items-center text-xs text-gray-500">
                          <BookOpen className="h-3 w-3 mr-1" />
                          {post.readTime}
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-nexus-primary hover:text-nexus-primary/90 p-0 h-auto"
                        >
                          Read more
                          <ChevronRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-700">No articles found</h3>
                <p className="text-gray-500 mt-2">
                  Try adjusting your filters or search terms.
                </p>
              </div>
            )}
          </div>
          
          {/* Subscribe to Newsletter */}
          <div className="bg-nexus-primary/10 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Stay Updated</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter to receive the latest articles, alumni stories, and updates from the Knowledge Institute of Technology community.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <Input placeholder="Your email address" className="bg-white" />
              <Button className="bg-nexus-primary hover:bg-nexus-primary/90">
                Subscribe
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

export default BlogPage;
