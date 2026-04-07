'use client'

import { motion } from 'framer-motion'

const SKILLS = [
  { name: 'Python', pct: 90, color: '#00e5ff', category: 'ai' },
  { name: 'Data Processing (Pandas, NumPy)', pct: 85, color: '#00e5ff', category: 'ai' },
  { name: 'Automation Scripts', pct: 80, color: '#3b82f6', category: 'ai' },
  { name: 'Prompt Engineering', pct: 75, color: '#8b5cf6', category: 'ai' },
  { name: 'API Data Handling', pct: 85, color: '#7c3aed', category: 'ai' },

  { name: 'FastAPI', pct: 85, color: '#10b981', category: 'backend' },
  { name: 'REST APIs', pct: 90, color: '#10b981', category: 'backend' },
  { name: 'JSON/XML Processing', pct: 85, color: '#047857', category: 'backend' },
  { name: 'Backend Logic', pct: 80, color: '#059669', category: 'backend' },
  { name: 'Data Validation', pct: 85, color: '#34d399', category: 'backend' },

  { name: 'Git', pct: 85, color: '#f59e0b', category: 'tools' },
  { name: 'GitHub', pct: 90, color: '#f59e0b', category: 'tools' },
  { name: 'Linux', pct: 75, color: '#d97706', category: 'tools' },
  { name: 'VS Code', pct: 95, color: '#b45309', category: 'tools' },
  { name: 'Excel Automation', pct: 85, color: '#ea580c', category: 'tools' },
]

const CATEGORIES = [
  { key: 'ai', label: 'Python & AI' },
  { key: 'backend', label: 'Backend Development' },
  { key: 'tools', label: 'Tools & Technologies' },
]

function Bar({ name, pct, color, delay }: { name: string; pct: number; color: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl bg-white border border-black/5 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] card-lift"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-bold tracking-tight text-[#080810]">{name}</span>
        <span className="label text-gray-400">{pct}%</span>
      </div>
      <div className="relative h-2 w-full rounded-full bg-gray-100 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: false }}
          transition={{ duration: 1.2, delay: delay + 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}70)` }}
        />
      </div>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="w-full min-h-screen bg-[#f4f4f0]">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-24 lg:py-32">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 lg:mb-20"
        >
          <span className="label text-gray-400 block mb-5">Expertise</span>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-4">
            <h2 className="heading-xl text-[#080810] leading-none">
              SKILLS &amp;<br /><span className="text-gray-300">STACK</span>
            </h2>
            <p className="body-lg text-gray-500 max-w-md">
              Python backend logic, REST APIs, and data engineering — scalable, production-level skills.
            </p>
          </div>
        </motion.div>

        {/* Grouped Skills */}
        {CATEGORIES.map((cat, ci) => {
          const items = SKILLS.filter(s => s.category === cat.key)
          return (
            <div key={cat.key} className="mb-12 last:mb-0">
              <p className="label text-gray-400 mb-5">{cat.label}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
                {items.map((s, i) => (
                  <Bar key={s.name} {...s} delay={ci * 0.1 + i * 0.07} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
