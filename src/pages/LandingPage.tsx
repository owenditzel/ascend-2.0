import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronUp, Check, Star, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const courseModules = [
  { num: 1, title: 'Identity Shift: From Athlete to Entrepreneur', lessons: 4, desc: 'Rewire your identity before you build anything. Athletes fail in business when they bring a teammate mindset instead of an owner mindset.' },
  { num: 2, title: 'Niche Down & Own Your Lane', lessons: 5, desc: 'Find the exact intersection of your athletic background and a hungry market. No more generic coaching. Become the only option.' },
  { num: 3, title: 'Offer Architecture', lessons: 5, desc: 'Build a signature offer worth $500–$2,500. Package your knowledge, structure your delivery, and price it with confidence.' },
  { num: 4, title: 'Content That Converts', lessons: 6, desc: 'Create content that builds authority AND drives DMs. Learn the ex-athlete content formula that works on Instagram and TikTok.' },
  { num: 5, title: 'DM Sales System', lessons: 5, desc: 'A step-by-step conversation framework for turning followers into paying clients — without feeling salesy or pushy.' },
  { num: 6, title: 'Client Delivery & Results', lessons: 4, desc: 'Onboard clients, run sessions, and deliver transformation that earns referrals and testimonials automatically.' },
  { num: 7, title: 'Systems & Automation', lessons: 4, desc: 'Build the backend of your business: contracts, payments, scheduling, and client management on autopilot.' },
  { num: 8, title: 'Scale: From 1-to-1 to 1-to-Many', lessons: 5, desc: 'Move from trading time for money into group programs, digital products, and passive income streams.' },
]

const mindsetModules = [
  { num: 'M1', title: 'The Athlete Advantage', lessons: 3, desc: 'Why your sports background is your biggest business asset — and how to leverage it from day one.' },
  { num: 'M2', title: 'Fear, Failure & Forward Motion', lessons: 3, desc: 'The exact mental framework to push through rejection, slow weeks, and the inevitable hard days.' },
  { num: 'M3', title: 'Discipline Without a Coach', lessons: 3, desc: 'You had a schedule, a coach, and a team. Now you don\'t. Build self-imposed structure that makes you unstoppable.' },
  { num: 'M4', title: 'Money Mindset for Athletes', lessons: 3, desc: 'Most athletes were never taught to think about money. Fix the beliefs blocking your financial growth.' },
  { num: 'M5', title: 'Community & Accountability', lessons: 2, desc: 'Leverage your cohort to stay on track, celebrate wins, and move faster than you ever could alone.' },
  { num: 'M6', title: 'The Long Game', lessons: 2, desc: 'Build a business that compounds over time. Think in years, not weeks. Sustain the journey.' },
]

const testimonials = [
  { name: 'Marcus T.', sport: 'Ex-Division I Basketball', result: 'First $3,200 client in week 8', quote: 'I was skeptical at first. I had tried other programs. But the DM Sales System alone paid for everything 10x over. This program treats you like an adult.' },
  { name: 'Jordan K.', sport: 'Former Collegiate Swimmer', result: '$1,800/month recurring in 90 days', quote: 'The Niche Down module changed everything. I stopped trying to coach everyone and started owning my lane. Now I\'m booked out.' },
  { name: 'Alexis R.', sport: 'Ex-Pro Soccer Player', result: 'Left her 9-5 inside 6 months', quote: 'Owen doesn\'t sugarcoat it. This is real work. But if you do the work, the framework is bulletproof. I have 6 clients now and a waitlist.' },
  { name: 'Devon S.', sport: 'Former D1 Football', result: '3 clients, $4,500 in month 3', quote: 'The Offer Architecture module alone was worth the investment. I finally knew what I was selling and who it was for.' },
]

