export const CornerFrame = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-3 z-10"
    >
      <div className="absolute top-0 left-0 h-4 w-4 border-t border-l border-gold/30" />
      <div className="absolute top-0 right-0 h-4 w-4 border-t border-r border-gold/30" />
      <div className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-gold/30" />
      <div className="absolute right-0 bottom-0 h-4 w-4 border-r border-b border-gold/30" />
    </div>
  )
}
