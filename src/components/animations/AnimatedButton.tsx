import React from 'react';
import { motion } from 'framer-motion';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends ButtonProps {
  animation?: 'pulse' | 'glow' | 'bounce' | 'float';
  children: React.ReactNode;
}

export default function AnimatedButton({ 
  animation = 'pulse', 
  className, 
  children, 
  ...props 
}: AnimatedButtonProps) {
  const animationClasses = {
    pulse: 'animate-pulse-green',
    glow: 'animate-glow',
    bounce: 'hover:animate-smooth-bounce',
    float: 'animate-float'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Button
        className={cn(
          "transition-all duration-300",
          animationClasses[animation],
          className
        )}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
}