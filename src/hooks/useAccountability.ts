import { useState, useEffect, useCallback } from 'react'
import type { AccountabilityGoal, WeeklyProgress } from '@/types'

const GOALS_KEY = (userId: string, weekStartDate: string) =>
  `ascend_goals_${userId}_${weekStartDate}`
const WEEKLY_KEY = (userId: string) => `ascend_weekly_${userId}`

function calcWeeklyProgress(
  userId: string,
  weekStartDate: string,
  goals: AccountabilityGoal[],
  existingWeekly: WeeklyProgress[]
): WeeklyProgress {
  const byPillar = (p: AccountabilityGoal['pillar']) => goals.filter(g => g.pillar === p)
  const calc = (p: AccountabilityGoal['pillar']) => {
    const gs = byPillar(p)
    return { total: gs.length, completed: gs.filter(g => g.is_completed).length }
  }
  const mind = calc('mind')
  const body = calc('body')
  const mission = calc('mission')
  const totalGoals = mind.total + body.total + mission.total
  const totalDone = mind.completed + body.completed + mission.completed
  const overallPct = totalGoals > 0 ? Math.round((totalDone / totalGoals) * 100) : 0

  const existing = existingWeekly.find(w => w.week_start_date === weekStartDate)

  const prevWeek = new Date(weekStartDate)
  prevWeek.setDate(prevWeek.getDate() - 7)
  const prevWeekStr = prevWeek.toISOString().split('T')[0]
  const prevProgress = existingWeekly.find(w => w.week_start_date === prevWeekStr)

  let streakWeeks = existing?.streak_weeks ?? 0
  if (overallPct === 100) {
    const prevStreak = prevProgress?.streak_weeks ?? 0
    const prevComplete = (prevProgress?.overall_percentage ?? 0) >= 100
    streakWeeks = prevComplete ? prevStreak + 1 : 1
  }

  return {
    id: existing?.id ?? `weekly-${userId}-${weekStartDate}`,
    user_id: userId,
    week_start_date: weekStartDate,
    mind_completed: mind.completed,
    mind_total: mind.total,
    body_completed: body.completed,
    body_total: body.total,
    mission_completed: mission.completed,
    mission_total: mission.total,
    overall_percentage: overallPct,
    streak_weeks: streakWeeks,
    created_at: existing?.created_at ?? new Date().toISOString(),
  }
}

export function useAccountability(userId: string | undefined, weekStartDate: string) {
  const [goals, setGoals] = useState<AccountabilityGoal[]>([])
  const [weeklyProgress, setWeeklyProgress] = useState<WeeklyProgress | null>(null)
  const [loading, setLoading] = useState(true)

  const loadData = useCallback(() => {
    if (!userId) { setLoading(false); return }

    try {
      const storedGoals = localStorage.getItem(GOALS_KEY(userId, weekStartDate))
      const loadedGoals: AccountabilityGoal[] = storedGoals ? JSON.parse(storedGoals) : []
      setGoals(loadedGoals)

      const storedWeekly = localStorage.getItem(WEEKLY_KEY(userId))
      const allWeekly: WeeklyProgress[] = storedWeekly ? JSON.parse(storedWeekly) : []
      const wp = calcWeeklyProgress(userId, weekStartDate, loadedGoals, allWeekly)
      setWeeklyProgress(wp)
    } catch {}

    setLoading(false)
  }, [userId, weekStartDate])

  useEffect(() => {
    loadData()
  }, [loadData])

  function saveGoals(userId: string, updated: AccountabilityGoal[]) {
    localStorage.setItem(GOALS_KEY(userId, weekStartDate), JSON.stringify(updated))

    const storedWeekly = localStorage.getItem(WEEKLY_KEY(userId))
    const allWeekly: WeeklyProgress[] = storedWeekly ? JSON.parse(storedWeekly) : []
    const wp = calcWeeklyProgress(userId, weekStartDate, updated, allWeekly)

    const nextWeekly = allWeekly.filter(w => w.week_start_date !== weekStartDate)
    nextWeekly.push(wp)
    localStorage.setItem(WEEKLY_KEY(userId), JSON.stringify(nextWeekly))
    setWeeklyProgress(wp)
  }

  function addGoal(pillar: AccountabilityGoal['pillar'], goalText: string) {
    if (!userId || !goalText.trim()) return
    const newGoal: AccountabilityGoal = {
      id: Date.now().toString(),
      user_id: userId,
      pillar,
      goal_text: goalText.trim(),
      is_completed: false,
      week_start_date: weekStartDate,
      created_at: new Date().toISOString(),
    }
    const updated = [...goals, newGoal]
    setGoals(updated)
    saveGoals(userId, updated)
  }

  function toggleGoal(goalId: string) {
    if (!userId) return
    const updated = goals.map(g =>
      g.id === goalId ? { ...g, is_completed: !g.is_completed } : g
    )
    setGoals(updated)
    saveGoals(userId, updated)
  }

  function updateGoal(goalId: string, text: string) {
    if (!userId || !text.trim()) return
    const updated = goals.map(g =>
      g.id === goalId ? { ...g, goal_text: text.trim() } : g
    )
    setGoals(updated)
    saveGoals(userId, updated)
  }

  function deleteGoal(goalId: string) {
    if (!userId) return
    const updated = goals.filter(g => g.id !== goalId)
    setGoals(updated)
    saveGoals(userId, updated)
  }

  return { goals, weeklyProgress, loading, addGoal, toggleGoal, updateGoal, updateGoalText: updateGoal, deleteGoal, refetch: loadData }
}

export function useWeeklyHistory(userId: string | undefined) {
  const [history, setHistory] = useState<WeeklyProgress[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) { setLoading(false); return }
    try {
      const stored = localStorage.getItem(`ascend_weekly_${userId}`)
      const all: WeeklyProgress[] = stored ? JSON.parse(stored) : []
      const sorted = [...all].sort((a, b) =>
        b.week_start_date.localeCompare(a.week_start_date)
      ).slice(0, 12)
      setHistory(sorted)
    } catch {}
    setLoading(false)
  }, [userId])

  return { history, loading }
}

export interface LeaderboardEntry {
  user_id: string
  name: string
  overall_percentage: number
  mind_percentage: number
  body_percentage: number
  mission_percentage: number
  streak_weeks: number
}

export function useLeaderboard(_timePeriod: 'this_week' | 'last_week' | 'all_time') {
  return { entries: [] as LeaderboardEntry[], loading: false }
}
