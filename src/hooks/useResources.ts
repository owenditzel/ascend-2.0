import { RESOURCES } from '@/data/curriculum'
import type { Resource } from '@/types'

export function useResources(moduleId?: number) {
  const resources = moduleId
    ? RESOURCES.filter(r => r.module_id === moduleId)
    : RESOURCES

  function downloadResource(resource: Resource): void {
    if (resource.file_url && resource.file_url !== '#') {
      window.open(resource.file_url, '_blank')
    }
  }

  return { resources, loading: false, downloadResource }
}

export function useResource(id: number) {
  const resource: Resource | null = RESOURCES.find(r => r.id === id) ?? null

  function downloadResource(r: Resource): void {
    if (r.file_url && r.file_url !== '#') {
      window.open(r.file_url, '_blank')
    }
  }

  return { resource, loading: false, downloadResource }
}
