# Ascend 2.0 Dashboard

Private SaaS course dashboard for ex-athletes learning to monetize their skills.

## Setup

### 1. Clone & install
```
npm install
```

### 2. Create a Supabase project
1. Go to [supabase.com](https://supabase.com) → New project
2. Copy your **Project URL** and **anon public** key

### 3. Configure environment
```
cp .env.example .env
```
Fill in your Supabase URL and anon key.

### 4. Run the schema
In Supabase Dashboard → SQL Editor → New query, paste and run:
1. `supabase/schema.sql` (creates tables + RLS + auth trigger)
2. `supabase/seed.sql` (seeds all 14 modules, 25+ lessons, 20 resources)

### 5. Enable Email Auth
In Supabase Dashboard → Authentication → Providers → Email: Enable it.

### 6. Create Owen's admin account
In Supabase Dashboard → Authentication → Users → Add user:
- Email: `owen@ascendperformance.com`
- Password: (your choice)

Then in SQL Editor:
```sql
update public.users set role = 'admin', tier = 'full' where email = 'owen@ascendperformance.com';
```

### 7. Run dev server
```
npm run dev
```

## Deploy to Vercel
1. Push to GitHub
2. Import to Vercel
3. Add environment variables: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
4. Deploy

## Routes
| Path | Description |
|------|-------------|
| `/` | Landing page |
| `/login` | Sign in |
| `/signup` | Create account |
| `/dashboard` | Student home |
| `/modules` | Curriculum |
| `/modules/:id` | Module detail |
| `/modules/:id/lessons/:lessonId` | Lesson player |
| `/resources` | Resource library |
| `/accountability` | Weekly goals |
| `/leaderboard` | Cohort rankings |
| `/community` | Community links |
| `/profile` | Account settings |
| `/admin` | Admin dashboard (admin only) |
