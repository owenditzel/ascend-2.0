interface ProtectedRouteProps {
  children: React.ReactNode
  adminOnly?: boolean
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  return <>{children}</>
}
