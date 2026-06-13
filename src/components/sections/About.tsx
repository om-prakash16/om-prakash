'use client'

import { motion } from 'framer-motion'
import { Zap, Database, Globe } from 'lucide-react'
import { type LucideIcon } from 'lucide-react'

interface ExpertiseCard {
  icon: LucideIcon
  color: string
  title: string
  desc: string
}

const CARDS: ExpertiseCard[] = [
  {
    icon: Zap,
    color: '#00e5ff',
    title: 'Automation',
    desc: 'Building scripts and workflows that eliminate manual work, reduce errors, and run reliably at scale.',
  },
  {
    icon: Database,
    color: '#8b5cf6',
    title: 'Data Engineering',
    desc: 'Designing data pipelines, cleaning datasets, and transforming raw data into actionable insights with Pandas & NumPy.',
  },
  {
    icon: Globe,
    color: '#3b82f6',
    title: 'Web & UI/UX',
    desc: 'Creating high-performance frontend interfaces with React & Next.js — precision-engineered with modern motion design.',
  },
]

const sectionVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function About() {
  return (
    <section
      id="about"
      className="relative w-full min-h-screen bg-[#060611] overflow-hidden"
    >
      {/* Dot pattern overlay */}
      <div className="dot-pattern absolute inset-0 pointer-events-none" />

      {/* Subtle radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: '900px',
          height: '900px',
          background:
            'radial-gradient(circle, rgba(0,229,255,0.03) 0%, rgba(139,92,246,0.02) 40%, transparent 70%)',
        }}
      />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-24 lg:py-32">
        {/* Two-column header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-20 lg:mb-28 items-end">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={fadeUp}
          >
            <span className="label text-[#00e5ff] block mb-5">About me</span>
            <h2 className="heading-xl leading-none">
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    'linear-gradient(135deg, #ffffff 0%, #00e5ff 50%, #8b5cf6 100%)',
                }}
              >
                ABOUT
              </span>
              <br />
              <span className="text-gray-700">ME</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={sectionVariants}
            className="flex flex-col justify-end gap-5"
          >
            <motion.p
              variants={fadeUp}
              className="text-2xl font-bold leading-snug text-white tracking-tight"
            >
              I am a{' '}
              <span className="text-[#8b5cf6]">Python Backend Developer</span>{' '}
              and <span className="text-[#00e5ff]">Frontend UI/UX Designer</span>{' '}
              focused on building scalable APIs, AI-powered systems, and premium interfaces.
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="body-lg text-gray-400 max-w-xl"
            >
              My work combines Python, FastAPI, and robust data processing on the backend, with React, Next.js, and high-end motion design on the frontend. I transform complex workflows into beautiful, efficient software solutions.
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="body-lg text-gray-400 max-w-xl"
            >
              Currently working as a Process Associate at SunTec, where I handle
              structured datasets and optimize workflows. Alongside this, I
              build AI and SaaS-based projects including SkillProof AI — a
              platform that evaluates technical skills using intelligent project
              analysis.
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="body-lg text-gray-400 max-w-xl mt-4"
            >
              I also contribute technical content on GeeksforGeeks, simplifying
              Python, automation, and software engineering concepts.
            </motion.p>
          </motion.div>
        </div>

        {/* Expertise Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={sectionVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {CARDS.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.8,
                      delay: i * 0.12,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  },
                }}
                className="group relative rounded-[28px] p-[1px] card-lift"
              >
                {/* Hover gradient border glow */}
                <div
                  className="absolute inset-0 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${card.color}20, transparent 50%, ${card.color}10)`,
                  }}
                />

                {/* Card inner */}
                <div
                  className="relative rounded-[28px] p-10 h-full backdrop-blur-xl overflow-hidden"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  {/* Colored top accent line */}
                  <div
                    className="absolute top-0 left-8 right-8 h-[2px] rounded-full"
                    style={{ backgroundColor: card.color }}
                  />

                  {/* Icon container */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8"
                    style={{ backgroundColor: `${card.color}1A` }}
                  >
                    <Icon
                      size={26}
                      strokeWidth={1.8}
                      style={{ color: card.color }}
                    />
                  </div>

                  <h3 className="heading-md text-white mb-4">{card.title}</h3>
                  <p className="text-gray-400 leading-relaxed font-medium">
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
