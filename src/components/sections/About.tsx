'use client'

import { motion } from 'framer-motion'

const CARDS = [
  {
    icon: '⚙️',
    title: 'Automation',
    desc: 'Building scripts and workflows that eliminate manual work, reduce errors, and run reliably at scale.',
  },
  {
    icon: '📊',
    title: 'Data Engineering',
    desc: 'Designing data pipelines, cleaning datasets, and transforming raw data into actionable insights with Pandas & NumPy.',
  },
  {
    icon: '🌐',
    title: 'Web & UI/UX',
    desc: 'Creating high-performance frontend interfaces with React & Next.js — precision-engineered with modern motion design.',
  },
]

export default function About() {
  return (
    <section
      id="about"
      className="w-full min-h-screen bg-[#f4f4f0]"
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-24 lg:py-32">

        {/* Two-column header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-20 lg:mb-28 items-end">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="label text-gray-400 block mb-5">About me</span>
            <h2 className="heading-xl text-[#080810] leading-none">
              ABOUT<br /><span className="text-gray-300">ME</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-end gap-5"
          >
            <p className="text-2xl font-bold leading-snug text-[#080810] tracking-tight">
              I&apos;m a{' '}
              <span className="text-[#8b5cf6]">Python Developer</span> &amp;{' '}
              <span className="text-[#00e5ff]">Automation Engineer</span>{' '}
              turning complex systems into reliable, efficient workflows.
            </p>
            <p className="body-lg text-gray-500 max-w-xl">
              Currently working on{' '}
              <span className="font-bold text-[#080810]">Bill.com</span> (billing automation &amp; data pipelines) and{' '}
              <span className="font-bold text-[#080810]">RetailBackbone.com</span> (data handling &amp; backend operations).
              Strong foundation in Python, Pandas, NumPy, REST APIs, Linux scripting, and web development.
            </p>
            <p className="body-lg text-gray-500 max-w-xl">
              Also a technical writer at{' '}
              <span className="font-bold text-[#080810]">GeeksforGeeks</span> — simplifying complex engineering concepts into practical knowledge.
            </p>
          </motion.div>
        </div>

        {/* Expertise Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {CARDS.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="group rounded-[28px] bg-white border border-black/5 p-10 shadow-[0_4px_40px_rgba(0,0,0,0.06)] card-lift"
            >
              <div className="text-4xl mb-8">{card.icon}</div>
              <h3 className="heading-md text-[#080810] mb-4">{card.title}</h3>
              <p className="text-gray-500 leading-relaxed font-medium">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
