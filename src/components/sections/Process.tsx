'use client'

import { motion } from 'framer-motion'

const PHASES = [
  {
    step: '01',
    title: 'THE LABORATORY',
    desc: 'Where ideas turn into algorithms. Our core R&D space for innovation and prototyping.',
    color: '#00e5ff',
    align: 'left' as const,
  },
  {
    step: '02',
    title: 'CRAFTING UI',
    desc: 'Precision-engineered interfaces with tactile feedback, motion chemistry, and pixel perfection.',
    color: '#8b5cf6',
    align: 'right' as const,
  },
  {
    step: '03',
    title: 'SCALING FAST',
    desc: 'Robust backends built for high-traffic production. Go, Node, distributed systems.',
    color: '#00e5ff',
    align: 'left' as const,
  },
  {
    step: '04',
    title: 'BEYOND LIMITS',
    desc: 'Pushing every boundary on the web — WebGL, AI integration, and immersive 3D worlds.',
    color: '#8b5cf6',
    align: 'right' as const,
  },
]

export default function Process() {
  return (
    <section id="process" className="relative w-full bg-[#080810]">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 pointer-events-none" />

      {PHASES.map((phase, i) => (
        <Phase key={i} {...phase} />
      ))}
    </section>
  )
}

function Phase({
  step, title, desc, color, align,
}: {
  step: string; title: string; desc: string; color: string; align: 'left' | 'right'
}) {
  const isLeft = align === 'left'

  return (
    <div
      className={`
        relative flex min-h-screen w-full items-center
        ${isLeft ? 'justify-start' : 'justify-end'}
        px-6 md:px-12 lg:px-20
      `}
    >
      <motion.div
        initial={{ opacity: 0, y: 80, scale: 0.92 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ amount: 0.4, once: false }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[560px] rounded-[32px] border border-white/8 bg-white/4 backdrop-blur-2xl p-10 md:p-14 shadow-[0_32px_80px_rgba(0,0,0,0.5)]"
      >
        {/* Step indicator */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent" style={{ backgroundImage: `linear-gradient(to right, transparent, ${color}40)` }} />
          <span className="label" style={{ color }}> STEP {step}</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent" style={{ backgroundImage: `linear-gradient(to left, transparent, ${color}40)` }} />
        </div>

        <h2 className="heading-lg text-white mb-6 leading-none">{title}</h2>
        <p className="body-lg text-gray-400 max-w-[420px]">{desc}</p>

        <div
          className="mt-10 h-[3px] w-14 rounded-full"
          style={{ background: `linear-gradient(to right, ${color}, transparent)` }}
        />

        {/* Corner accent */}
        <div
          className="absolute top-6 right-6 w-3 h-3 rounded-full opacity-60"
          style={{ background: color, boxShadow: `0 0 12px ${color}` }}
        />
      </motion.div>
    </div>
  )
}
