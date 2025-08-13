import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  intensity?: 'light' | 'medium' | 'heavy';
}

export function GlassCard({ 
  children, 
  className, 
  hoverEffect = true,
  intensity = 'medium'
}: GlassCardProps) {
  const intensityClasses = {
    light: 'bg-white/5 backdrop-blur-sm border-white/10',
    medium: 'bg-white/10 backdrop-blur-md border-white/20',
    heavy: 'bg-white/20 backdrop-blur-lg border-white/30'
  };

  const darkIntensityClasses = {
    light: 'dark:bg-black/5 dark:border-white/5',
    medium: 'dark:bg-black/10 dark:border-white/10', 
    heavy: 'dark:bg-black/20 dark:border-white/20'
  };

  return (
    <motion.div
      className={cn(
        "rounded-xl border shadow-lg",
        intensityClasses[intensity],
        darkIntensityClasses[intensity],
        "transition-all duration-300",
        hoverEffect && "hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1",
        className
      )}
      whileHover={hoverEffect ? { y: -4 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  );
}