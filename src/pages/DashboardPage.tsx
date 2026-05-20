import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { useModules } from '@/hooks/useModules'
import { useProgress } from '@/hooks/useProgress'
import { useResources } from '@/hooks/useResources'
import { Card, CardContent } from '@/components/ui/card'
import { CardSkeleton } from '@/components/ui/skeleton'
import { ProgressBar } from '@/components/ui/progress-bar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  BookOpen, CheckCircle, Lock, Play, TrendingUp,
  Clock, Download, FileText, Flame, ArrowRight
} from 'lucide-react'
import { formatDate, formatDuration } from '@/lib/utils'

export default function DashboardPage() {
  const { user } = useAuth()
  const { modules, loading: modulesLoading } = useModules()
  const { completedLessonIds, loading: progressLoading } = useProgress(user?.id)
  const { resources } = useResources()

  const loading = modulesLoading || progressLoading

  // Split modules
  const courseModules = modules.filter(m => m.order <= 8)
  const mindsetModules = modules.filter(m => m.order > 8)
  const isFull = user?.tier === 'full'

  // Stats
  const accessibleModules = isFull ? modules : mindsetModules
  const totalLessons = accessibleModules.reduce((acc, m) => acc + (m.lessons?.length || 0), 0)
  const completedCount = completedLessonIds.size
  const progressPct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0

  // Current module (first in-progress, or first not started)
  const currentModule = accessibleModules.find(m => {
    const lessons = m.lessons || []
    const done = lessons.filter(l => completedLessonIds.has(l.id)).length
    return done > 0 && done < lessons.length
  }) || accessibleModules.find(m => {
    const lessons = m.lessons || []
    return !lessons.every(l => completedLessonIds.has(l.id))
  })

  // Current lesson within that module
  const currentLesson = currentModule?.lessons?.find(l => !completedLessonIds.has(l.id))

  // Days in program
  const daysSince = user?.cohort_start_date
    ? Math.floor((Date.now() - new Date(user.cohort_start_date).getTime()) / 86400000)
    : 0

  // Next milestone: next module completion
  let msLessons = 0
  let msLabel = ''
  if (currentModule) {
    const lessons = currentModule.lessons || []
    const done = lessons.filter(l => completedLessonIds.has(l.id)).length
    msLessons = lessons.length - done
    msLabel = `${msLessons} to finish Module ${currentModule.order}`
  }

  // Popular resources (top 4)
  const featuredResources = resources.slice(0, 4)

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <div className="p-4 sm:p-8 max-w-5xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-[#555] text-sm mb-1">{today}</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#F5F1ED]">
            Welcome back, {user?.name?.split(' ')[0]} 👋
          </h1>
          {user?.cohort_start_date && (
            <p className="text-[#444] text-sm mt-1">Cohort started {formatDate(user.cohort_start_date)}</p>
          )}
        </div>
        {!isFull && (
          <Link to="/upgrade">
            <Button size="sm" variant="secondary" className="hidden sm:flex border-[#C64E3A]/40 text-[#C64E3A]">
              Upgrade to Full ↑
            </Button>
          </Link>
        )}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {[
          { icon: CheckCircle, label: 'Lessons Done', value: completedCount, sub: `of ${totalLessons}`, color: 'text-green-400' },
          { icon: TrendingUp, label: 'Progress', value: `${progressPct}%`, sub: 'completed', color: 'text-[#C64E3A]' },
          { icon: Clock, label: 'Days Active', value: daysSince, sub: 'days in program', color: 'text-blue-400' },
          { icon: Flame, label: 'Next Goal', value: msLessons || '—', sub: msLabel || 'All caught up!', color: 'text-amber-400' },
        ].map(({ icon: Icon, label, value, sub, color }) => (
          <Card key={label}>
            <CardContent className="pt-4 pb-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon className={`w-4 h-4 ${color}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-xl font-bold text-[#F5F1ED] leading-tight">{value}</p>
                  <p className="text-[#555] text-xs truncate">{label}</p>
                  <p className="text-[#3A3A3A] text-[10px] truncate">{sub}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Current module CTA */}
      {currentModule && currentLesson && (
        <div className="mb-8">
          <div className="relative bg-gradient-to-br from-[#1C0D0A] via-[#150808] to-[#0D0D0D] border border-[#C64E3A]/25 rounded-2xl p-5 sm:p-7 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C64E3A]/5 rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-[#C64E3A] rounded-full animate-pulse" />
                <span className="text-[#C64E3A] text-xs font-medium uppercase tracking-wider">Continue Learning</span>
              </div>
              <h2 className="text-[#F5F1ED] font-bold text-xl mb-1">
                Module {currentModule.order}: {currentModule.title}
              </h2>
              <p className="text-[#888] text-sm mb-4">
                Up next: <span className="text-[#F5F1ED]">{currentLesson.title}</span>
                <span className="text-[#555] ml-2">· {formatDuration(currentLesson.duration_minutes)}</span>
              </p>
              <div className="mb-4 max-w-md">
                <div className="flex justify-between text-xs text-[#555] mb-1.5">
                  <span>Module progress</span>
                  <span>{(currentModule.lessons || []).filter(l => completedLessonIds.has(l.id)).length}/{(currentModule.lessons || []).length} lessons</span>
                </div>
                <ProgressBar
                  value={(currentModule.lessons || []).filter(l => completedLessonIds.has(l.id)).length}
                  max={(currentModule.lessons || []).length || 1}
                />
              </div>
              <Link to={`/modules/${currentModule.id}/lessons/${currentLesson.id}`}>
                <Button size="lg">
                  <Play className="w-4 h-4 mr-2" />
                  Start Lesson
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Overall progress */}
      <Card className="mb-8">
        <CardContent className="pt-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[#F5F1ED] font-semibold">Overall Progress</h2>
            <span className="text-[#C64E3A] font-bold">{progressPct}%</span>
          </div>
          <ProgressBar value={progressPct} />
          <p className="text-[#444] text-xs mt-2">{completedCount} of {totalLessons} lessons completed</p>
        </CardContent>
      </Card>

      {/* Community tier: Mindset modules */}
      {!isFull && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#F5F1ED] font-semibold">Your Modules — Mindset Track</h2>
            <Link to="/modules" className="text-[#C64E3A] text-sm hover:underline">View all</Link>
          </div>
          {loading ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => <CardSkeleton key={i} />)}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {mindsetModules.map(m => {
                const lessons = m.lessons || []
                const done = lessons.filter(l => completedLessonIds.has(l.id)).length
                const pct = lessons.length > 0 ? Math.round((done / lessons.length) * 100) : 0
                return (
                  <Link key={m.id} to={`/modules/${m.id}`}>
                    <Card className="hover:border-[#C64E3A]/40 transition-all hover:-translate-y-0.5 cursor-pointer h-full">
                      <CardContent className="pt-4 pb-4">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-9 h-9 rounded-lg bg-[#1A1A1A] flex items-center justify-center flex-shrink-0">
                            {pct === 100 ? <CheckCircle className="w-4 h-4 text-green-500" /> : <BookOpen className="w-4 h-4 text-[#C64E3A]" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[#555] text-[10px] uppercase tracking-wider mb-0.5">Mindset · Module {m.order - 8}</p>
                            <h3 className="text-[#F5F1ED] font-medium text-sm leading-tight">{m.title}</h3>
                          </div>
                          {pct > 0 && <span className="text-[#C64E3A] text-xs font-medium">{pct}%</span>}
                        </div>
                        <ProgressBar value={pct} className="h-1.5" />
                        <p className="text-[#3A3A3A] text-[10px] mt-1.5">{done}/{lessons.length} lessons</p>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Community tier: Locked course modules */}
      {!isFull && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#F5F1ED] font-semibold">Course Modules — Ascend 2.0</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 mb-5">
            {courseModules.map(m => (
              <div key={m.id} className="relative">
                <Card className="opacity-50">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#1A1A1A] flex items-center justify-center flex-shrink-0">
                        <Lock className="w-4 h-4 text-[#444]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[#444] text-[10px] uppercase tracking-wider mb-0.5">Module {m.order}</p>
                        <h3 className="text-[#777] font-medium text-sm leading-tight">{m.title}</h3>
                        <p className="text-[#333] text-xs mt-1">{(m.lessons || []).length} lessons</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/60 backdrop-blur-[1px] rounded-xl border border-[#2D2D2D] px-3 py-1.5 flex items-center gap-1.5">
                    <Lock className="w-3 h-3 text-[#C64E3A]" />
                    <span className="text-[#C64E3A] text-xs font-medium">Unlock with Ascend 2.0</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Upgrade CTA */}
          <Card className="border-[#C64E3A]/30 bg-gradient-to-br from-[#1A0D0A] to-[#111]">
            <CardContent className="pt-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <div className="flex-1">
                  <h3 className="text-[#F5F1ED] font-bold text-lg mb-1">Ready to go all in?</h3>
                  <p className="text-[#999] text-sm">Upgrade to Ascend 2.0 and unlock all 8 course modules, live coaching calls, and lifetime resources. Your $150/month community tier will be credited toward your upgrade.</p>
                </div>
                <Link to="/upgrade" className="flex-shrink-0">
                  <Button size="lg">
                    View Upgrade Details <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Full tier: All modules grid */}
      {isFull && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#F5F1ED] font-semibold">All Modules</h2>
            <Link to="/modules" className="text-[#C64E3A] text-sm hover:underline">View all</Link>
          </div>
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => <CardSkeleton key={i} />)}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {modules.map(m => {
                const lessons = m.lessons || []
                const done = lessons.filter(l => completedLessonIds.has(l.id)).length
                const pct = lessons.length > 0 ? Math.round((done / lessons.length) * 100) : 0
                return (
                  <Link key={m.id} to={`/modules/${m.id}`}>
                    <Card className="hover:border-[#C64E3A]/40 transition-all hover:-translate-y-0.5 cursor-pointer h-full">
                      <CardContent className="pt-4 pb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[#444] text-[10px] uppercase tracking-wider">Module {m.order}</span>
                          {pct === 100 && <Badge variant="success" className="text-[10px] px-1.5 py-0">Done</Badge>}
                          {pct > 0 && pct < 100 && <Badge variant="orange" className="text-[10px] px-1.5 py-0">In Progress</Badge>}
                        </div>
                        <h3 className="text-[#F5F1ED] font-medium text-sm mb-2 leading-tight">{m.title}</h3>
                        <ProgressBar value={pct} className="h-1.5 mb-1.5" />
                        <p className="text-[#3A3A3A] text-[10px]">{done}/{lessons.length} lessons</p>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Resources */}
      {featuredResources.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#F5F1ED] font-semibold">Popular Resources</h2>
            <Link to="/resources" className="text-[#C64E3A] text-sm hover:underline">View all</Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {featuredResources.map(r => (
              <Link key={r.id} to="/resources">
                <Card className="hover:border-[#C64E3A]/40 transition-all cursor-pointer">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#1A1A1A] rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="w-4 h-4 text-[#C64E3A]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[#F5F1ED] text-sm font-medium truncate">{r.title}</p>
                        <p className="text-[#555] text-xs">{r.category}</p>
                      </div>
                      <Download className="w-4 h-4 text-[#444]" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
