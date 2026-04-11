export default function Loading() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-5"
      style={{ backgroundColor: 'var(--color-canvas)' }}
    >
      {/* MTA wordmark */}
      <span
        className="font-display font-black tracking-tight select-none animate-pulse"
        style={{ fontSize: '22px', color: 'var(--color-foreground)', opacity: 0.6, letterSpacing: '-0.03em' }}
      >
        MTA
      </span>

      {/* Spinner */}
      <div className="relative w-12 h-12">
        <div
          className="absolute inset-0 rounded-full border-2"
          style={{ borderColor: 'var(--color-border)' }}
        />
        <div
          className="absolute inset-0 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: 'var(--color-violet)', borderTopColor: 'transparent' }}
        />
      </div>

      {/* Pulsing dots */}
      <div className="flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`block w-1.5 h-1.5 rounded-full animate-dot-pulse stagger-${i + 1}`}
            style={{ backgroundColor: 'var(--color-violet)' }}
          />
        ))}
      </div>

      <span
        className="font-mono uppercase"
        style={{ fontSize: '10px', color: 'var(--color-dead)', letterSpacing: '0.22em' }}
      >
        Loading
      </span>
    </div>
  )
}
