export const Hamburger = ({
  open,
  onClick,
}: {
  open: boolean
  onClick: () => void
}) => {
  return (
    <button
      onClick={onClick}
      aria-label={open ? "Zamknij menu" : "Otwórz menu"}
      className="relative flex h-8 w-8 flex-col items-center justify-center gap-1.5 lg:hidden"
    >
      <span
        className="block h-px w-6 origin-center bg-white transition-all duration-300"
        style={open ? { transform: "translateY(5px) rotate(45deg)" } : {}}
      />
      <span
        className="block h-px bg-white transition-all duration-300"
        style={
          open ? { width: 0, opacity: 0 } : { width: "1.25rem", opacity: 1 }
        }
      />
      <span
        className="block h-px w-6 origin-center bg-white transition-all duration-300"
        style={open ? { transform: "translateY(-5px) rotate(-45deg)" } : {}}
      />
    </button>
  )
}
