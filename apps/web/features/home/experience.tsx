import { EXPERIENCE_ITEMS } from "./config/home.constants"
import { ExperienceHeader } from "./components/experience/experience-header"
import { ExperienceItem } from "./components/experience/experience-item"

export function Experience() {
  return (
    <section
      id="experience"
      className="relative scroll-mt-20 bg-background-alt px-6 py-12 md:px-12 md:py-28 lg:px-20 lg:py-32"
    >
      <ExperienceHeader />

      <div className="mx-auto flex max-w-6xl flex-col gap-24 md:gap-28 lg:gap-36">
        {EXPERIENCE_ITEMS.map((item, i) => (
          <ExperienceItem
            key={item.title}
            item={item}
            isReversed={i % 2 !== 0}
            total={EXPERIENCE_ITEMS.length}
          />
        ))}
      </div>
    </section>
  )
}
