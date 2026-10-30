const WORDS = ['Hair', 'Skin & Beauty', 'Bridal & Makeup', 'Grooming', 'Unisex Studio']

function Sequence({ hidden = false }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {[...WORDS, ...WORDS].map((word, index) => (
        <span key={`${word}-${index}`} className="flex shrink-0 items-center">
          <span className="px-6 font-display text-xl font-light italic text-charcoal/80 sm:px-8 sm:text-2xl">
            {word}
          </span>
          <span aria-hidden="true" className="h-1 w-1 rotate-45 bg-champagne" />
        </span>
      ))}
    </div>
  )
}

export default function Marquee() {
  return (
    <div className="marquee border-y border-charcoal/10 bg-cream py-4 sm:py-5">
      <div className="marquee-track">
        <Sequence />
        <Sequence hidden />
      </div>
    </div>
  )
}
