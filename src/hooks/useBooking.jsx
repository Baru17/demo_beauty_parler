import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const BookingContext = createContext(null)

export function BookingProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [preset, setPreset] = useState({ category: '', service: '' })

  const openBooking = useCallback((nextPreset = {}) => {
    setPreset({
      category: nextPreset.category ?? '',
      service: nextPreset.service ?? '',
    })
    setIsOpen(true)
  }, [])

  const closeBooking = useCallback(() => setIsOpen(false), [])

  const value = useMemo(
    () => ({ isOpen, preset, openBooking, closeBooking }),
    [isOpen, preset, openBooking, closeBooking],
  )

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}

export function useBooking() {
  const context = useContext(BookingContext)
  if (!context) throw new Error('useBooking must be used inside <BookingProvider>')
  return context
}
