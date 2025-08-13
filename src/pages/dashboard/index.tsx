import React from "react";
import { useUserPoints } from "@/hooks/useUserPoints";
import { useUserAchievements } from "@/hooks/useUserAchievements";
import { useNotificationPreferences } from "@/hooks/useNotificationPreferences";
import { NotificationPreferencesCard } from "@/components/dashboard/NotificationPreferencesCard";
import AchievementSummary from "@/components/dashboard/AchievementSummary";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardCharts } from "@/components/dashboard/DashboardCharts";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { GlassCard } from "@/components/ui/glass-card";
import Loader from "@/components/ui/loader";
import SEO from "@/components/SEO";
import { useAuth } from "@/hooks/useAuth";
import AuthDialog from "@/components/auth/AuthDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Calendar, Activity, Users, TrendingUp, Trophy, BarChart3, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const userId = user?.id;

  const {
    data: pointsData,
    isLoading: pointsLoading,
  } = useUserPoints(userId);
  const {
    data: achievements,
    isLoading: achievementsLoading,
  } = useUserAchievements(userId);
  const {
    data: preferences,
    isLoading: preferencesLoading,
    updatePreferences,
    updating: preferencesUpdating,
  } = useNotificationPreferences(userId);

  return (
    <>
      <SEO
        title="Dashboard — alumNexus"
        description="Your alumni hub: points, achievements, and notifications."
      />
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 py-8 space-y-8">
          {!isAuthenticated ? (
            <GlassCard className="max-w-md mx-auto">
              <CardContent className="p-8 text-center">
                <div className="p-4 bg-muted/50 rounded-full w-fit mx-auto mb-4">
                  <Users className="h-8 w-8 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Access Your Dashboard</h2>
                <p className="mb-6 text-muted-foreground">
                  Please log in to view your personalized alumni dashboard.
                </p>
                <AuthDialog triggerText="Login to Continue" />
              </CardContent>
            </GlassCard>
          ) : (
            <>
              {/* Dashboard Header */}
              <DashboardHeader userName={user?.fullName} />

              {/* Stats Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                <MetricCard
                  title="Total Points"
                  value={pointsData?.points || 0}
                  description="Points earned"
                  icon={Trophy}
                  trend={{ value: 12, label: "this month" }}
                />
                <MetricCard
                  title="Achievements"
                  value={achievements?.length || 0}
                  description="Unlocked achievements"
                  icon={Award}
                  trend={{ value: 8, label: "this week" }}
                />
                <MetricCard
                  title="Events Attended"
                  value={42}
                  description="Events participated"
                  icon={Calendar}
                  trend={{ value: 23, label: "this quarter" }}
                />
                <MetricCard
                  title="Network Size"
                  value={156}
                  description="Alumni connections"
                  icon={Users}
                  trend={{ value: 15, label: "this month" }}
                />
              </motion.div>

              {/* Charts Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <DashboardCharts />
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <QuickActions />
              </motion.div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Activity Feed */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="lg:col-span-2"
                >
                  <ActivityFeed />
                </motion.div>

                {/* Right Column - Achievements & Quick Stats */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="space-y-6"
                >
                  {/* Recent Achievements */}
                  <GlassCard>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        Recent Achievements
                      </CardTitle>
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
                  </GlassCard>

                  {/* Quick Stats */}
                  <GlassCard>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Quick Stats
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Profile Views</span>
                        <span className="font-medium">24</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Messages</span>
                        <span className="font-medium">8</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Forum Posts</span>
                        <span className="font-medium">12</span>
                      </div>
                    </CardContent>
                  </GlassCard>
                </motion.div>
              </div>

              {/* Notification Preferences */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <GlassCard>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Notification Preferences
                    </CardTitle>
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
                </GlassCard>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
