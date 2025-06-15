import React from "react";
import { useUserPoints } from "@/hooks/useUserPoints";
import { useUserAchievements } from "@/hooks/useUserAchievements";
import { useNotificationPreferences } from "@/hooks/useNotificationPreferences";
import { NotificationPreferencesCard } from "@/components/dashboard/NotificationPreferencesCard";
import { PointsSummary } from "@/components/dashboard/PointsSummary";
import AchievementSummary from "@/components/dashboard/AchievementSummary";
import Loader from "@/components/ui/loader";

const Dashboard = () => {
  // PLACEHOLDER: Replace with actual user data from session when available
  const userId = "demo-user-1";
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
    updatePreferences,
    updating: preferencesUpdating,
  } = useNotificationPreferences(userId);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
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
        {!preferences ? (
          <div className="bg-white p-6 rounded-lg border flex justify-center">
            <Loader size={28} />
          </div>
        ) : (
          <NotificationPreferencesCard
            preferences={preferences}
            onUpdate={updatePreferences}
            updating={preferencesUpdating}
          />
        )}
      </section>
    </div>
  );
};

export default Dashboard;
