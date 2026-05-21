import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useCommunity, type CommunityPost } from '@/hooks/useCommunity'
import { cn } from '@/lib/utils'
import {
  ExternalLink, Users, MessageCircle, Calendar, Mail, Video,
  Heart, Trash2, Trophy, HelpCircle, CheckSquare, MessageSquare, Send,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const LINKS = [
  {
    icon: Users,
    iconBg: 'bg-[#C64E3A]/15',
    iconColor: 'text-[#C64E3A]',
    border: 'border-[#C64E3A]/20 hover:border-[#C64E3A]/50',
    title: 'Ascend Private Community',
    desc: 'Your cohort, peer accountability, resource sharing, and direct access to Owen and the coaching team.',
    detail: 'Real-time support · Progress check-ins · Community wins',
    cta: 'Open Community',
    href: 'https://community.ascendperformance.com',
    primary: true,
  },
  {
    icon: MessageCircle,
    iconBg: 'bg-green-500/10',
    iconColor: 'text-green-400',
    border: 'border-green-500/10 hover:border-green-500/30',
    title: 'WhatsApp Group',
    desc: 'Daily wins, quick questions, and real-time accountability from your cohort.',
    detail: 'Instant replies · Video shares · Daily check-ins',
    cta: 'Join WhatsApp',
    href: 'https://chat.whatsapp.com/ascend',
    primary: false,
  },
  {
    icon: Calendar,
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-400',
    border: 'border-blue-500/10 hover:border-blue-500/30',
    title: 'Weekly Live Calls',
    desc: 'Every Thursday at 12pm ET. Q&A, hot seats, wins, and live coaching. Recordings posted within 24 hours.',
    detail: 'Thursdays 12pm ET · Zoom · Recordings available',
    cta: 'Join Call',
    href: 'https://zoom.us/j/ascendweekly',
    primary: false,
  },
  {
    icon: Video,
    iconBg: 'bg-purple-500/10',
    iconColor: 'text-purple-400',
    border: 'border-purple-500/10 hover:border-purple-500/30',
    title: 'Call Recording Library',
    desc: 'Missed a call? Every weekly coaching call is recorded and uploaded here within 24 hours.',
    detail: 'All past calls · Searchable · Timestamped notes',
    cta: 'Browse Recordings',
    href: 'https://ascendperformance.com/recordings',
    primary: false,
  },
]

type Filter = 'all' | 'win' | 'question' | 'accountability' | 'general'

const POST_TYPES: { key: CommunityPost['post_type']; label: string; icon: React.ElementType; color: string }[] = [
  { key: 'general',        label: 'Update',    icon: MessageSquare, color: 'text-[#888]' },
  { key: 'win',            label: 'Win',        icon: Trophy,        color: 'text-amber-400' },
  { key: 'question',       label: 'Question',   icon: HelpCircle,    color: 'text-blue-400' },
  { key: 'accountability', label: 'Check-in',   icon: CheckSquare,   color: 'text-green-400' },
]

const TYPE_BADGE: Record<CommunityPost['post_type'], string> = {
  win:            'bg-amber-400/10 text-amber-400',
  question:       'bg-blue-400/10 text-blue-400',
  accountability: 'bg-green-400/10 text-green-400',
  general:        'bg-[#1F1F1F] text-[#666]',
}

const TYPE_LABEL: Record<CommunityPost['post_type'], string> = {
  win: 'Win', question: 'Question', accountability: 'Check-in', general: 'Update',
}

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'win', label: 'Wins' },
  { key: 'question', label: 'Questions' },
  { key: 'accountability', label: 'Check-ins' },
  { key: 'general', label: 'Updates' },
]

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

