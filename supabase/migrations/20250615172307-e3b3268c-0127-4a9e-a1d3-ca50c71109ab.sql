
-- Create tables for AI matching, analytics, notifications, gamification, video logs, and content moderation.

-- Phase 2 tables
CREATE TABLE public.matching_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  matched_user_id UUID NOT NULL,
  match_score DECIMAL(4,2),
  compatibility TEXT,
  recommended_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  event_type TEXT NOT NULL,
  event_data JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.notification_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL,
  enable_email BOOLEAN DEFAULT true,
  enable_sms BOOLEAN DEFAULT false,
  enable_push BOOLEAN DEFAULT true,
  weekly_digest BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Phase 3 tables
CREATE TABLE public.achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  badge_icon TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  achievement_id UUID NOT NULL REFERENCES achievements(id),
  obtained_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.user_points (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL,
  points INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.video_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mentorship_session_id UUID,
  started_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  recording_url TEXT,
  screen_share_used BOOLEAN DEFAULT false
);

CREATE TABLE public.content_flags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id UUID,
  content_type TEXT,
  flagged_by UUID,
  reason TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.content_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tag TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.content_tag_mappings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id UUID,
  content_type TEXT,
  tag_id UUID REFERENCES content_tags(id)
);

CREATE TABLE public.content_language (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id UUID,
  content_type TEXT,
  language_code TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
