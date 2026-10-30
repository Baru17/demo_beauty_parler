import { MapPin } from 'lucide-react'
import { businessConfig } from '../config/businessConfig'

export default function AnnouncementBar() {
  return (
    <div className="relative z-40 bg-charcoal text-ivory">
      <div className="container-editorial flex h-9 items-center justify-center gap-6 sm:justify-between">
        <p className="flex items-center gap-2 text-center text-[8.5px] uppercase leading-none tracking-[0.22em] text-ivory/75 sm:text-[9.5px] sm:tracking-[0.24em]">
          <span aria-hidden="true" className="hidden h-1 w-1 rotate-45 bg-champagne sm:inline-block" />
          {businessConfig.announcement}
        </p>
        <p className="hidden items-center gap-1.5 text-[9px] uppercase leading-none tracking-[0.24em] text-ivory/60 sm:flex">
          <MapPin aria-hidden="true" size={11} strokeWidth={1.5} />
          {businessConfig.location.display}
        </p>
      </div>
    </div>
  )
}
