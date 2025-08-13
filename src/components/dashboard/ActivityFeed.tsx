import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { 
  Users, 
  Calendar, 
  Award, 
  MessageSquare, 
  Heart, 
  Share2,
  TrendingUp,
  Clock
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Activity {
  id: string;
  type: 'connection' | 'event' | 'achievement' | 'post' | 'like' | 'share';
  title: string;
  description: string;
  timestamp: Date;
  user?: {
    name: string;
    avatar?: string;
    initials: string;
  };
  metadata?: {
    eventName?: string;
    achievementBadge?: string;
    postTitle?: string;
    connectionCount?: number;
  };
}

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'connection',
    title: 'New Connection',
    description: 'Connected with Sarah Johnson from Marketing',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    user: { name: 'Sarah Johnson', initials: 'SJ' },
    metadata: { connectionCount: 3 }
  },
  {
    id: '2',
    type: 'achievement',
    title: 'Achievement Unlocked',
    description: 'Earned "Super Networker" badge',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    metadata: { achievementBadge: 'Super Networker' }
  },
  {
    id: '3',
    type: 'event',
    title: 'Event Attended',
    description: 'Completed "AI in Business" workshop',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    metadata: { eventName: 'AI in Business Workshop' }
  },
  {
    id: '4',
    type: 'post',
    title: 'Post Engagement',
    description: 'Your post received 15 likes and 3 comments',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    metadata: { postTitle: 'Thoughts on Industry Trends' }
  }
];

const getActivityIcon = (type: Activity['type']) => {
  switch (type) {
    case 'connection':
      return <Users className="h-4 w-4" />;
    case 'event':
      return <Calendar className="h-4 w-4" />;
    case 'achievement':
      return <Award className="h-4 w-4" />;
    case 'post':
      return <MessageSquare className="h-4 w-4" />;
    case 'like':
      return <Heart className="h-4 w-4" />;
    case 'share':
      return <Share2 className="h-4 w-4" />;
    default:
      return <TrendingUp className="h-4 w-4" />;
  }
};

const getActivityColor = (type: Activity['type']) => {
  switch (type) {
    case 'connection':
      return 'bg-blue-500/10 text-blue-600 dark:text-blue-400';
    case 'event':
      return 'bg-green-500/10 text-green-600 dark:text-green-400';
    case 'achievement':
      return 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400';
    case 'post':
      return 'bg-purple-500/10 text-purple-600 dark:text-purple-400';
    case 'like':
      return 'bg-red-500/10 text-red-600 dark:text-red-400';
    case 'share':
      return 'bg-orange-500/10 text-orange-600 dark:text-orange-400';
    default:
      return 'bg-gray-500/10 text-gray-600 dark:text-gray-400';
  }
};

export function ActivityFeed() {
  return (
    <GlassCard>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Recent Activity</CardTitle>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          View All
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockActivities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors"
          >
            <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
              {getActivityIcon(activity.type)}
            </div>
            
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">{activity.title}</h4>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground">{activity.description}</p>
              
              {activity.user && (
                <div className="flex items-center gap-2 mt-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={activity.user.avatar} />
                    <AvatarFallback className="text-xs">
                      {activity.user.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">
                    {activity.user.name}
                  </span>
                </div>
              )}

              {activity.metadata?.achievementBadge && (
                <Badge variant="secondary" className="text-xs">
                  {activity.metadata.achievementBadge}
                </Badge>
              )}
            </div>
          </motion.div>
        ))}
        
        {mockActivities.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No recent activity</p>
            <p className="text-xs">Start connecting and participating to see updates here</p>
          </div>
        )}
      </CardContent>
    </GlassCard>
  );
}