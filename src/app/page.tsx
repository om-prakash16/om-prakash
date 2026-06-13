import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Experience from '@/components/sections/Experience'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/sections/Footer'

// Vercel build trigger
export default function Home() {
  return (
    <main className="relative bg-[#060611] min-h-screen">
      <Navbar />

      {/* All sections flow freely — Lenis handles smooth scrolling */}
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Footer />
    </main>
  )
}