export default function CommunityPage() {
  const { user } = useAuth()
  const { posts, loading, addPost, toggleLike, deletePost } = useCommunity(user?.id, user?.name)
  const [content, setContent] = useState('')
  const [postType, setPostType] = useState<CommunityPost['post_type']>('general')
  const [filter, setFilter] = useState<Filter>('all')
  const [submitting, setSubmitting] = useState(false)

  const filtered = filter === 'all' ? posts : posts.filter(p => p.post_type === filter)

  function handleSubmit() {
    if (!content.trim() || submitting) return
    setSubmitting(true)
    addPost(content, postType)
    setContent('')
    setSubmitting(false)
  }

  return (
    <div className="p-4 sm:p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#F5F1ED] mb-2">Community</h1>
        <p className="text-[#555] text-sm">Connect with your cohort and get support from Owen and the team.</p>
      </div>

      {/* External link cards */}
      <div className="space-y-3 mb-10">
        {LINKS.map(link => {
          const Icon = link.icon
          return (
            <a
              key={link.title}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group block bg-[#0D0D0D] border rounded-2xl p-5 sm:p-6 transition-all duration-200 hover:-translate-y-0.5 ${link.border}`}
            >
              <div className="flex items-start gap-5">
                <div className={`w-12 h-12 ${link.iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-6 h-6 ${link.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <h3 className="text-[#F5F1ED] font-semibold text-base">{link.title}</h3>
                    <ExternalLink className="w-4 h-4 text-[#333] group-hover:text-[#666] transition-colors flex-shrink-0 mt-0.5" />
                  </div>
                  <p className="text-[#888] text-sm mb-3 leading-relaxed">{link.desc}</p>
                  <p className="text-[#444] text-xs mb-4">{link.detail}</p>
                  <Button size="sm" variant={link.primary ? 'primary' : 'secondary'} className="pointer-events-none">
                    {link.cta} <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </div>
              </div>
            </a>
          )
        })}

        {/* Direct support */}
        <div className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-2xl p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-[#1A1A1A] rounded-xl flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-[#C64E3A]" />
            </div>
            <div>
              <h3 className="text-[#F5F1ED] font-semibold mb-1">Direct Support</h3>
              <p className="text-[#666] text-sm mb-3">
                Questions between calls, billing issues, or need something outside the community? Email the team directly.
              </p>
              <a
                href="mailto:owen@ascendperformance.com"
                className="text-[#C64E3A] text-sm font-medium hover:underline inline-flex items-center gap-1.5"
              >
                <Mail className="w-4 h-4" />
                owen@ascendperformance.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex-1 border-t border-[#1A1A1A]" />
        <span className="text-[#333] text-xs font-medium uppercase tracking-wider">Cohort Feed</span>
        <div className="flex-1 border-t border-[#1A1A1A]" />
      </div>

      {/* Composer */}
      <div className="bg-[#0D0D0D] border border-[#1F1F1F] rounded-2xl p-4 mb-6">
        <div className="flex gap-2 mb-3 flex-wrap">
          {POST_TYPES.map(t => {
            const Icon = t.icon
            return (
              <button
                key={t.key}
                onClick={() => setPostType(t.key)}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
                  postType === t.key ? 'bg-[#1F1F1F] text-[#F5F1ED]' : 'text-[#555] hover:text-[#999]'
                )}
              >
                <Icon className={cn('w-3.5 h-3.5', postType === t.key ? t.color : '')} />
                {t.label}
              </button>
            )
          })}
        </div>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder={
            postType === 'win'            ? 'Share a win — big or small...' :
            postType === 'question'       ? 'Ask the community...' :
            postType === 'accountability' ? 'Post your weekly check-in...' :
                                           "What's on your mind..."
          }
          rows={3}
          className="w-full bg-[#111] border border-[#2D2D2D] rounded-xl px-4 py-3 text-[#F5F1ED] text-sm placeholder-[#444] focus:outline-none focus:border-[#C64E3A] resize-none transition-colors"
          onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSubmit() }}
        />
        <div className="flex items-center justify-between mt-3">
          <span className="text-[#333] text-xs">⌘↵ to post</span>
          <button
            onClick={handleSubmit}
            disabled={!content.trim() || submitting}
            className="flex items-center gap-2 px-4 py-2 bg-[#C64E3A] hover:bg-[#A83E2E] disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            Post
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-1.5 flex-wrap mb-5">
        {FILTERS.map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
              filter === f.key
                ? 'bg-[#C64E3A] text-white'
                : 'bg-[#111] border border-[#2D2D2D] text-[#555] hover:text-[#F5F1ED]'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Feed */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-[#111] rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <MessageSquare className="w-8 h-8 text-[#333] mx-auto mb-3" />
          <p className="text-[#444] text-sm">No posts yet. Be the first.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(post => {
            const isMe = post.user_id === user?.id
            const liked = user?.id ? post.likes.includes(user.id) : false
            return (
              <div key={post.id} className="bg-[#0D0D0D] border border-[#1F1F1F] rounded-2xl p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0',
                      isMe ? 'bg-[#C64E3A] text-white' : 'bg-[#1F1F1F] text-[#666]'
                    )}>
                      {post.user_name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <span className={cn('text-sm font-medium', isMe ? 'text-[#C64E3A]' : 'text-[#F5F1ED]')}>
                        {post.user_name}
                        {isMe && <span className="text-[#444] font-normal text-xs ml-1">(you)</span>}
                      </span>
                      <span className="text-[#444] text-xs ml-2">{timeAgo(post.created_at)}</span>
                    </div>
                  </div>
                  <span className={cn('text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full flex-shrink-0', TYPE_BADGE[post.post_type])}>
                    {TYPE_LABEL[post.post_type]}
                  </span>
                </div>
                <p className="text-[#CCC] text-sm leading-relaxed whitespace-pre-wrap">{post.content}</p>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#1A1A1A]">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={cn(
                      'flex items-center gap-1.5 text-xs transition-colors',
                      liked ? 'text-[#C64E3A]' : 'text-[#444] hover:text-[#C64E3A]'
                    )}
                  >
                    <Heart className={cn('w-3.5 h-3.5', liked && 'fill-current')} />
                    {post.likes.length > 0 && <span>{post.likes.length}</span>}
                  </button>
                  {isMe && (
                    <button onClick={() => deletePost(post.id)} className="text-[#333] hover:text-red-400 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
