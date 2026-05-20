import { useEffect, useState } from 'react'
import { supabase } from '@/config/supabase'
import type { Progress } from '@/types'

export function useProgress(userId: string | undefined) {
  const [progress, setProgress] = useState<Progress[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) { setLoading(false); return }
    supabase
      .from('progress')
      .select('*')
      .eq('user_id', userId)
      .then(({ data }) => {
        setProgress(data || [])
        setLoading(false)
      })
  }, [userId])

  async function markComplete(lessonId: number) {
    if (!userId) return
    const existing = progress.find(p => p.lesson_id === lessonId)
    if (existing) {
      const { data } = await supabase
        .from('progress')
        .update({ completed: true, completed_at: new Date().toISOString() })
        .eq('id', existing.id)
        .select()
        .single()
      if (data) setProgress(prev => prev.map(p => p.id === data.id ? data : p))
    } else {
      const { data } = await supabase
        .from('progress')
        .insert({ user_id: userId, lesson_id: lessonId, completed: true, completed_at: new Date().toISOString() })
        .select()
        .single()
      if (data) setProgress(prev => [...prev, data])
    }
  }

  const completedLessonIds = new Set(progress.filter(p => p.completed).map(p => p.lesson_id))

  return { progress, loading, markComplete, completedLessonIds }
}
