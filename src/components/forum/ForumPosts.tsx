
import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { MessageSquare, Heart, Eye, Clock } from 'lucide-react';

interface ForumPostsProps {
  filter: 'recent' | 'popular' | 'my-discussions';
  searchQuery?: string;
}

// Mock data for forum posts
const mockPosts = [
  {
    id: 1,
    title: 'Tips for networking with alumni in the tech industry?',
    excerpt: 'I\'m a computer science student looking to connect with alumni working at tech companies. Any advice on how to approach them and what questions to ask?',
    author: {
      name: 'Alex Johnson',
      avatar: 'AJ',
      department: 'Computer Science'
    },
    category: 'Networking',
    replies: 24,
    likes: 47,
    views: 312,
    timeAgo: '3 hours ago',
    isPopular: true,
    isRecent: true,
    isMine: false,
    tags: ['networking', 'tech-industry', 'career-advice']
  },
  {
    id: 2,
    title: 'How to prepare for mock interviews effectively?',
    excerpt: 'I have a mock interview scheduled next week through alumNexus. What are some effective ways to prepare and make the most of this opportunity?',
    author: {
      name: 'Samantha Lee',
      avatar: 'SL',
      department: 'Business Administration'
    },
    category: 'Career Advice',
    replies: 18,
    likes: 32,
    views: 205,
    timeAgo: '1 day ago',
    isPopular: true,
    isRecent: true,
    isMine: true,
    tags: ['mock-interviews', 'preparation', 'job-hunting']
  },
  {
    id: 3,
    title: 'Experiences with startups vs. established companies?',
    excerpt: 'I\'m torn between job offers from a startup and a well-established company. Would love to hear from alumni who have experience with both environments.',
    author: {
      name: 'David Chen',
      avatar: 'DC',
      department: 'Engineering'
    },
    category: 'Career Advice',
    replies: 35,
    likes: 62,
    views: 428,
    timeAgo: '2 days ago',
    isPopular: true,
    isRecent: true,
    isMine: false,
    tags: ['career-choices', 'startups', 'corporate-jobs']
  },
  {
    id: 4,
    title: 'Resources for learning data science as a business major?',
    excerpt: 'I\'m a business major interested in data science. Can anyone recommend courses, books, or online resources to build these skills?',
    author: {
      name: 'Priya Patel',
      avatar: 'PP',
      department: 'Business Administration'
    },
    category: 'Academic Resources',
    replies: 12,
    likes: 19,
    views: 164,
    timeAgo: '3 days ago',
    isPopular: false,
    isRecent: true,
    isMine: true,
    tags: ['data-science', 'learning-resources', 'business']
  },
  {
    id: 5,
    title: 'Alumni mentorship program feedback and suggestions',
    excerpt: 'I\'ve been participating in the alumni mentorship program for a semester. Let\'s share feedback and suggestions to improve the experience.',
    author: {
      name: 'Marcus Wilson',
      avatar: 'MW',
      department: 'Psychology'
    },
    category: 'General Discussion',
    replies: 28,
    likes: 36,
    views: 250,
    timeAgo: '5 days ago',
    isPopular: false,
    isRecent: false,
    isMine: false,
    tags: ['mentorship', 'feedback', 'program-improvement']
  },
  {
    id: 6,
    title: 'International students seeking work opportunities in the US',
    excerpt: 'As an international student, what strategies and resources have worked for you in finding internships and jobs in the US?',
    author: {
      name: 'Sofia Rodriguez',
      avatar: 'SR',
      department: 'International Studies'
    },
    category: 'Global Opportunities',
    replies: 30,
    likes: 55,
    views: 342,
    timeAgo: '1 week ago',
    isPopular: true,
    isRecent: false,
    isMine: false,
    tags: ['international-students', 'job-search', 'work-visas']
  }
];

const ForumPosts = ({ filter, searchQuery = '' }: ForumPostsProps) => {
  // Filter posts based on the selected tab
  let filteredPosts = [...mockPosts];
  
  if (filter === 'recent') {
    filteredPosts = filteredPosts.filter(post => post.isRecent);
  } else if (filter === 'popular') {
    filteredPosts = filteredPosts.filter(post => post.isPopular);
  } else if (filter === 'my-discussions') {
    filteredPosts = filteredPosts.filter(post => post.isMine);
  }
  
  // Apply search filter if provided
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredPosts = filteredPosts.filter(post => 
      post.title.toLowerCase().includes(query) || 
      post.excerpt.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }

  return (
    <div className="space-y-6">
      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-700">No discussions found</h3>
          <p className="text-gray-500 mt-2">
            {searchQuery 
              ? 'Try adjusting your search terms or start a new discussion.' 
              : 'Be the first to start a discussion in this category.'}
          </p>
        </div>
      ) : (
        filteredPosts.map(post => (
          <Link to={`/forum/post/${post.id}`} key={post.id}>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 hover:text-nexus-primary transition-colors">
                      {post.title}
                    </h3>
                    <div className="flex items-center mt-1 space-x-2">
                      <Badge variant="outline" className="bg-gray-100 text-gray-700">
                        {post.category}
                      </Badge>
                      {post.tags.slice(0, 2).map(tag => (
                        <Badge variant="outline" key={tag} className="bg-gray-50 text-gray-600 text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pb-3">
                <p className="text-gray-600 text-sm line-clamp-2">
                  {post.excerpt}
                </p>
              </CardContent>
              
              <CardFooter className="pt-2 flex flex-wrap justify-between items-center border-t border-gray-100">
                <div className="flex items-center">
                  <Avatar className="h-7 w-7 mr-2">
                    <AvatarImage src="" alt={post.author.name} />
                    <AvatarFallback className="bg-nexus-primary/10 text-nexus-primary text-xs">
                      {post.author.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{post.author.name}</p>
                    <p className="text-xs text-gray-500">{post.author.department}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2 sm:mt-0">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{post.timeAgo}</span>
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    <span>{post.replies}</span>
                  </div>
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 mr-1" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    <span>{post.views}</span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))
      )}
    </div>
  );
};

export default ForumPosts;
