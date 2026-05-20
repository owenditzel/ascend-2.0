import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/config/supabase'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ProgressBar } from '@/components/ui/progress-bar'
import { cn, formatDate } from '@/lib/utils'
import {
  Users, BookOpen, TrendingUp, Search, X,
  ChevronDown, ChevronUp, Pencil, Trash2, Plus,
  Eye, BarChart2, Download
} from 'lucide-react'
import type { User, Module, Resource } from '@/types'

type AdminTab = 'students' | 'content' | 'analytics'
type StudentStatus = 'active' | 'paused' | 'completed' | 'dropped'

// ─── Reusable Modal ───────────────────────────────────────────────
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0D0D0D] border border-[#2D2D2D] rounded-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1F1F1F]">
          <h3 className="text-[#F5F1ED] font-semibold">{title}</h3>
          <button onClick={onClose} className="text-[#444] hover:text-[#F5F1ED] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="overflow-y-auto flex-1 px-6 py-5">{children}</div>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <label className="text-[#888] text-xs font-medium uppercase tracking-wider block mb-1.5">{label}</label>
      {children}
    </div>
  )
}

function TextInput({ value, onChange, placeholder, type = 'text' }: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2.5 bg-[#111] border border-[#2D2D2D] rounded-lg text-[#F5F1ED] placeholder-[#444] focus:outline-none focus:border-[#C64E3A] text-sm transition-colors"
    />
  )
}

