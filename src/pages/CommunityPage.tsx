import { ExternalLink, Users, MessageCircle, Calendar, Mail, Video } from 'lucide-react'
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

export default function CommunityPage() {
  return (
    <div className="p-4 sm:p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#F5F1ED] mb-2">Community</h1>
        <p className="text-[#555] text-sm">Connect with your cohort and get support from Owen and the team.</p>
      </div>

      {/* Main link cards */}
      <div className="space-y-4 mb-10">
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
                  <Button
                    size="sm"
                    variant={link.primary ? 'primary' : 'secondary'}
                    className="pointer-events-none"
                  >
                    {link.cta} <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </div>
              </div>
            </a>
          )
        })}
      </div>

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
  )
}