const faqs = [
  { q: 'Who is this program for?', a: 'Ex-athletes at any level — high school, collegiate, or professional — who have 5–10 hours per week to build a coaching or consulting business around their athletic knowledge and experience.' },
  { q: 'What if I have no business experience?', a: 'Perfect. The curriculum is built specifically for athletes with zero business background. We start with identity and mindset before touching tactics. No assumed knowledge.' },
  { q: 'How fast can I expect results?', a: 'Students who apply the work typically land their first paying client by week 8–12. Results depend on your effort, your niche, and how consistently you execute the DM Sales System.' },
  { q: 'What do I actually get access to?', a: 'Full curriculum (8 core modules + 6 mindset modules), weekly live coaching calls, private community, done-for-you templates and scripts, and lifetime access to all future updates.' },
  { q: 'Is there a refund policy?', a: 'Yes. If you complete all 8 core modules, submit the action items, and haven\'t landed a client within 90 days, we\'ll give you a full refund. We back our curriculum.' },
]

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [showAllCourse, setShowAllCourse] = useState(false)
  const [showAllMindset, setShowAllMindset] = useState(false)

  return (
    <div className="min-h-screen bg-black text-[#F5F1ED]">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-[#1F1F1F]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#C64E3A] rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xs">A</span>
            </div>
            <span className="text-[#F5F1ED] font-bold text-lg">Ascend</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <a href="#enroll">
              <Button size="sm">Enroll Now</Button>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-[#C64E3A]/15 border border-[#C64E3A]/30 rounded-full px-4 py-1.5 mb-8">
            <div className="w-2 h-2 bg-[#C64E3A] rounded-full" />
            <span className="text-[#C64E3A] text-sm font-medium">12-Week Coaching Business Blueprint</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 tracking-tight">
            Athletes Get Two Options:{' '}
            <span className="text-[#666]">Keep Playing</span>{' '}
            or{' '}
            <span className="text-[#666]">Go to School.</span>
            <br />
            <span className="text-[#C64E3A]">Here's the Third Option.</span>
          </h1>
          <p className="text-xl text-[#999] max-w-2xl mb-10 leading-relaxed">
            A business built on YOUR skill. No degree required. No experience required.
            Just your athletic background, a proven 8-module system, and 12 weeks to your first paying client.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#curriculum">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                View Curriculum
              </Button>
            </a>
            <a href="#enroll" id="enroll">
              <Button size="lg" className="w-full sm:w-auto">
                Start Today <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>
          <div className="flex items-center gap-6 mt-10">
            <div className="flex -space-x-2">
              {['M','J','A','D'].map((l, i) => (
                <div key={i} className="w-9 h-9 rounded-full border-2 border-black bg-[#C64E3A] flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{l}</span>
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-[#666] text-sm mt-0.5">Trusted by 200+ ex-athletes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-16 bg-[#080808] border-y border-[#1F1F1F]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: '8', label: 'Core Modules' },
              { num: '12', label: 'Weeks to Client' },
              { num: '43+', label: 'Video Lessons' },
              { num: '60+', label: 'Done-For-You Templates' },
            ].map(({ num, label }) => (
              <div key={label} className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-[#C64E3A]">{num}</p>
                <p className="text-[#999] text-sm mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section id="curriculum" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-[#C64E3A] text-sm font-medium uppercase tracking-wider mb-3">The Curriculum</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">8 Modules. Zero Fluff.</h2>
          <p className="text-[#999] max-w-xl">Every module has a clear outcome. By the end of each one, you will have taken a specific action that moves your business forward.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          {(showAllCourse ? courseModules : courseModules.slice(0, 4)).map((m) => (
            <div key={m.num} className="bg-[#0D0D0D] border border-[#1F1F1F] rounded-xl p-5 hover:border-[#C64E3A]/40 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#C64E3A]/15 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#C64E3A] font-bold text-sm">{m.num}</span>
                </div>
                <div>
                  <h3 className="text-[#F5F1ED] font-semibold mb-1">{m.title}</h3>
                  <p className="text-[#666] text-sm mb-2">{m.desc}</p>
                  <span className="text-[#555] text-xs">{m.lessons} lessons</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => setShowAllCourse(v => !v)}
          className="flex items-center gap-2 text-[#C64E3A] text-sm font-medium hover:underline mb-12"
        >
          {showAllCourse ? <><ChevronUp className="w-4 h-4" /> Show less</> : <><ChevronDown className="w-4 h-4" /> See all 8 modules</>}
        </button>

        <div className="mb-8">
          <p className="text-[#C64E3A] text-sm font-medium uppercase tracking-wider mb-3">Mindset Track</p>
          <h2 className="text-2xl font-bold mb-2">The Mental Game</h2>
          <p className="text-[#999] text-sm">6 additional mindset modules running in parallel. Because business is 80% mental.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {(showAllMindset ? mindsetModules : mindsetModules.slice(0, 3)).map((m) => (
            <div key={m.num} className="bg-[#0D0D0D] border border-[#1F1F1F] rounded-xl p-4 hover:border-[#C64E3A]/40 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-[#2D2D2D] flex items-center justify-center mb-3">
                <span className="text-[#999] font-bold text-xs">{m.num}</span>
              </div>
              <h3 className="text-[#F5F1ED] font-semibold text-sm mb-1">{m.title}</h3>
              <p className="text-[#666] text-xs">{m.desc}</p>
            </div>
          ))}
        </div>
        <button
          onClick={() => setShowAllMindset(v => !v)}
          className="flex items-center gap-2 text-[#C64E3A] text-sm font-medium hover:underline"
        >
          {showAllMindset ? <><ChevronUp className="w-4 h-4" /> Show less</> : <><ChevronDown className="w-4 h-4" /> See all 6 mindset modules</>}
        </button>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-[#080808] border-y border-[#1F1F1F]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-[#C64E3A] text-sm font-medium uppercase tracking-wider mb-3">Results</p>
          <h2 className="text-3xl font-bold mb-10">What Happens When Athletes Execute</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-[#0D0D0D] border border-[#1F1F1F] rounded-xl p-5">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-[#F5F1ED] text-sm mb-4 leading-relaxed">"{t.quote}"</p>
                <div className="pt-4 border-t border-[#1F1F1F]">
                  <p className="text-[#F5F1ED] font-semibold text-sm">{t.name}</p>
                  <p className="text-[#666] text-xs">{t.sport}</p>
                  <p className="text-[#C64E3A] text-xs font-medium mt-1">{t.result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <p className="text-[#C64E3A] text-sm font-medium uppercase tracking-wider mb-3">What You Get</p>
        <h2 className="text-3xl font-bold mb-10">Everything You Need to Land Your First Client</h2>
        <div className="grid sm:grid-cols-2 gap-3 max-w-2xl">
          {[
            '8 core modules (43+ video lessons)',
            '6 mindset track modules',
            'Weekly live coaching calls',
            'Private student community',
            '60+ done-for-you templates & scripts',
            'DM Sales System (word-for-word)',
            'Offer builder worksheet',
            'Lifetime access + future updates',
          ].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-[#C64E3A]/20 flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-[#C64E3A]" />
              </div>
              <span className="text-[#F5F1ED] text-sm">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#080808] border-y border-[#1F1F1F]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <p className="text-[#C64E3A] text-sm font-medium uppercase tracking-wider mb-3">FAQ</p>
          <h2 className="text-3xl font-bold mb-10">Questions Answered</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-[#0D0D0D] border border-[#1F1F1F] rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between"
                >
                  <span className="text-[#F5F1ED] font-medium text-sm">{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="w-4 h-4 text-[#666] flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-[#666] flex-shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4">
                    <p className="text-[#999] text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Build Your Business?</h2>
        <p className="text-[#999] max-w-xl mx-auto mb-8">Join 200+ ex-athletes who stopped waiting for the right moment and started building something real.</p>
        <a href="https://www.ascendperformance.com/enroll" target="_blank" rel="noopener noreferrer">
          <Button size="lg">
            Enroll Now — Start Today <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </a>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1F1F1F] py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#C64E3A] rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xs">A</span>
            </div>
            <span className="text-[#F5F1ED] font-bold">Ascend</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/login" className="text-[#666] text-sm hover:text-[#F5F1ED] transition-colors">Student Login</Link>
            <a href="mailto:owen@ascendperformance.com" className="text-[#666] text-sm hover:text-[#F5F1ED] transition-colors">Contact</a>
          </div>
          <p className="text-[#444] text-xs">© 2025 Ascend Performance. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
