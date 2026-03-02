export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4"
      style={{ backgroundColor:'var(--color-canvas)' }}
    >
      <div className="w-8 h-8 border border-t-violet animate-spin"
        style={{ borderColor:'var(--color-border)', borderTopColor:'var(--color-violet)' }}
      />
      <span className="font-mono uppercase" style={{ fontSize:'10px', color:'var(--color-muted)', letterSpacing:'0.22em' }}>
        Loading
      </span>
    </div>
  )
}
