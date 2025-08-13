import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
type Post = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
};
const posts: Post[] = [{
  id: 1,
  title: "From Campus to Career: A Success Story",
  excerpt: "Learn how our alumni are making waves in their industries...",
  image: "/lovable-uploads/87030a39-6fa7-425b-99f4-05b0abb9ded1.png",
  date: "January 15, 2025"
}, {
  id: 2,
  title: "Networking in the Digital Age",
  excerpt: "Tips and strategies for building meaningful professional connections...",
  image: "/lovable-uploads/55f04ec5-8a46-435f-bfc6-06b4f7389672.png",
  date: "December 2, 2024"
}];
const RecentPosts = () => {
  const navigate = useNavigate();
  const handleReadMore = (postId: number) => {
    navigate(`/blog/${postId}`);
  };
  const handleViewAllArticles = () => {
    navigate('/blog');
  };
  return <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-display mb-4">Latest Stories</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Insights, success stories, and advice from our community.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map(post => <div key={post.id} className="border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow hover-scale rounded-lg bg-zinc-200">
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="font-semibold text-xl mb-2 story-link inline-block">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {post.date}
                  </div>
                  <Button variant="ghost" className="text-nexus-primary hover:text-nexus-primary/90 p-0" onClick={() => handleReadMore(post.id)}>
                    Read more
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>)}
        </div>
        
        <div className="text-center mt-10">
          <Button variant="outline" onClick={handleViewAllArticles} className="border-nexus-primary text-nexus-primary bg-green-200 hover:bg-green-100">
            View all articles
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>;
};
export default RecentPosts;