import React from 'react';
import { Users, Calendar, PenTool, BookOpen, MessageCircle, Award } from 'lucide-react';
import AnimatedCard from '@/components/animations/AnimatedCard';
import TextReveal from '@/components/animations/TextReveal';
import { motion } from 'framer-motion';
const features = [{
  icon: <Users className="h-6 w-6 text-nexus-primary" />,
  title: "Connect with Mentors",
  description: "Book 1:1 sessions with alumni who are leaders in your field of interest."
}, {
  icon: <Calendar className="h-6 w-6 text-nexus-primary" />,
  title: "Mock Interviews",
  description: "Practice with real industry professionals and receive actionable feedback."
}, {
  icon: <BookOpen className="h-6 w-6 text-nexus-primary" />,
  title: "Subject Hubs",
  description: "Join specialized communities for your major or interest area."
}, {
  icon: <MessageCircle className="h-6 w-6 text-nexus-primary" />,
  title: "Discussion Forums",
  description: "Ask questions and share insights with peers and alumni."
}, {
  icon: <PenTool className="h-6 w-6 text-nexus-primary" />,
  title: "Career Resources",
  description: "Access resume reviews, interview tips, and industry insights."
}, {
  icon: <Award className="h-6 w-6 text-nexus-primary" />,
  title: "Networking Events",
  description: "Attend virtual and in-person events to expand your professional circle."
}];
const Features = () => {
  return <section className="py-16 px-4 md:px-8 bg-zinc-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <TextReveal variant="slideUp" className="text-3xl font-bold font-display mb-4 block">
            How alumNexus helps you succeed
          </TextReveal>
          <TextReveal variant="fadeIn" delay={0.3} className="text-lg text-gray-600 max-w-2xl mx-auto block">
            We've designed a platform that makes connecting with alumni mentors easy, 
            meaningful, and tailored to your career goals.
          </TextReveal>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => <AnimatedCard key={index} hoverEffect="lift" delay={index * 0.1} className="h-full">
              <div className="p-6 h-full flex flex-col">
                <motion.div className="h-12 w-12 rounded-full bg-nexus-primary/10 flex items-center justify-center mb-4" whileHover={{
              scale: 1.1,
              rotate: 5
            }} transition={{
              type: 'spring',
              damping: 15
            }}>
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 flex-grow">{feature.description}</p>
              </div>
            </AnimatedCard>)}
        </div>
      </div>
    </section>;
};
export default Features;