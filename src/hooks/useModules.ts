import { useEffect, useState } from 'react'
import { supabase } from '@/config/supabase'
import type { Module } from '@/types'

export function useModules() {
  const [modules, setModules] = useState<Module[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    supabase
      .from('modules')
      .select('*')
      .order('order')
      .then(({ data, error }) => {
        if (error) setError(error.message)
        else setModules(data || [])
        setLoading(false)
      })
  }, [])

  return { modules, loading, error }
}

export function useModule(id: number) {
  const [module, setModule] = useState<Module | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    supabase
      .from('modules')
      .select('*, lessons(*)')
      .eq('id', id)
      .single()
      .then(({ data, error }) => {
        if (error) setError(error.message)
        else setModule(data)
        setLoading(false)
      })
  }, [id])

  return { module, loading, error }
}
