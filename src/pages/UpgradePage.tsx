import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, ChevronDown, ChevronUp, X, ArrowLeft, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

const INCLUDED = [
  'All 8 course modules (43+ video lessons)',
  'All 6 mindset track modules',
  'Weekly live group coaching calls with Owen (12 weeks)',
  '60+ done-for-you templates, scripts & swipe files',
  'Lifetime access + all future content updates',
  'Private Ascend community access',
  'Email support — Owen personally responds',
  '90-day money-back guarantee (see FAQ)',
]

const COMPARISON = [
  { feature: 'Course Modules', community: '0 of 8', full: '8 of 8 ✓' },
  { feature: 'Video Lessons', community: 'Mindset only (16)', full: '43 lessons ✓' },
  { feature: 'Resources & Templates', community: 'Limited (mindset)', full: '60+ files ✓' },
  { feature: 'Weekly Coaching Calls', community: '—', full: 'Every Thursday ✓' },
  { feature: 'Community Access', community: 'External only', full: 'Private Ascend ✓' },
  { feature: 'Direct Support', community: 'Email only', full: 'Owen + team ✓' },
  { feature: 'Lifetime Access', community: 'While active', full: 'Forever ✓' },
]

const TESTIMONIALS = [
  { name: 'Marcus T.', sport: 'Ex-D1 Basketball', result: '$3,200 first client in week 8', quote: 'The DM Sales System alone paid for everything 10× over. The full program gave me the structure I never had.' },
  { name: 'Alexis R.', sport: 'Ex-Pro Soccer', result: 'Left her 9-5 in 6 months', quote: 'Owen doesn\'t sugarcoat it. This is real work — but the framework is bulletproof. I have 6 clients and a waitlist.' },
  { name: 'Jordan K.', sport: 'Former Collegiate Swimmer', result: '$1,800/month recurring in 90 days', quote: 'I stopped trying to coach everyone and started owning my lane. Upgrading was the best business decision I\'ve made.' },
  { name: 'Devon S.', sport: 'Former D1 Football', result: '$4,500 in month 3', quote: 'The Offer Architecture module alone was worth 10× the investment. I finally knew what I was selling and who it was for.' },
]

const FAQS = [
  { q: 'Who is Ascend 2.0 for?', a: 'Ex-athletes at any level — high school, collegiate, or professional — who want to build a coaching or consulting business in the next 12 weeks.' },
  { q: 'Do I need business experience?', a: 'No. The program starts with identity and mindset before touching tactics. We\'ve had students with zero experience land their first client in week 8.' },
  { q: 'How is this different from the Community tier?', a: 'Community tier gives you the 6 mindset modules and external community access. Full tier unlocks all 8 course modules, live coaching calls, the full resource library, and private community access.' },
  { q: 'Can I get a refund?', a: 'Yes. If you complete all 8 core modules, submit the action items, and haven\'t landed a client within 90 days — we\'ll give you a full refund. We back our curriculum.' },
  { q: 'How long do I have access?', a: 'Lifetime. You get all current modules plus every future update, new resource, and content addition at no extra cost.' },
  { q: 'What if I already have a business?', a: 'Great. Many students upgrade to systematize and scale what they\'ve already started. The systems and scaling modules were built specifically for coaches who are stuck in 1-to-1.' },
]

