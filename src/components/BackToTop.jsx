import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let frame = 0

    const measure = () => {
      frame = 0
      setVisible(window.scrollY > 700)
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      className={`fixed right-4 bottom-4 z-30 flex h-11 w-11 items-center justify-center border border-charcoal/15 bg-ivory/95 text-charcoal shadow-[0_12px_36px_-18px_rgba(25,25,25,0.55)] backdrop-blur transition-all duration-500 sm:right-6 sm:bottom-6 sm:h-12 sm:w-12 ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-3 opacity-0'
      }`}
      style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
    >
      <ArrowUp aria-hidden="true" size={17} strokeWidth={1.5} />
    </button>
  )
}
