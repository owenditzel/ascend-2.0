import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/config/supabase'
import type { AccountabilityGoal, WeeklyProgress } from '@/types'
import { getWeekStart } from '@/lib/utils'

export function useAccountability(userId: string | undefined, weekStartDate: string) {
  const [goals, setGoals] = useState<AccountabilityGoal[]>([])
  const [weeklyProgress, setWeeklyProgress] = useState<WeeklyProgress | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchGoals = useCallback(async () => {
    if (!userId) { setLoading(false); return }
    const { data } = await supabase
      .from('accountability_goals')
      .select('*')
      .eq('user_id', userId)
      .eq('week_start_date', weekStartDate)
      .order('created_at')
    setGoals(data || [])
    setLoading(false)
  }, [userId, weekStartDate])

  const fetchWeeklyProgress = useCallback(async () => {
    if (!userId) return
    const { data } = await supabase
      .from('weekly_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('week_start_date', weekStartDate)
      .single()
    setWeeklyProgress(data)
  }, [userId, weekStartDate])

  useEffect(() => {
    fetchGoals()
    fetchWeeklyProgress()
  }, [fetchGoals, fetchWeeklyProgress])

  async function recalcProgress(updatedGoals: AccountabilityGoal[]) {
    if (!userId) return
    const byPillar = (p: AccountabilityGoal['pillar']) => updatedGoals.filter(g => g.pillar === p)
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

    const { data: existing } = await supabase
      .from('weekly_progress')
      .select('streak_weeks')
      .eq('user_id', userId)
      .eq('week_start_date', weekStartDate)
      .single()

    const prevWeek = new Date(weekStartDate)
    prevWeek.setDate(prevWeek.getDate() - 7)
    const prevWeekStr = prevWeek.toISOString().split('T')[0]
    const { data: prevProgress } = await supabase
      .from('weekly_progress')
      .select('streak_weeks, overall_percentage')
      .eq('user_id', userId)
      .eq('week_start_date', prevWeekStr)
      .single()

    let streakWeeks = existing?.streak_weeks ?? 0
    if (overallPct === 100) {
      const prevStreak = prevProgress?.streak_weeks ?? 0
      const prevComplete = (prevProgress?.overall_percentage ?? 0) >= 100
      streakWeeks = prevComplete ? prevStreak + 1 : 1
    }

    const record = {
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
    }

    const { data } = await supabase
      .from('weekly_progress')
      .upsert(record, { onConflict: 'user_id,week_start_date' })
      .select()
      .single()
    if (data) setWeeklyProgress(data)
  }

  async function addGoal(pillar: AccountabilityGoal['pillar'], goalText: string) {
    if (!userId || !goalText.trim()) return
    const { data } = await supabase
      .from('accountability_goals')
      .insert({ user_id: userId, pillar, goal_text: goalText.trim(), week_start_date: weekStartDate })
      .select()
      .single()
    if (data) {
      const updated = [...goals, data]
      setGoals(updated)
      await recalcProgress(updated)
    }
  }

  async function toggleGoal(goalId: string) {
    const goal = goals.find(g => g.id === goalId)
    if (!goal) return
    const newVal = !goal.is_completed
    setGoals(prev => prev.map(g => g.id === goalId ? { ...g, is_completed: newVal } : g))
    await supabase
      .from('accountability_goals')
      .update({ is_completed: newVal })
      .eq('id', goalId)
    const updated = goals.map(g => g.id === goalId ? { ...g, is_completed: newVal } : g)
    await recalcProgress(updated)
  }

  async function updateGoalText(goalId: string, text: string) {
    if (!text.trim()) return
    await supabase.from('accountability_goals').update({ goal_text: text.trim() }).eq('id', goalId)
    setGoals(prev => prev.map(g => g.id === goalId ? { ...g, goal_text: text.trim() } : g))
  }

  async function deleteGoal(goalId: string) {
    await supabase.from('accountability_goals').delete().eq('id', goalId)
    const updated = goals.filter(g => g.id !== goalId)
    setGoals(updated)
    await recalcProgress(updated)
  }

  return { goals, weeklyProgress, loading, addGoal, toggleGoal, updateGoalText, deleteGoal, refetch: fetchGoals }
}

export function useWeeklyHistory(userId: string | undefined) {
  const [history, setHistory] = useState<WeeklyProgress[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) { setLoading(false); return }
    supabase
      .from('weekly_progress')
      .select('*')
      .eq('user_id', userId)
      .order('week_start_date', { ascending: false })
      .limit(12)
      .then(({ data }) => {
        setHistory(data || [])
        setLoading(false)
      })
  }, [userId])

  return { history, loading }
}