export default function UpgradePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="p-4 sm:p-8 max-w-3xl">
      <Link to="/dashboard" className="inline-flex items-center gap-2 text-[#555] text-sm hover:text-[#F5F1ED] mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      {/* Hero */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-[#C64E3A]/15 border border-[#C64E3A]/30 rounded-full px-4 py-1.5 mb-5">
          <div className="w-2 h-2 bg-[#C64E3A] rounded-full" />
          <span className="text-[#C64E3A] text-sm font-medium">Ascend 2.0 Full Tier</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#F5F1ED] mb-3 leading-tight">
          Unlock Your Full<br />Potential
        </h1>
        <p className="text-[#888] max-w-xl mx-auto">
          Get the complete system — 8 modules, live coaching, and everything you need to land your first paying client in 12 weeks.
        </p>
      </div>

      {/* Offer card */}
      <div className="relative bg-gradient-to-br from-[#1A0D0A] to-[#111] border border-[#C64E3A]/30 rounded-2xl p-6 sm:p-8 mb-10">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-[#C64E3A] text-white text-xs font-bold px-4 py-1 rounded-full">Most Popular</span>
        </div>
        <div className="text-center mb-6">
          <p className="text-[#666] text-sm mb-1">One-time investment</p>
          <p className="text-5xl font-bold text-[#C64E3A] mb-1">$4,997</p>
          <p className="text-[#555] text-xs">Your community tier ($150/mo) will be credited → ~$4,200 after credit</p>
        </div>
        <ul className="space-y-2.5 mb-8">
          {INCLUDED.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-[#F5F1ED]">
              <div className="w-5 h-5 rounded-full bg-[#C64E3A]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-[#C64E3A]" />
              </div>
              {item}
            </li>
          ))}
        </ul>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="https://calendly.com/owenascend/strategy"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button size="lg" className="w-full">
              Schedule a Call with Owen
            </Button>
          </a>
          <a
            href="https://buy.stripe.com/ascend-upgrade"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button size="lg" variant="secondary" className="w-full">
              Upgrade Now →
            </Button>
          </a>
        </div>
        <p className="text-center text-[#444] text-xs mt-3">90-day guarantee · Lifetime access · Cancel anytime</p>
      </div>

      {/* Comparison */}
      <div className="mb-10">
        <h2 className="text-[#F5F1ED] font-bold text-xl mb-5 text-center">Community vs. Full Access</h2>
        <div className="bg-[#0D0D0D] border border-[#1F1F1F] rounded-2xl overflow-hidden">
          <div className="grid grid-cols-3 text-xs font-semibold text-[#444] uppercase tracking-wider border-b border-[#1A1A1A]">
            <div className="px-4 py-3">Feature</div>
            <div className="px-4 py-3 text-center">Community</div>
            <div className="px-4 py-3 text-center text-[#C64E3A]">Full Access</div>
          </div>
          {COMPARISON.map((row, i) => (
            <div key={i} className="grid grid-cols-3 border-b border-[#111] last:border-0 text-sm">
              <div className="px-4 py-3 text-[#888]">{row.feature}</div>
              <div className="px-4 py-3 text-center text-[#444] flex items-center justify-center gap-1">
                {row.community.includes('—') ? <X className="w-3.5 h-3.5 text-[#333]" /> : row.community}
              </div>
              <div className="px-4 py-3 text-center text-green-400 font-medium">
                {row.full.replace(' ✓', '')} <Check className="w-3.5 h-3.5 inline ml-0.5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="mb-10">
        <h2 className="text-[#F5F1ED] font-bold text-xl mb-5 text-center">Students Who Made the Jump</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {TESTIMONIALS.map(t => (
            <div key={t.name} className="bg-[#0D0D0D] border border-[#1F1F1F] rounded-xl p-5">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-[#999] text-sm mb-4 leading-relaxed">"{t.quote}"</p>
              <div className="pt-3 border-t border-[#1A1A1A]">
                <p className="text-[#F5F1ED] font-semibold text-sm">{t.name}</p>
                <p className="text-[#444] text-xs">{t.sport}</p>
                <p className="text-[#C64E3A] text-xs font-medium mt-1">{t.result}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="mb-10">
        <h2 className="text-[#F5F1ED] font-bold text-xl mb-5 text-center">Common Questions</h2>
        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-[#0D0D0D] border border-[#1F1F1F] rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full text-left px-5 py-4 flex items-center justify-between gap-3"
              >
                <span className="text-[#F5F1ED] font-medium text-sm">{faq.q}</span>
                {openFaq === i
                  ? <ChevronUp className="w-4 h-4 text-[#555] flex-shrink-0" />
                  : <ChevronDown className="w-4 h-4 text-[#555] flex-shrink-0" />}
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4">
                  <p className="text-[#777] text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center">
        <a href="https://calendly.com/owenascend/strategy" target="_blank" rel="noopener noreferrer">
          <Button size="lg" className="mb-3">Schedule a Call with Owen</Button>
        </a>
        <p className="text-[#333] text-sm">or</p>
        <Link to="/dashboard" className="inline-block mt-2 text-[#444] text-sm hover:text-[#666] transition-colors">
          Keep learning with Community tier →
        </Link>
      </div>
    </div>
  )
}
