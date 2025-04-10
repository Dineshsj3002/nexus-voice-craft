
export interface Alumni {
  id: string;
  name: string;
  graduationYear: string;
  degree: string;
  role: string;
  company: string;
  industry: string;
  location: string;
  avatar: string;
  email: string;
  linkedin?: string;
  bio: string;
  achievements: string[];
  willingToMentor: boolean;
}

// Sample alumni data
export const alumniData: Alumni[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    graduationYear: "2015",
    degree: "Computer Science",
    role: "Senior Software Engineer",
    company: "Google",
    industry: "Technology",
    location: "San Francisco, CA",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    email: "sarah.johnson@example.com",
    linkedin: "linkedin.com/in/sarahjohnson",
    bio: "Building scalable cloud solutions at Google. Passionate about mentoring junior developers and promoting diversity in tech.",
    achievements: ["Google Developer Expert", "Speaker at Google I/O 2023", "Lead engineer for Google Cloud Platform"],
    willingToMentor: true
  },
  {
    id: "2",
    name: "Michael Chen",
    graduationYear: "2018",
    degree: "Business Administration",
    role: "Product Manager",
    company: "Amazon",
    industry: "E-commerce",
    location: "Seattle, WA",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    email: "michael.chen@example.com",
    linkedin: "linkedin.com/in/michaelchen",
    bio: "Product manager with expertise in e-commerce strategies, user experience, and data-driven decision making.",
    achievements: ["Led development of Amazon's checkout optimization", "Increased conversion rates by 15%"],
    willingToMentor: true
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    graduationYear: "2010",
    degree: "Mechanical Engineering",
    role: "Director of Engineering",
    company: "Tesla",
    industry: "Automotive",
    location: "Palo Alto, CA",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    email: "emily.rodriguez@example.com",
    linkedin: "linkedin.com/in/emilyrodriguez",
    bio: "Leading engineering teams at Tesla to develop sustainable transportation solutions. Passionate about renewable energy.",
    achievements: ["Patent holder for battery technology", "Led team for Model 3 production optimization"],
    willingToMentor: true
  },
  {
    id: "4",
    name: "James Wilson",
    graduationYear: "2020",
    degree: "Finance",
    role: "Investment Analyst",
    company: "Goldman Sachs",
    industry: "Finance",
    location: "New York, NY",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    email: "james.wilson@example.com",
    bio: "Analyzing investment opportunities in emerging tech companies. Specialized in sustainable investments.",
    achievements: ["Top analyst award 2022", "Published research on sustainable investing"],
    willingToMentor: false
  },
  {
    id: "5",
    name: "Priya Patel",
    graduationYear: "2016",
    degree: "Marketing",
    role: "Marketing Director",
    company: "Spotify",
    industry: "Entertainment",
    location: "London, UK",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    email: "priya.patel@example.com",
    linkedin: "linkedin.com/in/priyapatel",
    bio: "Developing global marketing strategies for Spotify. Passionate about data-driven marketing and brand storytelling.",
    achievements: ["Led Spotify's most successful campaign of 2022", "Marketing Excellence Award winner"],
    willingToMentor: true
  },
  {
    id: "6",
    name: "David Kim",
    graduationYear: "2019",
    degree: "Data Science",
    role: "Data Scientist",
    company: "Netflix",
    industry: "Entertainment",
    location: "Los Angeles, CA",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    email: "david.kim@example.com",
    linkedin: "linkedin.com/in/davidkim",
    bio: "Working on recommendation algorithms at Netflix. Specializing in machine learning and personalization.",
    achievements: ["Improved recommendation algorithm accuracy by 12%", "Published paper on ML in streaming services"],
    willingToMentor: true
  },
  {
    id: "7",
    name: "Olivia Martinez",
    graduationYear: "2017",
    degree: "Biomedical Engineering",
    role: "Research Scientist",
    company: "Pfizer",
    industry: "Healthcare",
    location: "Boston, MA",
    avatar: "https://randomuser.me/api/portraits/women/17.jpg",
    email: "olivia.martinez@example.com",
    bio: "Developing innovative healthcare solutions at Pfizer. Research focused on drug delivery systems.",
    achievements: ["Patent holder for drug delivery technology", "Published in Nature Biotechnology"],
    willingToMentor: false
  },
  {
    id: "8",
    name: "Robert Taylor",
    graduationYear: "2012",
    degree: "Law",
    role: "Corporate Counsel",
    company: "Microsoft",
    industry: "Technology",
    location: "Seattle, WA",
    avatar: "https://randomuser.me/api/portraits/men/62.jpg",
    email: "robert.taylor@example.com",
    linkedin: "linkedin.com/in/roberttaylor",
    bio: "Advising on legal matters related to technology, intellectual property, and international business at Microsoft.",
    achievements: ["Led legal team for major acquisition", "Speaker at Legal Tech Conference 2023"],
    willingToMentor: true
  },
  {
    id: "9",
    name: "Grace Lee",
    graduationYear: "2014",
    degree: "Graphic Design",
    role: "Creative Director",
    company: "Adobe",
    industry: "Design",
    location: "San Jose, CA",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    email: "grace.lee@example.com",
    linkedin: "linkedin.com/in/gracelee",
    bio: "Leading creative teams at Adobe. Passionate about design thinking and creating intuitive user experiences.",
    achievements: ["Adobe Design Excellence Award", "Featured in Communication Arts magazine"],
    willingToMentor: true
  }
];

// Get unique values for filters
export const getUniqueIndustries = () => {
  return [...new Set(alumniData.map(alumni => alumni.industry))].sort();
};

export const getUniqueGraduationYears = () => {
  return [...new Set(alumniData.map(alumni => alumni.graduationYear))].sort((a, b) => b.localeCompare(a));
};

export const getUniqueLocations = () => {
  return [...new Set(alumniData.map(alumni => alumni.location))].sort();
};
