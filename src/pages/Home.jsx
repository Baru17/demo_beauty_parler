import AnnouncementBar from '../components/AnnouncementBar'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import About from '../components/About'
import Services from '../components/Services'
import FeaturedExperience from '../components/FeaturedExperience'
import Gallery from '../components/Gallery'
import WhyChooseUs from '../components/WhyChooseUs'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBar />
      <Navbar />

      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <Services />
        <FeaturedExperience />
        <Gallery />
        <WhyChooseUs />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
