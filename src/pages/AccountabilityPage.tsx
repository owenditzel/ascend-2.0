import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useAccountability, useWeeklyHistory } from '@/hooks/useAccountability'
import { Card, CardContent } from '@/components/ui/card'
import { ProgressBar } from '@/components/ui/progress-bar'
import { cn, getWeekStart } from '@/lib/utils'
import {
  Plus, X, CheckSquare, Square, Pencil, Check,
  ChevronLeft, ChevronRight, Flame, Trophy, ChevronDown, ChevronUp
} from 'lucide-react'
import type { AccountabilityGoal } from '@/types'

const PILLARS = [
  {
    key: 'mind' as const,
    label: 'MIND',
    emoji: '🧠',
    color: '#8B5CF6',
    bgColor: 'bg-[#1A1430]',
    borderColor: 'border-purple-500/20',
    badgeColor: 'text-purple-400 bg-purple-500/10',
    barColor: '#8B5CF6',
    desc: 'Mental development, learning, mindset',
    placeholders: [
      'Read 20 pages',
      'Meditate 10 min',
      'Journal 5 min',
      'Watch one Ascend lesson',
    ],
  },
  {
    key: 'body' as const,
    label: 'BODY',
    emoji: '💪',
    color: '#10B981',
    bgColor: 'bg-[#0A1A14]',
    borderColor: 'border-green-500/20',
    badgeColor: 'text-green-400 bg-green-500/10',
    barColor: '#10B981',
    desc: 'Physical health, training, recovery',
    placeholders: [
      'Workout 45 min',
      'Walk 30 min',
      'Sleep 8 hours',
      'Meal prep',
    ],
  },
  {
    key: 'mission' as const,
    label: 'MISSION',
    emoji: '🎯',
    color: '#C64E3A',
    bgColor: 'bg-[#1A0D0A]',
    borderColor: 'border-[#C64E3A]/20',
    badgeColor: 'text-[#C64E3A] bg-[#C64E3A]/10',
    barColor: '#C64E3A',
    desc: 'Business goals, content, outreach',
    placeholders: [
      'Send 10 DMs',
      'Record 1 video',
      'Complete a lesson',
      'Schedule discovery call',
    ],
  },
]

function getMotivationalMsg(pct: number): string {
  if (pct === 100) return '🎉 You crushed it this week!'
  if (pct >= 75) return 'Almost there! One more push to 100%!'
  if (pct >= 50) return 'Great progress! Finish strong this week.'
  if (pct >= 25) return "You're on your way! Keep the momentum."
  return 'Get started! Pick one goal to complete today.'
}

