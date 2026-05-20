import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useModules } from '@/hooks/useModules'
import { useProgress } from '@/hooks/useProgress'
import { supabase } from '@/config/supabase'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ProgressBar } from '@/components/ui/progress-bar'
import { cn, formatDate, formatDuration } from '@/lib/utils'
import {
  BookOpen, CheckCircle, Clock, Trophy, TrendingUp,
  Pencil, Check, X, Download, Trash2, ChevronDown, ChevronUp
} from 'lucide-react'
import type { Lesson, Module } from '@/types'

interface CompletedLessonRow {
  lesson: Lesson & { module: Module }
  completedAt: string
}

export default function ProfilePage() {
  const { user, signOut } = useAuth()
  const { modules } = useModules()
  const { progress, completedLessonIds } = useProgress(user?.id)

  const [editingName, setEditingName] = useState(false)
  const [nameVal, setNameVal] = useState(user?.name || '')
  const [savingName, setSavingName] = useState(false)
  const [nameSaved, setNameSaved] = useState(false)

  const [historyOpen, setHistoryOpen] = useState(false)
  const [historySearch, setHistorySearch] = useState('')
  const [historySort, setHistorySort] = useState<'date' | 'module' | 'duration'>('date')
  const [historyPage, setHistoryPage] = useState(1)
  const HISTORY_PAGE_SIZE = 10

  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [deleteEmail, setDeleteEmail] = useState('')

  // Prefs (local only for MVP — could persist to users table)
  const [prefs, setPrefs] = useState({
    resourceEmails: false,
    completionReminders: false,
    showOnLeaderboard: true,
  })

  useEffect(() => { setNameVal(user?.name || '') }, [user?.name])

  async function saveName() {
    if (!user || !nameVal.trim()) return
    setSavingName(true)
    await supabase.from('users').update({ name: nameVal.trim(), updated_at: new Date().toISOString() }).eq('id', user.id)
    setSavingName(false)
    setEditingName(false)
    setNameSaved(true)
    setTimeout(() => setNameSaved(false), 2000)
  }

  // Compute stats
  const allLessons = modules.flatMap(m => (m.lessons || []).map(l => ({ ...l, module: m })))
  const totalLessons = allLessons.length
  const completedCount = completedLessonIds.size
  const progressPct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0

  const completedModules = modules.filter(m => {
    const ls = m.lessons || []
    return ls.length > 0 && ls.every(l => completedLessonIds.has(l.id))
  })

  const totalMinutes = allLessons
    .filter(l => completedLessonIds.has(l.id))
    .reduce((acc, l) => acc + l.duration_minutes, 0)

  const daysSince = user?.cohort_start_date
    ? Math.floor((Date.now() - new Date(user.cohort_start_date).getTime()) / 86400000)
    : 0

  // Lesson history (completed lessons with timestamp)
  const completedRows: CompletedLessonRow[] = progress
    .filter(p => p.completed)
    .map(p => {
      const lesson = allLessons.find(l => l.id === p.lesson_id)
      return lesson ? { lesson, completedAt: p.completed_at || p.created_at } : null
    })
    .filter((r): r is CompletedLessonRow => r !== null)

  const filteredHistory = completedRows
    .filter(r => !historySearch || r.lesson.title.toLowerCase().includes(historySearch.toLowerCase()))
    .sort((a, b) => {
      if (historySort === 'date') return new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
      if (historySort === 'module') return (a.lesson.module?.order ?? 0) - (b.lesson.module?.order ?? 0)
      return b.lesson.duration_minutes - a.lesson.duration_minutes
    })

  const pagedHistory = filteredHistory.slice(0, historyPage * HISTORY_PAGE_SIZE)

  function exportData() {
    const data = {
      profile: { name: user?.name, email: user?.email, tier: user?.tier, cohortStart: user?.cohort_start_date },
      progress: { completedLessons: completedCount, totalLessons, percentComplete: progressPct },
      lessonHistory: completedRows.map(r => ({
        lessonTitle: r.lesson.title,
        module: r.lesson.module?.title,
        completedAt: r.completedAt,
        duration: r.lesson.duration_minutes,
      })),
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ascend-progress-${user?.email}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (!user) return null

  return (
    <div className="p-4 sm:p-8 max-w-3xl">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#F5F1ED] mb-8">Your Profile</h1>

      {/* ── Section 1: Identity ── */}
      <Card className="mb-6">
        <CardContent className="pt-5">
          <div className="flex items-center gap-5 mb-5">
            <div className="w-16 h-16 rounded-full bg-[#C64E3A] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-2xl font-bold">{user.name?.charAt(0).toUpperCase()}</span>
            </div>
            <div className="flex-1 min-w-0">
              {editingName ? (
                <div className="flex items-center gap-2">
                  <input
                    autoFocus
                    value={nameVal}
                    onChange={e => setNameVal(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') saveName(); if (e.key === 'Escape') setEditingName(false) }}
                    className="flex-1 bg-transparent border-b border-[#C64E3A]/50 text-[#F5F1ED] text-lg font-semibold outline-none pb-0.5"
                  />
                  <button onClick={saveName} disabled={savingName} className="text-green-400 hover:text-green-300">
                    <Check className="w-4 h-4" />
                  </button>
                  <button onClick={() => setEditingName(false)} className="text-[#444]">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h2 className="text-[#F5F1ED] font-semibold text-lg">{user.name}</h2>
                  <button onClick={() => setEditingName(true)} className="text-[#444] hover:text-[#888] transition-colors">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  {nameSaved && <span className="text-green-400 text-xs flex items-center gap-1"><Check className="w-3 h-3" />Saved</span>}
                </div>
              )}
              <p className="text-[#555] text-sm mt-0.5">{user.email}</p>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <Badge variant={user.tier === 'full' ? 'success' : 'default'}>
                  {user.tier === 'full' ? 'Full Access' : 'Community'}
                </Badge>
                <Badge variant={user.subscription_status === 'active' ? 'success' : 'warning'}>
                  {user.subscription_status ?? 'No subscription'}
                </Badge>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              { label: 'Member since', val: user.subscription_start_date ? formatDate(user.subscription_start_date) : '—' },
              { label: 'Cohort start', val: user.cohort_start_date ? formatDate(user.cohort_start_date) : '—' },
              { label: 'Days in program', val: daysSince.toString() },
              { label: 'Status', val: user.status ?? 'active' },
            ].map(({ label, val }) => (
              <div key={label}>
                <p className="text-[#444] text-xs mb-0.5">{label}</p>
                <p className="text-[#F5F1ED] font-medium capitalize">{val}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── Section 2: Progress Summary ── */}
      <h2 className="text-[#F5F1ED] font-semibold mb-4">Progress Summary</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { icon: BookOpen, label: 'Lessons Done', value: completedCount, sub: `of ${totalLessons}`, color: 'text-[#C64E3A]' },
          { icon: Clock, label: 'Time Invested', value: formatDuration(totalMinutes), sub: 'total', color: 'text-blue-400' },
          { icon: CheckCircle, label: 'Modules Done', value: completedModules.length, sub: `of ${modules.length}`, color: 'text-green-400' },
          { icon: TrendingUp, label: 'Overall', value: `${progressPct}%`, sub: 'complete', color: 'text-amber-400' },
        ].map(({ icon: Icon, label, value, sub, color }) => (
          <Card key={label}>
            <CardContent className="pt-4 pb-4">
              <Icon className={`w-4 h-4 ${color} mb-2`} />
              <p className="text-xl font-bold text-[#F5F1ED] leading-none">{value}</p>
              <p className="text-[#555] text-xs mt-0.5">{label}</p>
              <p className="text-[#333] text-[10px]">{sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="mb-6">
        <CardContent className="pt-5">
          <div className="flex justify-between mb-2">
            <span className="text-[#F5F1ED] text-sm font-medium">Overall Course Progress</span>
            <span className="text-[#C64E3A] font-bold">{progressPct}%</span>
          </div>
          <ProgressBar value={progressPct} color={progressPct === 100 ? '#10B981' : '#C64E3A'} />
          {completedModules.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {completedModules.map(m => (
                <span key={m.id} className="text-[10px] bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full border border-green-500/20">
                  ✓ Module {m.order}
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Section 3: Preferences ── */}
      <h2 className="text-[#F5F1ED] font-semibold mb-4">Preferences</h2>
      <Card className="mb-6">
        <CardContent className="pt-5 divide-y divide-[#1A1A1A]">
          {[
            { key: 'resourceEmails' as const, label: 'New resource notifications', sub: 'Email when new templates or scripts are added' },
            { key: 'completionReminders' as const, label: 'Lesson completion reminders', sub: 'Weekly nudge if you haven\'t completed a lesson' },
            { key: 'showOnLeaderboard' as const, label: 'Show me on the leaderboard', sub: 'Your name appears in the accountability rankings' },
          ].map(({ key, label, sub }) => (
            <div key={key} className="flex items-center justify-between py-3.5">
              <div>
                <p className="text-[#F5F1ED] text-sm font-medium">{label}</p>
                <p className="text-[#444] text-xs mt-0.5">{sub}</p>
              </div>
              <button
                onClick={() => setPrefs(p => ({ ...p, [key]: !p[key] }))}
                className={cn(
                  'w-11 h-6 rounded-full transition-colors flex-shrink-0 relative',
                  prefs[key] ? 'bg-[#C64E3A]' : 'bg-[#2D2D2D]'
                )}
              >
                <span className={cn(
                  'absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform',
                  prefs[key] ? 'translate-x-5' : 'translate-x-0.5'
                )} />
              </button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ── Section 4: Lesson History ── */}
      <div className="mb-6">
        <button
          onClick={() => setHistoryOpen(v => !v)}
          className="flex items-center justify-between w-full mb-4"
        >
          <h2 className="text-[#F5F1ED] font-semibold flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            Lesson History ({completedCount} completed)
          </h2>
          {historyOpen ? <ChevronUp className="w-4 h-4 text-[#444]" /> : <ChevronDown className="w-4 h-4 text-[#444]" />}
        </button>

        {historyOpen && (
          <Card>
            <CardContent className="pt-4">
              {/* Search + sort */}
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Search lessons..."
                  value={historySearch}
                  onChange={e => { setHistorySearch(e.target.value); setHistoryPage(1) }}
                  className="flex-1 px-3 py-2 bg-[#0D0D0D] border border-[#2D2D2D] rounded-lg text-[#F5F1ED] placeholder-[#444] focus:outline-none focus:border-[#C64E3A] text-sm transition-colors"
                />
                <select
                  value={historySort}
                  onChange={e => setHistorySort(e.target.value as typeof historySort)}
                  className="px-3 py-2 bg-[#0D0D0D] border border-[#2D2D2D] rounded-lg text-[#666] text-sm focus:outline-none focus:border-[#C64E3A] transition-colors"
                >
                  <option value="date">By Date</option>
                  <option value="module">By Module</option>
                  <option value="duration">By Duration</option>
                </select>
              </div>

              {filteredHistory.length === 0 ? (
                <p className="text-[#444] text-sm text-center py-6">No completed lessons yet.</p>
              ) : (
                <>
                  <div className="space-y-2">
                    {pagedHistory.map(({ lesson, completedAt }) => (
                      <div key={lesson.id} className="flex items-center gap-3 py-2.5 border-b border-[#1A1A1A] last:border-0">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[#F5F1ED] text-sm font-medium truncate">{lesson.title}</p>
                          <p className="text-[#444] text-xs">{lesson.module?.title}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-[#555] text-xs">{formatDate(completedAt)}</p>
                          <p className="text-[#333] text-xs">{formatDuration(lesson.duration_minutes)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {pagedHistory.length < filteredHistory.length && (
                    <button
                      onClick={() => setHistoryPage(p => p + 1)}
                      className="w-full mt-4 py-2 text-[#C64E3A] text-sm hover:underline"
                    >
                      Load more ({filteredHistory.length - pagedHistory.length} remaining)
                    </button>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* ── Section 5: Account ── */}
      <h2 className="text-[#F5F1ED] font-semibold mb-4">Account</h2>
      <Card>
        <CardContent className="pt-5 divide-y divide-[#1A1A1A]">
          {/* Download data */}
          <div className="flex items-center justify-between pb-4">
            <div>
              <p className="text-[#F5F1ED] text-sm font-medium">Download My Data</p>
              <p className="text-[#444] text-xs mt-0.5">Export all your progress and history as JSON</p>
            </div>
            <Button size="sm" variant="secondary" onClick={exportData}>
              <Download className="w-3.5 h-3.5 mr-1.5" />Export
            </Button>
          </div>

          {/* Sign out */}
          <div className="flex items-center justify-between py-4">
            <div>
              <p className="text-[#F5F1ED] text-sm font-medium">Sign Out</p>
              <p className="text-[#444] text-xs mt-0.5">Sign out of your account on this device</p>
            </div>
            <Button size="sm" variant="secondary" onClick={signOut}>Sign Out</Button>
          </div>

          {/* Delete account */}
          <div className="pt-4">
            {!deleteConfirm ? (
              <button
                onClick={() => setDeleteConfirm(true)}
                className="flex items-center gap-2 text-red-500 text-sm hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete Account
              </button>
            ) : (
              <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
                <p className="text-red-400 text-sm font-medium mb-1">This is permanent and cannot be undone.</p>
                <p className="text-[#666] text-xs mb-3">Type your email to confirm: <span className="text-[#F5F1ED]">{user.email}</span></p>
                <input
                  type="email"
                  placeholder="Your email"
                  value={deleteEmail}
                  onChange={e => setDeleteEmail(e.target.value)}
                  className="w-full mb-3 px-3 py-2 bg-[#0D0D0D] border border-red-500/30 rounded-lg text-[#F5F1ED] placeholder-[#444] focus:outline-none text-sm"
                />
                <div className="flex gap-2">
                  <button onClick={() => { setDeleteConfirm(false); setDeleteEmail('') }} className="flex-1 py-2 text-sm text-[#666] hover:text-[#F5F1ED] border border-[#2D2D2D] rounded-lg transition-colors">
                    Cancel
                  </button>
                  <button
                    disabled={deleteEmail !== user.email}
                    className="flex-1 py-2 text-sm bg-red-700 hover:bg-red-800 text-white rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Delete My Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
