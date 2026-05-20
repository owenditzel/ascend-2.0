import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useLeaderboard } from '@/hooks/useAccountability'
import { cn } from '@/lib/utils'
import { Flame, Trophy, Medal, ChevronDown, ChevronUp } from 'lucide-react'
import { EmptyState } from '@/components/ui/empty-state'

type TimePeriod = 'this_week' | 'last_week' | 'all_time'
type SortKey = 'overall_percentage' | 'streak_weeks' | 'mind_percentage' | 'body_percentage' | 'mission_percentage'

const TIME_PERIODS: { key: TimePeriod; label: string }[] = [
  { key: 'this_week', label: 'This Week' },
  { key: 'last_week', label: 'Last Week' },
  { key: 'all_time', label: 'All Time' },
]

const SORT_KEYS: { key: SortKey; label: string }[] = [
  { key: 'overall_percentage', label: 'Overall %' },
  { key: 'streak_weeks', label: 'Streak' },
  { key: 'mind_percentage', label: '🧠 Mind' },
  { key: 'body_percentage', label: '💪 Body' },
  { key: 'mission_percentage', label: '🎯 Mission' },
]

function RankIcon({ rank }: { rank: number }) {
  if (rank === 1) return <Trophy className="w-5 h-5 text-amber-400" />
  if (rank === 2) return <Medal className="w-5 h-5 text-gray-300" />
  if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />
  return <span className="text-[#444] text-sm font-semibold w-5 text-center tabular-nums">{rank}</span>
}

