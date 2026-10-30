import { ArrowUpRight } from 'lucide-react'
import { businessConfig } from '../config/businessConfig'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import SmartImage from './SmartImage'

const COMMITMENTS = [
  {
    index: '01',
    title: 'Personal style',
    copy:
      'Every appointment opens with a conversation, so the result fits your features, your routine and the way you want to feel.',
  },
  {
    index: '02',
    title: 'An inclusive studio',
    copy:
      'Hair, skin, bridal and grooming in one calm setting — considered services for everyone, without exception.',
  },
  {
    index: '03',
    title: 'Considered care',
    copy:
      'Thoughtful products, a clean finish and honest advice that you can comfortably keep using at home.',
  },
]

export default function About() {
  const { images } = businessConfig

  return (
    <section id="about" className="section-pad bg-cream">
      <div className="container-editorial grid gap-16 lg:grid-cols-12 lg:gap-10 xl:gap-16">
        <div className="relative lg:col-span-6">
          <Reveal className="relative">
            <div className="media aspect-[4/5] bg-beige">
              <SmartImage
                image={images.about}
                sizes="(min-width: 1024px) 48vw, 100vw"
              />
            </div>

            <div className="absolute -bottom-8 -right-3 w-[38%] max-w-[210px] border-[10px] border-cream sm:-right-7">
              <div className="media aspect-square">
                <SmartImage
                  image={images.aboutDetail}
                  sizes="(min-width: 640px) 210px, 40vw"
                />
              </div>
            </div>

            <span
              aria-hidden="true"
              className="absolute -left-6 top-8 hidden text-[9px] uppercase tracking-[0.34em] text-warmgrey xl:block"
              style={{ writingMode: 'vertical-rl' }}
            >
              The studio · AURELLE
            </span>
          </Reveal>

          <Reveal
            as="p"
            delay={180}
            className="mt-14 max-w-sm font-display text-lg italic leading-relaxed text-champagne-deep"
          >
            A space to arrive as you are — and leave feeling quietly more confident.
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:pt-6 xl:pl-6">
          <SectionHeading
            eyebrow="About the studio"
            title={
              <>
                Beauty Is Personal.
                <br />
                Your <em>Experience</em> Should Be Too.
              </>
            }
          />

          <Reveal as="p" delay={160} className="copy mt-8 max-w-xl">
            AURELLE is built around a simple idea: good beauty work begins with listening.
            Your hair, your skin, your occasion, your everyday — the details that make you
            feel most like yourself are where every appointment starts.
          </Reveal>

          <Reveal as="p" delay={220} className="copy mt-5 max-w-xl">
            From precision cuts and considered colour to skin rituals, bridal artistry and
            grooming, the approach stays unhurried and personal. Modern techniques,
            attentive hands and a setting designed to feel calm rather than clinical.
          </Reveal>

          <Reveal delay={280} className="mt-10">
            <ul className="border-t border-charcoal/12">
              {COMMITMENTS.map((item) => (
                <li
                  key={item.index}
                  className="grid grid-cols-[2.25rem_1fr] gap-4 border-b border-charcoal/12 py-5 sm:grid-cols-[3rem_1fr]"
                >
                  <span className="font-display text-base leading-none text-champagne-deep">
                    {item.index}
                  </span>
                  <div>
                    <h3 className="font-sans text-[10.5px] uppercase leading-none tracking-[0.2em] text-charcoal">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-md text-[0.85rem] leading-relaxed text-warmgrey">
                      {item.copy}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={340} className="mt-9">
            <a href="#services" className="btn btn-outline">
              Explore Services
              <ArrowUpRight aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
