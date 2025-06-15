
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useUserAchievements(userId: string | undefined) {
  return useQuery({
    queryKey: ["userAchievements", userId],
    enabled: !!userId,
    queryFn: async () => {
      if (!userId) return [];
      const { data: earned, error } = await supabase
        .from("user_achievements")
        .select("*, achievement:achievement_id (*)")
        .eq("user_id", userId)
        .order("obtained_at", { ascending: false });

      if (error) throw error;
      return (earned ?? []).map((ua) => ({
        id: ua.id,
        achievement: ua.achievement,
        obtained_at: ua.obtained_at,
      }));
    },
  });
}
