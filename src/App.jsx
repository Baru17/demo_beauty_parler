import { BookingProvider } from './hooks/useBooking'
import BookingModal from './components/BookingModal'
import BackToTop from './components/BackToTop'
import Home from './pages/Home'

export default function App() {
  return (
    <BookingProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-charcoal focus:px-5 focus:py-3 focus:text-[10px] focus:uppercase focus:tracking-[0.2em] focus:text-ivory"
      >
        Skip to content
      </a>

      <Home />
      <BookingModal />
      <BackToTop />
    </BookingProvider>
  )
}
