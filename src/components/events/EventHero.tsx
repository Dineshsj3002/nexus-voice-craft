import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Sparkles } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';

export function EventHero() {
  const floatingParticles = Array.from({ length: 6 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute w-2 h-2 bg-primary/30 rounded-full"
      initial={{ 
        x: Math.random() * 400, 
        y: Math.random() * 300,
        opacity: 0 
      }}
      animate={{ 
        y: [0, -20, 0],
        opacity: [0, 1, 0],
        scale: [1, 1.2, 1]
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        repeat: Infinity,
        delay: i * 0.5
      }}
    />
  ));

  return (
    <div className="relative min-h-[400px] bg-gradient-to-br from-primary/20 via-background to-accent/20 overflow-hidden mb-12">
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingParticles}
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Featured Events</span>
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Events & Programs
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Stay connected with Knowledge Institute of Technology through our upcoming events and programs.
            From hackathons to workshops, networking events to career fairs - there's always something happening!
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <GlassCard className="px-6 py-4" intensity="light">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <div className="font-semibold">15+</div>
                  <div className="text-sm text-muted-foreground">Events This Month</div>
                </div>
              </div>
            </GlassCard>
            
            <GlassCard className="px-6 py-4" intensity="light">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <div className="font-semibold">500+</div>
                  <div className="text-sm text-muted-foreground">Registered Attendees</div>
                </div>
              </div>
            </GlassCard>
          </div>
        </motion.div>
      </div>
    </div>
  );
}