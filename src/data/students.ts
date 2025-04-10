
import { Student } from './alumni';

// Extended student data with session history
export interface StudentWithHistory extends Student {
  sessionHistory?: {
    alumniId: string;
    date: string;
    topic: string;
    status: 'scheduled' | 'completed' | 'cancelled';
    rating?: number;
    notes?: string;
  }[];
}

// Sample student data with history
export const studentData: StudentWithHistory[] = [
  {
    id: "s1",
    name: "Alex Lee",
    graduationYear: "2024",
    major: "Computer Science",
    interests: ["Web Development", "Machine Learning", "Cloud Computing"],
    careerGoals: ["Software Engineer", "Data Scientist"],
    preferredIndustries: ["Technology", "Finance"],
    sessionHistory: [
      {
        alumniId: "2",
        date: "2023-12-15",
        topic: "Career paths in tech",
        status: "completed",
        rating: 5,
        notes: "Great insights on transitioning from college to industry"
      }
    ]
  },
  {
    id: "s2",
    name: "Jamie Rodriguez",
    graduationYear: "2023",
    major: "Business Administration",
    interests: ["Marketing", "Product Management", "Entrepreneurship"],
    careerGoals: ["Product Manager", "Marketing Director"],
    preferredIndustries: ["E-commerce", "Technology", "Entertainment"],
    sessionHistory: []
  },
  {
    id: "s3",
    name: "Taylor Smith",
    graduationYear: "2025",
    major: "Data Science",
    interests: ["Machine Learning", "Data Visualization", "AI Ethics"],
    careerGoals: ["Data Scientist", "ML Engineer"],
    preferredIndustries: ["Healthcare", "Finance", "Technology"],
    sessionHistory: [
      {
        alumniId: "6",
        date: "2023-11-22",
        topic: "Breaking into data science",
        status: "completed",
        rating: 4,
        notes: "Got practical advice on portfolio projects"
      }
    ]
  }
];

// Get current user (for demo purposes)
export const getCurrentStudent = (): StudentWithHistory => {
  return studentData[0]; // For now, return the first student
};
