export type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  featured?: boolean;
  tags: string[];
  likes: number;
};

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "From Campus to Career: Alumni Success Stories",
    excerpt: "Discover how our alumni have successfully transitioned from academic life to thriving professional careers across diverse industries.",
    category: "Career",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&h=500&q=80",
    date: "April 10, 2025",
    readTime: "8 min read",
    author: {
      name: "Jennifer Parker",
      avatar: "JP",
      role: "Alumni Relations Director"
    },
    featured: true,
    tags: ["career-transition", "success-stories", "professional-development"],
    likes: 124
  },
  {
    id: 2,
    title: "The Impact of Alumni Mentorship on Student Success",
    excerpt: "Research shows that students who connect with alumni mentors are more likely to succeed academically and professionally. Learn about our mentorship program.",
    category: "Mentorship",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&h=500&q=80",
    date: "April 5, 2025",
    readTime: "6 min read",
    author: {
      name: "Dr. Michael Rodriguez",
      avatar: "MR",
      role: "Dean, School of Business"
    },
    tags: ["mentorship", "student-success", "academic-achievement"],
    likes: 98
  },
  {
    id: 3,
    title: "Networking in the Digital Age: Building Meaningful Connections",
    excerpt: "How technology has transformed professional networking and tips for building authentic relationships in virtual environments.",
    category: "Networking",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&h=500&q=80",
    date: "March 28, 2025",
    readTime: "5 min read",
    author: {
      name: "Sarah Johnson",
      avatar: "SJ",
      role: "Career Center Director"
    },
    tags: ["networking", "digital-connections", "professional-relationships"],
    likes: 76
  },
  {
    id: 4,
    title: "Alumni Giving: Making a Lasting Impact on Future Generations",
    excerpt: "Explore how alumni contributions are shaping the future of our institution and creating opportunities for current students.",
    category: "Philanthropy",
    image: "/lovable-uploads/8ee7877a-cbd3-4121-a549-d044b60c6f6f.png",
    date: "March 22, 2025",
    readTime: "7 min read",
    author: {
      name: "Robert Chen",
      avatar: "RC",
      role: "Alumni Association President"
    },
    tags: ["philanthropy", "giving-back", "student-scholarships"],
    likes: 112
  },
  {
    id: 5,
    title: "Industry Insights: What Employers Are Looking For in 2025",
    excerpt: "Top alumni in various industries share insights on the skills and qualities that employers value most in today's changing job market.",
    category: "Career",
    image: "/lovable-uploads/fd080c60-30b6-4b82-b4c7-f182582f4d18.png",
    date: "March 15, 2025",
    readTime: "10 min read",
    author: {
      name: "Alex Thompson",
      avatar: "AT",
      role: "Corporate Relations Manager"
    },
    featured: true,
    tags: ["job-market", "employer-expectations", "career-skills"],
    likes: 145
  },
  {
    id: 6,
    title: "Continuing Education: Alumni Learning Opportunities",
    excerpt: "Discover the range of continuing education programs available to alumni looking to expand their knowledge and skills throughout their careers.",
    category: "Education",
    image: "/lovable-uploads/24f2d64b-472c-43e4-b881-f772a1d0e057.png",
    date: "March 10, 2025",
    readTime: "6 min read",
    author: {
      name: "Dr. Emily Williams",
      avatar: "EW",
      role: "Director of Continuing Education"
    },
    tags: ["lifelong-learning", "professional-development", "online-courses"],
    likes: 89
  }
];
