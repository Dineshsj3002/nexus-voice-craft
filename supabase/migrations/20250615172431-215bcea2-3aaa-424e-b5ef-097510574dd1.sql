
-- Enable Row Level Security and add secure policies for user-related tables

-- User Achievements Table
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
CREATE POLICY user_achievements_select ON public.user_achievements
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY user_achievements_insert ON public.user_achievements
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY user_achievements_update ON public.user_achievements
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY user_achievements_delete ON public.user_achievements
  FOR DELETE USING (auth.uid() = user_id);

-- User Points Table
ALTER TABLE public.user_points ENABLE ROW LEVEL SECURITY;
CREATE POLICY user_points_select ON public.user_points
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY user_points_insert ON public.user_points
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY user_points_update ON public.user_points
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY user_points_delete ON public.user_points
  FOR DELETE USING (auth.uid() = user_id);

-- Notification Preferences Table
ALTER TABLE public.notification_preferences ENABLE ROW LEVEL SECURITY;
CREATE POLICY notif_pref_select ON public.notification_preferences
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY notif_pref_insert ON public.notification_preferences
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY notif_pref_update ON public.notification_preferences
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY notif_pref_delete ON public.notification_preferences
  FOR DELETE USING (auth.uid() = user_id);
