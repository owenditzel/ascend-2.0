import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number
  max?: number
  className?: string
  color?: string
}

export function ProgressBar({ value, max = 100, className, color = '#C64E3A' }: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  return (
    <div className={cn('w-full bg-[#2D2D2D] rounded-full overflow-hidden', className)} style={{ minHeight: '6px' }}>
      <div
        className="h-full rounded-full"
        style={{ width: `${pct}%`, backgroundColor: color, minHeight: '6px', transition: 'width 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
      />
    </div>
  )
}
