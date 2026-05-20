-- ============================================================
-- ASCEND 2.0 DATABASE SCHEMA
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New query)
-- ============================================================

-- USERS TABLE
create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text not null,
  avatar_url text,
  role text not null default 'student' check (role in ('student', 'admin')),
  tier text not null default 'community' check (tier in ('community', 'full')),
  subscription_status text check (subscription_status in ('active', 'cancelled', 'past_due')),
  subscription_start_date date,
  cohort_start_date date default now(),
  current_module_id int,
  current_lesson_id int,
  status text not null default 'active' check (status in ('active', 'paused', 'completed', 'dropped')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  last_login_at timestamptz
);

-- MODULES TABLE
create table if not exists public.modules (
  id serial primary key,
  title text not null,
  description text not null,
  "order" int not null unique,
  thumbnail_url text,
  learning_outcomes jsonb,
  is_locked boolean not null default false,
  tier_availability text not null default 'both' check (tier_availability in ('both', 'community_only', 'full_only')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- LESSONS TABLE
create table if not exists public.lessons (
  id serial primary key,
  module_id int not null references public.modules(id) on delete cascade,
  title text not null,
  description text not null,
  video_url text not null default '',
  notes_content text,
  action_items jsonb,
  resources_ids int[],
  "order" int not null,
  duration_minutes int not null default 10,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- PROGRESS TABLE
create table if not exists public.progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  lesson_id int not null references public.lessons(id) on delete cascade,
  completed boolean not null default false,
  completed_at timestamptz,
  time_spent_seconds int,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, lesson_id)
);

-- RESOURCES TABLE
create table if not exists public.resources (
  id serial primary key,
  title text not null,
  description text not null,
  file_url text not null,
  category text not null,
  module_id int references public.modules(id) on delete set null,
  download_count int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ACCOUNTABILITY GOALS TABLE
create table if not exists public.accountability_goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  pillar text not null check (pillar in ('mind', 'body', 'mission')),
  goal_text text not null,
  is_completed boolean not null default false,
  week_start_date date not null,
  created_at timestamptz not null default now()
);

-- WEEKLY PROGRESS TABLE
create table if not exists public.weekly_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  week_start_date date not null,
  mind_completed int not null default 0,
  mind_total int not null default 0,
  body_completed int not null default 0,
  body_total int not null default 0,
  mission_completed int not null default 0,
  mission_total int not null default 0,
  overall_percentage decimal not null default 0,
  streak_weeks int not null default 0,
  created_at timestamptz not null default now(),
  unique(user_id, week_start_date)
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.users enable row level security;
alter table public.modules enable row level security;
alter table public.lessons enable row level security;
alter table public.progress enable row level security;
alter table public.resources enable row level security;
alter table public.accountability_goals enable row level security;
alter table public.weekly_progress enable row level security;

-- Helper function: is the current user an admin?
create or replace function public.is_admin()
returns boolean
language sql security definer
as $$
  select exists (
    select 1 from public.users
    where id = auth.uid() and role = 'admin'
  );
$$;

-- USERS policies
create policy "Users can read own profile" on public.users
  for select using (auth.uid() = id or public.is_admin());
create policy "Users can update own profile" on public.users
  for update using (auth.uid() = id);
create policy "Admins can insert users" on public.users
  for insert with check (public.is_admin() or auth.uid() = id);
create policy "Admins can delete users" on public.users
  for delete using (public.is_admin());

-- MODULES policies (public read for authenticated users)
create policy "Authenticated users can read modules" on public.modules
  for select using (auth.role() = 'authenticated');
create policy "Admins can manage modules" on public.modules
  for all using (public.is_admin());

-- LESSONS policies
create policy "Authenticated users can read lessons" on public.lessons
  for select using (auth.role() = 'authenticated');
create policy "Admins can manage lessons" on public.lessons
  for all using (public.is_admin());

-- PROGRESS policies
create policy "Users can read own progress" on public.progress
  for select using (auth.uid() = user_id or public.is_admin());
create policy "Users can insert own progress" on public.progress
  for insert with check (auth.uid() = user_id);
create policy "Users can update own progress" on public.progress
  for update using (auth.uid() = user_id);

-- RESOURCES policies
create policy "Authenticated users can read resources" on public.resources
  for select using (auth.role() = 'authenticated');
create policy "Admins can manage resources" on public.resources
  for all using (public.is_admin());

-- ACCOUNTABILITY GOALS policies
create policy "Users can manage own goals" on public.accountability_goals
  for all using (auth.uid() = user_id or public.is_admin());

-- WEEKLY PROGRESS policies
create policy "Users can manage own weekly progress" on public.weekly_progress
  for all using (auth.uid() = user_id or public.is_admin());

-- ============================================================
-- TRIGGER: auto-create user record on signup
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
