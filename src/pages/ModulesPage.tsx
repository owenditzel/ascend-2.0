import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { useModules } from '@/hooks/useModules'
import { useProgress } from '@/hooks/useProgress'
import { Card, CardContent } from '@/components/ui/card'
import { CardSkeleton } from '@/components/ui/skeleton'
import { ProgressBar } from '@/components/ui/progress-bar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BookOpen, CheckCircle, Lock, Play } from 'lucide-react'
import { formatDuration } from '@/lib/utils'

type FilterType = 'all' | 'in_progress' | 'completed' | 'not_started'

export default function ModulesPage() {
  const { user } = useAuth()
  const { modules, loading } = useModules()
  const { completedLessonIds } = useProgress(user?.id)
  const [filter, setFilter] = useState<FilterType>('all')

  const isFull = user?.tier === 'full'

  const enriched = modules.map(m => {
    const lessons = m.lessons || []
    const done = lessons.filter(l => completedLessonIds.has(l.id)).length
    const pct = lessons.length > 0 ? Math.round((done / lessons.length) * 100) : 0
    const isLocked = !isFull && m.order <= 8
    let status: 'not_started' | 'in_progress' | 'completed' = 'not_started'
    if (pct === 100) status = 'completed'
    else if (done > 0) status = 'in_progress'
    const totalMins = lessons.reduce((acc, l) => acc + l.duration_minutes, 0)
    return { ...m, done, pct, isLocked, status, totalMins, lessonCount: lessons.length }
  })

  const filtered = enriched.filter(m => {
    if (filter === 'all') return true
    return m.status === filter
  })

  const courseModules = filtered.filter(m => m.order <= 8)
  const mindsetModules = filtered.filter(m => m.order > 8)

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'in_progress', label: 'In Progress' },
    { key: 'completed', label: 'Completed' },
    { key: 'not_started', label: 'Not Started' },
  ]

  function ModuleCard({ m }: { m: typeof enriched[0] }) {
    return (
      <Link to={m.isLocked ? '/upgrade' : `/modules/${m.id}`}>
        <Card className={`h-full transition-all duration-200 cursor-pointer group ${m.isLocked ? 'opacity-60' : 'hover:border-[#C64E3A]/50 hover:-translate-y-0.5'}`}>
          <CardContent className="pt-5 pb-5 h-full flex flex-col">
            {/* Module header */}
            <div className="flex items-start gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${m.pct === 100 ? 'bg-green-500/15' : 'bg-[#C64E3A]/10'}`}>
                {m.isLocked ? (
                  <Lock className="w-4 h-4 text-[#444]" />
                ) : m.pct === 100 ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <BookOpen className="w-5 h-5 text-[#C64E3A]" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <span className="text-[#555] text-[10px] uppercase tracking-wider">
                    {m.order <= 8 ? `Course · Module ${m.order}` : `Mindset · Module ${m.order - 8}`}
                  </span>
                </div>
                <h3 className="text-[#F5F1ED] font-semibold text-sm leading-tight">{m.title}</h3>
              </div>
            </div>

            {/* Description */}
            <p className="text-[#666] text-xs mb-4 line-clamp-2 flex-1">{m.description}</p>

            {/* Meta */}
            <div className="flex items-center gap-3 mb-3 text-[#444] text-xs">
              <span>{m.lessonCount} lessons</span>
              {m.totalMins > 0 && <span>{formatDuration(m.totalMins)}</span>}
              <span className="ml-auto flex items-center gap-1.5">
                {m.status === 'completed' && <Badge variant="success">Complete</Badge>}
                {m.status === 'in_progress' && <Badge variant="orange">In Progress</Badge>}
                {m.status === 'not_started' && !m.isLocked && <Badge>Not Started</Badge>}
                {m.isLocked && <Badge variant="warning">Locked</Badge>}
              </span>
            </div>

            {/* Progress bar */}
            <div className="mb-4">
              <ProgressBar value={m.pct} color={m.pct === 100 ? '#10B981' : '#C64E3A'} />
              {m.done > 0 && (
                <p className="text-[#3A3A3A] text-[10px] mt-1">{m.done}/{m.lessonCount} done</p>
              )}
            </div>

            {/* CTA */}
            {!m.isLocked && (
              <Button
                size="sm"
                variant={m.status === 'in_progress' ? 'primary' : 'secondary'}
                className="w-full group-hover:opacity-100"
              >
                {m.status === 'not_started' ? (
                  <><Play className="w-3.5 h-3.5 mr-1.5" />Start Module</>
                ) : m.status === 'in_progress' ? (
                  <><Play className="w-3.5 h-3.5 mr-1.5" />Continue</>
                ) : (
                  <><CheckCircle className="w-3.5 h-3.5 mr-1.5" />Review</>
                )}
              </Button>
            )}
            {m.isLocked && (
              <Button size="sm" variant="ghost" className="w-full text-[#C64E3A]">
                <Lock className="w-3.5 h-3.5 mr-1.5" />Upgrade to Unlock
              </Button>
            )}
          </CardContent>
        </Card>
      </Link>
    )
  }

  return (
    <div className="p-4 sm:p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#F5F1ED] mb-2">Your Learning Path</h1>
        <p className="text-[#666] text-sm">
          {isFull ? '14 modules total — 8 course + 6 mindset.' : '6 mindset modules included. Upgrade to unlock 8 course modules.'}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${filter === f.key ? 'bg-[#C64E3A] text-white' : 'bg-[#111] border border-[#2D2D2D] text-[#666] hover:text-[#F5F1ED]'}`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : (
        <>
          {/* Course modules (full tier or locked for community) */}
          {(courseModules.length > 0 || filter === 'all') && (
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-[#F5F1ED] font-semibold">Course Modules</h2>
                {!isFull && (
                  <Link to="/upgrade">
                    <Badge variant="orange">Upgrade to Unlock</Badge>
                  </Link>
                )}
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(filter === 'all' ? enriched.filter(m => m.order <= 8) : courseModules).map(m => (
                  <ModuleCard key={m.id} m={m} />
                ))}
              </div>
            </div>
          )}

          {/* Mindset modules */}
          {(mindsetModules.length > 0 || filter === 'all') && (
            <div>
              <h2 className="text-[#F5F1ED] font-semibold mb-4">Mindset Track</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(filter === 'all' ? enriched.filter(m => m.order > 8) : mindsetModules).map(m => (
                  <ModuleCard key={m.id} m={m} />
                ))}
              </div>
            </div>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[#444] text-sm">No modules match this filter.</p>
              <button onClick={() => setFilter('all')} className="text-[#C64E3A] text-sm mt-2 hover:underline">Show all</button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
