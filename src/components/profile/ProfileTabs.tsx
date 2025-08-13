import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PointsSummary } from "@/components/dashboard/PointsSummary";
import AchievementSummary from "@/components/dashboard/AchievementSummary";
import { NotificationPreferencesCard } from "@/components/dashboard/NotificationPreferencesCard";
import Loader from "@/components/ui/loader";
import { motion } from "framer-motion";
import { User, Award, Bell, Activity } from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";

interface Achievement {
  id: string;
  title?: string;
  description?: string;
  obtained_at?: string;
  achievement?: { name: string; description: string; badge_icon?: string };
}

interface NotificationPreferences {
  enable_email: boolean;
  enable_sms: boolean;
  enable_push: boolean;
  weekly_digest: boolean;
}

interface ProfileTabsProps {
  points?: number;
  achievements?: Achievement[];
  achievementsLoading: boolean;
  preferences?: NotificationPreferences;
  preferencesLoading: boolean;
  updatePreferences: (updates: Partial<NotificationPreferences>) => Promise<void>;
  preferencesUpdating: boolean;
}

export function ProfileTabs({
  points,
  achievements,
  achievementsLoading,
  preferences,
  preferencesLoading,
  updatePreferences,
  preferencesUpdating
}: ProfileTabsProps) {
  const tabVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-4 mb-6">
        <TabsTrigger value="overview" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span className="hidden sm:inline">Overview</span>
        </TabsTrigger>
        <TabsTrigger value="achievements" className="flex items-center gap-2">
          <Award className="h-4 w-4" />
          <span className="hidden sm:inline">Achievements</span>
        </TabsTrigger>
        <TabsTrigger value="activity" className="flex items-center gap-2">
          <Activity className="h-4 w-4" />
          <span className="hidden sm:inline">Activity</span>
        </TabsTrigger>
        <TabsTrigger value="notifications" className="flex items-center gap-2">
          <Bell className="h-4 w-4" />
          <span className="hidden sm:inline">Notifications</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <motion.div
          variants={tabVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MetricCard
              title="Total Points"
              value={points || 0}
              description="Points earned"
              icon={Award}
              color="primary"
            />
            <MetricCard
              title="Achievements"
              value={achievements?.length || 0}
              description="Unlocked achievements"
              icon={Award}
              color="secondary"
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              {achievementsLoading ? (
                <div className="flex justify-center py-8">
                  <Loader size={32} />
                </div>
              ) : (
                <AchievementSummary achievements={achievements || []} />
              )}
            </CardContent>
          </Card>
        </motion.div>
      </TabsContent>

      <TabsContent value="achievements">
        <motion.div
          variants={tabVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>All Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              {achievementsLoading ? (
                <div className="flex justify-center py-8">
                  <Loader size={32} />
                </div>
              ) : (
                <AchievementSummary achievements={achievements || []} />
              )}
            </CardContent>
          </Card>
        </motion.div>
      </TabsContent>

      <TabsContent value="activity">
        <motion.div
          variants={tabVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground py-8 text-center">
                No recent activity to display.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </TabsContent>

      <TabsContent value="notifications">
        <motion.div
          variants={tabVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              {preferencesLoading ? (
                <div className="flex justify-center py-8">
                  <Loader size={32} />
                </div>
              ) : (
                <NotificationPreferencesCard
                  preferences={preferences || { 
                    enable_email: true, 
                    enable_sms: false, 
                    enable_push: true, 
                    weekly_digest: true 
                  }}
                  onUpdate={updatePreferences}
                  updating={preferencesUpdating}
                />
              )}
            </CardContent>
          </Card>
        </motion.div>
      </TabsContent>
    </Tabs>
  );
}