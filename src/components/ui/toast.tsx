import { useEffect, useState } from 'react'
import { CheckCircle, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ToastMessage {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}

let toastListeners: ((t: ToastMessage) => void)[] = []

export function toast(message: string, type: ToastMessage['type'] = 'success') {
  const t: ToastMessage = { id: Date.now().toString(), message, type }
  toastListeners.forEach(fn => fn(t))
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  useEffect(() => {
    const handler = (t: ToastMessage) => {
      setToasts(prev => [...prev, t])
      setTimeout(() => setToasts(prev => prev.filter(x => x.id !== t.id)), 3500)
    }
    toastListeners.push(handler)
    return () => { toastListeners = toastListeners.filter(fn => fn !== handler) }
  }, [])

  if (!toasts.length) return null

  return (
    <div className="fixed bottom-24 lg:bottom-6 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map(t => (
        <div
          key={t.id}
          className={cn(
            'flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border text-sm font-medium max-w-xs pointer-events-auto',
            t.type === 'success' && 'bg-[#0A1A0F] border-green-500/30 text-green-400',
            t.type === 'error' && 'bg-[#1A0808] border-red-500/30 text-red-400',
            t.type === 'info' && 'bg-[#111] border-[#2D2D2D] text-[#F5F1ED]',
          )}
        >
          {t.type === 'success' && <CheckCircle className="w-4 h-4 flex-shrink-0" />}
          {t.type === 'error' && <AlertCircle className="w-4 h-4 flex-shrink-0" />}
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  )
}
