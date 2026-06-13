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

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      setIsScrolled(v > 0.01)
    })
    return unsub
  }, [scrollYProgress])

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

  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setMobileOpen(false) }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      {/* ── Scroll Progress Bar ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left"
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
            ? 'py-3 bg-[#060611]/80 backdrop-blur-2xl border-b border-white/[0.04] shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'py-5 bg-transparent'
          }`}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative flex h-8 w-8 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-[#00e5ff]/15 blur-sm group-hover:bg-[#00e5ff]/30 transition-all duration-300" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#00e5ff] shadow-[0_0_10px_rgba(0,229,255,0.5)]" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-black text-sm tracking-[0.15em] text-white">
              OM <span className="text-[#00e5ff]">PRAKASH</span>
            </span>
            <span className="text-[0.5rem] font-bold tracking-[0.2em] text-gray-600 uppercase hidden lg:block mt-0.5">
              Python · Automation · Web
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.slice(1)
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.25em] transition-all duration-300
                  ${isActive
                    ? 'text-[#00e5ff] bg-[#00e5ff]/[0.06]'
                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.03]'
                  }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full bg-[#00e5ff]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
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
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.25em] transition-all duration-300 border border-[#00e5ff]/30 bg-[#00e5ff]/[0.06] text-[#00e5ff] hover:bg-[#00e5ff] hover:text-[#060611] hover:shadow-[0_0_20px_rgba(0,229,255,0.2)]"
          >
            Hire Me
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 relative z-[60]"
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

      {/* ── Mobile Menu (Full Screen Overlay) ── */}
      <motion.div
        initial={false}
        animate={{
          opacity: mobileOpen ? 1 : 0,
          backdropFilter: mobileOpen ? 'blur(24px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.4 }}
        className={`fixed inset-0 z-40 bg-[#060611]/95 flex flex-col items-center justify-center gap-8 md:hidden
          ${mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        {NAV_LINKS.map((link, i) => (
          <motion.a
            key={link.name}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            initial={false}
            animate={{
              opacity: mobileOpen ? 1 : 0,
              y: mobileOpen ? 0 : 20,
            }}
            transition={{ duration: 0.3, delay: mobileOpen ? i * 0.08 : 0 }}
            className="text-2xl font-black uppercase tracking-[0.2em] text-gray-300 hover:text-[#00e5ff] transition-colors"
          >
            {link.name}
          </motion.a>
        ))}
        <motion.a
          href="mailto:prakash.om.global@gmail.com"
          initial={false}
          animate={{
            opacity: mobileOpen ? 1 : 0,
            y: mobileOpen ? 0 : 20,
          }}
          transition={{ duration: 0.3, delay: mobileOpen ? 0.5 : 0 }}
          className="mt-4 inline-flex items-center justify-center px-8 py-3.5 rounded-full text-sm font-black uppercase tracking-[0.2em] transition-all duration-300"
          style={{ background: 'linear-gradient(135deg, #00e5ff, #8b5cf6)' }}
        >
          <span className="text-[#060611]">Hire Me</span>
        </motion.a>
      </motion.div>
    </>
  )
}
