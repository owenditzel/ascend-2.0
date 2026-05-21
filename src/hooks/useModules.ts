import { MODULES } from '@/data/curriculum'
import type { Module } from '@/types'

export function useModules() {
  const sorted = [...MODULES].sort((a, b) => a.order - b.order)
  return { modules: sorted, loading: false }
}

export function useModule(id: number) {
  const module: Module | null = MODULES.find(m => m.id === id) ?? null
  return { module, loading: false }
}
