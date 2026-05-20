import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useResources } from '@/hooks/useResources'
import { useAuth } from '@/contexts/AuthContext'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/toast'
import { cn } from '@/lib/utils'
import { Search, Download, Lock, FileText, SortAsc, ChevronDown, BookOpen } from 'lucide-react'
import { EmptyState } from '@/components/ui/empty-state'

const CATEGORIES = ['All', 'Script', 'Template', 'Worksheet', 'Checklist', 'Guide']
const SORT_OPTIONS = [
  { key: 'default', label: 'Default' },
  { key: 'downloads', label: 'Most Downloaded' },
  { key: 'az', label: 'A–Z' },
]

// Course module resource categories — locked for community tier
const COURSE_MODULE_IDS = [1, 2, 3, 4, 5, 6, 7, 8]

export default function ResourcesPage() {
  const { user } = useAuth()
  const { resources, loading, downloadResource } = useResources()
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeModule, setActiveModule] = useState<number | 'all'>('all')
  const [sort, setSort] = useState('default')
  const [sortOpen, setSortOpen] = useState(false)
  const [downloading, setDownloading] = useState<number | null>(null)

  const isFull = user?.tier === 'full'

  const modules = useMemo(() => {
    const ids = [...new Set(resources.map(r => r.module_id).filter(Boolean))]
    return ids.sort((a, b) => (a ?? 0) - (b ?? 0))
  }, [resources])

  const filtered = useMemo(() => {
    let list = [...resources]
    if (search) {
      const q = search.toLowerCase()
      list = list.filter(r => r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q))
    }
    if (activeCategory !== 'All') list = list.filter(r => r.category === activeCategory)
    if (activeModule !== 'all') list = list.filter(r => r.module_id === activeModule)
    if (sort === 'downloads') list.sort((a, b) => b.download_count - a.download_count)
    if (sort === 'az') list.sort((a, b) => a.title.localeCompare(b.title))
    return list
  }, [resources, search, activeCategory, activeModule, sort])

  function isLocked(r: { module_id?: number | null }): boolean {
    if (isFull) return false
    return !!r.module_id && COURSE_MODULE_IDS.includes(r.module_id)
  }

  async function handleDownload(r: typeof resources[0]) {
    if (isLocked(r)) return
    setDownloading(r.id)
    await downloadResource(r)
    setDownloading(null)
    toast(`Downloaded: ${r.title}`)
  }

  return (
    <div className="p-4 sm:p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#F5F1ED] mb-2">Templates, Scripts & Swipe Files</h1>
        <p className="text-[#555] text-sm">
          {isFull ? `${resources.length} resources available for download.` : 'Mindset track resources included. Upgrade to unlock course module resources.'}
        </p>
      </div>

      {/* Search + sort row */}
      <div className="flex gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#444]" />
          <input
            type="text"
            placeholder="Search resources..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#111] border border-[#2D2D2D] rounded-lg text-[#F5F1ED] placeholder-[#444] focus:outline-none focus:border-[#C64E3A] text-sm transition-colors"
          />
        </div>
        <div className="relative">
          <button
            onClick={() => setSortOpen(v => !v)}
            className="flex items-center gap-2 px-3 py-2.5 bg-[#111] border border-[#2D2D2D] rounded-lg text-[#666] hover:text-[#F5F1ED] text-sm transition-colors"
          >
            <SortAsc className="w-4 h-4" />
            <span className="hidden sm:inline">{SORT_OPTIONS.find(s => s.key === sort)?.label}</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          {sortOpen && (
            <div className="absolute right-0 top-full mt-1 bg-[#111] border border-[#2D2D2D] rounded-xl overflow-hidden z-20 min-w-[150px] shadow-xl">
              {SORT_OPTIONS.map(s => (
                <button
                  key={s.key}
                  onClick={() => { setSort(s.key); setSortOpen(false) }}
                  className={cn('w-full text-left px-4 py-2.5 text-sm transition-colors', sort === s.key ? 'text-[#C64E3A] bg-[#1A0D0A]' : 'text-[#888] hover:text-[#F5F1ED] hover:bg-[#1A1A1A]')}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-3">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
              activeCategory === cat ? 'bg-[#C64E3A] text-white' : 'bg-[#111] border border-[#2D2D2D] text-[#555] hover:text-[#F5F1ED]'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Module filters */}
      {modules.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveModule('all')}
            className={cn('px-3 py-1 rounded-full text-xs transition-colors', activeModule === 'all' ? 'bg-[#1F1F1F] text-[#F5F1ED]' : 'text-[#444] hover:text-[#666]')}
          >
            All Modules
          </button>
          {modules.map(mid => (
            <button
              key={mid}
              onClick={() => setActiveModule(mid!)}
              className={cn('px-3 py-1 rounded-full text-xs transition-colors', activeModule === mid ? 'bg-[#1F1F1F] text-[#F5F1ED]' : 'text-[#444] hover:text-[#666]')}
            >
              Module {mid}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-48 bg-[#111] border border-[#2D2D2D] rounded-xl animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={<BookOpen className="w-8 h-8" />}
          title="No resources found"
          description="Try changing your filters or check back later."
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(r => {
            const locked = isLocked(r)
            return (
              <div
                key={r.id}
                className={cn(
                  'group relative bg-[#0D0D0D] border border-[#1F1F1F] rounded-xl overflow-hidden transition-all duration-200',
                  !locked && 'hover:border-[#C64E3A]/40 hover:-translate-y-0.5'
                )}
              >
                <div className="p-5 flex flex-col h-full">
                  {/* Top: icon + badges */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#C64E3A]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-[#C64E3A]" />
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      <Badge variant="orange">{r.category}</Badge>
                      {r.module_id && (
                        <Badge className="text-[#444] bg-[#1A1A1A] border-0">Module {r.module_id}</Badge>
                      )}
                    </div>
                  </div>

                  {/* Title + desc */}
                  <h3 className="text-[#F5F1ED] font-semibold text-sm mb-1.5 leading-snug">{r.title}</h3>
                  <p className="text-[#666] text-xs leading-relaxed flex-1 mb-4">{r.description}</p>

                  {/* Footer */}
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[#333] text-xs">{r.download_count > 0 ? `${r.download_count} downloads` : 'Be the first'}</span>
                    <button
                      onClick={() => handleDownload(r)}
                      disabled={locked || downloading === r.id}
                      className={cn(
                        'flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all',
                        locked
                          ? 'text-[#333] cursor-not-allowed'
                          : 'bg-[#C64E3A]/10 text-[#C64E3A] hover:bg-[#C64E3A]/20'
                      )}
                    >
                      {downloading === r.id ? (
                        <span className="w-3.5 h-3.5 border border-[#C64E3A] border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Download className="w-3.5 h-3.5" />
                      )}
                      Download
                    </button>
                  </div>
                </div>

                {/* Locked overlay */}
                {locked && (
                  <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 text-center">
                    <Lock className="w-6 h-6 text-[#C64E3A] mb-2" />
                    <p className="text-[#F5F1ED] text-xs font-semibold mb-1">Ascend 2.0 Resource</p>
                    <p className="text-[#666] text-xs mb-3">Upgrade to unlock all 60+ resources</p>
                    <Link to="/upgrade">
                      <Button size="sm" className="text-xs py-1">Upgrade to Unlock</Button>
                    </Link>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {!loading && filtered.length > 0 && (
        <p className="text-[#333] text-xs text-center mt-6">{filtered.length} resource{filtered.length !== 1 ? 's' : ''}</p>
      )}
    </div>
  )
}