function TextArea({ value, onChange, placeholder, rows = 3 }: { value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-3 py-2.5 bg-[#111] border border-[#2D2D2D] rounded-lg text-[#F5F1ED] placeholder-[#444] focus:outline-none focus:border-[#C64E3A] text-sm transition-colors resize-none"
    />
  )
}

// ─── Students Tab ──────────────────────────────────────────────────
function StudentsTab() {
  const [students, setStudents] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<StudentStatus | 'all'>('all')
  const [sortKey, setSortKey] = useState<'name' | 'created_at' | 'status'>('created_at')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [selectedStudent, setSelectedStudent] = useState<User | null>(null)
  const [editingStatus, setEditingStatus] = useState<string | null>(null)
  const [studentProgress, setStudentProgress] = useState<{ completed: number; total: number } | null>(null)

  const loadStudents = useCallback(async () => {
    const { data } = await supabase.from('users').select('*').order('created_at', { ascending: false })
    setStudents(data || [])
    setLoading(false)
  }, [])

  useEffect(() => { loadStudents() }, [loadStudents])

  async function updateStatus(userId: string, status: StudentStatus) {
    await supabase.from('users').update({ status, updated_at: new Date().toISOString() }).eq('id', userId)
    setStudents(prev => prev.map(s => s.id === userId ? { ...s, status } : s))
    setEditingStatus(null)
  }

  async function openStudentDetail(student: User) {
    setSelectedStudent(student)
    const { data: prog } = await supabase.from('progress').select('*').eq('user_id', student.id).eq('completed', true)
    const { data: lessons } = await supabase.from('lessons').select('id')
    setStudentProgress({ completed: prog?.length || 0, total: lessons?.length || 0 })
  }

  const filtered = students
    .filter(s => {
      const q = search.toLowerCase()
      return !q || s.name?.toLowerCase().includes(q) || s.email?.toLowerCase().includes(q)
    })
    .filter(s => statusFilter === 'all' || s.status === statusFilter)
    .sort((a, b) => {
      let av = a[sortKey] ?? ''
      let bv = b[sortKey] ?? ''
      if (typeof av === 'string') av = av.toLowerCase()
      if (typeof bv === 'string') bv = bv.toLowerCase()
      return sortDir === 'asc' ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1)
    })

  const counts = {
    active: students.filter(s => s.status === 'active').length,
    paused: students.filter(s => s.status === 'paused').length,
    completed: students.filter(s => s.status === 'completed').length,
    dropped: students.filter(s => s.status === 'dropped').length,
  }

  function SortButton({ k, label }: { k: typeof sortKey; label: string }) {
    const active = sortKey === k
    return (
      <button
        onClick={() => { if (active) setSortDir(d => d === 'asc' ? 'desc' : 'asc'); else { setSortKey(k); setSortDir('desc') } }}
        className={cn('flex items-center gap-1 text-xs font-medium uppercase tracking-wider transition-colors', active ? 'text-[#C64E3A]' : 'text-[#444] hover:text-[#888]')}
      >
        {label}
        {active && (sortDir === 'desc' ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />)}
      </button>
    )
  }

  return (
    <div>
      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {(Object.entries(counts) as [StudentStatus, number][]).map(([status, count]) => (
          <button
            key={status}
            onClick={() => setStatusFilter(statusFilter === status ? 'all' : status)}
            className={cn(
              'p-4 rounded-xl border text-left transition-all',
              statusFilter === status ? 'border-[#C64E3A]/40 bg-[#1A0D0A]' : 'bg-[#0D0D0D] border-[#1F1F1F] hover:border-[#2D2D2D]'
            )}
          >
            <p className="text-2xl font-bold text-[#F5F1ED]">{count}</p>
            <p className="text-[#555] text-xs capitalize mt-0.5">{status}</p>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="flex gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#444]" />
          <input
            placeholder="Search by name or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#111] border border-[#2D2D2D] rounded-lg text-[#F5F1ED] placeholder-[#444] focus:outline-none focus:border-[#C64E3A] text-sm transition-colors"
          />
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="space-y-2">{[...Array(5)].map((_, i) => <div key={i} className="h-12 bg-[#111] rounded-xl animate-pulse" />)}</div>
      ) : (
        <div className="bg-[#0D0D0D] border border-[#1F1F1F] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[600px]">
              <thead>
                <tr className="border-b border-[#1A1A1A]">
                  <th className="text-left px-5 py-3"><SortButton k="name" label="Name" /></th>
                  <th className="text-left px-5 py-3 text-[#444] font-medium text-xs uppercase tracking-wider hidden md:table-cell">Email</th>
                  <th className="text-left px-5 py-3"><SortButton k="created_at" label="Joined" /></th>
                  <th className="text-left px-5 py-3 text-[#444] font-medium text-xs uppercase tracking-wider">Tier</th>
                  <th className="text-left px-5 py-3"><SortButton k="status" label="Status" /></th>
                  <th className="px-5 py-3 w-24" />
                </tr>
              </thead>
              <tbody>
                {filtered.map(student => (
                  <tr key={student.id} className="border-b border-[#111] last:border-0 hover:bg-[#111] transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#C64E3A]/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-[#C64E3A] text-xs font-bold">{student.name?.charAt(0).toUpperCase()}</span>
                        </div>
                        <span className="text-[#F5F1ED] font-medium">{student.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-[#555] text-sm hidden md:table-cell">{student.email}</td>
                    <td className="px-5 py-3.5 text-[#555] text-xs">{student.created_at ? formatDate(student.created_at) : '—'}</td>
                    <td className="px-5 py-3.5">
                      <Badge variant={student.tier === 'full' ? 'success' : 'default'}>{student.tier}</Badge>
                    </td>
                    <td className="px-5 py-3.5">
                      {editingStatus === student.id ? (
                        <select
                          autoFocus
                          defaultValue={student.status}
                          onChange={e => updateStatus(student.id, e.target.value as StudentStatus)}
                          onBlur={() => setEditingStatus(null)}
                          className="bg-[#111] border border-[#C64E3A]/40 rounded-lg text-[#F5F1ED] text-xs px-2 py-1 focus:outline-none"
                        >
                          {(['active', 'paused', 'completed', 'dropped'] as StudentStatus[]).map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      ) : (
                        <button onClick={() => setEditingStatus(student.id)}>
                          <Badge variant={student.status === 'active' ? 'success' : student.status === 'completed' ? 'success' : 'warning'}>
                            {student.status}
                          </Badge>
                        </button>
                      )}
                    </td>
                    <td className="px-5 py-3.5">
                      <button
                        onClick={() => openStudentDetail(student)}
                        className="flex items-center gap-1.5 text-[#555] hover:text-[#F5F1ED] text-xs transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 border-t border-[#1A1A1A]">
            <p className="text-[#333] text-xs">{filtered.length} student{filtered.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
      )}

      {/* Student detail modal */}
      {selectedStudent && (
        <Modal title={selectedStudent.name} onClose={() => { setSelectedStudent(null); setStudentProgress(null) }}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                { label: 'Email', val: selectedStudent.email },
                { label: 'Tier', val: selectedStudent.tier },
                { label: 'Status', val: selectedStudent.status },
                { label: 'Role', val: selectedStudent.role },
                { label: 'Joined', val: selectedStudent.created_at ? formatDate(selectedStudent.created_at) : '—' },
                { label: 'Cohort Start', val: selectedStudent.cohort_start_date ? formatDate(selectedStudent.cohort_start_date) : '—' },
              ].map(({ label, val }) => (
                <div key={label} className="bg-[#111] rounded-lg p-3">
                  <p className="text-[#444] text-xs mb-0.5">{label}</p>
                  <p className="text-[#F5F1ED] font-medium capitalize">{val}</p>
                </div>
              ))}
            </div>
            {studentProgress && (
              <div>
                <p className="text-[#888] text-xs mb-2">Course Progress</p>
                <ProgressBar value={studentProgress.total > 0 ? Math.round((studentProgress.completed / studentProgress.total) * 100) : 0} />
                <p className="text-[#444] text-xs mt-1">{studentProgress.completed}/{studentProgress.total} lessons</p>
              </div>
            )}
            <div className="flex gap-2 pt-2">
              <button
                onClick={async () => {
                  await updateStatus(selectedStudent.id, 'paused')
                  setSelectedStudent(null)
                }}
                className="flex-1 py-2 text-sm border border-[#2D2D2D] rounded-lg text-[#888] hover:text-[#F5F1ED] transition-colors"
              >
                Pause
              </button>
              <button
                onClick={async () => {
                  await updateStatus(selectedStudent.id, 'completed')
                  setSelectedStudent(null)
                }}
                className="flex-1 py-2 text-sm bg-green-700/20 border border-green-700/30 rounded-lg text-green-400 hover:bg-green-700/30 transition-colors"
              >
                Mark Complete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

// ─── Content Tab ───────────────────────────────────────────────────
function ContentTab() {
  const [modules, setModules] = useState<Module[]>([])
  const [resources, setResources] = useState<Resource[]>([])
  const [section, setSection] = useState<'modules' | 'resources'>('modules')
  const [editingModule, setEditingModule] = useState<Partial<Module> | null>(null)
  const [editingResource, setEditingResource] = useState<Partial<Resource> | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'module' | 'resource'; id: number; name: string } | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    supabase.from('modules').select('*').order('order').then(({ data }) => setModules(data || []))
    supabase.from('resources').select('*').order('category').then(({ data }) => setResources(data || []))
  }, [])

  async function saveModule() {
    if (!editingModule?.title) return
    setSaving(true)
    if (editingModule.id) {
      const { data } = await supabase.from('modules').update({
        title: editingModule.title,
        description: editingModule.description,
        order: editingModule.order,
        tier_availability: editingModule.tier_availability,
        updated_at: new Date().toISOString(),
      }).eq('id', editingModule.id).select().single()
      if (data) setModules(prev => prev.map(m => m.id === data.id ? data : m))
    } else {
      const { data } = await supabase.from('modules').insert({
        title: editingModule.title,
        description: editingModule.description || '',
        order: editingModule.order || modules.length + 1,
        tier_availability: editingModule.tier_availability || 'both',
        is_locked: false,
      }).select().single()
      if (data) setModules(prev => [...prev, data])
    }
    setSaving(false)
    setEditingModule(null)
  }

  async function deleteModule(id: number) {
    await supabase.from('modules').delete().eq('id', id)
    setModules(prev => prev.filter(m => m.id !== id))
    setDeleteTarget(null)
  }

  async function saveResource() {
    if (!editingResource?.title) return
    setSaving(true)
    if (editingResource.id) {
      const { data } = await supabase.from('resources').update({
        title: editingResource.title,
        description: editingResource.description,
        category: editingResource.category,
        file_url: editingResource.file_url,
        module_id: editingResource.module_id,
        updated_at: new Date().toISOString(),
      }).eq('id', editingResource.id).select().single()
      if (data) setResources(prev => prev.map(r => r.id === data.id ? data : r))
    } else {
      const { data } = await supabase.from('resources').insert({
        title: editingResource.title,
        description: editingResource.description || '',
        category: editingResource.category || 'Template',
        file_url: editingResource.file_url || '#',
        module_id: editingResource.module_id || null,
        download_count: 0,
      }).select().single()
      if (data) setResources(prev => [...prev, data])
    }
    setSaving(false)
    setEditingResource(null)
  }

  async function deleteResource(id: number) {
    await supabase.from('resources').delete().eq('id', id)
    setResources(prev => prev.filter(r => r.id !== id))
    setDeleteTarget(null)
  }

  return (
    <div>
      {/* Section toggle */}
      <div className="flex gap-1 bg-[#0D0D0D] border border-[#1F1F1F] rounded-lg p-1 w-fit mb-6">
        {(['modules', 'resources'] as const).map(s => (
          <button
            key={s}
            onClick={() => setSection(s)}
            className={cn('px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors', section === s ? 'bg-[#1F1F1F] text-[#F5F1ED]' : 'text-[#555] hover:text-[#999]')}
          >
            {s} {s === 'modules' ? `(${modules.length})` : `(${resources.length})`}
          </button>
        ))}
      </div>

      {/* Modules list */}
      {section === 'modules' && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#F5F1ED] font-semibold">Modules</h3>
            <Button size="sm" onClick={() => setEditingModule({ title: '', description: '', order: modules.length + 1, tier_availability: 'both' })}>
              <Plus className="w-3.5 h-3.5 mr-1.5" />Add Module
            </Button>
          </div>
          <div className="space-y-2">
            {modules.map(m => (
              <div key={m.id} className="flex items-center gap-3 px-4 py-3 bg-[#0D0D0D] border border-[#1F1F1F] rounded-xl hover:border-[#2D2D2D] transition-colors">
                <span className="text-[#444] text-xs w-8 text-center flex-shrink-0 font-mono">{m.order}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[#F5F1ED] text-sm font-medium truncate">{m.title}</p>
                  <p className="text-[#444] text-xs">{m.tier_availability}</p>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button onClick={() => setEditingModule(m)} className="p-1.5 text-[#444] hover:text-[#C64E3A] transition-colors rounded-lg hover:bg-[#1A1A1A]">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteTarget({ type: 'module', id: m.id, name: m.title })}
                    className="p-1.5 text-[#444] hover:text-red-400 transition-colors rounded-lg hover:bg-[#1A1A1A]"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resources list */}
      {section === 'resources' && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#F5F1ED] font-semibold">Resources</h3>
            <Button size="sm" onClick={() => setEditingResource({ title: '', description: '', category: 'Template', file_url: '#' })}>
              <Plus className="w-3.5 h-3.5 mr-1.5" />Add Resource
            </Button>
          </div>
          <div className="space-y-2">
            {resources.map(r => (
              <div key={r.id} className="flex items-center gap-3 px-4 py-3 bg-[#0D0D0D] border border-[#1F1F1F] rounded-xl hover:border-[#2D2D2D] transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="text-[#F5F1ED] text-sm font-medium truncate">{r.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[#444] text-xs">{r.category}</span>
                    {r.module_id && <span className="text-[#333] text-xs">· Module {r.module_id}</span>}
                    <span className="text-[#333] text-xs">· {r.download_count} dl</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button onClick={() => setEditingResource(r)} className="p-1.5 text-[#444] hover:text-[#C64E3A] transition-colors rounded-lg hover:bg-[#1A1A1A]">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteTarget({ type: 'resource', id: r.id, name: r.title })}
                    className="p-1.5 text-[#444] hover:text-red-400 transition-colors rounded-lg hover:bg-[#1A1A1A]"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Module edit modal */}
      {editingModule && (
        <Modal title={editingModule.id ? 'Edit Module' : 'New Module'} onClose={() => setEditingModule(null)}>
          <Field label="Title"><TextInput value={editingModule.title || ''} onChange={v => setEditingModule(p => ({ ...p, title: v }))} placeholder="Module title" /></Field>
          <Field label="Description"><TextArea value={editingModule.description || ''} onChange={v => setEditingModule(p => ({ ...p, description: v }))} placeholder="Module description" /></Field>
          <Field label="Order">
            <input type="number" value={editingModule.order || ''} onChange={e => setEditingModule(p => ({ ...p, order: Number(e.target.value) }))}
              className="w-full px-3 py-2.5 bg-[#111] border border-[#2D2D2D] rounded-lg text-[#F5F1ED] focus:outline-none focus:border-[#C64E3A] text-sm" />
          </Field>
          <Field label="Tier Availability">
            <select value={editingModule.tier_availability || 'both'} onChange={e => setEditingModule(p => ({ ...p, tier_availability: e.target.value as Module['tier_availability'] }))}
              className="w-full px-3 py-2.5 bg-[#111] border border-[#2D2D2D] rounded-lg text-[#F5F1ED] focus:outline-none focus:border-[#C64E3A] text-sm">
              <option value="both">Both</option>
              <option value="community_only">Community Only</option>
              <option value="full_only">Full Only</option>
            </select>
          </Field>
          <div className="flex gap-2 mt-5">
            <Button variant="secondary" className="flex-1" onClick={() => setEditingModule(null)}>Cancel</Button>
            <Button className="flex-1" loading={saving} onClick={saveModule}>Save Module</Button>
          </div>
        </Modal>
      )}

      {/* Resource edit modal */}
      {editingResource && (
        <Modal title={editingResource.id ? 'Edit Resource' : 'New Resource'} onClose={() => setEditingResource(null)}>
          <Field label="Title"><TextInput value={editingResource.title || ''} onChange={v => setEditingResource(p => ({ ...p, title: v }))} placeholder="Resource title" /></Field>
          <Field label="Description"><TextArea value={editingResource.description || ''} onChange={v => setEditingResource(p => ({ ...p, description: v }))} placeholder="Brief description" /></Field>
          <Field label="Category">
            <select value={editingResource.category || ''} onChange={e => setEditingResource(p => ({ ...p, category: e.target.value }))}
              className="w-full px-3 py-2.5 bg-[#111] border border-[#2D2D2D] rounded-lg text-[#F5F1ED] focus:outline-none focus:border-[#C64E3A] text-sm">
              {['Template', 'Script', 'Worksheet', 'Checklist', 'Guide'].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="File URL"><TextInput value={editingResource.file_url || ''} onChange={v => setEditingResource(p => ({ ...p, file_url: v }))} placeholder="https://..." /></Field>
          <Field label="Module (optional)">
            <input type="number" value={editingResource.module_id ?? ''} onChange={e => setEditingResource(p => ({ ...p, module_id: e.target.value ? Number(e.target.value) : undefined }))}
              placeholder="Module ID (leave blank if none)"
              className="w-full px-3 py-2.5 bg-[#111] border border-[#2D2D2D] rounded-lg text-[#F5F1ED] placeholder-[#444] focus:outline-none focus:border-[#C64E3A] text-sm" />
          </Field>
          <div className="flex gap-2 mt-5">
            <Button variant="secondary" className="flex-1" onClick={() => setEditingResource(null)}>Cancel</Button>
            <Button className="flex-1" loading={saving} onClick={saveResource}>Save Resource</Button>
          </div>
        </Modal>
      )}

      {/* Delete confirm modal */}
      {deleteTarget && (
        <Modal title="Confirm Delete" onClose={() => setDeleteTarget(null)}>
          <p className="text-[#888] text-sm mb-5">
            Are you sure you want to delete <span className="text-[#F5F1ED] font-medium">"{deleteTarget.name}"</span>? This cannot be undone.
          </p>
          <div className="flex gap-2">
            <Button variant="secondary" className="flex-1" onClick={() => setDeleteTarget(null)}>Cancel</Button>
            <button
              onClick={() => deleteTarget.type === 'module' ? deleteModule(deleteTarget.id) : deleteResource(deleteTarget.id)}
              className="flex-1 py-2.5 bg-red-700 hover:bg-red-800 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}

// ─── Analytics Tab ─────────────────────────────────────────────────
function AnalyticsTab() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeStudents: 0,
    avgCompletion: 0,
    weeklyCompletions: 0,
  })
  const [moduleStats, setModuleStats] = useState<{ title: string; order: number; completed: number; total: number }[]>([])
  const [topResources, setTopResources] = useState<Resource[]>([])
  const [atRisk, setAtRisk] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [{ data: users }, { data: progress }, { data: modules }, { data: lessons }, { data: resources }] = await Promise.all([
        supabase.from('users').select('*'),
        supabase.from('progress').select('*').eq('completed', true),
        supabase.from('modules').select('*').order('order'),
        supabase.from('lessons').select('id, module_id'),
        supabase.from('resources').select('*').order('download_count', { ascending: false }).limit(5),
      ])

      const totalStudents = users?.length || 0
      const activeStudents = users?.filter(u => u.status === 'active').length || 0

      // Avg completion
      const userIds = [...new Set(progress?.map(p => p.user_id) || [])]
      const avgCompletion = userIds.length > 0
        ? Math.round(userIds.reduce((acc, uid) => {
            const done = progress?.filter(p => p.user_id === uid).length || 0
            return acc + (lessons?.length ? (done / lessons.length) * 100 : 0)
          }, 0) / userIds.length)
        : 0

      // This week completions
      const weekAgo = new Date(); weekAgo.setDate(weekAgo.getDate() - 7)
      const weeklyCompletions = progress?.filter(p => p.completed_at && new Date(p.completed_at) > weekAgo).length || 0

      setStats({ totalStudents, activeStudents, avgCompletion, weeklyCompletions })

      // Module completion rates
      const modStats = (modules || []).map(m => {
        const moduleLessons = lessons?.filter(l => l.module_id === m.id) || []
        const completedUsers = new Set<string>()
        moduleLessons.forEach(l => {
          progress?.filter(p => p.lesson_id === l.id).forEach(p => completedUsers.add(p.user_id))
        })
        return {
          title: m.title,
          order: m.order,
          completed: completedUsers.size,
          total: totalStudents,
        }
      })
      setModuleStats(modStats)
      setTopResources(resources || [])

      // At-risk: no login in 7+ days (using last_login_at)
      const risk = (users || []).filter(u => {
        if (!u.last_login_at) return true
        return (Date.now() - new Date(u.last_login_at).getTime()) > 7 * 86400000
      }).slice(0, 5)
      setAtRisk(risk)

      setLoading(false)
    }
    load()
  }, [])

  async function exportStudentCSV() {
    const { data } = await supabase.from('users').select('name, email, tier, status, cohort_start_date, created_at')
    if (!data) return
    const csv = ['Name,Email,Tier,Status,Cohort Start,Joined', ...data.map(u =>
      `"${u.name}","${u.email}","${u.tier}","${u.status}","${u.cohort_start_date ?? ''}","${u.created_at}"`
    )].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'ascend-students.csv'
    a.click()
  }

  if (loading) return <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="h-24 bg-[#111] rounded-xl animate-pulse" />)}</div>

  return (
    <div className="space-y-8">
      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Users, label: 'Total Students', value: stats.totalStudents, sub: `${stats.activeStudents} active` },
          { icon: TrendingUp, label: 'Avg Completion', value: `${stats.avgCompletion}%`, sub: 'across cohort' },
          { icon: BookOpen, label: 'Completions This Week', value: stats.weeklyCompletions, sub: 'lessons done' },
          { icon: BarChart2, label: 'Active Rate', value: stats.totalStudents > 0 ? `${Math.round((stats.activeStudents / stats.totalStudents) * 100)}%` : '—', sub: 'of students active' },
        ].map(({ icon: Icon, label, value, sub }) => (
          <Card key={label}>
            <CardContent className="pt-4 pb-4">
              <Icon className="w-4 h-4 text-[#C64E3A] mb-2" />
              <p className="text-2xl font-bold text-[#F5F1ED] leading-none">{value}</p>
              <p className="text-[#555] text-xs mt-1">{label}</p>
              <p className="text-[#333] text-[10px]">{sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Module completion rates */}
      <div>
        <h3 className="text-[#F5F1ED] font-semibold mb-4">Module Completion Rates</h3>
        <div className="space-y-3">
          {moduleStats.map(m => {
            const pct = m.total > 0 ? Math.round((m.completed / m.total) * 100) : 0
            return (
              <div key={m.order}>
                <div className="flex items-center justify-between mb-1.5 text-sm">
                  <span className="text-[#888] truncate max-w-[60%]">
                    <span className="text-[#555] mr-2 font-mono text-xs">{m.order}.</span>{m.title}
                  </span>
                  <span className={cn('font-medium text-xs', pct < 40 ? 'text-red-400' : pct < 70 ? 'text-amber-400' : 'text-green-400')}>
                    {pct}% ({m.completed}/{m.total})
                  </span>
                </div>
                <ProgressBar value={pct} color={pct < 40 ? '#EF4444' : pct < 70 ? '#F59E0B' : '#10B981'} />
                {pct < 40 && m.completed > 0 && (
                  <p className="text-red-400 text-[10px] mt-0.5">⚠ Drop-off risk — students may be stuck here</p>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Top resources */}
      {topResources.length > 0 && (
        <div>
          <h3 className="text-[#F5F1ED] font-semibold mb-4">Top Downloaded Resources</h3>
          <div className="space-y-2">
            {topResources.map((r, i) => (
              <div key={r.id} className="flex items-center gap-3 px-4 py-3 bg-[#0D0D0D] border border-[#1F1F1F] rounded-xl">
                <span className="text-[#333] font-mono text-sm w-5">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[#F5F1ED] text-sm font-medium truncate">{r.title}</p>
                  <p className="text-[#444] text-xs">{r.category}</p>
                </div>
                <span className="text-[#C64E3A] text-sm font-bold">{r.download_count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* At-risk students */}
      {atRisk.length > 0 && (
        <div>
          <h3 className="text-[#F5F1ED] font-semibold mb-1">At-Risk Students</h3>
          <p className="text-[#444] text-xs mb-4">Haven't logged in for 7+ days</p>
          <div className="space-y-2">
            {atRisk.map(u => (
              <div key={u.id} className="flex items-center gap-3 px-4 py-3 bg-[#1A0808] border border-red-500/15 rounded-xl">
                <div className="w-7 h-7 rounded-full bg-[#2D2D2D] flex items-center justify-center text-xs text-[#666]">
                  {u.name?.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#F5F1ED] text-sm font-medium">{u.name}</p>
                  <p className="text-[#555] text-xs">{u.email}</p>
                </div>
                <span className="text-red-400 text-xs">Inactive</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Export */}
      <div className="flex gap-3 pt-4 border-t border-[#1A1A1A]">
        <Button variant="secondary" size="sm" onClick={exportStudentCSV}>
          <Download className="w-3.5 h-3.5 mr-1.5" />Export Students CSV
        </Button>
      </div>
    </div>
  )
}

// ─── Main Admin Page ───────────────────────────────────────────────
export default function AdminPage() {
  const [tab, setTab] = useState<AdminTab>('students')

  const tabs: { key: AdminTab; label: string; icon: typeof Users }[] = [
    { key: 'students', label: 'Students', icon: Users },
    { key: 'content', label: 'Content', icon: BookOpen },
    { key: 'analytics', label: 'Analytics', icon: BarChart2 },
  ]

  return (
    <div className="p-4 sm:p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#F5F1ED] mb-1">Admin Dashboard</h1>
        <p className="text-[#555] text-sm">Owen-only view. Manage students, content, and analytics.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#0D0D0D] border border-[#1F1F1F] rounded-xl p-1 mb-8 w-fit">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
              tab === key ? 'bg-[#C64E3A] text-white' : 'text-[#555] hover:text-[#F5F1ED]'
            )}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {tab === 'students' && <StudentsTab />}
      {tab === 'content' && <ContentTab />}
      {tab === 'analytics' && <AnalyticsTab />}
    </div>
  )
}
