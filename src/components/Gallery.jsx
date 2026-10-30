import { useCallback, useMemo, useState } from 'react'
import { Info, Plus } from 'lucide-react'
import { businessConfig } from '../config/businessConfig'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import SmartImage from './SmartImage'
import Lightbox from './Lightbox'

export default function Gallery() {
  const { gallery, galleryCategories } = businessConfig
  const [filter, setFilter] = useState('All')
  const [openIndex, setOpenIndex] = useState(-1)

  const items = useMemo(
    () =>
      filter === 'All'
        ? gallery.items
        : gallery.items.filter((item) => item.category === filter),
    [filter, gallery.items],
  )

  const changeFilter = (next) => {
    setFilter(next)
    setOpenIndex(-1)
  }

  const navigate = useCallback(
    (direction) => {
      setOpenIndex((current) => {
        if (current < 0 || items.length === 0) return current
        return (current + direction + items.length) % items.length
      })
    },
    [items.length],
  )

  return (
    <section id="work" className="section-pad bg-cream">
      <div className="container-editorial">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <SectionHeading
            className="lg:col-span-7"
            eyebrow="Our work"
            title={
              <>
                A glimpse of
                <br />
                the <em>craft</em>.
              </>
            }
          />

          <Reveal delay={110} className="lg:col-span-5 lg:pb-1">
            <p className="copy max-w-sm">
              Texture, tone and detail — a visual moodboard of the kind of work the studio is
              designed for, from considered cuts to bridal finishes.
            </p>
            <p className="mt-4 text-[9px] uppercase tracking-[0.24em] text-warmgrey">
              {items.length} images · {filter === 'All' ? 'All categories' : filter}
            </p>
          </Reveal>
        </div>

        <Reveal delay={60} className="mt-8 flex items-start gap-3 border border-charcoal/12 px-4 py-3.5 sm:px-5">
          <Info aria-hidden="true" size={14} strokeWidth={1.5} className="mt-0.5 shrink-0 text-champagne-deep" />
          <p className="max-w-3xl text-[0.72rem] leading-relaxed text-warmgrey">{gallery.note}</p>
        </Reveal>

        <Reveal delay={100} className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter gallery by category">
          {galleryCategories.map((category) => {
            const count =
              category === 'All'
                ? gallery.items.length
                : gallery.items.filter((item) => item.category === category).length
            return (
              <button
                key={category}
                type="button"
                className="chip"
                aria-pressed={filter === category}
                onClick={() => changeFilter(category)}
              >
                {category}
                <span className="text-[8px]">{String(count).padStart(2, '0')}</span>
              </button>
            )
          })}
        </Reveal>

        <div
          key={filter}
          className="mt-10 animate-fade-up columns-1 gap-4 sm:columns-2 lg:columns-3 lg:gap-5"
        >
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={`Open ${item.title} — ${item.category} in the image viewer`}
              className="group relative mb-4 block w-full break-inside-avoid overflow-hidden bg-beige text-left lg:mb-5"
              style={{ aspectRatio: `${item.image.width} / ${item.image.height}` }}
            >
              <SmartImage
                image={item.image}
                sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 100vw"
                className="h-full w-full object-cover"
              />

              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent opacity-95 transition-opacity duration-500 sm:opacity-0 sm:group-hover:opacity-100"
              />

              <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
                <span className="translate-y-0 opacity-100 transition duration-500 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                  <span className="block text-[8px] uppercase tracking-[0.24em] text-ivory/70">
                    {item.category}
                  </span>
                  <span className="mt-1 block font-display text-lg leading-tight text-ivory sm:text-xl">
                    {item.title}
                  </span>
                </span>

                <span className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ivory/40 text-ivory transition-colors duration-500 group-hover:bg-ivory group-hover:text-charcoal sm:flex">
                  <Plus aria-hidden="true" size={14} strokeWidth={1.6} />
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <Lightbox items={items} index={openIndex} onClose={() => setOpenIndex(-1)} onNavigate={navigate} />
    </section>
  )
}
