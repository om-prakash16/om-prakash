import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Experience from '@/components/sections/Experience'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import Process from '@/components/sections/Process'
import Showcase from '@/components/sections/Showcase'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/sections/Footer'

// Vercel build trigger
export default function Home() {
  return (
    <main className="relative bg-[#080810] min-h-screen">
      <Navbar />

      {/* All sections flow freely — Lenis handles smooth scrolling */}
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Process />
      <Showcase />
      <Footer />
    </main>
  )
}
