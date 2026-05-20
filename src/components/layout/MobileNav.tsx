import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, BookOpen, Target, FolderOpen, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const items = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Home' },
  { to: '/modules', icon: BookOpen, label: 'Modules' },
  { to: '/accountability', icon: Target, label: 'Goals' },
  { to: '/resources', icon: FolderOpen, label: 'Resources' },
  { to: '/profile', icon: User, label: 'Profile' },
]

export function MobileNav() {
  const { pathname } = useLocation()
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#060606] border-t border-[#1A1A1A] z-40 lg:hidden safe-area-bottom">
      <ul className="flex h-16">
        {items.map(({ to, icon: Icon, label }) => {
          const active = pathname === to || (to !== '/dashboard' && pathname.startsWith(to + '/'))
          return (
            <li key={to} className="flex-1">
              <Link
                to={to}
                className={cn(
                  'flex flex-col items-center justify-center h-full gap-1 transition-colors',
                  active ? 'text-[#C64E3A]' : 'text-[#555]'
                )}
              >
                <Icon className={cn('w-5 h-5 transition-transform', active && 'scale-110')} />
                <span className="text-[10px] font-medium">{label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
