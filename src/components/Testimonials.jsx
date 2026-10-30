import { Quote } from 'lucide-react'
import { businessConfig } from '../config/businessConfig'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Testimonials() {
  const { testimonials } = businessConfig

  if (!testimonials.enabled) return null

  return (
    <section className="section-pad bg-ivory">
      <div className="container-editorial">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <SectionHeading
            className="lg:col-span-8"
            eyebrow="Kind words"
            title={
              <>
                Words we hope
                <br />
                to <em>earn</em>.
              </>
            }
            intro="Once genuine client reviews are available, they will appear here — unedited and with permission."
          />

          <Reveal delay={120} className="lg:col-span-4 lg:flex lg:justify-end lg:pb-1">
            <span className="inline-flex items-center gap-2 border border-champagne/60 px-3.5 py-2 text-[9px] uppercase tracking-[0.22em] text-champagne-deep">
              <span aria-hidden="true" className="h-1 w-1 rotate-45 bg-champagne" />
              Layout preview · sample content
            </span>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.items.map((item, index) => (
            <Reveal
              key={item.quote}
              delay={index * 80}
              className="flex flex-col border border-charcoal/12 bg-cream p-6 sm:p-7"
            >
              <Quote aria-hidden="true" size={20} strokeWidth={1.2} className="text-champagne-deep" />

              <blockquote className="mt-6 font-display text-xl italic leading-snug text-charcoal/85">
                “{item.quote}”
              </blockquote>

              <footer className="mt-auto pt-7">
                <div aria-hidden="true" className="h-px w-10 bg-champagne" />
                <p className="mt-3 text-[9px] uppercase tracking-[0.22em] text-warmgrey">
                  {item.service}
                </p>
                <p className="mt-1.5 text-[8.5px] uppercase tracking-[0.2em] text-charcoal/60">
                  {item.name}
                </p>
              </footer>
            </Reveal>
          ))}
        </div>

        <Reveal as="p" delay={150} className="mt-7 max-w-3xl text-[0.7rem] leading-relaxed text-warmgrey">
          {testimonials.note}
        </Reveal>
      </div>
    </section>
  )
}
