'use client'

import { motion } from 'framer-motion'

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

export default function Experience() {
  return (
    <section
      id="experience"
      className="w-full min-h-screen bg-[#080810]"
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-24 lg:py-32">

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
            EXPERIENCE<br /><span className="text-gray-600">&amp; WORK</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-[1px] top-0 bottom-0 w-px bg-white/8" />

          <div className="flex flex-col gap-16 lg:gap-20">
            {EXPERIENCES.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="relative pl-10 md:pl-16"
              >
                {/* Dot */}
                <div
                  className="absolute left-0 top-1.5 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-[#080810]"
                  style={{ background: exp.color, boxShadow: `0 0 16px ${exp.color}80` }}
                />

                {/* Year + Status */}
                <div className="flex items-center gap-4 mb-4">
                  <span className="label" style={{ color: exp.color }}>{exp.year}</span>
                  {exp.status === 'active' && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#10b981]/10 border border-[#10b981]/30 text-[#10b981] label" style={{ fontSize: '0.58rem' }}>
                      ● CURRENT
                    </span>
                  )}
                </div>

                {/* Role + Company */}
                <h3 className="heading-md text-white mb-1">{exp.role}</h3>
                <p className="text-lg font-semibold mb-5" style={{ color: exp.color }}>@ {exp.company}</p>

                {/* Description */}
                <p className="body-lg text-gray-400 max-w-2xl mb-6">{exp.desc}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full border border-white/8 bg-white/4 text-gray-400 text-xs font-semibold tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {i < EXPERIENCES.length - 1 && (
                  <div className="mt-14 h-px w-full bg-white/5" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
