import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'orange'
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = {
    default: 'bg-[#2D2D2D] text-[#F5F1ED]',
    success: 'bg-[#1a3327] text-green-400',
    warning: 'bg-[#3d2a0a] text-amber-400',
    orange: 'bg-[#3d1a14] text-[#C64E3A]',
  }
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', variants[variant], className)}>
      {children}
    </span>
  )
}
