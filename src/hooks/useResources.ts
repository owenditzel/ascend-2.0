import { useEffect, useState } from 'react'
import { supabase } from '@/config/supabase'
import type { Resource } from '@/types'

export function useResources(moduleId?: number) {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let q = supabase.from('resources').select('*').order('category').order('title')
    if (moduleId) q = q.eq('module_id', moduleId)
    q.then(({ data }) => {
      setResources(data || [])
      setLoading(false)
    })
  }, [moduleId])

  async function downloadResource(resource: Resource): Promise<void> {
    // Increment download count
    await supabase
      .from('resources')
      .update({ download_count: resource.download_count + 1 })
      .eq('id', resource.id)
    setResources(prev =>
      prev.map(r => r.id === resource.id ? { ...r, download_count: r.download_count + 1 } : r)
    )
    // Trigger download
    if (resource.file_url && resource.file_url !== '#') {
      const a = document.createElement('a')
      a.href = resource.file_url
      a.download = resource.title
      a.target = '_blank'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  return { resources, loading, downloadResource }
}

export function useResource(id: number) {
  const [resource, setResource] = useState<Resource | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    supabase.from('resources').select('*').eq('id', id).single()
      .then(({ data }) => { setResource(data); setLoading(false) })
  }, [id])

  async function downloadResource(r: Resource): Promise<void> {
    await supabase.from('resources').update({ download_count: r.download_count + 1 }).eq('id', r.id)
    setResource(prev => prev ? { ...prev, download_count: prev.download_count + 1 } : prev)
    if (r.file_url && r.file_url !== '#') {
      const a = document.createElement('a')
      a.href = r.file_url
      a.download = r.title
      a.target = '_blank'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  return { resource, loading, downloadResource }
}
