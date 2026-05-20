import { useParams, Link } from 'react-router-dom'
import { useResource, useResources } from '@/hooks/useResources'
import { useAuth } from '@/contexts/AuthContext'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/toast'
import { Download, ArrowLeft, Lock, FileText, Users } from 'lucide-react'
import { useState } from 'react'

const COURSE_MODULE_IDS = [1, 2, 3, 4, 5, 6, 7, 8]

export default function ResourceDetailPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const { resource, loading, downloadResource } = useResource(Number(id))
  const { resources } = useResources()
  const [downloading, setDownloading] = useState(false)

  const isFull = user?.tier === 'full'
  const isLocked = resource?.module_id
    ? COURSE_MODULE_IDS.includes(resource.module_id) && !isFull
    : false

  const related = resources
    .filter(r => r.id !== resource?.id && (r.module_id === resource?.module_id || r.category === resource?.category))
    .slice(0, 3)

  async function handleDownload() {
    if (!resource || isLocked) return
    setDownloading(true)
    await downloadResource(resource)
    setDownloading(false)
    toast(`Downloaded: ${resource.title}`)
  }

  if (loading) {
    return (
      <div className="p-4 sm:p-8 max-w-3xl">
        <div className="h-4 w-32 bg-[#1A1A1A] animate-pulse rounded mb-6" />
        <div className="h-8 w-2/3 bg-[#1A1A1A] animate-pulse rounded mb-3" />
        <div className="h-48 bg-[#1A1A1A] animate-pulse rounded-xl" />
      </div>
    )
  }

  if (!resource) {
    return (
      <div className="p-8 text-center">
        <p className="text-[#666] mb-4">Resource not found.</p>
        <Link to="/resources"><Button variant="secondary">Back to Resources</Button></Link>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-8 max-w-3xl">
      <Link to="/resources" className="inline-flex items-center gap-2 text-[#555] text-sm hover:text-[#F5F1ED] mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Resources
      </Link>

      <div className="flex items-start gap-4 mb-6">
        <div className="w-14 h-14 bg-[#C64E3A]/10 rounded-xl flex items-center justify-center flex-shrink-0">
          <FileText className="w-7 h-7 text-[#C64E3A]" />
        </div>
        <div>
          <div className="flex flex-wrap gap-2 mb-2">
            <Badge variant="orange">{resource.category}</Badge>
            {resource.module_id && <Badge>Module {resource.module_id}</Badge>}
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#F5F1ED]">{resource.title}</h1>
        </div>
      </div>

      <p className="text-[#888] mb-6 leading-relaxed">{resource.description}</p>

      <div className="flex items-center gap-4 mb-8">
        {isLocked ? (
          <div className="flex-1">
            <div className="flex items-center gap-3 p-4 bg-[#1A0D0A] border border-[#C64E3A]/30 rounded-xl mb-3">
              <Lock className="w-5 h-5 text-[#C64E3A] flex-shrink-0" />
              <div>
                <p className="text-[#F5F1ED] text-sm font-medium">Ascend 2.0 Resource</p>
                <p className="text-[#666] text-xs">Upgrade to Full Access to download all 60+ resources.</p>
              </div>
            </div>
            <Link to="/upgrade"><Button size="lg" className="w-full">Upgrade to Download</Button></Link>
          </div>
        ) : (
          <Button size="lg" onClick={handleDownload} loading={downloading} className="flex-1 sm:flex-none">
            <Download className="w-4 h-4 mr-2" />
            Download {resource.title}
          </Button>
        )}
        <div className="flex items-center gap-1.5 text-[#444] text-sm">
          <Users className="w-4 h-4" />
          <span>{resource.download_count} download{resource.download_count !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Related resources */}
      {related.length > 0 && (
        <div>
          <h2 className="text-[#F5F1ED] font-semibold mb-3">Related Resources</h2>
          <div className="space-y-2">
            {related.map(r => (
              <Link
                key={r.id}
                to={`/resources/${r.id}`}
                className="flex items-center gap-3 p-3.5 bg-[#0D0D0D] border border-[#1F1F1F] rounded-xl hover:border-[#C64E3A]/30 transition-all"
              >
                <FileText className="w-4 h-4 text-[#C64E3A] flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[#F5F1ED] text-sm font-medium truncate">{r.title}</p>
                  <p className="text-[#444] text-xs">{r.category}</p>
                </div>
                <Badge variant="orange" className="text-[10px]">{r.category}</Badge>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
