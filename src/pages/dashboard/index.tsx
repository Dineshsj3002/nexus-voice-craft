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
        title="Dashboard | alumNexus"
        description="AlumNexus user dashboard: view points, achievements, and manage notification preferences."
      />
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {!isAuthenticated ? (
        <div className="bg-white p-6 rounded-lg border">
          <p className="mb-4 text-gray-600">Please log in to view your dashboard.</p>
          <AuthDialog triggerText="Login" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                <div className="bg-white p-6 rounded-lg border">
                  <p className="text-gray-500">No recent activity to display.</p>
                </div>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
                <div className="bg-white p-6 rounded-lg border">
                  <p className="text-gray-500">No upcoming events.</p>
                </div>
              </section>
            </div>
            
            <div>
              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Points</h2>
                {pointsLoading ? (
                  <div className="bg-white p-6 rounded-lg border flex justify-center">
                    <Loader size={28} />
                  </div>
                ) : (
                  <PointsSummary points={pointsData?.points} />
                )}
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Achievements</h2>
                <div className="bg-white p-6 rounded-lg border">
                  {achievementsLoading ? (
                    <Loader size={28} />
                  ) : (
                    <AchievementSummary achievements={achievements || []} />
                  )}
                </div>
              </section>
            </div>
          </div>
          
          <section className="my-8">
            <h2 className="text-xl font-bold mb-4">Notification Preferences</h2>
            {preferencesLoading ? (
              <div className="bg-white p-6 rounded-lg border flex justify-center">
                <Loader size={28} />
              </div>
            ) : (
              <NotificationPreferencesCard
                preferences={preferences || { enable_email: true, enable_sms: false, enable_push: true, weekly_digest: true }}
                onUpdate={updatePreferences}
                updating={preferencesUpdating}
              />
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default Dashboard;
