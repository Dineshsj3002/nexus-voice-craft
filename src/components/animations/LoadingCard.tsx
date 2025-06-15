
import React from 'react';
import SkeletonLoader from './SkeletonLoader';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

const LoadingCard = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <SkeletonLoader variant="circular" width="w-12" height="h-12" />
        <div className="flex-1 space-y-2">
          <SkeletonLoader variant="text" height="h-4" width="w-3/4" />
          <SkeletonLoader variant="text" height="h-3" width="w-1/2" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <SkeletonLoader variant="text" lines={3} />
      </CardContent>
      <CardFooter>
        <SkeletonLoader variant="rectangular" height="h-10" width="w-full" />
      </CardFooter>
    </Card>
  );
};

export default LoadingCard;
