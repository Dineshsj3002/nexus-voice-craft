
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useNotificationPreferences(userId: string | undefined) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["notificationPreferences", userId],
    enabled: !!userId,
    queryFn: async () => {
      if (!userId) return null;
      const { data, error } = await supabase
        .from("notification_preferences")
        .select("*")
        .eq("user_id", userId)
        .single();
      if (error && error.code !== "PGRST116") throw error;
      return data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (updates: Partial<any>) => {
      if (!userId) throw new Error("No user");
      const { data, error } = await supabase
        .from("notification_preferences")
        .upsert({ user_id: userId, ...updates }, { onConflict: 'user_id' })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notificationPreferences", userId] });
    },
  });

  // Ensure updatePreferences returns Promise<void>
  const updatePreferences = async (updates: Partial<any>): Promise<void> => {
    await mutation.mutateAsync(updates);
  };

  return { ...query, updatePreferences, updating: mutation.isPending };
}
