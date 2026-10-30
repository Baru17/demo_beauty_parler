import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, Info, X } from 'lucide-react'
import { useFocusTrap } from '../hooks/useFocusTrap'
import { useLockBodyScroll } from '../hooks/useLockBodyScroll'
import SmartImage from './SmartImage'

export default function Lightbox({ items, index, onClose, onNavigate }) {
  const open = index >= 0 && index < items.length
  const dialogRef = useRef(null)
  const item = open ? items[index] : null

  useLockBodyScroll(open)
  useFocusTrap(dialogRef, open, onClose)

  useEffect(() => {
    if (!open) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        onNavigate(1)
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        onNavigate(-1)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onNavigate])

  // Warm the neighbouring images so paging feels instant.
  useEffect(() => {
    if (!open) return
    const neighbours = [
      items[(index + 1) % items.length],
      items[(index - 1 + items.length) % items.length],
    ]
    for (const neighbour of neighbours) {
      if (!neighbour?.image?.src) continue
      const img = new Image()
      img.src = neighbour.image.src
    }
  }, [open, index, items])

  if (!open) return null

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} — image viewer`}
      className="fixed inset-0 z-[110] flex animate-fade-in flex-col bg-ink/95 backdrop-blur-md"
    >
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 cursor-zoom-out"
      />

      <div className="relative z-10 flex shrink-0 items-center justify-between gap-4 px-4 py-4 sm:px-7">
        <p className="font-sans text-[10px] uppercase tracking-[0.24em] text-ivory/50">
          <span className="text-ivory">{String(index + 1).padStart(2, '0')}</span>
          <span aria-hidden="true"> / </span>
          <span className="sr-only">of</span>
          {String(items.length).padStart(2, '0')}
        </p>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close image viewer"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/25 text-ivory transition-colors hover:bg-ivory hover:text-charcoal"
        >
          <X aria-hidden="true" size={19} strokeWidth={1.4} />
        </button>
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 items-center justify-center px-4 sm:px-24">
        <button
          type="button"
          onClick={() => onNavigate(-1)}
          aria-label="Previous image"
          className="absolute left-1 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-ivory/25 bg-ink/40 text-ivory transition-colors hover:bg-ivory hover:text-charcoal sm:left-6 sm:h-12 sm:w-12"
        >
          <ChevronLeft aria-hidden="true" size={20} strokeWidth={1.4} />
        </button>

        <SmartImage
          key={item.id}
          image={item.image}
          sizes="90vw"
          priority
          className="max-h-[66vh] w-auto max-w-full animate-fade-in object-contain"
        />

        <button
          type="button"
          onClick={() => onNavigate(1)}
          aria-label="Next image"
          className="absolute right-1 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-ivory/25 bg-ink/40 text-ivory transition-colors hover:bg-ivory hover:text-charcoal sm:right-6 sm:h-12 sm:w-12"
        >
          <ChevronRight aria-hidden="true" size={20} strokeWidth={1.4} />
        </button>
      </div>

      <div className="relative z-10 shrink-0 px-5 pb-6 pt-4 sm:px-10">
        <div className="mx-auto flex max-w-3xl flex-col gap-3 border-t border-ivory/15 pt-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[8.5px] uppercase tracking-[0.26em] text-champagne">
              {item.category}
            </p>
            <p className="mt-1.5 font-display text-xl leading-tight text-ivory sm:text-2xl">
              {item.title}
            </p>
          </div>
          <p className="flex max-w-xs items-start gap-2 text-[9px] leading-relaxed text-ivory/60 sm:text-right">
            <Info aria-hidden="true" size={12} strokeWidth={1.5} className="mt-0.5 shrink-0" />
            Demonstration image — licensed stock photography, not client work.
          </p>
        </div>
      </div>
    </div>,
    document.body,
  )
}
