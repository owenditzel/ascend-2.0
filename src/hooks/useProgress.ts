import { useState, useEffect, useCallback } from 'react'
import type { Progress } from '@/types'

const STORAGE_KEY = (userId: string) => `ascend_progress_${userId}`

export function useProgress(userId?: string) {
  const [progress, setProgress] = useState<Progress[]>([])

  useEffect(() => {
    if (!userId) return
    try {
      const stored = localStorage.getItem(STORAGE_KEY(userId))
      if (stored) setProgress(JSON.parse(stored))
    } catch {}
  }, [userId])

  const markComplete = useCallback((lessonId: number) => {
    if (!userId) return
    const now = new Date().toISOString()
    setProgress(prev => {
      const existing = prev.find(p => p.lesson_id === lessonId)
      let next: Progress[]
      if (existing) {
        next = prev.map(p =>
          p.lesson_id === lessonId
            ? { ...p, completed: true, completed_at: now, updated_at: now }
            : p
        )
      } else {
        next = [...prev, {
          id: `prog-${lessonId}`,
          user_id: userId,
          lesson_id: lessonId,
          completed: true,
          completed_at: now,
          created_at: now,
          updated_at: now,
        }]
      }
      localStorage.setItem(STORAGE_KEY(userId), JSON.stringify(next))
      return next
    })
  }, [userId])

  const completedLessonIds = new Set(progress.filter(p => p.completed).map(p => p.lesson_id))

  return { progress, completedLessonIds, markComplete, loading: false }
}
