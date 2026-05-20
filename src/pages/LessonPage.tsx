import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '@/config/supabase'
import { useModule } from '@/hooks/useModules'
import { useProgress } from '@/hooks/useProgress'
import { useResources } from '@/hooks/useResources'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn, formatDuration } from '@/lib/utils'
import {
  ArrowLeft, ArrowRight, CheckCircle, Square, CheckSquare,
  Clock, BookOpen, ListChecks, FileText, Download, Play, Trophy
} from 'lucide-react'
import type { Lesson, Resource } from '@/types'

type TabKey = 'notes' | 'actions' | 'resources'

interface ActionItemState {
  id: string
  text: string
  checked: boolean
}

function Confetti({ active }: { active: boolean }) {
  if (!active) return null
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 0.5}s`,
    color: ['#C64E3A', '#F5F1ED', '#10B981', '#F59E0B', '#8B5CF6'][Math.floor(Math.random() * 5)],
    size: `${4 + Math.random() * 6}px`,
  }))
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute top-0 animate-bounce"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: `${0.8 + Math.random() * 0.6}s`,
            animationIterationCount: '3',
          }}
        >
          <div
            className="rounded-full opacity-90"
            style={{ width: p.size, height: p.size, backgroundColor: p.color }}
          />
        </div>
      ))}
    </div>
  )
}

export default function LessonPage() {
  const { id, lessonId } = useParams()
  const { user } = useAuth()
  const { module } = useModule(Number(id))
  const { completedLessonIds, markComplete } = useProgress(user?.id)
  const { resources } = useResources()

  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [loading, setLoading] = useState(true)
  const [marking, setMarking] = useState(false)
  const [tab, setTab] = useState<TabKey>('notes')
  const [actionItems, setActionItems] = useState<ActionItemState[]>([])
  const [showConfetti, setShowConfetti] = useState(false)
  const [showModuleComplete, setShowModuleComplete] = useState(false)

  useEffect(() => {
    if (!lessonId) return
    setLoading(true)
    supabase.from('lessons').select('*').eq('id', Number(lessonId)).single()
      .then(({ data }) => {
        setLesson(data)
        if (data?.action_items) {
          const items = Array.isArray(data.action_items) ? data.action_items : JSON.parse(data.action_items as string)
          setActionItems(items.map((item: { id: string; text: string }) => ({ ...item, checked: false })))
        }
        setLoading(false)
      })
  }, [lessonId])

  const isComplete = lesson ? completedLessonIds.has(lesson.id) : false

  // Sorted lessons in module
  const lessons = [...(module?.lessons || [])].sort((a, b) => a.order - b.order)
  const currentIdx = lessons.findIndex(l => l.id === Number(lessonId))
  const prevLesson = currentIdx > 0 ? lessons[currentIdx - 1] : null
  const nextLesson = currentIdx < lessons.length - 1 ? lessons[currentIdx + 1] : null
  const isLastLesson = currentIdx === lessons.length - 1

  // Resources for this lesson
  const lessonResources: Resource[] = lesson?.resources_ids
    ? resources.filter(r => lesson.resources_ids!.includes(r.id))
    : resources.filter(r => r.module_id === Number(id)).slice(0, 3)

  async function handleComplete() {
    if (!lesson || marking) return
    setMarking(true)
    await markComplete(lesson.id)
    setMarking(false)
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)

    // Check if this was the last lesson
    if (isLastLesson) {
      setShowModuleComplete(true)
    }
  }

  function toggleActionItem(itemId: string) {
    setActionItems(prev => prev.map(item =>
      item.id === itemId ? { ...item, checked: !item.checked } : item
    ))
  }

  const tabs: { key: TabKey; label: string; icon: typeof BookOpen }[] = [
    { key: 'notes', label: 'Notes', icon: BookOpen },
    { key: 'actions', label: `Action Items${actionItems.length > 0 ? ` (${actionItems.length})` : ''}`, icon: ListChecks },
    { key: 'resources', label: 'Resources', icon: FileText },
  ]

  if (loading) {
    return (
      <div className="p-4 sm:p-8 max-w-4xl">
        <div className="h-4 w-32 bg-[#1A1A1A] animate-pulse rounded mb-6" />
        <div className="h-8 w-2/3 bg-[#1A1A1A] animate-pulse rounded mb-4" />
        <div className="aspect-video bg-[#0D0D0D] animate-pulse rounded-xl" />
      </div>
    )
  }

  if (!lesson) {
    return (
      <div className="p-8 text-center">
        <p className="text-[#666] mb-4">Lesson not found.</p>
        <Link to={`/modules/${id}`}><Button variant="secondary">Back to Module</Button></Link>
      </div>
    )
  }

  // Module complete overlay
  if (showModuleComplete) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <Confetti active />
        <div className="max-w-md w-full bg-[#0D0D0D] border border-[#2D2D2D] rounded-2xl p-8 text-center">
          <div className="w-20 h-20 bg-[#C64E3A]/15 rounded-full flex items-center justify-center mx-auto mb-5">
            <Trophy className="w-10 h-10 text-[#C64E3A]" />
          </div>
          <h2 className="text-2xl font-bold text-[#F5F1ED] mb-2">Module Complete! 🎉</h2>
          <p className="text-[#999] mb-2">You finished</p>
          <p className="text-[#F5F1ED] font-semibold mb-6">{module?.title}</p>
          <div className="flex flex-col gap-3">
            <Link to={`/modules/${id}`}>
              <Button className="w-full" size="lg">
                <CheckCircle className="w-4 h-4 mr-2" />
                View Module Summary
              </Button>
            </Link>
            <Link to="/modules">
              <Button variant="secondary" className="w-full">
                Back to All Modules
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 max-w-4xl">
      <Confetti active={showConfetti} />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 mb-4 flex-wrap">
        <Link to="/modules" className="text-[#555] text-sm hover:text-[#F5F1ED] transition-colors">Curriculum</Link>
        <span className="text-[#333] text-sm">›</span>
        <Link to={`/modules/${id}`} className="text-[#555] text-sm hover:text-[#F5F1ED] transition-colors">{module?.title || `Module ${id}`}</Link>
        <span className="text-[#333] text-sm">›</span>
        <span className="text-[#999] text-sm">Lesson {currentIdx + 1} of {lessons.length}</span>
      </nav>

      {/* Lesson header */}
      <div className="mb-5">
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          {isComplete && <Badge variant="success"><CheckCircle className="w-3 h-3 mr-1" />Completed</Badge>}
          <span className="text-[#555] text-xs flex items-center gap-1">
            <Clock className="w-3 h-3" />{formatDuration(lesson.duration_minutes)}
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#F5F1ED] mb-2">{lesson.title}</h1>
        <p className="text-[#777] text-sm">{lesson.description}</p>
      </div>

      {/* Video player */}
      <div className="aspect-video bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl mb-6 overflow-hidden relative">
        {lesson.video_url && (lesson.video_url.includes('vimeo.com') || lesson.video_url.includes('youtube.com') || lesson.video_url.includes('youtu.be')) ? (
          <iframe
            src={lesson.video_url.includes('youtu.be')
              ? `https://www.youtube.com/embed/${lesson.video_url.split('/').pop()}`
              : lesson.video_url
            }
            className="w-full h-full"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            title={lesson.title}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-16 h-16 bg-[#C64E3A]/15 rounded-full flex items-center justify-center mb-4">
              <Play className="w-8 h-8 text-[#C64E3A] ml-1" />
            </div>
            <p className="text-[#555] text-sm">Video will appear here</p>
            <p className="text-[#333] text-xs mt-1 px-8 text-center break-all">{lesson.video_url || 'No video URL set'}</p>
          </div>
        )}
      </div>

      {/* Mark complete */}
      <div className="mb-6">
        {isComplete ? (
          <div className="flex items-center gap-3 p-4 bg-[#0A1A0F] border border-green-500/20 rounded-xl">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
            <div>
              <p className="text-green-400 font-medium text-sm">Lesson Completed!</p>
            </div>
          </div>
        ) : (
          <button
            onClick={handleComplete}
            disabled={marking}
            className="w-full flex items-center justify-center gap-3 p-4 bg-[#0D0D0D] border-2 border-dashed border-[#2D2D2D] hover:border-[#C64E3A]/50 hover:bg-[#1A0D0A] rounded-xl transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {marking ? (
              <span className="w-5 h-5 border-2 border-[#C64E3A] border-t-transparent rounded-full animate-spin" />
            ) : (
              <div className="w-5 h-5 border-2 border-[#444] group-hover:border-[#C64E3A] rounded flex items-center justify-center transition-colors">
                <CheckCircle className="w-3.5 h-3.5 text-transparent group-hover:text-[#C64E3A] transition-colors" />
              </div>
            )}
            <span className="text-[#666] group-hover:text-[#F5F1ED] transition-colors text-sm font-medium">
              {marking ? 'Marking complete...' : 'Mark as Complete'}
            </span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex gap-1 bg-[#0D0D0D] border border-[#1F1F1F] rounded-lg p-1 mb-5 overflow-x-auto">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors flex-1 justify-center',
                tab === t.key ? 'bg-[#C64E3A] text-white' : 'text-[#666] hover:text-[#F5F1ED]'
              )}
            >
              <t.icon className="w-3.5 h-3.5" />
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab: Notes */}
        {tab === 'notes' && (
          <div>
            {lesson.notes_content ? (
              <div
                className="prose prose-invert prose-sm max-w-none text-[#999] leading-relaxed
                  [&_h3]:text-[#F5F1ED] [&_h3]:font-semibold [&_h3]:text-base [&_h3]:mt-5 [&_h3]:mb-2
                  [&_h2]:text-[#F5F1ED] [&_h2]:font-semibold [&_h2]:mt-6 [&_h2]:mb-3
                  [&_ul]:space-y-1.5 [&_ul]:pl-4 [&_li]:list-disc [&_li]:marker:text-[#C64E3A]
                  [&_ol]:space-y-1.5 [&_ol]:pl-4 [&_li]:list-decimal
                  [&_strong]:text-[#F5F1ED] [&_strong]:font-semibold
                  [&_p]:mb-3"
                dangerouslySetInnerHTML={{ __html: lesson.notes_content }}
              />
            ) : (
              <div className="text-center py-10">
                <BookOpen className="w-8 h-8 text-[#2D2D2D] mx-auto mb-3" />
                <p className="text-[#444] text-sm">Notes coming soon for this lesson.</p>
              </div>
            )}
          </div>
        )}

        {/* Tab: Action items */}
        {tab === 'actions' && (
          <div>
            {actionItems.length > 0 ? (
              <div>
                <p className="text-[#666] text-sm mb-4">Complete these to master this lesson.</p>
                <div className="space-y-2.5">
                  {actionItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => toggleActionItem(item.id)}
                      className="w-full flex items-start gap-3 p-4 bg-[#0D0D0D] border border-[#1F1F1F] rounded-xl hover:border-[#2D2D2D] transition-colors text-left group"
                    >
                      <div className="mt-0.5 flex-shrink-0">
                        {item.checked ? (
                          <CheckSquare className="w-5 h-5 text-green-500" />
                        ) : (
                          <Square className="w-5 h-5 text-[#444] group-hover:text-[#666] transition-colors" />
                        )}
                      </div>
                      <span className={cn(
                        'text-sm leading-relaxed transition-colors',
                        item.checked ? 'text-[#444] line-through' : 'text-[#F5F1ED]'
                      )}>
                        {item.text}
                      </span>
                    </button>
                  ))}
                </div>
                {actionItems.length > 0 && (
                  <p className="text-[#333] text-xs mt-4 text-center">
                    {actionItems.filter(i => i.checked).length}/{actionItems.length} completed
                  </p>
                )}
              </div>
            ) : (
              <div className="text-center py-10">
                <ListChecks className="w-8 h-8 text-[#2D2D2D] mx-auto mb-3" />
                <p className="text-[#444] text-sm">No action items for this lesson.</p>
              </div>
            )}
          </div>
        )}

        {/* Tab: Resources */}
        {tab === 'resources' && (
          <div>
            {lessonResources.length > 0 ? (
              <div className="space-y-3">
                {lessonResources.map(r => (
                  <a
                    key={r.id}
                    href={r.file_url !== '#' ? r.file_url : undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-[#0D0D0D] border border-[#1F1F1F] rounded-xl hover:border-[#C64E3A]/40 transition-colors"
                  >
                    <div className="w-10 h-10 bg-[#1A1A1A] rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-[#C64E3A]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#F5F1ED] text-sm font-medium">{r.title}</p>
                      <p className="text-[#555] text-xs">{r.category}</p>
                    </div>
                    <Download className="w-4 h-4 text-[#444] flex-shrink-0" />
                  </a>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <FileText className="w-8 h-8 text-[#2D2D2D] mx-auto mb-3" />
                <p className="text-[#444] text-sm">No resources attached to this lesson.</p>
                <Link to="/resources" className="text-[#C64E3A] text-sm mt-2 inline-block hover:underline">
                  Browse all resources →
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Lesson navigation */}
      <div className="flex items-center justify-between gap-4 pt-6 border-t border-[#1F1F1F]">
        {prevLesson ? (
          <Link to={`/modules/${id}/lessons/${prevLesson.id}`}>
            <Button variant="secondary" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
          </Link>
        ) : (
          <Link to={`/modules/${id}`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Module
            </Button>
          </Link>
        )}

        <Link to={`/modules/${id}`}>
          <Button variant="ghost" size="sm" className="hidden sm:flex">Back to Module</Button>
        </Link>

        {nextLesson ? (
          <Link to={`/modules/${id}/lessons/${nextLesson.id}`}>
            <Button size="sm">
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        ) : (
          <Link to={`/modules/${id}`}>
            <Button variant="secondary" size="sm">
              Module Overview
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
