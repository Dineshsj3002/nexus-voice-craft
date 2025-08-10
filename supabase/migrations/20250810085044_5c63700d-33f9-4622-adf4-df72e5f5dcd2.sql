-- Remediation: address linter warnings

-- 1) video_sessions: add explicit deny-all policy (keeps table locked while satisfying linter)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' AND table_name = 'video_sessions'
  ) THEN
    -- ensure RLS is enabled
    EXECUTE 'ALTER TABLE public.video_sessions ENABLE ROW LEVEL SECURITY';
    -- create a deny-all policy if none exists
    IF NOT EXISTS (
      SELECT 1 FROM pg_policies 
      WHERE schemaname = 'public' AND tablename = 'video_sessions' AND policyname = 'video_sessions_deny_all_authenticated'
    ) THEN
      EXECUTE 'CREATE POLICY "video_sessions_deny_all_authenticated" ON public.video_sessions FOR ALL TO authenticated USING (false) WITH CHECK (false)';
    END IF;
  END IF;
END $$;

-- 2) Functions: set immutable search_path for SECURITY DEFINER functions
-- update_user_online_status
CREATE OR REPLACE FUNCTION public.update_user_online_status(user_id uuid, is_online boolean)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = 'public'
AS $$
BEGIN
  UPDATE public.profiles 
  SET 
    is_online = update_user_online_status.is_online,
    last_seen = CASE WHEN update_user_online_status.is_online = false THEN NOW() ELSE last_seen END,
    updated_at = NOW()
  WHERE id = user_id;
END;
$$;

-- handle_new_user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'username',
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$;