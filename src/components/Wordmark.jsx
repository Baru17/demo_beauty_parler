import { businessConfig } from '../config/businessConfig'

export default function Wordmark({ light = false, compact = false, className = '' }) {
  return (
    <a
      href="#home"
      className={`group inline-flex flex-col leading-none ${className}`}
    >
      <span
        className={`font-display font-medium uppercase leading-none ${
          compact ? 'text-[21px] tracking-[0.26em]' : 'text-[25px] tracking-[0.28em] sm:text-[28px]'
        } ${light ? 'text-ivory' : 'text-charcoal'}`}
      >
        {businessConfig.wordmark}
      </span>
      <span
        className={`mt-[7px] font-sans text-[7px] uppercase leading-none tracking-[0.33em] ${
          light ? 'text-ivory/60' : 'text-warmgrey'
        }`}
      >
        {businessConfig.subtitle}
      </span>
      <span className="sr-only">— back to top</span>
    </a>
  )
}
