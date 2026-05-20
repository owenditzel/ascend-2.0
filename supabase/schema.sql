-- ============================================================
-- ASCEND 2.0 — COMPLETE DATABASE SCHEMA
-- Run this FIRST in Supabase SQL Editor before seed.sql
-- Safe to re-run: uses CREATE TABLE IF NOT EXISTS + OR REPLACE
-- ============================================================

-- ============================================================
-- EXTENSIONS
-- ============================================================

create extension if not exists "uuid-ossp";

-- ============================================================
-- TABLES
-- ============================================================

-- USERS
create table if not exists public.users (
  id                    uuid primary key references auth.users(id) on delete cascade,
  email                 text unique not null,
  name                  text not null,
  avatar_url            text,
  role                  text not null default 'student'    check (role in ('student', 'admin')),
  tier                  text not null default 'community'  check (tier in ('community', 'full')),
  subscription_status   text                               check (subscription_status in ('active', 'cancelled', 'past_due')),
  subscription_start_date date,
  cohort_start_date     date default current_date,
  current_module_id     int,
  current_lesson_id     int,
  status                text not null default 'active'     check (status in ('active', 'paused', 'completed', 'dropped')),
  last_login_at         timestamptz,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

-- MODULES
create table if not exists public.modules (
  id                serial primary key,
  title             text not null,
  description       text not null,
  "order"           int  not null unique,
  thumbnail_url     text,
  learning_outcomes jsonb,
  tier_availability text not null default 'both' check (tier_availability in ('both', 'community_only', 'full_only')),
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- LESSONS
create table if not exists public.lessons (
  id               serial primary key,
  module_id        int  not null references public.modules(id) on delete cascade,
  title            text not null,
  description      text not null default '',
  video_url        text not null default '',
  notes_content    text,
  action_items     jsonb,
  "order"          int  not null,
  duration_minutes int  not null default 10,
  thumbnail_url    text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  unique(module_id, "order")
);

-- PROGRESS
create table if not exists public.progress (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid not null references public.users(id) on delete cascade,
  lesson_id           int  not null references public.lessons(id) on delete cascade,
  completed           boolean not null default false,
  completed_at        timestamptz,
  time_spent_seconds  int,
  notes               text,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),
  unique(user_id, lesson_id)
);

-- RESOURCES
create table if not exists public.resources (
  id                serial primary key,
  title             text not null,
  description       text not null default '',
  file_url          text not null,
  category          text not null,
  module_id         int references public.modules(id) on delete set null,
  download_count    int  not null default 0,
  tier_availability text not null default 'both' check (tier_availability in ('both', 'community_only', 'full_only')),
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- ACCOUNTABILITY GOALS
create table if not exists public.accountability_goals (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references public.users(id) on delete cascade,
  pillar          text not null check (pillar in ('mind', 'body', 'mission')),
  goal_text       text not null,
  is_completed    boolean not null default false,
  week_start_date date not null,
  created_at      timestamptz not null default now()
);

-- WEEKLY PROGRESS
create table if not exists public.weekly_progress (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid not null references public.users(id) on delete cascade,
  week_start_date     date not null,
  mind_completed      int     not null default 0,
  mind_total          int     not null default 0,
  body_completed      int     not null default 0,
  body_total          int     not null default 0,
  mission_completed   int     not null default 0,
  mission_total       int     not null default 0,
  overall_percentage  decimal not null default 0,
  streak_weeks        int     not null default 0,
  created_at          timestamptz not null default now(),
  unique(user_id, week_start_date)
);

-- COMMUNITY POSTS
create table if not exists public.community_posts (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references public.users(id) on delete cascade,
  content      text not null,
  post_type    text not null default 'general' check (post_type in ('general', 'win', 'question', 'accountability')),
  likes_count  int  not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ============================================================
-- INDEXES
-- ============================================================

create index if not exists idx_lessons_module_id       on public.lessons(module_id);
create index if not exists idx_lessons_order           on public.lessons("order");
create index if not exists idx_progress_user_id        on public.progress(user_id);
create index if not exists idx_progress_lesson_id      on public.progress(lesson_id);
create index if not exists idx_progress_completed      on public.progress(completed);
create index if not exists idx_resources_module_id     on public.resources(module_id);
create index if not exists idx_resources_category      on public.resources(category);
create index if not exists idx_acct_goals_user_week    on public.accountability_goals(user_id, week_start_date);
create index if not exists idx_weekly_progress_user    on public.weekly_progress(user_id);
create index if not exists idx_community_posts_user    on public.community_posts(user_id);
create index if not exists idx_community_posts_created on public.community_posts(created_at desc);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.users               enable row level security;
alter table public.modules             enable row level security;
alter table public.lessons             enable row level security;
alter table public.progress            enable row level security;
alter table public.resources           enable row level security;
alter table public.accountability_goals enable row level security;
alter table public.weekly_progress     enable row level security;
alter table public.community_posts     enable row level security;

-- ============================================================
-- HELPER FUNCTION
-- ============================================================

create or replace function public.is_admin()
returns boolean
language sql security definer stable
as $$
  select exists (
    select 1 from public.users
    where id = auth.uid() and role = 'admin'
  );
$$;

-- ============================================================
-- RLS POLICIES
-- Drop existing policies first so this script is re-runnable
-- ============================================================

-- USERS
drop policy if exists "Users can read own profile"    on public.users;
drop policy if exists "Users can update own profile"  on public.users;
drop policy if exists "Admins can insert users"       on public.users;
drop policy if exists "Admins can delete users"       on public.users;

create policy "Users can read own profile"   on public.users for select using (auth.uid() = id or public.is_admin());
create policy "Users can update own profile" on public.users for update using (auth.uid() = id);
create policy "Admins can insert users"      on public.users for insert with check (auth.uid() = id or public.is_admin());
create policy "Admins can delete users"      on public.users for delete using (public.is_admin());

-- MODULES
drop policy if exists "Authenticated users can read modules" on public.modules;
drop policy if exists "Admins can manage modules"           on public.modules;

create policy "Authenticated users can read modules" on public.modules for select using (auth.role() = 'authenticated');
create policy "Admins can manage modules"            on public.modules for all   using (public.is_admin());

-- LESSONS
drop policy if exists "Authenticated users can read lessons" on public.lessons;
drop policy if exists "Admins can manage lessons"            on public.lessons;

create policy "Authenticated users can read lessons" on public.lessons for select using (auth.role() = 'authenticated');
create policy "Admins can manage lessons"            on public.lessons for all   using (public.is_admin());

-- PROGRESS
drop policy if exists "Users can read own progress"   on public.progress;
drop policy if exists "Users can insert own progress" on public.progress;
drop policy if exists "Users can update own progress" on public.progress;

create policy "Users can read own progress"   on public.progress for select using (auth.uid() = user_id or public.is_admin());
create policy "Users can insert own progress" on public.progress for insert with check (auth.uid() = user_id);
create policy "Users can update own progress" on public.progress for update using (auth.uid() = user_id);

-- RESOURCES
drop policy if exists "Authenticated users can read resources" on public.resources;
drop policy if exists "Admins can manage resources"            on public.resources;

create policy "Authenticated users can read resources" on public.resources for select using (auth.role() = 'authenticated');
create policy "Admins can manage resources"            on public.resources for all   using (public.is_admin());

-- ACCOUNTABILITY GOALS
drop policy if exists "Users can manage own goals" on public.accountability_goals;

create policy "Users can manage own goals" on public.accountability_goals for all using (auth.uid() = user_id or public.is_admin());

-- WEEKLY PROGRESS
drop policy if exists "Users can manage own weekly progress" on public.weekly_progress;

create policy "Users can manage own weekly progress" on public.weekly_progress for all using (auth.uid() = user_id or public.is_admin());

-- COMMUNITY POSTS
drop policy if exists "Authenticated users can read posts" on public.community_posts;
drop policy if exists "Users can manage own posts"         on public.community_posts;

create policy "Authenticated users can read posts" on public.community_posts for select using (auth.role() = 'authenticated');
create policy "Users can manage own posts"         on public.community_posts for all   using (auth.uid() = user_id or public.is_admin());

-- ============================================================
-- TRIGGER: auto-insert into public.users on auth signup
-- ============================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql security definer
as $$
begin
  insert into public.users (id, email, name, role, tier, status)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    'student',
    'community',
    'active'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- VERIFY
-- ============================================================

select
  (select count(*) from information_schema.tables where table_schema = 'public') as tables_created;
