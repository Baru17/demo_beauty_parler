import {
  Armchair,
  Gem,
  HeartHandshake,
  Palette,
  Sparkles,
  Users,
} from 'lucide-react'
import { businessConfig } from '../config/businessConfig'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const ICONS = {
  Sparkles,
  Users,
  Gem,
  Palette,
  Armchair,
  HeartHandshake,
}

export default function WhyChooseUs() {
  const { values, valuesNote } = businessConfig

  return (
    <section className="section-pad relative overflow-hidden bg-beige">
      <div className="container-editorial relative z-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              eyebrow="Why AURELLE"
              title={
                <>
                  The details make
                  <br />
                  the <em>difference</em>.
                </>
              }
              intro="Six simple promises shape every visit — from the first consultation to the last mirror check."
            />

            <div aria-hidden="true" className="mt-9 h-px w-16 bg-champagne" />

            <p className="mt-6 max-w-sm font-display text-xl italic leading-snug text-charcoal/75">
              A studio should feel calm, personal and entirely yours.
            </p>

            <a href="#contact" className="btn btn-outline mt-8">
              Plan your visit
            </a>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="grid gap-x-10 sm:grid-cols-2">
            {values.map((value, index) => {
              const Icon = ICONS[value.icon] ?? Sparkles
              return (
                <Reveal
                  key={value.index}
                  delay={index * 60}
                  className="border-t border-charcoal/15 py-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <Icon
                      aria-hidden="true"
                      size={22}
                      strokeWidth={1.15}
                      className="text-champagne-deep"
                    />
                    <span className="font-display text-xs leading-none text-charcoal/65">
                      {value.index}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-[1.35rem] leading-tight text-charcoal">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-[0.85rem] leading-relaxed text-warmgrey">
                    {value.description}
                  </p>
                </Reveal>
              )
            })}
          </div>

          <p className="mt-6 max-w-xl text-[0.68rem] leading-relaxed text-warmgrey">
            {valuesNote}
          </p>
        </div>
      </div>
    </section>
  )
}