export default function LeaderboardPage() {
  const { user } = useAuth()
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('this_week')
  const [sortKey, setSortKey] = useState<SortKey>('overall_percentage')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const { entries, loading } = useLeaderboard(timePeriod)

  const sorted = [...entries].sort((a, b) => b[sortKey] - a[sortKey])
  const myRank = sorted.findIndex(e => e.user_id === user?.id) + 1
  const myEntry = sorted.find(e => e.user_id === user?.id)

  return (
    <div className="p-4 sm:p-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#F5F1ED] mb-2">Leaderboard</h1>
        <p className="text-[#555] text-sm">Accountability rankings across the Ascend cohort.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        {/* Time period */}
        <div className="flex gap-1 bg-[#0D0D0D] border border-[#1F1F1F] rounded-lg p-1">
          {TIME_PERIODS.map(t => (
            <button
              key={t.key}
              onClick={() => setTimePeriod(t.key)}
              className={cn(
                'px-3 py-1.5 rounded-md text-xs font-medium transition-colors',
                timePeriod === t.key ? 'bg-[#C64E3A] text-white' : 'text-[#666] hover:text-[#F5F1ED]'
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex gap-1 bg-[#0D0D0D] border border-[#1F1F1F] rounded-lg p-1 flex-wrap">
          {SORT_KEYS.map(s => (
            <button
              key={s.key}
              onClick={() => setSortKey(s.key)}
              className={cn(
                'px-3 py-1.5 rounded-md text-xs font-medium transition-colors',
                sortKey === s.key ? 'bg-[#1F1F1F] text-[#F5F1ED]' : 'text-[#555] hover:text-[#999]'
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* My position banner (if not in top 10) */}
      {myEntry && myRank > 10 && (
        <div className="mb-4 px-4 py-3 bg-[#1A0D0A] border border-[#C64E3A]/30 rounded-xl flex items-center gap-3">
          <span className="text-[#C64E3A] text-sm font-medium">You're #{myRank} of {sorted.length}</span>
          <span className="text-[#555] text-xs">Track your goals consistently to climb the board.</span>
        </div>
      )}

      {loading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-[#111] animate-pulse rounded-lg mb-2" />
          ))}
        </div>
      ) : sorted.length === 0 ? (
        <EmptyState
          icon={<Trophy className="w-8 h-8" />}
          title="No entries yet"
          description="Be the first to complete your accountability goals this week."
        />
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden sm:block bg-[#0D0D0D] border border-[#1F1F1F] rounded-2xl overflow-hidden mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1A1A1A]">
                  <th className="text-left px-5 py-3 text-[#444] font-medium text-xs uppercase tracking-wider w-12">#</th>
                  <th className="text-left px-5 py-3 text-[#444] font-medium text-xs uppercase tracking-wider">Student</th>
                  <th
                    className={cn('px-4 py-3 text-xs uppercase tracking-wider font-medium cursor-pointer hover:text-[#F5F1ED] transition-colors', sortKey === 'overall_percentage' ? 'text-[#C64E3A]' : 'text-[#444]')}
                    onClick={() => setSortKey('overall_percentage')}
                  >Overall</th>
                  <th
                    className={cn('px-4 py-3 text-xs uppercase tracking-wider font-medium cursor-pointer hover:text-[#F5F1ED] transition-colors hidden lg:table-cell', sortKey === 'mind_percentage' ? 'text-purple-400' : 'text-[#444]')}
                    onClick={() => setSortKey('mind_percentage')}
                  >🧠 Mind</th>
                  <th
                    className={cn('px-4 py-3 text-xs uppercase tracking-wider font-medium cursor-pointer hover:text-[#F5F1ED] transition-colors hidden lg:table-cell', sortKey === 'body_percentage' ? 'text-green-400' : 'text-[#444]')}
                    onClick={() => setSortKey('body_percentage')}
                  >💪 Body</th>
                  <th
                    className={cn('px-4 py-3 text-xs uppercase tracking-wider font-medium cursor-pointer hover:text-[#F5F1ED] transition-colors hidden lg:table-cell', sortKey === 'mission_percentage' ? 'text-[#C64E3A]' : 'text-[#444]')}
                    onClick={() => setSortKey('mission_percentage')}
                  >🎯 Mission</th>
                  <th
                    className={cn('px-4 py-3 text-xs uppercase tracking-wider font-medium cursor-pointer hover:text-[#F5F1ED] transition-colors', sortKey === 'streak_weeks' ? 'text-amber-400' : 'text-[#444]')}
                    onClick={() => setSortKey('streak_weeks')}
                  >Streak</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((entry, i) => {
                  const rank = i + 1
                  const isMe = entry.user_id === user?.id
                  return (
                    <tr
                      key={entry.user_id}
                      className={cn(
                        'border-b border-[#111] last:border-0 transition-colors',
                        isMe ? 'bg-[#1A0D0A]' : 'hover:bg-[#111]'
                      )}
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center justify-center w-6">
                          <RankIcon rank={rank} />
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold',
                            isMe ? 'bg-[#C64E3A] text-white' : 'bg-[#1F1F1F] text-[#666]'
                          )}>
                            {entry.name?.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <span className={cn('font-medium', isMe ? 'text-[#C64E3A]' : 'text-[#F5F1ED]')}>
                              {entry.name}
                            </span>
                            {isMe && <span className="text-[#555] text-xs ml-2">← you</span>}
                          </div>
                        </div>
                      </td>
                      <td className={cn('px-4 py-3.5 text-center font-bold', entry.overall_percentage === 100 ? 'text-green-400' : 'text-[#F5F1ED]')}>
                        {entry.overall_percentage}%
                      </td>
                      <td className="px-4 py-3.5 text-center text-purple-400 text-sm hidden lg:table-cell">{entry.mind_percentage}%</td>
                      <td className="px-4 py-3.5 text-center text-green-400 text-sm hidden lg:table-cell">{entry.body_percentage}%</td>
                      <td className="px-4 py-3.5 text-center text-[#C64E3A] text-sm hidden lg:table-cell">{entry.mission_percentage}%</td>
                      <td className="px-4 py-3.5 text-center">
                        {entry.streak_weeks > 0 ? (
                          <span className="flex items-center justify-center gap-1 text-amber-400 text-sm font-medium">
                            <Flame className="w-3.5 h-3.5" />
                            {entry.streak_weeks}w
                          </span>
                        ) : (
                          <span className="text-[#333] text-sm">—</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="sm:hidden space-y-2 mb-4">
            {sorted.map((entry, i) => {
              const rank = i + 1
              const isMe = entry.user_id === user?.id
              const expanded = expandedId === entry.user_id
              return (
                <div
                  key={entry.user_id}
                  className={cn(
                    'rounded-xl border overflow-hidden',
                    isMe ? 'bg-[#1A0D0A] border-[#C64E3A]/30' : 'bg-[#0D0D0D] border-[#1F1F1F]'
                  )}
                >
                  <button
                    className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
                    onClick={() => setExpandedId(expanded ? null : entry.user_id)}
                  >
                    <div className="w-7 flex items-center justify-center flex-shrink-0">
                      <RankIcon rank={rank} />
                    </div>
                    <div className={cn('w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold', isMe ? 'bg-[#C64E3A] text-white' : 'bg-[#1F1F1F] text-[#666]')}>
                      {entry.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={cn('font-medium text-sm truncate', isMe ? 'text-[#C64E3A]' : 'text-[#F5F1ED]')}>
                        {entry.name} {isMe && <span className="text-[#444] text-xs">(you)</span>}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className={cn('font-bold', entry.overall_percentage === 100 ? 'text-green-400' : 'text-[#F5F1ED]')}>
                        {entry.overall_percentage}%
                      </span>
                      {entry.streak_weeks > 0 && (
                        <span className="text-amber-400 text-xs flex items-center gap-0.5">
                          <Flame className="w-3 h-3" />{entry.streak_weeks}w
                        </span>
                      )}
                      {expanded ? <ChevronUp className="w-4 h-4 text-[#444]" /> : <ChevronDown className="w-4 h-4 text-[#444]" />}
                    </div>
                  </button>
                  {expanded && (
                    <div className="px-4 pb-4 grid grid-cols-3 gap-3 border-t border-[#1A1A1A] pt-3">
                      <div className="text-center">
                        <p className="text-purple-400 font-bold">{entry.mind_percentage}%</p>
                        <p className="text-[#444] text-xs">🧠 Mind</p>
                      </div>
                      <div className="text-center">
                        <p className="text-green-400 font-bold">{entry.body_percentage}%</p>
                        <p className="text-[#444] text-xs">💪 Body</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[#C64E3A] font-bold">{entry.mission_percentage}%</p>
                        <p className="text-[#444] text-xs">🎯 Mission</p>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <p className="text-[#333] text-xs text-center">
            {sorted.length} student{sorted.length !== 1 ? 's' : ''} on the leaderboard
            {myRank > 0 && ` · You're #${myRank}`}
          </p>
        </>
      )}
    </div>
  )
}
