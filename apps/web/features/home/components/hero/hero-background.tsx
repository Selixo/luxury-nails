export const HeroBackground = () => {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/nails-2.webp')" }}
      />
      <div className="absolute inset-0 bg-black/91" />
    </div>
  )
}
