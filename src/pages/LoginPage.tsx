import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await signIn(email, password)
    setLoading(false)
    if (error) { setError(error); return }
    navigate('/dashboard')
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-[#0D0D0D] border border-[#2D2D2D] rounded-2xl p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#F5F1ED] mb-2">Welcome back</h1>
          <p className="text-[#666] text-sm">Sign in to your Ascend dashboard</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 mb-5">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-[#F5F1ED]">Password</label>
              <Link to="/forgot-password" className="text-xs text-[#C64E3A] hover:underline">Forgot password?</Link>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-[#111] border border-[#2D2D2D] rounded-lg text-[#F5F1ED] placeholder-[#666] focus:outline-none focus:border-[#C64E3A] transition-colors text-sm"
            />
          </div>
          <Button type="submit" loading={loading} className="w-full" size="lg">
            Sign In
          </Button>
        </form>

        <p className="text-center text-[#666] text-sm mt-6">
          New student?{' '}
          <Link to="/signup" className="text-[#C64E3A] hover:underline">Create an account</Link>
        </p>
      </div>
    </div>
  )
}
