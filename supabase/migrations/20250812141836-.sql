-- Secure profiles table by removing broad-read policies and limiting access to own row
BEGIN;

-- Remove overly-permissive SELECT policies
DROP POLICY IF EXISTS "Profiles readable by authenticated" ON public.profiles;
DROP POLICY IF EXISTS "profiles_select_authenticated" ON public.profiles;

-- Create strict SELECT policy: users can read only their own profile
CREATE POLICY "Users can view own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = id);

COMMIT;