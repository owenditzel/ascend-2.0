import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '@/config/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CheckCircle } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    setLoading(false)
    if (error) { setError(error.message); return }
    setSent(true)
  }

  if (sent) {
    return (
      <div className="w-full max-w-md">
        <div className="bg-[#0D0D0D] border border-[#2D2D2D] rounded-2xl p-8 text-center">
          <div className="w-14 h-14 bg-green-500/15 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-7 h-7 text-green-400" />
          </div>
          <h1 className="text-xl font-bold text-[#F5F1ED] mb-2">Check your email</h1>
          <p className="text-[#666] text-sm mb-6">We sent a password reset link to <span className="text-[#F5F1ED]">{email}</span></p>
          <Link to="/login">
            <Button variant="secondary" className="w-full">Back to Sign In</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-[#0D0D0D] border border-[#2D2D2D] rounded-2xl p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#F5F1ED] mb-2">Forgot password?</h1>
          <p className="text-[#666] text-sm">Enter your email and we'll send you a reset link.</p>
        </div>
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 mb-5">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
          <Button type="submit" loading={loading} className="w-full" size="lg">Send Reset Link</Button>
        </form>
        <p className="text-center text-[#666] text-sm mt-6">
          <Link to="/login" className="text-[#C64E3A] hover:underline">← Back to Sign In</Link>
        </p>
      </div>
    </div>
  )
}
