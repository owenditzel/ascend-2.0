import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useModule } from '@/hooks/useModules'
import { useModules } from '@/hooks/useModules'
import { useProgress } from '@/hooks/useProgress'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ProgressBar } from '@/components/ui/progress-bar'
import { Button } from '@/components/ui/button'
import {
  CheckCircle, Play, Clock, ArrowLeft, ArrowRight,
  ChevronDown, ChevronUp
} from 'lucide-react'
import { formatDuration } from '@/lib/utils'

export default function ModuleDetailPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const { module, loading } = useModule(Number(id))
  const { modules } = useModules()
  const { completedLessonIds } = useProgress(user?.id)
  const [outcomesOpen, setOutcomesOpen] = useState(true)

  if (loading) {
    return (
      <div className="p-4 sm:p-8 max-w-3xl">
        <div className="h-4 w-32 bg-[#1A1A1A] animate-pulse rounded mb-6" />
        <div className="h-8 w-2/3 bg-[#1A1A1A] animate-pulse rounded mb-3" />
        <div className="h-4 w-full bg-[#1A1A1A] animate-pulse rounded mb-2" />
        <div className="h-4 w-4/5 bg-[#1A1A1A] animate-pulse rounded" />
      </div>
    )
  }
  if (!module) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[40vh]">
        <p className="text-[#666] text-lg mb-4">Module not found.</p>
        <Link to="/modules"><Button variant="secondary">Back to Curriculum</Button></Link>
      </div>
    )
  }

  const lessons = [...(module.lessons || [])].sort((a, b) => a.order - b.order)
  const done = lessons.filter(l => completedLessonIds.has(l.id)).length
  const pct = lessons.length > 0 ? Math.round((done / lessons.length) * 100) : 0

  // Prev/next module
  const sortedModules = [...modules].sort((a, b) => a.order - b.order)
  const idx = sortedModules.findIndex(m => m.id === module.id)
  const prevModule = idx > 0 ? sortedModules[idx - 1] : null
  const nextModule = idx < sortedModules.length - 1 ? sortedModules[idx + 1] : null

  // First incomplete lesson to continue
  const continueLesson = lessons.find(l => !completedLessonIds.has(l.id)) || lessons[0]

  const outcomes: string[] = module.learning_outcomes
    ? (Array.isArray(module.learning_outcomes) ? module.learning_outcomes as string[] : JSON.parse(module.learning_outcomes as unknown as string))
    : []

  const isCourseModule = module.order <= 8

  return (
    <div className="p-4 sm:p-8 max-w-3xl">
      {/* Back */}
      <Link to="/modules" className="inline-flex items-center gap-2 text-[#555] text-sm hover:text-[#F5F1ED] mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Curriculum
      </Link>

      {/* Module header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="text-[#C64E3A] text-xs font-medium uppercase tracking-wider">
            {isCourseModule ? `Course · Module ${module.order}` : `Mindset · Module ${module.order - 8}`}
          </span>
          {pct === 100 && <Badge variant="success">Completed</Badge>}
          {pct > 0 && pct < 100 && <Badge variant="orange">In Progress</Badge>}
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#F5F1ED] mb-3">{module.title}</h1>
        <p className="text-[#888] mb-5 leading-relaxed">{module.description}</p>

        {/* Progress */}
        <div className="bg-[#0D0D0D] border border-[#1F1F1F] rounded-xl p-4 mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#666] text-sm">Module progress</span>
            <span className="text-[#C64E3A] font-bold">{pct}%</span>
          </div>
          <ProgressBar value={pct} color={pct === 100 ? '#10B981' : '#C64E3A'} />
          <div className="flex items-center justify-between mt-2 text-xs text-[#444]">
            <span>{done} of {lessons.length} lessons completed</span>
            {continueLesson && pct < 100 && (
              <Link
                to={`/modules/${id}/lessons/${continueLesson.id}`}
                className="flex items-center gap-1 text-[#C64E3A] hover:underline"
              >
                <Play className="w-3 h-3" />
                {done === 0 ? 'Start' : 'Continue'}
              </Link>
            )}
          </div>
        </div>

        {/* CTA */}
        {pct < 100 && continueLesson && (
          <Link to={`/modules/${id}/lessons/${continueLesson.id}`}>
            <Button size="lg">
              <Play className="w-4 h-4 mr-2" />
              {done === 0 ? 'Start Module' : `Continue — ${continueLesson.title}`}
            </Button>
          </Link>
        )}
      </div>

      {/* Learning outcomes */}
      {outcomes.length > 0 && (
        <Card className="mb-6">
          <CardContent className="pt-0 pb-0">
            <button
              className="w-full flex items-center justify-between py-4 text-left"
              onClick={() => setOutcomesOpen(v => !v)}
            >
              <span className="text-[#F5F1ED] font-semibold text-sm">What You'll Learn</span>
              {outcomesOpen ? <ChevronUp className="w-4 h-4 text-[#555]" /> : <ChevronDown className="w-4 h-4 text-[#555]" />}
            </button>
            {outcomesOpen && (
              <ul className="space-y-2.5 pb-4">
                {outcomes.map((o, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[#999]">
                    <CheckCircle className="w-4 h-4 text-[#C64E3A] flex-shrink-0 mt-0.5" />
                    {o}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      )}

      {/* Lessons list */}
      <div className="mb-8">
        <h2 className="text-[#F5F1ED] font-semibold mb-3">Lessons</h2>
        <div className="space-y-2">
          {lessons.map((lesson, i) => {
            const complete = completedLessonIds.has(lesson.id)
            const isNext = !complete && (i === 0 || completedLessonIds.has(lessons[i - 1]?.id))
            return (
              <Link key={lesson.id} to={`/modules/${id}/lessons/${lesson.id}`}>
                <div className={`group flex items-center gap-4 p-4 rounded-xl border transition-all duration-150 cursor-pointer
                  ${complete
                    ? 'bg-[#0A1A0F] border-green-500/20 hover:border-green-500/40'
                    : isNext
                    ? 'bg-[#1A0D0A] border-[#C64E3A]/30 hover:border-[#C64E3A]/60'
                    : 'bg-[#0D0D0D] border-[#1F1F1F] hover:border-[#2D2D2D]'
                  }`}
                >
                  {/* Icon */}
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors
                    ${complete ? 'bg-green-500/20' : isNext ? 'bg-[#C64E3A]/20' : 'bg-[#1A1A1A]'}`}
                  >
                    {complete ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Play className={`w-4 h-4 ${isNext ? 'text-[#C64E3A]' : 'text-[#444]'}`} />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[#444] text-[10px] mb-0.5">Lesson {i + 1} of {lessons.length}</p>
                    <h3 className={`text-sm font-medium truncate ${complete ? 'text-[#888] line-through decoration-[#444]' : 'text-[#F5F1ED]'}`}>
                      {lesson.title}
                    </h3>
                  </div>

                  {/* Duration + status */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {complete && <Badge variant="success" className="text-[10px]">Done</Badge>}
                    {isNext && !complete && <Badge variant="orange" className="text-[10px]">Next</Badge>}
                    <span className="flex items-center gap-1 text-[#444] text-xs">
                      <Clock className="w-3 h-3" />
                      {formatDuration(lesson.duration_minutes)}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#333] group-hover:text-[#C64E3A] transition-colors" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Module navigation */}
      <div className="flex items-center justify-between gap-4 pt-6 border-t border-[#1F1F1F]">
        {prevModule ? (
          <Link to={`/modules/${prevModule.id}`}>
            <Button variant="secondary" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Module {prevModule.order}
            </Button>
          </Link>
        ) : <div />}
        <Link to="/modules">
          <Button variant="ghost" size="sm">All Modules</Button>
        </Link>
        {nextModule ? (
          <Link to={`/modules/${nextModule.id}`}>
            <Button variant="secondary" size="sm">
              Module {nextModule.order}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        ) : <div />}
      </div>
    </div>
  )
}
