import React from "react";
import SEO from "@/components/SEO";
import { useAuth } from "@/hooks/useAuth";
import AuthDialog from "@/components/auth/AuthDialog";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PointsSummary } from "@/components/dashboard/PointsSummary";
import AchievementSummary from "@/components/dashboard/AchievementSummary";
import Loader from "@/components/ui/loader";
import { useUserPoints } from "@/hooks/useUserPoints";
import { useUserAchievements } from "@/hooks/useUserAchievements";
import { useNotificationPreferences } from "@/hooks/useNotificationPreferences";
import { NotificationPreferencesCard } from "@/components/dashboard/NotificationPreferencesCard";

 type Profile = {
  id: string;
  username?: string | null;
  full_name?: string | null;
  avatar_url?: string | null;
  bio?: string | null;
  status?: string | null;
};

const ProfilePage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const userId = user?.id;

  const [profile, setProfile] = React.useState<Profile | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const { data: pointsData } = useUserPoints(userId);
  const { data: achievements, isLoading: achievementsLoading } = useUserAchievements(userId);
  const { data: preferences, isLoading: prefsLoading, updatePreferences, updating } = useNotificationPreferences(userId);

  React.useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) return;
      setLoading(true);
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();
      setProfile((data as Profile) || null);
      setLoading(false);
    };
    fetchProfile();
  }, [userId]);

  return (
    <div className="container mx-auto px-4 py-8">
      <SEO title="Profile — alumNexus" description="Your alumNexus profile, achievements and preferences." />
      <h1 className="text-3xl font-bold mb-6">Profile</h1>

      {!isAuthenticated ? (
        <Card>
          <CardContent className="p-6">
            <p className="mb-4 text-muted-foreground">Please log in to view your profile.</p>
            <AuthDialog triggerText="Login" />
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardContent className="p-6 flex items-start gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={profile?.avatar_url || ""} alt={`${profile?.full_name || "User"} avatar`} />
                <AvatarFallback>{profile?.full_name?.[0] || "U"}</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-xl font-semibold">{profile?.full_name || user?.email}</div>
                {profile?.username && (
                  <div className="text-muted-foreground">@{profile.username}</div>
                )}
                {profile?.bio && <p className="mt-2 text-sm text-muted-foreground">{profile.bio}</p>}
                {profile?.status && <p className="mt-1 text-sm">{profile.status}</p>}
              </div>
            </CardContent>
          </Card>

          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <PointsSummary points={pointsData?.points} />
                <div className="p-4 border rounded-lg bg-card">
                  {achievementsLoading ? <Loader size={24} /> : <AchievementSummary achievements={achievements || []} />}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                {prefsLoading ? (
                  <div className="flex justify-center py-2">
                    <Loader size={28} />
                  </div>
                ) : (
                  <NotificationPreferencesCard
                    preferences={preferences || { enable_email: true, enable_sms: false, enable_push: true, weekly_digest: true }}
                    onUpdate={updatePreferences}
                    updating={updating}
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
