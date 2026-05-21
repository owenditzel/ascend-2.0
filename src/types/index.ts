export interface User {
  id: string
  email: string
  name: string
  avatar_url?: string
  role: 'student' | 'admin'
  tier: 'community' | 'full'
  subscription_status?: 'active' | 'cancelled' | 'past_due'
  subscription_start_date?: string
  cohort_start_date?: string
  current_module_id?: number
  current_lesson_id?: number
  status: 'active' | 'paused' | 'completed' | 'dropped'
  created_at: string
  updated_at: string
  last_login_at?: string
}

export interface Module {
  id: number
  title: string
  description: string
  order: number
  thumbnail_url?: string
  learning_outcomes?: string[]
  is_locked: boolean
  tier_availability: 'both' | 'community_only' | 'full_only'
  created_at: string
  updated_at: string
  lessons?: Lesson[]
}

export interface Lesson {
  id: number
  module_id: number
  title: string
  description: string
  video_url: string
  notes_content?: string
  action_items?: { id: string; text: string }[]
  resources_ids?: number[]
  order: number
  duration_minutes: number
  created_at: string
  updated_at: string
}

export interface Progress {
  id: string
  user_id: string
  lesson_id: number
  completed: boolean
  completed_at?: string
  time_spent_seconds?: number
  notes?: string
  created_at: string
  updated_at: string
}

export interface Resource {
  id: number
  title: string
  description: string
  file_url: string
  category: string
  module_id?: number
  download_count: number
  tier_availability: 'both' | 'community_only' | 'full_only'
  created_at: string
  updated_at: string
}

export interface AccountabilityGoal {
  id: string
  user_id: string
  pillar: 'mind' | 'body' | 'mission'
  goal_text: string
  is_completed: boolean
  week_start_date: string
  created_at: string
}

export interface WeeklyProgress {
  id: string
  user_id: string
  week_start_date: string
  mind_completed: number
  mind_total: number
  body_completed: number
  body_total: number
  mission_completed: number
  mission_total: number
  overall_percentage: number
  streak_weeks: number
  created_at: string
}
