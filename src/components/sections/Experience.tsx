'use client'

import { motion } from 'framer-motion'
import { Briefcase, PenTool } from 'lucide-react'

const EXPERIENCES = [
  {
    year: 'Mar 2025 — Present',
    role: 'Process Associate',
    company: 'Suntec India',
    tags: ['Data Processing', 'SaaS', 'Automation', 'Structured Logic'],
    desc: 'Work with structured billing datasets using SaaS tools like Bill.com and RetailBackbone. Ensure data accuracy and consistency. Automate repetitive workflows using structured logic and improve efficiency in data handling processes.',
    color: '#00e5ff',
    status: 'active',
  },
  {
    year: 'Apr 2024 — Feb 2025',
    role: 'Technical Writer',
    company: 'GeeksforGeeks',
    tags: ['Python', 'Automation', 'Technical Writing', 'Programming'],
    desc: 'Published articles on Python, automation, and programming concepts. Created structured coding examples and simplified complex technical topics.',
    color: '#8b5cf6',
    status: 'past',
  },
]

const ROLE_ICONS: Record<string, React.ElementType> = {
  'Process Associate': Briefcase,
  'Technical Writer': PenTool,
}

const cardVariants = {
  hidden: { opacity: 0, x: -60, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.9,
      delay: i * 0.2,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

const dotVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.2 + 0.1,
      ease: [0.34, 1.56, 0.64, 1],
    },
  }),
}

const lineVariants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export default function Experience() {
  return (
    <section
      id="experience"
      className="w-full min-h-screen bg-[#060611] relative overflow-hidden"
    >
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute top-1/4 -left-40 w-[500px] h-[500px] rounded-full opacity-[0.04]"
        style={{
          background: 'radial-gradient(circle, #00e5ff 0%, transparent 70%)',
        }}
      />
      <div
        className="pointer-events-none absolute bottom-1/4 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.04]"
        style={{
          background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)',
        }}
      />

      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-24 lg:py-32 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 lg:mb-28"
        >
          <span className="label text-[#00e5ff] block mb-5">Career</span>
          <h2 className="heading-xl text-white leading-none">
            EXPERIENCE<br />
            <span className="text-gray-700">&amp; WORK</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Animated gradient timeline line */}
          <motion.div
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="absolute left-[15px] md:left-[19px] top-0 bottom-0 w-[2px] origin-top"
            style={{
              background: 'linear-gradient(to bottom, #00e5ff, #8b5cf6)',
            }}
          />

          <div className="flex flex-col gap-12 lg:gap-16">
            {EXPERIENCES.map((exp, i) => {
              const Icon = ROLE_ICONS[exp.role] || Briefcase

              return (
                <motion.div
                  key={i}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, margin: '-50px' }}
                  className="relative pl-14 md:pl-20"
                >
                  {/* Timeline dot */}
                  <motion.div
                    custom={i}
                    variants={dotVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }}
                    className="absolute left-0 top-8 md:top-10 z-10"
                  >
                    {/* Pulse ring for active */}
                    {exp.status === 'active' && (
                      <div
                        className="absolute inset-0 -m-2 rounded-full animate-pulse-ring"
                        style={{
                          background: `${exp.color}30`,
                          border: `1px solid ${exp.color}50`,
                        }}
                      />
                    )}
                    {/* Dot with icon */}
                    <div
                      className="relative w-[30px] h-[30px] md:w-[38px] md:h-[38px] rounded-full flex items-center justify-center"
                      style={{
                        background: `${exp.color}20`,
                        border: `2px solid ${exp.color}`,
                        boxShadow: `0 0 20px ${exp.color}40, 0 0 40px ${exp.color}15`,
                      }}
                    >
                      <Icon
                        size={14}
                        className="md:w-[18px] md:h-[18px]"
                        style={{ color: exp.color }}
                      />
                    </div>
                  </motion.div>

                  {/* Glassmorphism Card */}
                  <div
                    className="glass-card p-6 md:p-8 lg:p-10 relative group transition-all duration-500 hover:bg-white/[0.06] hover:border-white/[0.12]"
                    style={{
                      borderLeft: `3px solid ${exp.color}`,
                    }}
                  >
                    {/* Subtle card glow on hover */}
                    <div
                      className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                      style={{
                        background: `radial-gradient(ellipse at top left, ${exp.color}08, transparent 60%)`,
                      }}
                    />

                    <div className="relative z-[1]">
                      {/* Year + Status */}
                      <div className="flex items-center gap-3 mb-4 flex-wrap">
                        <span
                          className="label tracking-wider text-xs"
                          style={{ color: exp.color }}
                        >
                          {exp.year}
                        </span>
                        {exp.status === 'active' && (
                          <span
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.6rem] font-bold tracking-widest uppercase"
                            style={{
                              background: 'rgba(16, 185, 129, 0.1)',
                              border: '1px solid rgba(16, 185, 129, 0.3)',
                              color: '#10b981',
                              boxShadow: '0 0 12px rgba(16, 185, 129, 0.15)',
                            }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                            CURRENT
                          </span>
                        )}
                      </div>

                      {/* Role */}
                      <h3 className="heading-md text-white mb-1 flex items-center gap-3">
                        {exp.role}
                      </h3>

                      {/* Company */}
                      <p
                        className="text-lg font-semibold mb-5 flex items-center gap-2"
                        style={{ color: exp.color }}
                      >
                        @ {exp.company}
                      </p>

                      {/* Description */}
                      <p className="body-lg text-gray-400 max-w-2xl mb-6 leading-relaxed">
                        {exp.desc}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-default"
                            style={{
                              background: `${exp.color}08`,
                              border: `1px solid ${exp.color}30`,
                              color: `${exp.color}cc`,
                            }}
                            onMouseEnter={(e) => {
                              const el = e.currentTarget
                              el.style.background = `${exp.color}18`
                              el.style.borderColor = `${exp.color}60`
                              el.style.boxShadow = `0 0 12px ${exp.color}20`
                              el.style.color = exp.color
                            }}
                            onMouseLeave={(e) => {
                              const el = e.currentTarget
                              el.style.background = `${exp.color}08`
                              el.style.borderColor = `${exp.color}30`
                              el.style.boxShadow = 'none'
                              el.style.color = `${exp.color}cc`
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
