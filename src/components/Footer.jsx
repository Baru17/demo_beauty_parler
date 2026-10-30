import { ArrowUpRight, Clock, Instagram, Mail, MapPin, Phone } from 'lucide-react'
import { businessConfig, isConfigured } from '../config/businessConfig'
import { useBooking } from '../hooks/useBooking'
import Reveal from './Reveal'
import Wordmark from './Wordmark'

function FooterLine({ icon: Icon, label, children }) {
  return (
    <div className="flex gap-3">
      <Icon aria-hidden="true" size={13} strokeWidth={1.5} className="mt-1 shrink-0 text-champagne" />
      <div className="min-w-0">
        <p className="text-[8px] uppercase tracking-[0.24em] text-ivory/60">{label}</p>
        <div className="mt-1 text-[0.82rem] leading-relaxed text-ivory/65">{children}</div>
      </div>
    </div>
  )
}

export default function Footer() {
  const { name, subtitle, tagline, shortDescription, nav, services, location, contact, hours, social } =
    businessConfig
  const { openBooking } = useBooking()

  const hasPhone = isConfigured(contact.phone)
  const hasEmail = isConfigured(contact.email)
  const instagram = social.instagram || contact.instagram
  const hasInstagram = isConfigured(instagram)
  const instagramUrl = hasInstagram
    ? instagram.startsWith('http')
      ? instagram
      : `https://instagram.com/${instagram.replace(/^@/, '')}`
    : ''

  return (
    <footer className="grain relative overflow-hidden bg-ink text-ivory">
      <div className="container-editorial relative z-10 pt-16 pb-8 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Reveal>
              <Wordmark light />
              <p className="mt-6 max-w-xs font-display text-xl italic leading-snug text-ivory/70">
                {tagline}
              </p>
              <p className="mt-4 max-w-sm text-[0.82rem] leading-relaxed text-ivory/60">
                {shortDescription}
              </p>

              <button
                type="button"
                onClick={() => openBooking()}
                className="btn btn-light mt-7 btn-sm"
              >
                Request an appointment
                <ArrowUpRight aria-hidden="true" />
              </button>
            </Reveal>
          </div>

          <div className="lg:col-span-2 lg:col-start-6">
            <Reveal delay={60}>
              <h2 className="text-[8.5px] uppercase tracking-[0.28em] text-ivory/60">Explore</h2>
              <ul className="mt-5 space-y-3">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-[0.82rem] text-ivory/65 transition-colors hover:text-champagne"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-2">
            <Reveal delay={110}>
              <h2 className="text-[8.5px] uppercase tracking-[0.28em] text-ivory/60">Services</h2>
              <ul className="mt-5 space-y-3">
                {services.map((service) => (
                  <li key={service.id}>
                    <a
                      href="#services"
                      className="text-[0.82rem] text-ivory/65 transition-colors hover:text-champagne"
                    >
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-3">
            <Reveal delay={160}>
              <h2 className="text-[8.5px] uppercase tracking-[0.28em] text-ivory/60">Studio</h2>

              <div className="mt-5 space-y-4">
                <FooterLine icon={MapPin} label="Location">
                  {location.display}
                </FooterLine>

                {hasPhone ? (
                  <FooterLine icon={Phone} label="Phone">
                    <a
                      href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`}
                      className="transition-colors hover:text-champagne"
                    >
                      {contact.phoneDisplay || contact.phone}
                    </a>
                  </FooterLine>
                ) : null}

                {hasEmail ? (
                  <FooterLine icon={Mail} label="Email">
                    <a
                      href={`mailto:${contact.email}`}
                      className="transition-colors hover:text-champagne"
                    >
                      {contact.email}
                    </a>
                  </FooterLine>
                ) : null}

                {hours.length ? (
                  <FooterLine icon={Clock} label="Opening hours">
                    <span className="flex flex-col gap-0.5">
                      {hours.map((entry) => (
                        <span key={entry.days}>
                          {entry.days} · {entry.time}
                        </span>
                      ))}
                    </span>
                  </FooterLine>
                ) : null}

                {hasInstagram ? (
                  <FooterLine icon={Instagram} label="Instagram">
                    <a
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-champagne"
                    >
                      {instagram.startsWith('http') ? 'View profile' : instagram}
                    </a>
                  </FooterLine>
                ) : null}
              </div>

              {!hasPhone && !hasEmail && !hasInstagram && !hours.length ? (
                <p className="mt-4 text-[0.72rem] leading-relaxed text-ivory/55">
                  Contact details, opening hours and social profiles will be added once verified.
                </p>
              ) : null}
            </Reveal>
          </div>
        </div>

        <div className="mt-14 border-t border-ivory/12 pt-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-[0.72rem] uppercase tracking-[0.2em] text-ivory/60">
                © {new Date().getFullYear()} {name} — {subtitle}
              </p>
              <p className="mt-2 max-w-xl text-[0.7rem] leading-relaxed text-ivory/55">
                This is a fictional demonstration website. {name} is not an operating business, and
                no appointment made here is real. Photography is licensed stock imagery used for
                layout preview only.
              </p>
            </div>

            <div className="flex flex-col gap-2 text-[0.66rem] uppercase tracking-[0.2em] text-ivory/55 lg:items-end">
              <span>Photography · Pexels License</span>
              <a
                href="#home"
                className="transition-colors hover:text-ivory/70"
                aria-label="Back to top of page"
              >
                Back to top ↑
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
