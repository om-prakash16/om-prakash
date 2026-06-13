'use client'

import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  AnimatePresence,
  type Variants,
} from 'framer-motion'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'

const HeroModel = dynamic(() => import('../canvas/HeroModel'), { ssr: false })

/* ── animation config ──────────────────────────────────────────────── */
const EASE = [0.16, 1, 0.3, 1] as const

const ctn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.13, delayChildren: 0.4 },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 44 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
}

const roleEnter: Variants = {
  initial: { opacity: 0, y: 18, filter: 'blur(6px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: EASE },
  },
  exit: {
    opacity: 0,
    y: -18,
    filter: 'blur(6px)',
    transition: { duration: 0.35, ease: 'easeIn' },
  },
}

/* ── data ───────────────────────────────────────────────────────────── */
const ROLES = [
  'UI/UX Frontend Designer',
  'Python Developer',
  'AI Engineer',
  'Automation Expert',
] as const

const STATS = [
  '1+ Years Experience',
  '15+ Projects',
] as const

const TAGS = ['Python', 'FastAPI', 'AI'] as const

/* ── component ──────────────────────────────────────────────────────── */
export default function Hero() {
  /* role rotation */
  const [roleIdx, setRoleIdx] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setRoleIdx((prev) => (prev + 1) % ROLES.length)
    }, 3000)
    return () => clearInterval(id)
  }, [])

  /* mouse parallax for profile card */
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-300, 300], [8, -8]), {
    stiffness: 80,
    damping: 25,
  })
  const ry = useSpring(useTransform(mx, [-300, 300], [-8, 8]), {
    stiffness: 80,
    damping: 25,
  })

  function onMove(e: React.MouseEvent) {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set(e.clientX - r.left - r.width / 2)
    my.set(e.clientY - r.top - r.height / 2)
  }

  return (
    <section
      onMouseMove={onMove}
      className="relative w-full min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: '#060611' }}
    >
      {/* ── 3D Canvas Background ──────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <Canvas shadows gl={{ antialias: true }}>
          <HeroModel />
        </Canvas>
      </div>

      {/* ── Atmospheric glows ─────────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-[#00e5ff]/5 blur-[180px] animate-pulse-glow pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#8b5cf6]/5 blur-[160px] animate-pulse-glow pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#060611]/80 blur-[120px] pointer-events-none" />

      {/* ── Main Content ──────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 pt-28 pb-20 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        {/* ── LEFT COLUMN ─────────────────────────────────────────── */}
        <motion.div
          variants={ctn}
          initial="hidden"
          animate="show"
          className="flex-1 min-w-0"
        >
          {/* Label */}
          <motion.span
            variants={item}
            className="label text-[#00e5ff] mb-6 block tracking-widest text-xs uppercase"
          >
            Python Backend Developer &bull; UI/UX Designer &bull; Frontend &bull; AI
          </motion.span>

          {/* Main heading */}
          <motion.h1
            variants={item}
            className="text-4xl md:text-5xl lg:text-[4.5rem] font-black tracking-tighter text-white mb-4 leading-[1.05]"
          >
            BUILDING INTELLIGENT SYSTEMS
            <br />
            <span className="text-gradient">SCALABLE BACKENDS</span>
            <br />
            REAL-WORLD AUTOMATION
          </motion.h1>

          {/* Rotating role */}
          <motion.div variants={item} className="h-10 mb-8 flex items-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={ROLES[roleIdx]}
                variants={roleEnter}
                initial="initial"
                animate="animate"
                exit="exit"
                className="inline-block text-lg md:text-xl font-semibold bg-gradient-to-r from-[#00e5ff] to-[#8b5cf6] bg-clip-text text-transparent"
              >
                {ROLES[roleIdx]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={item}
            className="body-lg text-gray-400 max-w-lg mb-5 leading-relaxed"
          >
            I build AI-powered applications, backend APIs, and craft high-end UI/UX frontend experiences that feel magical. Focused on Python, React/Next.js, FastAPI, and intelligent workflows.
          </motion.p>

          {/* Tags */}
          <motion.div variants={item} className="flex flex-wrap gap-2 mb-10">
            {['Python', 'React/Next.js', 'UI/UX Design', 'AI'].map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 rounded-full border border-[#00e5ff]/30 bg-[#00e5ff]/5 text-[#00e5ff] text-xs font-bold tracking-wide transition-all duration-300 hover:bg-[#00e5ff]/15 hover:border-[#00e5ff]/60 hover:shadow-[0_0_18px_rgba(0,229,255,0.25)] cursor-default"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={item} className="flex flex-wrap gap-4 mb-10">
            {/* Primary — gradient */}
            <a
              href="#work"
              className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm tracking-wide text-white overflow-hidden transition-all duration-300 hover:shadow-[0_0_32px_rgba(0,229,255,0.3)]"
              style={{
                background: 'linear-gradient(135deg, #00e5ff 0%, #8b5cf6 100%)',
              }}
            >
              <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
              <span className="relative z-10">View Projects</span>
            </a>

            {/* Glass — GitHub */}
            <a
              href="https://github.com/om-prakash16"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white text-sm font-semibold tracking-wide hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              GitHub
            </a>

            {/* Glass — Contact */}
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white text-sm font-semibold tracking-wide hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              Contact
            </a>
          </motion.div>

          {/* Stats Row */}
          <motion.div variants={item} className="flex flex-wrap gap-3">
            {STATS.map((stat) => (
              <span
                key={stat}
                className="px-5 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md text-gray-300 text-xs font-medium tracking-wide"
              >
                {stat}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT COLUMN — Holographic Profile Card ─────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ rotateX: rx, rotateY: ry, perspective: 1000 }}
          className="hidden lg:block flex-shrink-0 cursor-pointer"
        >
          <div className="group relative w-[340px] h-[460px]">
            {/* Outer glow */}
            <div className="absolute -inset-6 bg-gradient-to-br from-[#00e5ff]/15 to-[#8b5cf6]/15 blur-2xl rounded-[56px] opacity-60 group-hover:opacity-90 transition-opacity duration-700" />

            {/* Holographic rotating conic-gradient border */}
            <div
              className="absolute -inset-[2px] rounded-[42px] opacity-70 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background:
                  'conic-gradient(from var(--holo-angle, 0deg), #00e5ff, #8b5cf6, #ec4899, #f59e0b, #10b981, #00e5ff)',
                animation: 'holoSpin 4s linear infinite',
              }}
            />

            {/* Card body */}
            <div className="relative w-full h-full rounded-[40px] overflow-hidden border border-white/10 bg-[#060611]/60 shadow-[0_32px_80px_rgba(0,0,0,0.7)] backdrop-blur-xl">
              <Image
                src="/img/om2.jpeg"
                alt="Om Prakash Kumar"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                priority
              />
              {/* Bottom gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#060611]/95 via-[#060611]/30 to-transparent" />

              {/* Card footer */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-2xl font-black tracking-tight text-white mb-1">
                  OM PRAKASH
                </p>
                <div className="h-[2px] w-10 bg-gradient-to-r from-[#00e5ff] to-[#8b5cf6] mb-3 rounded-full" />
                <p className="label text-gray-400 text-xs tracking-widest uppercase">
                  Python Backend Developer
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Scroll indicator — bouncing chevron ───────────────────── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 opacity-50">
        <span
          className="label text-[#00e5ff] uppercase tracking-[0.25em]"
          style={{ fontSize: '0.55rem' }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <ChevronDown className="w-5 h-5 text-[#00e5ff]" strokeWidth={2} />
        </motion.div>
      </div>

      {/* ── Inline keyframes for holographic spin ─────────────────── */}
      <style jsx global>{`
        @property --holo-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        @keyframes holoSpin {
          to {
            --holo-angle: 360deg;
          }
        }
      `}</style>
    </section>
  )
}
