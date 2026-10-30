import { useMemo, useState } from 'react'
import { ArrowUpRight, Info } from 'lucide-react'
import { businessConfig } from '../config/businessConfig'
import { useBooking } from '../hooks/useBooking'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import SmartImage from './SmartImage'

export default function Services() {
  const { services, pricing } = businessConfig
  const { openBooking } = useBooking()
  const [active, setActive] = useState('All')

  const filters = useMemo(() => ['All', ...services.map((service) => service.name)], [services])
  const visible = useMemo(
    () => (active === 'All' ? services : services.filter((service) => service.name === active)),
    [active, services],
  )

  return (
    <section id="services" className="section-pad bg-ivory">
      <div className="container-editorial">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <SectionHeading
            className="lg:col-span-7"
            eyebrow="Services"
            title={
              <>
                Considered services,
                <br />
                <em>tailored</em> to you.
              </>
            }
          />

          <Reveal delay={120} className="lg:col-span-5 lg:pb-1">
            <p className="copy max-w-sm">
              Hair, skin, bridal and grooming — each service begins with a consultation and
              ends with a finish that suits your everyday, not just the salon mirror.
            </p>
            <p className="mt-5 flex items-start gap-2 text-[0.72rem] leading-relaxed text-warmgrey">
              <Info aria-hidden="true" size={13} strokeWidth={1.5} className="mt-0.5 shrink-0 text-champagne-deep" />
              <span>
                {pricing.note}
              </span>
            </p>
          </Reveal>
        </div>

        <Reveal delay={80} className="mt-11 flex flex-col gap-5 border-b border-charcoal/12 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 py-1" role="group" aria-label="Filter services by category">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className="chip shrink-0"
                aria-pressed={active === filter}
                onClick={() => setActive(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <p aria-live="polite" className="shrink-0 text-[9px] uppercase tracking-[0.22em] text-warmgrey">
            {active === 'All' ? `${services.length} categories` : `Showing ${active}`}
          </p>
        </Reveal>

        <div key={active} className="mt-12 animate-fade-up space-y-16 lg:mt-16 lg:space-y-24">
          {visible.map((category, index) => (
            <article
              key={category.id}
              className="grid gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16"
            >
              <div
                className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:order-2' : ''}`}
              >
                <Reveal>
                  <div className="media aspect-[4/5] bg-beige">
                    <SmartImage
                      image={category.image}
                      sizes="(min-width: 1280px) 480px, (min-width: 1024px) 40vw, 100vw"
                    />
                  </div>
                </Reveal>

                <Reveal
                  as="p"
                  delay={100}
                  className="mt-4 flex items-center justify-between text-[9px] uppercase tracking-[0.24em] text-warmgrey"
                >
                  <span>{category.index} / 04</span>
                  <span>Category</span>
                </Reveal>
              </div>

              <div className="lg:col-span-7">
                <Reveal className="flex items-baseline gap-3">
                  <span aria-hidden="true" className="font-display text-sm text-champagne-deep">
                    {category.index}
                  </span>
                  <h3 className="display-3">{category.name}</h3>
                </Reveal>

                <Reveal as="p" delay={70} className="copy mt-4 max-w-lg">
                  {category.summary}
                </Reveal>

                <Reveal delay={130} className="mt-8">
                  <ul className="border-t border-charcoal/12">
                    {category.items.map((item) => (
                      <li key={item.name} className="border-b border-charcoal/12">
                        <button
                          type="button"
                          onClick={() =>
                            openBooking({ category: category.name, service: item.name })
                          }
                          className="group -mx-2 grid w-full grid-cols-[1fr_auto] items-start gap-5 px-2 py-5 text-left transition-colors hover:bg-white sm:-mx-4 sm:px-4"
                        >
                          <span className="block">
                            <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                              <span className="font-display text-xl leading-tight text-charcoal transition-colors group-hover:text-champagne-deep sm:text-[1.4rem]">
                                {item.name}
                              </span>
                              <span className="text-[9px] uppercase tracking-[0.18em] text-warmgrey">
                                {pricing.showPrices
                                  ? `${pricing.currency} ${item.samplePrice.toLocaleString('en-IN')}*`
                                  : pricing.onRequestLabel}
                              </span>
                            </span>
                            <span className="mt-1.5 block max-w-md text-[0.83rem] leading-relaxed text-warmgrey">
                              {item.description}
                            </span>
                          </span>

                          <span className="mt-1 flex items-center gap-1.5 whitespace-nowrap text-[9px] uppercase tracking-[0.2em] text-charcoal/70 transition-colors group-hover:text-charcoal">
                            Book
                            <ArrowUpRight aria-hidden="true" size={12} strokeWidth={1.6} />
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </article>
          ))}
        </div>

        <Reveal
          delay={60}
          className="mt-16 flex flex-col justify-between gap-6 border border-charcoal/15 px-6 py-8 sm:flex-row sm:items-center sm:px-9 lg:mt-24"
        >
          <div>
            <p className="font-display text-2xl leading-tight sm:text-[1.8rem]">
              Not sure where to begin? <em className="italic text-champagne-deep">Let&rsquo;s talk.</em>
            </p>
            <p className="mt-2 text-[0.8rem] leading-relaxed text-warmgrey">
              Share what you have in mind and we&rsquo;ll suggest the right starting point.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openBooking()}
            className="btn btn-solid shrink-0"
          >
            Book a consultation
            <ArrowUpRight aria-hidden="true" />
          </button>
        </Reveal>
      </div>
    </section>
  )
}
