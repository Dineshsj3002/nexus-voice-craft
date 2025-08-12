import React from "react";
import { useUserPoints } from "@/hooks/useUserPoints";
import { useUserAchievements } from "@/hooks/useUserAchievements";
import { useNotificationPreferences } from "@/hooks/useNotificationPreferences";
import { NotificationPreferencesCard } from "@/components/dashboard/NotificationPreferencesCard";
import { PointsSummary } from "@/components/dashboard/PointsSummary";
import AchievementSummary from "@/components/dashboard/AchievementSummary";
import Loader from "@/components/ui/loader";
import SEO from "@/components/SEO";
import { useAuth } from "@/hooks/useAuth";
import AuthDialog from "@/components/auth/AuthDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AnimatedCard from "@/components/animations/AnimatedCard";

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
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
    <div className="container mx-auto px-4 py-8">
      <SEO
        title="Dashboard — alumNexus"
        description="Your alumni hub: points, achievements, and notifications."
      />
      <header className="mb-6">
        <h1 className="text-3xl font-bold">
          {`Welcome back${user?.fullName ? `, ${user.fullName}` : ""}`}
        </h1>
        <p className="text-muted-foreground">Your alumni hub at a glance</p>
      </header>

      {!isAuthenticated ? (
        <Card>
          <CardContent className="p-6">
            <p className="mb-4 text-muted-foreground">Please log in to view your dashboard.</p>
            <AuthDialog triggerText="Login" />
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">No recent activity to display.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">No upcoming events.</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <PointsSummary points={pointsData?.points} />

              <Card>
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  {achievementsLoading ? (
                    <div className="flex justify-center py-2">
                      <Loader size={28} />
                    </div>
                  ) : (
                    <AchievementSummary achievements={achievements || []} />
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              {preferencesLoading ? (
                <div className="flex justify-center py-2">
                  <Loader size={28} />
                </div>
              ) : (
                <NotificationPreferencesCard
                  preferences={preferences || { enable_email: true, enable_sms: false, enable_push: true, weekly_digest: true }}
                  onUpdate={updatePreferences}
                  updating={preferencesUpdating}
                />
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default Dashboard;
