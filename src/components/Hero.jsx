import { ArrowDown, ArrowUpRight, MapPin } from 'lucide-react'
import { businessConfig } from '../config/businessConfig'
import { useBooking } from '../hooks/useBooking'
import Reveal from './Reveal'
import SmartImage from './SmartImage'

export default function Hero() {
  const { openBooking } = useBooking()
  const { images } = businessConfig

  return (
    <section id="home" className="relative overflow-hidden bg-ivory">
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-52 hidden h-[760px] w-[760px] text-champagne/30 lg:block"
        viewBox="0 0 760 760"
        fill="none"
      >
        <circle cx="380" cy="380" r="300" stroke="currentColor" strokeWidth="1" />
        <circle cx="380" cy="380" r="372" stroke="currentColor" strokeWidth="1" strokeDasharray="1 11" />
      </svg>

      <div className="container-editorial relative">
        <div className="grid items-center gap-y-14 pt-10 pb-12 sm:pt-14 lg:grid-cols-12 lg:gap-x-12 lg:pt-16 lg:pb-20 xl:gap-x-20">
          <div className="relative z-10 lg:col-span-6 xl:col-span-5">
            <Reveal as="p" className="eyebrow">
              {businessConfig.tagline.replace(/\.$/, '')}
            </Reveal>

            <Reveal as="h1" delay={80} className="display-1 mt-6">
              Your Style.
              <br />
              Your <em>Confidence</em>.
              <br />
              Your Beauty.
            </Reveal>

            <Reveal as="p" delay={170} className="lead mt-7 max-w-md">
              Discover a space where modern styling meets personalized beauty care.
            </Reveal>

            <Reveal delay={240} className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#services" className="btn btn-solid">
                Explore Services
                <ArrowUpRight aria-hidden="true" />
              </a>
              <button type="button" onClick={() => openBooking()} className="btn btn-outline">
                Book an Appointment
              </button>
            </Reveal>

            <Reveal delay={320} className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3">
              <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-warmgrey">
                <MapPin aria-hidden="true" size={13} strokeWidth={1.5} className="text-champagne-deep" />
                {businessConfig.location.display}
              </span>
              <span aria-hidden="true" className="hidden h-px w-12 bg-charcoal/15 sm:block" />
              <span className="hidden text-[10px] uppercase tracking-[0.24em] text-warmgrey sm:block">
                Unisex hair &amp; beauty studio
              </span>
            </Reveal>
          </div>

          <div className="relative lg:col-span-6 xl:col-span-7">
            <Reveal delay={120} className="relative mx-auto w-full max-w-[560px] lg:mr-0">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-2.5 border border-champagne/35 sm:-inset-4"
              />

              <div className="media relative aspect-[4/5] bg-beige shadow-[0_40px_90px_-60px_rgba(25,25,25,0.55)]">
                <SmartImage
                  image={images.hero}
                  priority
                  sizes="(min-width: 1280px) 560px, (min-width: 1024px) 46vw, 100vw"
                />
              </div>

              <div className="absolute -bottom-7 -left-4 w-[36%] max-w-[190px] border-[8px] border-ivory shadow-[0_24px_50px_-30px_rgba(25,25,25,0.5)] sm:-bottom-9 sm:-left-8 sm:border-[10px]">
                <div className="media aspect-[4/5]">
                  <SmartImage image={images.heroInset} sizes="190px" />
                </div>
              </div>

              <p className="mt-5 hidden text-right text-[9px] uppercase tracking-[0.26em] text-warmgrey sm:block">
                Hair &nbsp;·&nbsp; Skin &nbsp;·&nbsp; Bridal &nbsp;·&nbsp; Grooming
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="container-editorial hidden border-t border-charcoal/10 py-5 lg:flex lg:items-center lg:justify-between">
        <a href="#about" className="link-line text-warmgrey transition-colors hover:text-charcoal">
          Scroll to discover
          <ArrowDown aria-hidden="true" size={13} strokeWidth={1.5} />
        </a>
        <p className="text-[9px] uppercase tracking-[0.26em] text-warmgrey">
          By appointment &nbsp;·&nbsp; {businessConfig.location.city}
        </p>
      </div>
    </section>
  )
}
