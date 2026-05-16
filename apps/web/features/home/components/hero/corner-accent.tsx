import { cn } from "@workspace/ui/lib/utils"

type AccentPosition = "top-left" | "bottom-right"

export const CornerAccent = ({ position }: { position: AccentPosition }) => (
  <div
    aria-hidden="true"
    className={cn(
      "absolute z-10 hidden",
      position === "top-left" && "top-8 left-8 lg:block",
      position === "bottom-right" &&
        "right-8 bottom-8 flex-col-reverse items-end lg:flex"
    )}
  >
    <div className="h-px w-8 bg-gold/30" />
    <div className="h-8 w-px bg-gold/30" />
  </div>
)
