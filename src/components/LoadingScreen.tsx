export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-[#C64E3A] border-t-transparent rounded-full animate-spin" />
        <p className="text-[#666] text-sm">Loading...</p>
      </div>
    </div>
  )
}
