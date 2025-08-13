import React from "react";
import SEO from "@/components/SEO";
import { useAuth } from "@/hooks/useAuth";
import AuthDialog from "@/components/auth/AuthDialog";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { ProfileCover } from "@/components/profile/ProfileCover";
import { ProfileTabs } from "@/components/profile/ProfileTabs";
import { GlassCard } from "@/components/ui/glass-card";
import { useUserPoints } from "@/hooks/useUserPoints";
import { useUserAchievements } from "@/hooks/useUserAchievements";
import { useNotificationPreferences } from "@/hooks/useNotificationPreferences";
import { Users } from "lucide-react";

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
    <div className="container mx-auto px-4 py-8 space-y-8">
      <SEO title="Profile — alumNexus" description="Your alumNexus profile, achievements and preferences." />

      {!isAuthenticated ? (
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <div className="p-4 bg-muted/50 rounded-full w-fit mx-auto mb-4">
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Access Your Profile</h2>
            <p className="mb-6 text-muted-foreground">
              Please log in to view and manage your alumni profile.
            </p>
            <AuthDialog triggerText="Login to Continue" />
          </CardContent>
        </Card>
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
          <div className="container mx-auto px-4 py-8 space-y-8">
            {/* Profile Cover Section */}
            <GlassCard className="overflow-hidden">
              <ProfileCover 
                profile={profile}
                userEmail={user.email}
                isOwnProfile={true}
                connectionCount={156}
                mutualConnections={0}
              />
            </GlassCard>
            
            {/* Profile Tabs */}
            <ProfileTabs
              points={pointsData?.points}
              achievements={achievements}
              achievementsLoading={achievementsLoading}
              preferences={preferences}
              preferencesLoading={prefsLoading}
              updatePreferences={updatePreferences}
              preferencesUpdating={updating}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
