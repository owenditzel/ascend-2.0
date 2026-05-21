import { createContext, useContext, type ReactNode } from 'react'
import type { User } from '@/types'

interface AuthContextType {
  session: { user: User } | null
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signUp: (email: string, password: string, name: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
}

const MOCK_USER: User = {
  id: 'local-user-1',
  email: 'owen@ascend.com',
  name: 'Owen',
  role: 'admin',
  tier: 'full',
  status: 'active',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  async function signIn(_email: string, _password: string) {
    return { error: null }
  }

  async function signUp(_email: string, _password: string, _name: string) {
    return { error: null }
  }

  async function signOut() {
    console.log('sign out')
  }

  return (
    <AuthContext.Provider value={{
      session: { user: MOCK_USER },
      user: MOCK_USER,
      loading: false,
      signIn,
      signUp,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
