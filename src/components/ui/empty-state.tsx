import { cn } from '@/lib/utils'

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 px-4 text-center', className)}>
      {icon && (
        <div className="w-16 h-16 rounded-2xl bg-[#111] border border-[#2D2D2D] flex items-center justify-center mb-4 text-[#444]">
          {icon}
        </div>
      )}
      <h3 className="text-[#F5F1ED] font-semibold mb-2">{title}</h3>
      {description && <p className="text-[#555] text-sm max-w-xs mb-4">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}
