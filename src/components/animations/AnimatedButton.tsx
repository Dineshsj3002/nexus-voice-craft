
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  effect?: 'bounce' | 'pulse' | 'ripple' | 'gradient';
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ 
  children, 
  className, 
  variant = 'default',
  size = 'default',
  onClick,
  disabled = false,
  loading = false,
  effect = 'bounce'
}) => {
  const buttonEffects = {
    bounce: {
      whileHover: { scale: 1.05 },
      whileTap: { scale: 0.95 }
    },
    pulse: {
      whileHover: { scale: 1.02 },
      whileTap: { scale: 0.98 },
      animate: { 
        boxShadow: [
          '0 0 0 0 rgba(40, 167, 69, 0.4)',
          '0 0 0 10px rgba(40, 167, 69, 0)',
          '0 0 0 0 rgba(40, 167, 69, 0.4)'
        ]
      }
    },
    ripple: {
      whileHover: { scale: 1.03 },
      whileTap: { scale: 0.97 }
    },
    gradient: {
      whileHover: { 
        scale: 1.05,
        backgroundPosition: ['0% 0%', '100% 100%']
      },
      whileTap: { scale: 0.95 }
    }
  };

  const currentEffect = buttonEffects[effect];

  return (
    <motion.div
      {...currentEffect}
      transition={{ 
        type: 'spring', 
        damping: 15, 
        stiffness: 300,
        duration: effect === 'pulse' ? 2 : 0.2
      }}
      className="inline-block"
    >
      <Button
        variant={variant}
        size={size}
        onClick={onClick}
        disabled={disabled || loading}
        className={cn(
          "relative overflow-hidden transition-all duration-300",
          effect === 'gradient' && "bg-gradient-to-r from-nexus-primary to-blue-600 hover:from-nexus-primary/90 hover:to-blue-600/90",
          className
        )}
      >
        {loading && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
          />
        )}
        {children}
        
        {effect === 'ripple' && (
          <motion.div
            className="absolute inset-0 bg-white/20 rounded-full"
            initial={{ scale: 0, opacity: 1 }}
            whileTap={{ scale: 4, opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </Button>
    </motion.div>
  );
};

export default AnimatedButton;
