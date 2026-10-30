import { useState } from 'react'
import { ArrowUpRight, Minus, Plus } from 'lucide-react'
import { businessConfig } from '../config/businessConfig'
import { useBooking } from '../hooks/useBooking'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import SmartImage from './SmartImage'

const KEYS = ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Home', 'End']

export default function FeaturedExperience() {
  const { experiences } = businessConfig
  const { openBooking } = useBooking()
  const [index, setIndex] = useState(0)
  const active = experiences[index]

  const select = (next) => setIndex((next + experiences.length) % experiences.length)

  const onKeyDown = (event) => {
    if (!KEYS.includes(event.key)) return
    event.preventDefault()

    let next = index
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % experiences.length
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft')
      next = (index - 1 + experiences.length) % experiences.length
    if (event.key === 'Home') next = 0
    if (event.key === 'End') next = experiences.length - 1

    setIndex(next)
    document.getElementById(`experience-tab-${experiences[next].id}`)?.focus()
  }

  return (
    <section className="grain relative overflow-hidden bg-ink text-ivory">
      <div className="container-editorial section-pad relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-20">
          <div className="lg:col-span-6">
            <Reveal className="relative mx-auto w-full max-w-[540px] lg:mx-0">
              <div aria-hidden="true" className="pointer-events-none absolute -inset-3 border border-ivory/15" />

              <div className="relative aspect-[4/5] overflow-hidden bg-charcoal">
                <SmartImage
                  key={active.id}
                  image={active.image}
                  sizes="(min-width: 1280px) 540px, (min-width: 1024px) 46vw, 100vw"
                  className="animate-fade-in"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink via-ink/40 to-transparent"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 sm:p-7">
                  <div>
                    <p className="text-[8.5px] uppercase tracking-[0.28em] text-champagne">
                      Featured &nbsp;{active.index}
                    </p>
                    <p className="mt-2 font-display text-2xl leading-tight text-ivory sm:text-[1.7rem]">
                      {active.title}
                    </p>
                  </div>
                  <span className="font-display text-sm text-ivory/50">
                    {String(index + 1).padStart(2, '0')} / {String(experiences.length).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:pt-2">
            <SectionHeading
              dark
              eyebrow="Featured experiences"
              title={
                <>
                  The signature
                  <br />
                  <em>moments</em>.
                </>
              }
              intro="A few of the experiences the studio is designed around — each one adapted during your consultation, never applied by formula."
            />

            <div
              role="tablist"
              aria-label="Featured experiences"
              aria-orientation="vertical"
              onKeyDown={onKeyDown}
              className="mt-10 border-t border-ivory/15"
            >
              {experiences.map((experience, i) => {
                const selected = i === index
                return (
                  <button
                    key={experience.id}
                    type="button"
                    role="tab"
                    id={`experience-tab-${experience.id}`}
                    aria-selected={selected}
                    aria-controls={`experience-panel-${experience.id}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setIndex(i)}
                    className="group flex w-full items-center gap-5 border-b border-ivory/15 py-4 text-left sm:py-5"
                  >
                    <span className="relative block h-14 w-14 shrink-0 overflow-hidden bg-charcoal">
                      <SmartImage
                        image={experience.image}
                        sizes="56px"
                        className={`h-full w-full object-cover transition-opacity duration-500 ${
                          selected ? 'opacity-100' : 'opacity-55 group-hover:opacity-90'
                        }`}
                      />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-[8.5px] uppercase tracking-[0.24em] text-ivory/60">
                        {experience.category}
                      </span>
                      <span
                        className={`mt-1 block font-display text-xl leading-tight transition-colors sm:text-2xl ${
                          selected ? 'text-ivory' : 'text-ivory/70 group-hover:text-ivory/85'
                        }`}
                      >
                        {experience.title}
                      </span>
                    </span>

                    <span
                      aria-hidden="true"
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors ${
                        selected
                          ? 'border-champagne/70 text-champagne'
                          : 'border-ivory/20 text-ivory/60 group-hover:border-ivory/40'
                      }`}
                    >
                      {selected ? <Minus size={13} /> : <Plus size={13} />}
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="mt-5 min-h-[4.5rem]">
              {experiences.map((experience, i) => (
                <div
                  key={experience.id}
                  id={`experience-panel-${experience.id}`}
                  role="tabpanel"
                  aria-labelledby={`experience-tab-${experience.id}`}
                  hidden={i !== index}
                  tabIndex={0}
                  className="pr-2"
                >
                  <p className="max-w-md text-[0.85rem] leading-relaxed text-ivory/60">
                    {experience.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <button
                type="button"
                onClick={() => openBooking({ category: active.category })}
                className="btn btn-light"
              >
                Book this experience
                <ArrowUpRight aria-hidden="true" />
              </button>
              <a href="#work" className="link-line text-ivory/60 transition-colors hover:text-ivory">
                View the gallery
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
