'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Work', href: '#work' },
  { name: 'Contact', href: '#contact' },
]

const SECTION_IDS = ['about', 'experience', 'skills', 'work', 'contact']

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollYProgress } = useScroll()

  // Smooth spring for the progress bar
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Scroll state for blurred nav background
  useEffect(() => {
    const unsub = scrollYProgress.onChange((v) => {
      setIsScrolled(v > 0.01)
    })
    return unsub
  }, [scrollYProgress])

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  // Close mobile menu on resize
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setMobileOpen(false) }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return (
    <>
      {/* ── Scroll Progress Bar ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-[100] origin-left"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, #00e5ff, #8b5cf6)',
        }}
      />

      {/* ── Navbar ── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between
          px-6 md:px-12 lg:px-16 transition-all duration-500
          ${isScrolled
            ? 'py-3 bg-[#080810]/80 backdrop-blur-2xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
            : 'py-5 bg-transparent'
          }`}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative flex h-8 w-8 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-[#00e5ff]/20 blur-sm group-hover:bg-[#00e5ff]/40 transition-all duration-300" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#00e5ff]" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-black text-sm tracking-[0.15em] text-white">
              OM <span className="text-[#00e5ff]">PRAKASH</span>
            </span>
            <span className="text-[0.55rem] font-bold tracking-[0.2em] text-gray-500 uppercase hidden lg:block">
              Python · Automation · Web
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.slice(1)
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative text-[11px] font-black uppercase tracking-[0.35em] transition-colors duration-300
                  ${isActive ? 'text-[#00e5ff]' : 'text-gray-400 hover:text-white'}`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="active-dot"
                    className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#00e5ff]"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            )
          })}
        </div>

        {/* Hire Me CTA */}
        <div className="flex items-center gap-3">
          <a
            href="mailto:prakash.om.global@gmail.com"
            className="hidden sm:inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#00e5ff]/40 bg-[#00e5ff]/5 text-[#00e5ff] text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#00e5ff] hover:text-[#080810] transition-all duration-300"
          >
            Hire Me
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <motion.span
              animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 6 : 0 }}
              className="block w-5 h-[2px] bg-white rounded-full origin-center"
            />
            <motion.span
              animate={{ opacity: mobileOpen ? 0 : 1 }}
              className="block w-5 h-[2px] bg-white rounded-full"
            />
            <motion.span
              animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -6 : 0 }}
              className="block w-5 h-[2px] bg-white rounded-full origin-center"
            />
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile Menu ── */}
      <motion.div
        initial={false}
        animate={{ opacity: mobileOpen ? 1 : 0, y: mobileOpen ? 0 : -20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-[60px] left-0 right-0 z-40 bg-[#080810]/95 backdrop-blur-2xl border-b border-white/5 px-6 py-6 flex flex-col gap-5 md:hidden
          ${mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            className="text-sm font-black uppercase tracking-[0.3em] text-gray-300 hover:text-[#00e5ff] transition-colors"
          >
            {link.name}
          </a>
        ))}
        <a
          href="mailto:prakash.om.global@gmail.com"
          className="mt-2 inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#00e5ff] text-[#080810] text-xs font-black uppercase tracking-[0.3em]"
        >
          Hire Me
        </a>
      </motion.div>
    </>
  )
}
