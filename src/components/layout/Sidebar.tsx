import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, BookOpen, FolderOpen, Target, Trophy,
  User, ShieldCheck, LogOut, ChevronRight, Users
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useModules } from '@/hooks/useModules'
import { useProgress } from '@/hooks/useProgress'
import { ProgressRing } from '@/components/ui/progress-ring'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/modules', icon: BookOpen, label: 'Curriculum' },
  { to: '/resources', icon: FolderOpen, label: 'Resources' },
  { to: '/accountability', icon: Target, label: 'Accountability' },
  { to: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
  { to: '/community', icon: Users, label: 'Community' },
  { to: '/profile', icon: User, label: 'Profile' },
]

export function Sidebar() {
  const { pathname } = useLocation()
  const { user, signOut } = useAuth()
  const { modules } = useModules()
  const { completedLessonIds } = useProgress(user?.id)

  const totalLessons = modules.reduce((acc, m) => acc + (m.lessons?.length || 0), 0)
  const progressPct = totalLessons > 0 ? Math.round((completedLessonIds.size / totalLessons) * 100) : 0

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-[#060606] border-r border-[#1A1A1A] flex flex-col z-40 hidden lg:flex">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-[#1A1A1A]">
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#C64E3A] rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <div>
            <span className="text-[#F5F1ED] font-bold text-base tracking-tight">ASCEND</span>
            <span className="text-[#444] text-xs block -mt-0.5">2.0</span>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <ul className="space-y-0.5">
          {navItems.map(({ to, icon: Icon, label }) => {
            const active = pathname === to || (to !== '/dashboard' && pathname.startsWith(to + '/'))
            return (
              <li key={to}>
                <Link
                  to={to}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150',
                    active
                      ? 'bg-[#C64E3A]/15 text-[#C64E3A] font-medium'
                      : 'text-[#777] hover:text-[#F5F1ED] hover:bg-[#111]'
                  )}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="flex-1">{label}</span>
                  {active && <ChevronRight className="w-3 h-3 opacity-60" />}
                </Link>
              </li>
            )
          })}
          {(
            <li>
              <Link
                to="/admin"
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150',
                  pathname.startsWith('/admin')
                    ? 'bg-[#C64E3A]/15 text-[#C64E3A] font-medium'
                    : 'text-[#777] hover:text-[#F5F1ED] hover:bg-[#111]'
                )}
              >
                <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                <span className="flex-1">Admin</span>
              </Link>
            </li>
          )}
        </ul>

        {/* Progress ring */}
        {totalLessons > 0 && (
          <div className="mt-6 flex flex-col items-center py-5 border-y border-[#1A1A1A]">
            <ProgressRing value={progressPct} size={96} strokeWidth={7} label="Complete" />
            <p className="text-[#555] text-xs mt-3">{completedLessonIds.size}/{totalLessons} lessons done</p>
          </div>
        )}
      </nav>

      {/* User card */}
      {user && (
        <div className="border-t border-[#1A1A1A] px-3 py-3">
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg mb-1">
            <div className="w-8 h-8 rounded-full bg-[#C64E3A] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">{user.name?.charAt(0).toUpperCase()}</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[#F5F1ED] text-xs font-medium truncate">{user.name}</p>
              <p className="text-[#444] text-[10px] truncate">{user.tier === 'full' ? 'Full Access' : 'Community'}</p>
            </div>
          </div>
          <button
            onClick={signOut}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#555] hover:text-red-400 hover:bg-[#1A0808] w-full transition-all duration-150"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      )}
    </aside>
  )
}
