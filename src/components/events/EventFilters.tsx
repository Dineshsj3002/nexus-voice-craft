import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Calendar, MapPin, Users, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { GlassCard } from '@/components/ui/glass-card';

export type EventType = 'Workshop' | 'Networking' | 'Panel' | 'Program' | 'Mentoring' | 'Career Fair' | 'Hackathon' | 'Competition';

interface EventFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedTypes: EventType[];
  onTypeToggle: (type: EventType) => void;
  onClearFilters: () => void;
}

const eventTypes: { type: EventType; color: string; icon: React.ReactNode }[] = [
  { type: 'Hackathon', color: 'bg-purple-500', icon: '💻' },
  { type: 'Workshop', color: 'bg-blue-500', icon: '🛠️' },
  { type: 'Networking', color: 'bg-indigo-500', icon: '🤝' },
  { type: 'Panel', color: 'bg-amber-500', icon: '💬' },
  { type: 'Competition', color: 'bg-red-500', icon: '🏆' },
  { type: 'Career Fair', color: 'bg-pink-500', icon: '💼' },
  { type: 'Mentoring', color: 'bg-green-500', icon: '👥' },
  { type: 'Program', color: 'bg-primary', icon: '📚' }
];

export function EventFilters({ 
  searchQuery, 
  onSearchChange, 
  selectedTypes, 
  onTypeToggle, 
  onClearFilters 
}: EventFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <GlassCard className="p-6 mb-8" intensity="light">
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-background/50 border-border/50"
          />
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className="gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
            {selectedTypes.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {selectedTypes.length}
              </Badge>
            )}
          </Button>

          {selectedTypes.length > 0 && (
            <Button
              variant="ghost"
              onClick={onClearFilters}
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
              Clear all
            </Button>
          )}
        </div>

        {/* Filter Options */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-border/50">
                <h4 className="text-sm font-medium mb-3">Event Types</h4>
                <div className="flex flex-wrap gap-2">
                  {eventTypes.map(({ type, color, icon }) => (
                    <motion.button
                      key={type}
                      onClick={() => onTypeToggle(type)}
                      className={`
                        flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200
                        ${selectedTypes.includes(type)
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-background hover:bg-accent hover:text-accent-foreground border-border'
                        }
                      `}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-sm">{icon}</span>
                      <span className="text-sm font-medium">{type}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active Filters */}
        {selectedTypes.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedTypes.map((type) => (
              <Badge
                key={type}
                variant="secondary"
                className="gap-1 cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                onClick={() => onTypeToggle(type)}
              >
                {type}
                <X className="h-3 w-3" />
              </Badge>
            ))}
          </div>
        )}
      </div>
    </GlassCard>
  );
}