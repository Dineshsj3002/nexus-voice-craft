import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { motion } from 'framer-motion';
import { 
  Calendar,
  Users,
  Trophy,
  MessageCircle,
  BookOpen,
  Video,
  UserPlus,
  Search,
  Plus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
  color: string;
  badge?: string;
}

export function QuickActions() {
  const navigate = useNavigate();

  const quickActions: QuickAction[] = [
    {
      id: 'join-event',
      title: 'Join Event',
      description: 'Browse upcoming events',
      icon: <Calendar className="h-5 w-5" />,
      action: () => navigate('/events'),
      color: 'from-blue-500 to-blue-600',
      badge: '3 new'
    },
    {
      id: 'find-alumni',
      title: 'Find Alumni',
      description: 'Discover connections',
      icon: <Search className="h-5 w-5" />,
      action: () => navigate('/alumni'),
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'start-mentoring',
      title: 'Start Mentoring',
      description: 'Become a mentor',
      icon: <Users className="h-5 w-5" />,
      action: () => navigate('/mentorship'),
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'view-leaderboard',
      title: 'Leaderboard',
      description: 'See top contributors',
      icon: <Trophy className="h-5 w-5" />,
      action: () => console.log('View leaderboard'),
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      id: 'join-discussion',
      title: 'Join Discussion',
      description: 'Forum conversations',
      icon: <MessageCircle className="h-5 w-5" />,
      action: () => navigate('/forum'),
      color: 'from-red-500 to-red-600',
      badge: '5 active'
    },
    {
      id: 'mock-interview',
      title: 'Mock Interview',
      description: 'Practice interviews',
      icon: <Video className="h-5 w-5" />,
      action: () => navigate('/mock-interviews'),
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  return (
    <GlassCard>
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="outline"
                onClick={action.action}
                className="h-auto p-4 flex flex-col items-start text-left w-full relative overflow-hidden group border-0"
                style={{
                  background: `linear-gradient(135deg, ${action.color.split(' ')[0].replace('from-', '')}10, ${action.color.split(' ')[1].replace('to-', '')}10)`
                }}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${action.color} text-white group-hover:scale-110 transition-transform`}>
                    {action.icon}
                  </div>
                  {action.badge && (
                    <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                      {action.badge}
                    </span>
                  )}
                </div>
                <h3 className="font-medium text-sm">{action.title}</h3>
                <p className="text-xs text-muted-foreground">{action.description}</p>
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity" 
                     style={{ background: `linear-gradient(135deg, ${action.color.split(' ')[0].replace('from-', '')}, ${action.color.split(' ')[1].replace('to-', '')})` }} />
              </Button>
            </motion.div>
          ))}
        </div>
        
        {/* Add Custom Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-4 pt-4 border-t border-border/50"
        >
          <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
            <Plus className="h-4 w-4 mr-2" />
            Customize Actions
          </Button>
        </motion.div>
      </CardContent>
    </GlassCard>
  );
}