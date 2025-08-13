import React from "react";
import { useUserPoints } from "@/hooks/useUserPoints";
import { useUserAchievements } from "@/hooks/useUserAchievements";
import { useNotificationPreferences } from "@/hooks/useNotificationPreferences";
import { NotificationPreferencesCard } from "@/components/dashboard/NotificationPreferencesCard";
import { PointsSummary } from "@/components/dashboard/PointsSummary";
import AchievementSummary from "@/components/dashboard/AchievementSummary";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { EmptyState } from "@/components/dashboard/EmptyState";
import Loader from "@/components/ui/loader";
import SEO from "@/components/SEO";
import { useAuth } from "@/hooks/useAuth";
import AuthDialog from "@/components/auth/AuthDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AnimatedCard from "@/components/animations/AnimatedCard";
import { Award, Calendar, Activity, Users, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
    <div className="container mx-auto px-4 py-8 space-y-8">
      <SEO
        title="Dashboard — alumNexus"
        description="Your alumni hub: points, achievements, and notifications."
      />
      
      <DashboardHeader userName={user?.fullName} />

      {!isAuthenticated ? (
        <Card className="max-w-md mx-auto">
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
        </Card>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Total Points"
              value={pointsData?.points || 0}
              description="Points earned"
              icon={Award}
              color="primary"
              trend={{ value: 12, label: "this month" }}
            />
            <MetricCard
              title="Achievements"
              value={achievements?.length || 0}
              description="Unlocked achievements"
              icon={Award}
              color="secondary"
            />
            <MetricCard
              title="Events Attended"
              value="8"
              description="This year"
              icon={Calendar}
              color="accent"
            />
            <MetricCard
              title="Network Size"
              value="156"
              description="Alumni connections"
              icon={Users}
              color="primary"
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <AnimatedCard hoverEffect="lift" delay={0.1}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <EmptyState
                      icon={Activity}
                      title="No Recent Activity"
                      description="Your recent activities will appear here once you start engaging with the platform."
                      action={{
                        label: "Explore Features",
                        onClick: () => navigate("/")
                      }}
                    />
                  </CardContent>
                </Card>
              </AnimatedCard>

              <AnimatedCard hoverEffect="lift" delay={0.2}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Upcoming Events
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <EmptyState
                      icon={Calendar}
                      title="No Upcoming Events"
                      description="Stay tuned for exciting alumni events and networking opportunities."
                      action={{
                        label: "Browse Events",
                        onClick: () => navigate("/events")
                      }}
                    />
                  </CardContent>
                </Card>
              </AnimatedCard>
            </div>

            <div className="space-y-6">
              <AnimatedCard hoverEffect="lift" delay={0.3}>
                <Card>
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
                </Card>
              </AnimatedCard>

              <AnimatedCard hoverEffect="lift" delay={0.4}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Quick Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Profile Views</span>
                      <span className="font-semibold">24</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Connections</span>
                      <span className="font-semibold">156</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Messages</span>
                      <span className="font-semibold">12</span>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>
            </div>
          </div>

          {/* Notification Preferences */}
          <AnimatedCard hoverEffect="lift" delay={0.5}>
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
          </AnimatedCard>
        </>
      )}
    </div>
  );
};

export default Dashboard;
