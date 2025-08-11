
-- 1) Profiles table to store basic user info
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  full_name text,
  avatar_url text,
  is_online boolean not null default false,
  last_seen timestamp with time zone,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- updated_at trigger helper
create or replace function public.set_updated_at()
returns trigger
language plpgsql
security definer
set search_path = 'public'
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
begin
  if not exists (select 1 from pg_trigger where tgname = 'profiles_set_updated_at') then
    execute 'create trigger profiles_set_updated_at before update on public.profiles for each row execute function public.set_updated_at()';
  end if;
end
$$;

-- Enable RLS and add policies
alter table public.profiles enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies 
    where schemaname='public' and tablename='profiles' and policyname='Profiles allow authenticated read'
  ) then
    execute 'create policy "Profiles allow authenticated read" on public.profiles for select to authenticated using (true)';
  end if;

  if not exists (
    select 1 from pg_policies 
    where schemaname='public' and tablename='profiles' and policyname='Profiles insert own row'
  ) then
    execute 'create policy "Profiles insert own row" on public.profiles for insert to authenticated with check (auth.uid() = id)';
  end if;

  if not exists (
    select 1 from pg_policies 
    where schemaname='public' and tablename='profiles' and policyname='Profiles update own row'
  ) then
    execute 'create policy "Profiles update own row" on public.profiles for update to authenticated using (auth.uid() = id)';
  end if;

  if not exists (
    select 1 from pg_policies 
    where schemaname='public' and tablename='profiles' and policyname='Profiles delete own row'
  ) then
    execute 'create policy "Profiles delete own row" on public.profiles for delete to authenticated using (auth.uid() = id)';
  end if;
end
$$;

-- Ensure profile auto-creation trigger exists (calls existing handle_new_user)
do $$
begin
  if not exists (select 1 from pg_trigger where tgname = 'on_auth_user_created') then
    execute 'create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user()';
  end if;
end
$$;

-- 2) Roles: enum, table, helper function, policies, and default assignment

-- Create app_role enum if missing
do $$
begin
  if not exists (select 1 from pg_type where typname = 'app_role') then
    execute $$create type public.app_role as enum ('admin','moderator','user')$$;
  end if;
end
$$;

-- user_roles table
create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamp with time zone not null default now(),
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

-- role check function (SECURITY DEFINER to avoid recursive RLS)
create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = 'public'
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

-- Policies on user_roles
do $$
begin
  -- SELECT: users can see their own roles; admins can see all
  if not exists (
    select 1 from pg_policies 
    where schemaname='public' and tablename='user_roles' and policyname='User roles select own or admin all'
  ) then
    execute 'create policy "User roles select own or admin all" on public.user_roles for select to authenticated using (user_id = auth.uid() or public.has_role(auth.uid(), ''admin''))';
  end if;

  -- INSERT: users can insert their own "user" role (idempotent); admins can insert any role for any user
  if not exists (
    select 1 from pg_policies 
    where schemaname='public' and tablename='user_roles' and policyname='User roles insert self user or admin'
  ) then
    execute 'create policy "User roles insert self user or admin" on public.user_roles for insert to authenticated with check ((user_id = auth.uid() and role = ''user'') or public.has_role(auth.uid(), ''admin''))';
  end if;

  -- UPDATE: admins only
  if not exists (
    select 1 from pg_policies 
    where schemaname='public' and tablename='user_roles' and policyname='User roles update admin only'
  ) then
    execute 'create policy "User roles update admin only" on public.user_roles for update to authenticated using (public.has_role(auth.uid(), ''admin''))';
  end if;

  -- DELETE: admins can delete any; users can delete their own "user" role
  if not exists (
    select 1 from pg_policies 
    where schemaname='public' and tablename='user_roles' and policyname='User roles delete admin or self user'
  ) then
    execute 'create policy "User roles delete admin or self user" on public.user_roles for delete to authenticated using (public.has_role(auth.uid(), ''admin'') or (user_id = auth.uid() and role = ''user''))';
  end if;
end
$$;

-- Default role assignment on signup
create or replace function public.assign_default_role()
returns trigger
language plpgsql
security definer
set search_path = 'public'
as $$
begin
  insert into public.user_roles (user_id, role)
  values (new.id, 'user')
  on conflict (user_id, role) do nothing;
  return new;
end;
$$;

do $$
begin
  if not exists (select 1 from pg_trigger where tgname = 'on_auth_user_assigned_default_role') then
    execute 'create trigger on_auth_user_assigned_default_role after insert on auth.users for each row execute procedure public.assign_default_role()';
  end if;
end
$$;
