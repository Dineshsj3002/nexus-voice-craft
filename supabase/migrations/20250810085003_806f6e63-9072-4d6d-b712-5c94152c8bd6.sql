-- Secure RLS and policies migration (idempotent, corrected to use pg_policies.policyname)

-- achievements
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' AND table_name = 'achievements'
  ) THEN
    EXECUTE 'ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY';
    IF NOT EXISTS (
      SELECT 1 FROM pg_policies 
      WHERE schemaname = 'public' AND tablename = 'achievements' AND policyname = 'achievements_select_authenticated'
    ) THEN
      EXECUTE 'CREATE POLICY "achievements_select_authenticated" ON public.achievements FOR SELECT USING (auth.role() = ''authenticated'')';
    END IF;
  END IF;
END $$;

-- content_tags
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' AND table_name = 'content_tags'
  ) THEN
    EXECUTE 'ALTER TABLE public.content_tags ENABLE ROW LEVEL SECURITY';
    IF NOT EXISTS (
      SELECT 1 FROM pg_policies 
      WHERE schemaname = 'public' AND tablename = 'content_tags' AND policyname = 'content_tags_select_authenticated'
    ) THEN
      EXECUTE 'CREATE POLICY "content_tags_select_authenticated" ON public.content_tags FOR SELECT USING (auth.role() = ''authenticated'')';
    END IF;
  END IF;
END $$;

-- content_tag_mappings
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' AND table_name = 'content_tag_mappings'
  ) THEN
    EXECUTE 'ALTER TABLE public.content_tag_mappings ENABLE ROW LEVEL SECURITY';
    IF NOT EXISTS (
      SELECT 1 FROM pg_policies 
      WHERE schemaname = 'public' AND tablename = 'content_tag_mappings' AND policyname = 'content_tag_mappings_select_authenticated'
    ) THEN
      EXECUTE 'CREATE POLICY "content_tag_mappings_select_authenticated" ON public.content_tag_mappings FOR SELECT USING (auth.role() = ''authenticated'')';
    END IF;
  END IF;
END $$;

-- content_language
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' AND table_name = 'content_language'
  ) THEN
    EXECUTE 'ALTER TABLE public.content_language ENABLE ROW LEVEL SECURITY';
    IF NOT EXISTS (
      SELECT 1 FROM pg_policies 
      WHERE schemaname = 'public' AND tablename = 'content_language' AND policyname = 'content_language_select_authenticated'
    ) THEN
      EXECUTE 'CREATE POLICY "content_language_select_authenticated" ON public.content_language FOR SELECT USING (auth.role() = ''authenticated'')';
    END IF;
  END IF;
END $$;

-- analytics_events (owner-only SELECT/INSERT)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' AND table_name = 'analytics_events'
  ) THEN
    EXECUTE 'ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY';
    IF NOT EXISTS (
      SELECT 1 FROM pg_policies 
      WHERE schemaname = 'public' AND tablename = 'analytics_events' AND policyname = 'analytics_events_select_own'
    ) THEN
      EXECUTE 'CREATE POLICY "analytics_events_select_own" ON public.analytics_events FOR SELECT USING (auth.uid() = user_id)';
    END IF;
    IF NOT EXISTS (
      SELECT 1 FROM pg_policies 
      WHERE schemaname = 'public' AND tablename = 'analytics_events' AND policyname = 'analytics_events_insert_own'
    ) THEN
      EXECUTE 'CREATE POLICY "analytics_events_insert_own" ON public.analytics_events FOR INSERT WITH CHECK (auth.uid() = user_id)';
    END IF;
  END IF;
END $$;

-- content_flags (owner-only SELECT/INSERT by flagged_by)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' AND table_name = 'content_flags'
  ) THEN
    EXECUTE 'ALTER TABLE public.content_flags ENABLE ROW LEVEL SECURITY';
    IF NOT EXISTS (
      SELECT 1 FROM pg_policies 
      WHERE schemaname = 'public' AND tablename = 'content_flags' AND policyname = 'content_flags_select_own'
    ) THEN
      EXECUTE 'CREATE POLICY "content_flags_select_own" ON public.content_flags FOR SELECT USING (auth.uid() = flagged_by)';
    END IF;
    IF NOT EXISTS (
      SELECT 1 FROM pg_policies 
      WHERE schemaname = 'public' AND tablename = 'content_flags' AND policyname = 'content_flags_insert_own'
    ) THEN
      EXECUTE 'CREATE POLICY "content_flags_insert_own" ON public.content_flags FOR INSERT WITH CHECK (auth.uid() = flagged_by)';
    END IF;
  END IF;
END $$;

-- matching_results (owner-only SELECT/INSERT)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' AND table_name = 'matching_results'
  ) THEN
    EXECUTE 'ALTER TABLE public.matching_results ENABLE ROW LEVEL SECURITY';
    IF NOT EXISTS (
      SELECT 1 FROM pg_policies 
      WHERE schemaname = 'public' AND tablename = 'matching_results' AND policyname = 'matching_results_select_own'
    ) THEN
      EXECUTE 'CREATE POLICY "matching_results_select_own" ON public.matching_results FOR SELECT USING (auth.uid() = user_id)';
    END IF;
    IF NOT EXISTS (
      SELECT 1 FROM pg_policies 
      WHERE schemaname = 'public' AND tablename = 'matching_results' AND policyname = 'matching_results_insert_own'
    ) THEN
      EXECUTE 'CREATE POLICY "matching_results_insert_own" ON public.matching_results FOR INSERT WITH CHECK (auth.uid() = user_id)';
    END IF;
  END IF;
END $$;

-- video_sessions (enable RLS; no public policies)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' AND table_name = 'video_sessions'
  ) THEN
    EXECUTE 'ALTER TABLE public.video_sessions ENABLE ROW LEVEL SECURITY';
  END IF;
END $$;

-- profiles: restrict to authenticated for SELECT
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' AND table_name = 'profiles'
  ) THEN
    EXECUTE 'ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY';
    IF NOT EXISTS (
      SELECT 1 FROM pg_policies 
      WHERE schemaname = 'public' AND tablename = 'profiles' AND policyname = 'profiles_select_authenticated'
    ) THEN
      EXECUTE 'CREATE POLICY "profiles_select_authenticated" ON public.profiles FOR SELECT USING (auth.role() = ''authenticated'')';
    END IF;
  END IF;
END $$;