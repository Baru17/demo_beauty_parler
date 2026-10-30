import { useEffect, useState } from 'react'

/** Returns the id of the section currently in view. */
export function useScrollSpy(ids, offset = 150) {
  const [activeId, setActiveId] = useState(ids[0])

  useEffect(() => {
    let frame = 0

    const measure = () => {
      frame = 0
      const position = window.scrollY + offset
      let current = ids[0]

      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= position) current = id
      }

      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      if (atBottom) current = ids[ids.length - 1]

      setActiveId((prev) => (prev === current ? prev : current))
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ids, offset])

  return activeId
}
