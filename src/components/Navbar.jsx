import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowUpRight, MapPin, Menu, X } from 'lucide-react'
import { businessConfig } from '../config/businessConfig'
import { useBooking } from '../hooks/useBooking'
import { useFocusTrap } from '../hooks/useFocusTrap'
import { useLockBodyScroll } from '../hooks/useLockBodyScroll'
import { useScrolled } from '../hooks/useScrolled'
import { useScrollSpy } from '../hooks/useScrollSpy'
import Wordmark from './Wordmark'

const SECTION_IDS = ['home', 'about', 'services', 'work', 'contact']

export default function Navbar() {
  const { openBooking } = useBooking()
  const scrolled = useScrolled(20)
  const activeId = useScrollSpy(SECTION_IDS)
  const [menuOpen, setMenuOpen] = useState(false)
  const drawerRef = useRef(null)
  const toggleRef = useRef(null)

  useLockBodyScroll(menuOpen)
  useFocusTrap(drawerRef, menuOpen, () => setMenuOpen(false))

  useEffect(() => {
    if (!menuOpen) return
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [menuOpen])

  const navItems = useMemo(
    () => businessConfig.nav.map((item) => ({ ...item, id: item.href.replace('#', '') })),
    [],
  )

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-[background-color,box-shadow,border-color] duration-500 ${
          scrolled
            ? 'border-b border-charcoal/10 bg-ivory/95 shadow-[0_10px_40px_-32px_rgba(25,25,25,0.6)] backdrop-blur-md'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="container-editorial flex h-[74px] items-center justify-between gap-6 sm:h-[86px]">
          <Wordmark />

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex xl:gap-10">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="nav-link"
                aria-current={activeId === item.id ? 'true' : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => openBooking()}
              className="btn btn-solid btn-sm hidden sm:inline-flex lg:min-h-[3.05rem] lg:px-6"
            >
              Book Appointment
              <ArrowUpRight aria-hidden="true" />
            </button>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center border border-charcoal/20 text-charcoal transition-colors hover:bg-charcoal hover:text-ivory lg:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <Menu aria-hidden="true" size={19} strokeWidth={1.4} />
            </button>
          </div>
        </div>
      </header>

      {menuOpen ? (
        <div
          id="mobile-menu"
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[60] lg:hidden"
        >
          <div className="absolute inset-0 bg-ivory" />
          <div className="relative flex h-full flex-col overflow-y-auto">
            <div className="container-editorial flex h-[74px] shrink-0 items-center justify-between sm:h-[86px]">
              <Wordmark compact />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center border border-charcoal/20 text-charcoal transition-colors hover:bg-charcoal hover:text-ivory"
                aria-label="Close menu"
              >
                <X aria-hidden="true" size={20} strokeWidth={1.4} />
              </button>
            </div>

            <nav aria-label="Mobile" className="container-editorial mt-4 flex-1">
              <ul>
                {navItems.map((item, index) => (
                  <li
                    key={item.id}
                    className="animate-drawer-in border-b border-charcoal/10"
                    style={{ animationDelay: `${80 + index * 55}ms` }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      aria-current={activeId === item.id ? 'true' : undefined}
                      className="group flex items-baseline justify-between gap-4 py-5"
                    >
                      <span className="font-display text-[2rem] font-light leading-none text-charcoal transition-colors group-hover:text-champagne-deep">
                        {item.label}
                      </span>
                      <span className="font-sans text-[9px] tracking-[0.28em] text-warmgrey">
                        0{index + 1}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false)
                    openBooking()
                  }}
                  className="btn btn-solid w-full"
                >
                  Book Appointment
                  <ArrowUpRight aria-hidden="true" />
                </button>

                <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-warmgrey">
                  <MapPin aria-hidden="true" size={12} strokeWidth={1.5} />
                  {businessConfig.location.display}
                </p>
                <p className="font-display text-xl italic text-champagne-deep">
                  {businessConfig.tagline}
                </p>
              </div>
            </nav>

            <p className="container-editorial mt-auto pt-10 pb-8 text-[9px] uppercase tracking-[0.24em] text-warmgrey">
              Demonstration template · Not a live business
            </p>
          </div>
        </div>
      ) : null}
    </>
  )
}
