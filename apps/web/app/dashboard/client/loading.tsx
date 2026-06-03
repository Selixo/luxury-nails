export default function ClientLoading() {
  return (
    <div className="px-6 py-12 md:px-12 md:py-16">
      <div className="mx-auto max-w-2xl">
        <div className="mb-2 h-3 w-24 animate-pulse bg-white/5" />
        <div className="mb-8 h-9 w-48 animate-pulse bg-white/5" />

        <div className="flex flex-col gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-16 w-full animate-pulse bg-white/[0.03]"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