export function useLeaderboard(timePeriod: 'this_week' | 'last_week' | 'all_time') {
  const [entries, setEntries] = useState<{
    user_id: string
    name: string
    overall_percentage: number
    mind_percentage: number
    body_percentage: number
    mission_percentage: number
    streak_weeks: number
  }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      const today = new Date()
      const thisMonday = getWeekStart(today)
      const lastMonday = new Date(thisMonday)
      lastMonday.setDate(lastMonday.getDate() - 7)

      let query = supabase
        .from('weekly_progress')
        .select('user_id, overall_percentage, mind_completed, mind_total, body_completed, body_total, mission_completed, mission_total, streak_weeks')

      if (timePeriod === 'this_week') {
        query = query.eq('week_start_date', thisMonday)
      } else if (timePeriod === 'last_week') {
        query = query.eq('week_start_date', lastMonday.toISOString().split('T')[0])
      }

      const { data: progressData } = await query.order('overall_percentage', { ascending: false }).limit(50)
      const { data: usersData } = await supabase.from('users').select('id, name')

      if (!progressData || !usersData) { setLoading(false); return }

      const userMap = Object.fromEntries(usersData.map(u => [u.id, u.name]))

      // For all_time, aggregate per user: average overall_percentage
      let aggregated = progressData
      if (timePeriod === 'all_time') {
        const byUser: Record<string, typeof progressData> = {}
        progressData.forEach(p => {
          if (!byUser[p.user_id]) byUser[p.user_id] = []
          byUser[p.user_id].push(p)
        })
        aggregated = Object.entries(byUser).map(([uid, records]) => ({
          user_id: uid,
          overall_percentage: Math.round(records.reduce((s, r) => s + r.overall_percentage, 0) / records.length),
          mind_completed: records.reduce((s, r) => s + r.mind_completed, 0),
          mind_total: records.reduce((s, r) => s + r.mind_total, 0),
          body_completed: records.reduce((s, r) => s + r.body_completed, 0),
          body_total: records.reduce((s, r) => s + r.body_total, 0),
          mission_completed: records.reduce((s, r) => s + r.mission_completed, 0),
          mission_total: records.reduce((s, r) => s + r.mission_total, 0),
          streak_weeks: Math.max(...records.map(r => r.streak_weeks)),
        }))
        aggregated.sort((a, b) => b.overall_percentage - a.overall_percentage)
      }

      const result = aggregated.map(p => ({
        user_id: p.user_id,
        name: userMap[p.user_id] || 'Unknown',
        overall_percentage: p.overall_percentage,
        mind_percentage: p.mind_total > 0 ? Math.round((p.mind_completed / p.mind_total) * 100) : 0,
        body_percentage: p.body_total > 0 ? Math.round((p.body_completed / p.body_total) * 100) : 0,
        mission_percentage: p.mission_total > 0 ? Math.round((p.mission_completed / p.mission_total) * 100) : 0,
        streak_weeks: p.streak_weeks,
      }))

      setEntries(result)
      setLoading(false)
    }
    load()
  }, [timePeriod])

  return { entries, loading }
}
