export default function Loading() {
  return (
    <div className="min-h-screen bg-canvas flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border border-border border-t-violet animate-spin" />
        <span className="text-[11px] text-muted font-mono tracking-[0.2em] uppercase">Loading</span>
      </div>
    </div>
  )
}
