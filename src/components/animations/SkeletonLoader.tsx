
import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonLoaderProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  lines?: number;
  height?: string;
  width?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ 
  className, 
  variant = 'rectangular',
  lines = 1,
  height = 'h-4',
  width = 'w-full'
}) => {
  const baseClasses = "animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]";
  
  const variants = {
    text: `${height} ${width} rounded`,
    circular: 'rounded-full aspect-square',
    rectangular: `${height} ${width} rounded-md`,
    card: 'h-48 w-full rounded-lg'
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={cn("space-y-2", className)}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              baseClasses,
              variants.text,
              index === lines - 1 && 'w-3/4' // Last line is shorter
            )}
            style={{
              animationDelay: `${index * 0.1}s`
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        baseClasses,
        variants[variant],
        height,
        width,
        className
      )}
    />
  );
};

export default SkeletonLoader;
