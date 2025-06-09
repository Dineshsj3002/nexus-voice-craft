
import React from 'react';
import { cn } from '@/lib/utils';

interface TypingIndicatorProps {
  className?: string;
  dotClassName?: string;
  size?: 'sm' | 'md' | 'lg';
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ 
  className, 
  dotClassName, 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'h-1.5 w-1.5',
    md: 'h-2 w-2',
    lg: 'h-3 w-3'
  };

  const containerClasses = {
    sm: 'space-x-1 py-2 px-3',
    md: 'space-x-1.5 py-2.5 px-4',
    lg: 'space-x-2 py-3 px-5'
  };

  return (
    <div className={cn(
      "flex items-center justify-center bg-white rounded-2xl shadow-sm border border-gray-100",
      containerClasses[size],
      className
    )}>
      <div 
        className={cn(
          "rounded-full bg-gray-400 animate-typing-wave",
          sizeClasses[size],
          dotClassName
        )}
        style={{ animationDelay: '0ms' }}
      />
      <div 
        className={cn(
          "rounded-full bg-gray-400 animate-typing-wave",
          sizeClasses[size],
          dotClassName
        )}
        style={{ animationDelay: '200ms' }}
      />
      <div 
        className={cn(
          "rounded-full bg-gray-400 animate-typing-wave",
          sizeClasses[size],
          dotClassName
        )}
        style={{ animationDelay: '400ms' }}
      />
    </div>
  );
};

export default TypingIndicator;
