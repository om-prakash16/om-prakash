'use client'

import { Canvas } from '@react-three/fiber'
import { motion, useMotionValue, useTransform, useSpring, type Variants } from 'framer-motion'
import dynamic from 'next/dynamic'
import Image from 'next/image'

const HeroModel = dynamic(() => import('../canvas/HeroModel'), { ssr: false })

const EASE = [0.16, 1, 0.3, 1] as const

const ctn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.4 } },
}
const item: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
}

const ROLES = ['Automation Engineer', 'Python Developer', 'Data Pipeline Builder', 'API Integration Expert']

export default function Hero() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-300, 300], [8, -8]), { stiffness: 80, damping: 25 })
  const ry = useSpring(useTransform(mx, [-300, 300], [-8, 8]), { stiffness: 80, damping: 25 })

  function onMove(e: React.MouseEvent) {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set(e.clientX - r.left - r.width / 2)
    my.set(e.clientY - r.top - r.height / 2)
  }

  return (
    <section
      onMouseMove={onMove}
      className="relative w-full min-h-screen flex items-center bg-[#080810] overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas shadows gl={{ antialias: true }}>
          <HeroModel />
        </Canvas>
      </div>

      {/* Atmospheric glows */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-[#00e5ff]/6 blur-[160px] animate-pulse-glow pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#8b5cf6]/6 blur-[150px] animate-pulse-glow pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 pt-28 pb-20 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

        {/* LEFT */}
        <motion.div variants={ctn} initial="hidden" animate="show" className="flex-1 min-w-0">

          <motion.span variants={item} className="label text-[#00e5ff] mb-6 block">
            Python Backend Developer &bull; AI&nbsp;&bull;&nbsp;FastAPI&nbsp;&bull;&nbsp;Data Engineering
          </motion.span>

          <motion.h1 
            variants={item} 
            className="text-4xl md:text-5xl lg:text-[4.5rem] font-black tracking-tighter text-white mb-8 leading-tight"
          >
            BUILDING INTELLIGENT SYSTEMS<br />
            <span className="text-gradient">SCALABLE BACKENDS</span><br />
            REAL-WORLD AUTOMATION
          </motion.h1>

          <motion.p variants={item} className="body-lg text-gray-400 max-w-lg mb-5 leading-relaxed">
            I build AI-powered applications, backend APIs, and automation systems that solve real problems.
            Focused on Python, FastAPI, REST APIs, and data processing — developing scalable SaaS products and intelligent workflows.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-2 mb-12">
            {['Python', 'FastAPI', 'AI'].map(tag => (
              <span
                key={tag}
                className="px-4 py-1.5 rounded-full border border-[#00e5ff]/30 bg-[#00e5ff]/5 text-[#00e5ff] text-xs font-bold tracking-wide"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.div variants={item} className="flex flex-wrap gap-4">
            <a
              href="#work"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-[#00e5ff]/50 bg-[#00e5ff]/5 text-[#00e5ff] label hover:bg-[#00e5ff] hover:text-[#080810] transition-all duration-300"
            >
              View Projects
            </a>
            <a
              href="https://github.com/om-prakash16"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/10 bg-white/5 text-white label hover:bg-white/10 transition-all duration-300"
            >
              GitHub
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/10 bg-white/5 text-white label hover:bg-white/10 transition-all duration-300"
            >
              Contact
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT — Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ rotateX: rx, rotateY: ry, perspective: 1000 }}
          className="hidden lg:block flex-shrink-0 cursor-pointer"
        >
          <div className="group relative w-[340px] h-[460px]">
            <div className="absolute -inset-6 bg-gradient-to-br from-[#00e5ff]/15 to-[#8b5cf6]/15 blur-2xl rounded-[56px] opacity-60 group-hover:opacity-90 transition-opacity duration-700" />
            <div className="relative w-full h-full rounded-[40px] overflow-hidden border border-white/10 bg-white/5 shadow-[0_32px_80px_rgba(0,0,0,0.6)] backdrop-blur-sm">
              <Image
                src="/img/om2.jpeg"
                alt="Om Prakash Kumar"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080810]/90 via-[#080810]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-2xl font-black tracking-tight text-white mb-1">OM PRAKASH</p>
                <div className="h-[2px] w-10 bg-[#00e5ff] mb-3 rounded-full" />
                <p className="label text-gray-400">Python Backend Developer</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-40">
        <div className="w-px h-14 bg-gradient-to-b from-[#00e5ff] to-transparent" />
        <span className="label text-[#00e5ff]" style={{ fontSize: '0.55rem' }}>SCROLL</span>
      </div>
    </section>
  )
}
