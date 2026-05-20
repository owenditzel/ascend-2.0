import { Link, Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <header className="p-6">
        <Link to="/" className="flex items-center gap-2 w-fit">
          <div className="w-8 h-8 bg-[#C64E3A] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <span className="text-[#F5F1ED] font-bold text-lg">Ascend</span>
        </Link>
      </header>
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <Outlet />
      </div>
    </div>
  )
}
