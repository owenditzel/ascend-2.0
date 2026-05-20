import { cn } from '@/lib/utils'

export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn('animate-pulse bg-[#1A1A1A] rounded', className)} />
  )
}

export function CardSkeleton() {
  return (
    <div className="bg-[#111] border border-[#2D2D2D] rounded-xl p-5">
      <Skeleton className="h-4 w-1/3 mb-3" />
      <Skeleton className="h-5 w-2/3 mb-2" />
      <Skeleton className="h-3 w-full mb-1" />
      <Skeleton className="h-3 w-4/5" />
    </div>
  )
}
