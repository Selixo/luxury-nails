import { HeroBackground } from "./components/hero/hero-background"
import { CornerAccent } from "./components/hero/corner-accent"
import { HeroSideText } from "./components/hero/hero-side-text"
import { HeroNavigation } from "./components/hero/hero-navigation"
import { HeroContent } from "./components/hero/hero-content"
import { HeroStats } from "./components/hero/hero-stats"
import { HeroScrollIndicator } from "./components/hero/hero-scroll-indicator"

export function Hero() {
  return (
    <header className="relative flex flex-col overflow-hidden md:min-h-svh">
      <HeroBackground />
      <CornerAccent position="top-left" />
      <CornerAccent position="bottom-right" />
      <HeroSideText />
      <HeroNavigation />
      <HeroContent />
      <HeroStats />
      <HeroScrollIndicator />
    </header>
  )
}