function formatWeekLabel(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function addWeeks(dateStr: string, n: number): string {
  const d = new Date(dateStr + 'T00:00:00')
  d.setDate(d.getDate() + n * 7)
  return d.toISOString().split('T')[0]
}

interface GoalItemProps {
  goal: AccountabilityGoal
  pillar: typeof PILLARS[0]
  onToggle: (id: string) => void
  onEdit: (id: string, text: string) => void
  onDelete: (id: string) => void
}

function GoalItem({ goal, pillar, onToggle, onEdit, onDelete }: GoalItemProps) {
  const [editing, setEditing] = useState(false)
  const [editText, setEditText] = useState(goal.goal_text)

  function saveEdit() {
    if (editText.trim()) onEdit(goal.id, editText)
    setEditing(false)
  }

  return (
    <div className={cn(
      'group flex items-start gap-3 px-3 py-2.5 rounded-lg border transition-all',
      goal.is_completed
        ? 'bg-[#0A0A0A] border-[#1A1A1A]'
        : 'bg-[#0D0D0D] border-[#1F1F1F] hover:border-[#2D2D2D]'
    )}>
      <button
        onClick={() => onToggle(goal.id)}
        className="flex-shrink-0 mt-0.5 transition-transform active:scale-90"
      >
        {goal.is_completed
          ? <CheckSquare className="w-5 h-5" style={{ color: pillar.color }} />
          : <Square className="w-5 h-5 text-[#3A3A3A] group-hover:text-[#555] transition-colors" />}
      </button>

      {editing ? (
        <div className="flex-1 flex items-center gap-2">
          <input
            autoFocus
            value={editText}
            onChange={e => setEditText(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') saveEdit(); if (e.key === 'Escape') setEditing(false) }}
            className="flex-1 bg-transparent border-b border-[#C64E3A]/50 text-[#F5F1ED] text-sm outline-none pb-0.5"
          />
          <button onClick={saveEdit} className="text-green-400 hover:text-green-300">
            <Check className="w-4 h-4" />
          </button>
          <button onClick={() => setEditing(false)} className="text-[#444] hover:text-[#666]">
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <>
          <span
            className={cn(
              'flex-1 text-sm leading-relaxed cursor-pointer',
              goal.is_completed ? 'line-through text-[#444]' : 'text-[#E0DCD8]'
            )}
            onClick={() => { setEditing(true); setEditText(goal.goal_text) }}
          >
            {goal.goal_text}
          </span>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
            <button
              onClick={() => { setEditing(true); setEditText(goal.goal_text) }}
              className="p-1 text-[#444] hover:text-[#999] rounded transition-colors"
            >
              <Pencil className="w-3 h-3" />
            </button>
            <button
              onClick={() => onDelete(goal.id)}
              className="p-1 text-[#444] hover:text-red-400 rounded transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </>
      )}
    </div>
  )
}

interface PillarCardProps {
  pillar: typeof PILLARS[0]
  goals: AccountabilityGoal[]
  onToggle: (id: string) => void
  onEdit: (id: string, text: string) => void
  onDelete: (id: string) => void
  onAdd: (pillar: AccountabilityGoal['pillar'], text: string) => void
}

function PillarCard({ pillar, goals, onToggle, onEdit, onDelete, onAdd }: PillarCardProps) {
  const [adding, setAdding] = useState(false)
  const [newText, setNewText] = useState('')
  const done = goals.filter(g => g.is_completed).length
  const pct = goals.length > 0 ? Math.round((done / goals.length) * 100) : 0

  function handleAdd() {
    if (newText.trim()) {
      onAdd(pillar.key, newText)
      setNewText('')
      setAdding(false)
    }
  }

  return (
    <div className={cn('rounded-2xl border p-5 flex flex-col gap-4', pillar.bgColor, pillar.borderColor)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">{pillar.emoji}</span>
            <span className={cn('text-sm font-bold tracking-widest uppercase px-2 py-0.5 rounded-md', pillar.badgeColor)}>
              {pillar.label}
            </span>
          </div>
          <p className="text-[#555] text-xs mt-1 ml-0.5">{pillar.desc}</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-lg text-[#F5F1ED] leading-none">{pct}%</p>
          <p className="text-[#444] text-xs">{done}/{goals.length}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div>
        <ProgressBar value={pct} color={pct === 100 ? '#10B981' : pillar.barColor} />
      </div>

      {/* Goals */}
      <div className="flex flex-col gap-2">
        {goals.length === 0 && !adding && (
          <div className="text-center py-4">
            <p className="text-[#333] text-xs">No goals yet. Add your first!</p>
          </div>
        )}
        {goals.map(goal => (
          <GoalItem
            key={goal.id}
            goal={goal}
            pillar={pillar}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}

        {/* Add goal input */}
        {adding ? (
          <div className="flex items-center gap-2 mt-1">
            <input
              autoFocus
              type="text"
              value={newText}
              onChange={e => setNewText(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleAdd(); if (e.key === 'Escape') { setAdding(false); setNewText('') } }}
              placeholder={pillar.placeholders[goals.length % pillar.placeholders.length]}
              className="flex-1 px-3 py-2 bg-[#0D0D0D] border rounded-lg text-[#F5F1ED] placeholder-[#333] focus:outline-none text-sm transition-colors"
              style={{ borderColor: pillar.color + '60' }}
            />
            <button onClick={handleAdd} className="w-8 h-8 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 flex items-center justify-center transition-colors">
              <Check className="w-4 h-4" />
            </button>
            <button onClick={() => { setAdding(false); setNewText('') }} className="w-8 h-8 rounded-lg bg-[#1A1A1A] text-[#555] hover:text-[#999] flex items-center justify-center transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setAdding(true)}
            className="flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-lg border border-dashed border-[#2D2D2D] hover:border-[#444] text-[#444] hover:text-[#888] transition-all mt-1"
          >
            <Plus className="w-3.5 h-3.5" />
            Add goal
          </button>
        )}
      </div>
    </div>
  )
}

export default function AccountabilityPage() {
  const { user } = useAuth()
  const [weekOffset, setWeekOffset] = useState(0)
  const [historyOpen, setHistoryOpen] = useState(false)

  const baseWeek = getWeekStart()
  const currentWeek = weekOffset === 0
    ? baseWeek
    : addWeeks(baseWeek, weekOffset)

  const isCurrentWeek = weekOffset === 0

  const { goals, weeklyProgress, loading, addGoal, toggleGoal, updateGoalText, deleteGoal } = useAccountability(user?.id, currentWeek)
  const { history } = useWeeklyHistory(user?.id)

  const totalGoals = goals.length
  const totalDone = goals.filter(g => g.is_completed).length
  const overallPct = weeklyProgress?.overall_percentage ?? (totalGoals > 0 ? Math.round((totalDone / totalGoals) * 100) : 0)
  const streakWeeks = weeklyProgress?.streak_weeks ?? 0

  const goalsByPillar = (pillar: AccountabilityGoal['pillar']) => goals.filter(g => g.pillar === pillar)

  // Can only edit current week
  const readonly = !isCurrentWeek

  return (
    <div className="p-4 sm:p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#F5F1ED] mb-1">Weekly Accountability</h1>
        <p className="text-[#555] text-sm">Track your Mind, Body, and Mission goals every week.</p>
      </div>

      {/* Week selector + summary */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        {/* Week nav */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setWeekOffset(w => w - 1)}
            className="w-8 h-8 rounded-lg bg-[#111] border border-[#2D2D2D] hover:border-[#C64E3A]/40 flex items-center justify-center text-[#666] hover:text-[#F5F1ED] transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="text-center min-w-[140px]">
            <p className="text-[#F5F1ED] font-semibold text-sm">
              {isCurrentWeek ? 'This Week' : weekOffset === -1 ? 'Last Week' : `Week of ${formatWeekLabel(currentWeek)}`}
            </p>
            <p className="text-[#444] text-xs">{formatWeekLabel(currentWeek)} – {formatWeekLabel(addWeeks(currentWeek, 1).replace('T00:00:00', ''))}</p>
          </div>
          <button
            onClick={() => setWeekOffset(w => Math.min(0, w + 1))}
            disabled={isCurrentWeek}
            className="w-8 h-8 rounded-lg bg-[#111] border border-[#2D2D2D] hover:border-[#C64E3A]/40 flex items-center justify-center text-[#666] hover:text-[#F5F1ED] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Summary */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-[#F5F1ED] font-bold text-lg leading-none">{overallPct}%</p>
            <p className="text-[#444] text-xs">{totalDone}/{totalGoals} goals</p>
          </div>
          {streakWeeks > 0 && (
            <div className="flex items-center gap-1.5 bg-[#2D1500] border border-amber-500/20 rounded-lg px-3 py-1.5">
              <Flame className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 font-bold text-sm">{streakWeeks}w streak</span>
            </div>
          )}
        </div>
      </div>

      {/* Read-only banner for past weeks */}
      {readonly && (
        <div className="mb-6 px-4 py-3 bg-[#111] border border-[#2D2D2D] rounded-xl text-[#555] text-sm flex items-center gap-2">
          <span className="text-[#333]">👁</span>
          Viewing past week — read-only
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="grid lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-[#111] border border-[#2D2D2D] rounded-2xl p-5 h-64 animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          {/* Three pillars */}
          <div className="grid lg:grid-cols-3 gap-4 mb-8">
            {PILLARS.map(pillar => (
              <PillarCard
                key={pillar.key}
                pillar={pillar}
                goals={goalsByPillar(pillar.key)}
                onToggle={readonly ? () => {} : toggleGoal}
                onEdit={readonly ? () => {} : updateGoalText}
                onDelete={readonly ? () => {} : deleteGoal}
                onAdd={readonly ? () => {} : addGoal}
              />
            ))}
          </div>

          {/* Weekly summary card */}
          <Card className="mb-8">
            <CardContent className="pt-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {overallPct === 100
                      ? <Trophy className="w-5 h-5 text-amber-400" />
                      : <div className="w-5 h-5 rounded-full border-2 border-[#C64E3A] flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-[#C64E3A]" />
                        </div>
                    }
                    <span className="text-[#F5F1ED] font-semibold">
                      {isCurrentWeek ? "This Week's Progress" : 'Week Summary'}
                    </span>
                    <span className="text-2xl font-bold text-[#C64E3A] ml-auto">{overallPct}%</span>
                  </div>
                  <ProgressBar value={overallPct} color={overallPct === 100 ? '#10B981' : '#C64E3A'} className="mb-3" />
                  <p className="text-[#888] text-sm">{getMotivationalMsg(overallPct)}</p>
                </div>
                {streakWeeks > 0 && (
                  <div className="flex-shrink-0 bg-[#1A1000] border border-amber-500/20 rounded-xl p-4 text-center min-w-[90px]">
                    <Flame className="w-6 h-6 text-amber-400 mx-auto mb-1" />
                    <p className="text-amber-400 font-bold text-xl leading-none">{streakWeeks}</p>
                    <p className="text-[#555] text-xs mt-0.5">week streak</p>
                  </div>
                )}
              </div>

              {/* Per-pillar bars */}
              <div className="mt-5 grid grid-cols-3 gap-4">
                {PILLARS.map(p => {
                  const gs = goalsByPillar(p.key)
                  const done = gs.filter(g => g.is_completed).length
                  const pct = gs.length > 0 ? Math.round((done / gs.length) * 100) : 0
                  return (
                    <div key={p.key}>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-[#555] text-xs">{p.emoji} {p.label}</span>
                        <span className="text-xs font-medium" style={{ color: p.color }}>{pct}%</span>
                      </div>
                      <ProgressBar value={pct} color={p.barColor} />
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Weekly history */}
      {history.length > 0 && (
        <div>
          <button
            onClick={() => setHistoryOpen(v => !v)}
            className="flex items-center gap-2 text-[#F5F1ED] font-semibold mb-4 hover:text-[#C64E3A] transition-colors"
          >
            {historyOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            Weekly History
          </button>
          {historyOpen && (
            <div className="space-y-2">
              {history.map(week => {
                const isCurrent = week.week_start_date === baseWeek
                return (
                  <button
                    key={week.id}
                    onClick={() => {
                      const offset = Math.round(
                        (new Date(week.week_start_date + 'T00:00:00').getTime() - new Date(baseWeek + 'T00:00:00').getTime())
                        / (7 * 86400000)
                      )
                      setWeekOffset(offset)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    className={cn(
                      'w-full flex items-center gap-4 px-4 py-3 rounded-xl border transition-all text-left hover:border-[#C64E3A]/30',
                      isCurrent ? 'bg-[#1A0D0A] border-[#C64E3A]/30' : 'bg-[#0D0D0D] border-[#1F1F1F]'
                    )}
                  >
                    <div className="flex-1">
                      <p className="text-[#F5F1ED] text-sm font-medium">
                        Week of {formatWeekLabel(week.week_start_date)}
                        {isCurrent && <span className="text-[#C64E3A] text-xs ml-2">← current</span>}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        {[
                          { label: '🧠', val: week.mind_total > 0 ? Math.round((week.mind_completed / week.mind_total) * 100) : 0 },
                          { label: '💪', val: week.body_total > 0 ? Math.round((week.body_completed / week.body_total) * 100) : 0 },
                          { label: '🎯', val: week.mission_total > 0 ? Math.round((week.mission_completed / week.mission_total) * 100) : 0 },
                        ].map(({ label, val }) => (
                          <span key={label} className="text-[#444] text-xs">{label} {val}%</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      {week.streak_weeks > 0 && (
                        <span className="text-amber-400 text-xs flex items-center gap-1">
                          <Flame className="w-3 h-3" />{week.streak_weeks}
                        </span>
                      )}
                      <div className="text-right">
                        <p className={cn('font-bold text-sm', week.overall_percentage === 100 ? 'text-green-400' : 'text-[#C64E3A]')}>
                          {week.overall_percentage}%
                        </p>
                      </div>
                      <div className="w-16">
                        <ProgressBar value={week.overall_percentage} color={week.overall_percentage === 100 ? '#10B981' : '#C64E3A'} />
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
