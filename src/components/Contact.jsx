import {
  ArrowUpRight,
  Clock,
  Info,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Store,
} from 'lucide-react'
import { businessConfig, isConfigured } from '../config/businessConfig'
import { useBooking } from '../hooks/useBooking'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

function DetailRow({ icon: Icon, label, children }) {
  return (
    <div className="px-5 py-4 sm:px-7">
      <dt className="flex items-center gap-2 text-[8.5px] uppercase tracking-[0.22em] text-warmgrey">
        <Icon aria-hidden="true" size={13} strokeWidth={1.4} className="shrink-0 text-champagne-deep" />
        {label}
      </dt>
      <dd className="mt-1.5 text-[0.9rem] leading-relaxed text-charcoal">{children}</dd>
    </div>
  )
}

export default function Contact() {
  const { name, subtitle, location, contact, hours, social } = businessConfig
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

  const mapQuery = [contact.address, location.city, location.region, location.country]
    .filter(isConfigured)
    .join(', ')

  return (
    <section id="contact" className="section-pad bg-ivory">
      <div className="container-editorial grid gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Visit the studio"
            title={
              <>
                Let&rsquo;s begin
                <br />
                with a <em>conversation</em>.
              </>
            }
            intro="Tell us what you have in mind. Whether it is a cut, a colour, a skin ritual or a date that matters, the studio will help you find the right starting point."
          />

          <Reveal delay={160} className="mt-8 flex flex-wrap gap-3">
            <button type="button" onClick={() => openBooking()} className="btn btn-solid">
              Make an enquiry
              <ArrowUpRight aria-hidden="true" />
            </button>
            {hasPhone ? (
              <a href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`} className="btn btn-outline">
                Call the studio
              </a>
            ) : null}
          </Reveal>

          <Reveal delay={220} className="mt-8 flex items-start gap-2.5 border-t border-charcoal/12 pt-5">
            <Info aria-hidden="true" size={14} strokeWidth={1.5} className="mt-0.5 shrink-0 text-champagne-deep" />
            <p className="max-w-sm text-[0.7rem] leading-relaxed text-warmgrey">
              This demonstration does not publish a phone number, email, street address or
              opening hours. Add verified details in <code className="text-[0.66rem] text-charcoal/70">businessConfig.js</code> and they
              will appear here automatically.
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={90} className="border border-charcoal/15 bg-cream">
            <dl className="divide-y divide-charcoal/10">
              <DetailRow icon={Store} label="Studio">
                <span className="font-display text-lg leading-tight">{name}</span>
                <span className="mt-0.5 block text-[0.78rem] uppercase tracking-[0.16em] text-warmgrey">
                  {subtitle}
                </span>
              </DetailRow>

              <DetailRow icon={MapPin} label="Location">
                {isConfigured(contact.address) ? (
                  <>
                    {contact.address}
                    <span className="mt-0.5 block text-[0.8rem] text-warmgrey">
                      {location.city}, {location.region}, {location.country}
                    </span>
                  </>
                ) : (
                  <>
                    {location.city}, {location.region}, {location.country}
                  </>
                )}
              </DetailRow>

              <DetailRow icon={Phone} label="Phone">
                {hasPhone ? (
                  <a
                    href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`}
                    className="transition-colors hover:text-champagne-deep"
                  >
                    {contact.phoneDisplay || contact.phone}
                  </a>
                ) : (
                  <span className="text-warmgrey">Contact details will be updated</span>
                )}
              </DetailRow>

              <DetailRow icon={Mail} label="Email">
                {hasEmail ? (
                  <a
                    href={`mailto:${contact.email}`}
                    className="transition-colors hover:text-champagne-deep"
                  >
                    {contact.email}
                  </a>
                ) : (
                  <span className="text-warmgrey">Contact details will be updated</span>
                )}
              </DetailRow>

              <DetailRow icon={Clock} label="Opening hours">
                {hours.length ? (
                  <span className="flex flex-col gap-1">
                    {hours.map((entry) => (
                      <span key={entry.days} className="flex flex-wrap gap-x-3">
                        <span>{entry.days}</span>
                        <span className="text-warmgrey">{entry.time}</span>
                      </span>
                    ))}
                  </span>
                ) : (
                  <span className="text-warmgrey">Opening hours will be updated</span>
                )}
              </DetailRow>

              <DetailRow icon={Instagram} label="Instagram">
                {hasInstagram ? (
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-champagne-deep"
                  >
                    {instagram.startsWith('http') ? 'View profile' : instagram}
                  </a>
                ) : (
                  <span className="text-warmgrey">Social profile not configured yet</span>
                )}
              </DetailRow>
            </dl>

            <div className="relative aspect-[16/10] overflow-hidden border-t border-charcoal/10 bg-[#e3d8c8]">
              {isConfigured(contact.mapsEmbedUrl) ? (
                <iframe
                  title={`Map showing ${name}`}
                  src={contact.mapsEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
              ) : (
                <>
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(25,25,25,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(25,25,25,0.06) 1px, transparent 1px)',
                      backgroundSize: '44px 44px',
                    }}
                  />
                  <svg
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="none"
                    viewBox="0 0 800 500"
                    fill="none"
                  >
                    <path
                      d="M-20 360c140-60 240 60 380-10s260-110 460-50"
                      stroke="rgba(255,255,255,0.6)"
                      strokeWidth="10"
                    />
                    <path
                      d="M80-20c60 140-20 240 80 360s80 120 40 180"
                      stroke="rgba(255,255,255,0.45)"
                      strokeWidth="6"
                    />
                    <circle cx="430" cy="245" r="90" stroke="rgba(25,25,25,0.1)" strokeWidth="1" />
                    <circle cx="430" cy="245" r="140" stroke="rgba(25,25,25,0.07)" strokeWidth="1" />
                  </svg>

                  <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/20 bg-ivory text-champagne-deep">
                      <MapPin aria-hidden="true" size={18} strokeWidth={1.4} />
                    </span>
                    <p className="mt-3 font-display text-lg leading-tight text-charcoal">
                      {location.display}
                    </p>
                    <p className="mt-1 max-w-[17rem] text-[8.5px] uppercase leading-relaxed tracking-[0.18em] text-warmgrey">
                      Map appears once a verified address is configured
                    </p>
                    {isConfigured(contact.mapsUrl) ? (
                      <a
                        href={contact.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-line mt-4 text-charcoal"
                      >
                        Open in Google Maps
                      </a>
                    ) : null}
                  </div>

                  {isConfigured(contact.mapsUrl) ? null : (
                    <p className="absolute bottom-3 right-4 text-[8px] uppercase tracking-[0.18em] text-charcoal/60">
                      {mapQuery}
                    </p>
                  )}
                </>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
