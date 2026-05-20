import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [terms, setTerms] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signUp } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (password !== confirm) { setError('Passwords do not match.'); return }
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return }
    if (!terms) { setError('Please accept the terms to continue.'); return }
    setLoading(true)
    const { error } = await signUp(email, password, name)
    setLoading(false)
    if (error) { setError(error); return }
    navigate('/dashboard')
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-[#0D0D0D] border border-[#2D2D2D] rounded-2xl p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#F5F1ED] mb-2">Create your account</h1>
          <p className="text-[#666] text-sm">Start your journey to your first coaching client</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 mb-5">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Full Name" type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} required />
          <Input label="Email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#F5F1ED]">Password</label>
            <input type="password" placeholder="Min. 8 characters" value={password} onChange={e => setPassword(e.target.value)} required
              className="w-full px-4 py-3 bg-[#111] border border-[#2D2D2D] rounded-lg text-[#F5F1ED] placeholder-[#666] focus:outline-none focus:border-[#C64E3A] transition-colors text-sm" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#F5F1ED]">Confirm Password</label>
            <input type="password" placeholder="Repeat password" value={confirm} onChange={e => setConfirm(e.target.value)} required
              className="w-full px-4 py-3 bg-[#111] border border-[#2D2D2D] rounded-lg text-[#F5F1ED] placeholder-[#666] focus:outline-none focus:border-[#C64E3A] transition-colors text-sm" />
          </div>
          <div className="flex items-start gap-3 pt-1">
            <input type="checkbox" id="terms" checked={terms} onChange={e => setTerms(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-[#2D2D2D] bg-[#111] accent-[#C64E3A]" />
            <label htmlFor="terms" className="text-[#666] text-sm">
              I agree to the{' '}
              <a href="#" className="text-[#C64E3A] hover:underline">Terms of Service</a>{' '}
              and{' '}
              <a href="#" className="text-[#C64E3A] hover:underline">Privacy Policy</a>
            </label>
          </div>
          <Button type="submit" loading={loading} className="w-full" size="lg">
            Create Account
          </Button>
        </form>

        <p className="text-center text-[#666] text-sm mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-[#C64E3A] hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
