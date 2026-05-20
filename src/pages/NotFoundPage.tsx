import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-7xl font-bold text-[#C64E3A] mb-4">404</p>
        <h1 className="text-2xl font-bold text-[#F5F1ED] mb-2">Page not found</h1>
        <p className="text-[#666] text-sm mb-8">The page you're looking for doesn't exist.</p>
        <Link to="/dashboard">
          <Button>
            <Home className="w-4 h-4 mr-2" />
            Go to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  )
}
