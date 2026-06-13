'use client'

import { motion } from 'framer-motion'
import {
  Code2,
  BarChart3,
  Workflow,
  Sparkles,
  ArrowLeftRight,
  Zap,
  Globe,
  FileJson,
  Cpu,
  ShieldCheck,
  GitBranch,
  Github,
  Terminal,
  Monitor,
  Table,
} from 'lucide-react'
import { type LucideIcon } from 'lucide-react'

/* ─── Types ─── */
interface Skill {
  name: string
  pct: number
  icon: LucideIcon
  accent: string
}

interface Category {
  key: string
  label: string
  accent: string
  glow: string
  skills: Skill[]
}

/* ─── Data ─── */
const CATEGORIES: Category[] = [
  {
    key: 'ai',
    label: 'Python & AI',
    accent: '#00e5ff',
    glow: 'rgba(0,229,255,0.15)',
    skills: [
      { name: 'Python', pct: 90, icon: Code2, accent: '#00e5ff' },
      { name: 'Data Processing (Pandas, NumPy)', pct: 85, icon: BarChart3, accent: '#22d3ee' },
      { name: 'Automation Scripts', pct: 80, icon: Workflow, accent: '#06b6d4' },
      { name: 'Prompt Engineering', pct: 75, icon: Sparkles, accent: '#67e8f9' },
      { name: 'API Data Handling', pct: 85, icon: ArrowLeftRight, accent: '#00e5ff' },
    ],
  },
  {
    key: 'backend',
    label: 'Backend Development',
    accent: '#10b981',
    glow: 'rgba(16,185,129,0.15)',
    skills: [
      { name: 'FastAPI', pct: 85, icon: Zap, accent: '#10b981' },
      { name: 'REST APIs', pct: 90, icon: Globe, accent: '#34d399' },
      { name: 'JSON/XML Processing', pct: 85, icon: FileJson, accent: '#059669' },
      { name: 'Backend Logic', pct: 80, icon: Cpu, accent: '#6ee7b7' },
      { name: 'Data Validation', pct: 85, icon: ShieldCheck, accent: '#10b981' },
    ],
  },
  {
    key: 'frontend',
    label: 'Frontend & UI/UX',
    accent: '#ec4899',
    glow: 'rgba(236,72,153,0.15)',
    skills: [
      { name: 'React / Next.js', pct: 90, icon: Globe, accent: '#ec4899' },
      { name: 'UI/UX Design', pct: 85, icon: Sparkles, accent: '#f472b6' },
      { name: 'Tailwind CSS', pct: 95, icon: Workflow, accent: '#fb7185' },
      { name: 'Framer Motion', pct: 85, icon: Zap, accent: '#ec4899' },
      { name: 'Responsive Web', pct: 90, icon: Monitor, accent: '#f43f5e' },
    ],
  },
  {
    key: 'tools',
    label: 'Tools & Technologies',
    accent: '#f59e0b',
    glow: 'rgba(245,158,11,0.15)',
    skills: [
      { name: 'Git & GitHub', pct: 90, icon: Github, accent: '#f59e0b' },
      { name: 'VS Code', pct: 95, icon: Monitor, accent: '#fbbf24' },
      { name: 'Linux', pct: 75, icon: Terminal, accent: '#d97706' },
      { name: 'Excel Automation', pct: 85, icon: Table, accent: '#fbbf24' },
    ],
  },
]

/* ─── Dot Indicator ─── */
function DotLevel({ pct, accent }: { pct: number; accent: string }) {
  const filled = Math.round(pct / 20) // 1–5 integer
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="block size-2 rounded-full transition-colors duration-300"
          style={{
            background: i < filled ? accent : 'rgba(255,255,255,0.1)',
            boxShadow: i < filled ? `0 0 6px ${accent}50` : 'none',
          }}
        />
      ))}
    </div>
  )
}

/* ─── Skill Card ─── */
function SkillCard({
  skill,
  delay,
}: {
  skill: Skill
  delay: number
}) {
  const Icon = skill.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{
        borderColor: skill.accent,
        boxShadow: `0 0 20px ${skill.accent}25, 0 4px 30px ${skill.accent}15`,
        y: -3,
      }}
      className="skill-card group cursor-default"
    >
      {/* Icon */}
      <div
        className="flex items-center justify-center size-10 rounded-xl shrink-0 transition-colors duration-300"
        style={{ background: `${skill.accent}12` }}
      >
        <Icon
          size={20}
          className="transition-colors duration-300"
          style={{ color: skill.accent }}
        />
      </div>

      {/* Name + Dots */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white/90 truncate mb-1">
          {skill.name}
        </p>
        <DotLevel pct={skill.pct} accent={skill.accent} />
      </div>

      {/* Percentage */}
      <span
        className="text-xs font-mono font-semibold tabular-nums shrink-0 transition-colors duration-300"
        style={{ color: `${skill.accent}aa` }}
      >
        {skill.pct}%
      </span>
    </motion.div>
  )
}

/* ─── Category Container (Glassmorphism) ─── */
function CategoryGroup({
  category,
  index,
}: {
  category: Category
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-3xl p-6 md:p-8 backdrop-blur-xl"
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.04), 0 20px 60px rgba(0,0,0,0.3)`,
      }}
    >
      {/* Subtle gradient glow behind the container */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `radial-gradient(600px circle at 50% 0%, ${category.glow}, transparent 70%)`,
        }}
      />

      {/* Category Label */}
      <div className="flex items-center gap-3 mb-6">
        <span
          className="block size-2 rounded-full"
          style={{ background: category.accent, boxShadow: `0 0 8px ${category.accent}60` }}
        />
        <h3
          className="text-xs font-bold uppercase tracking-[0.2em]"
          style={{ color: category.accent }}
        >
          {category.label}
        </h3>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {category.skills.map((skill, i) => (
          <SkillCard
            key={skill.name}
            skill={skill}
            delay={index * 0.1 + i * 0.08}
          />
        ))}
      </div>
    </motion.div>
  )
}

/* ─── Main Section ─── */
export default function Skills() {
  return (
    <section id="skills" className="relative w-full min-h-screen bg-[#060611] overflow-hidden">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-cyan-500/[0.03] blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-emerald-500/[0.03] blur-[120px]" />
        <div className="absolute top-1/2 right-1/3 w-[400px] h-[400px] rounded-full bg-amber-500/[0.02] blur-[100px]" />
      </div>

      <div className="relative w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-24 lg:py-32">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 lg:mb-24"
        >
          <span className="label text-gray-500 block mb-5">Expertise</span>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-4">
            <h2 className="heading-xl text-white leading-none">
              SKILLS &<br />
              <span className="text-gray-700">STACK</span>
            </h2>
            <p className="body-lg text-gray-500 max-w-md">
              Frontend UI/UX design, Python backend logic, REST APIs, and data engineering — scalable, production-level skills.
            </p>
          </div>

          {/* Decorative divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="h-px w-full origin-left bg-gradient-to-r from-white/10 via-white/5 to-transparent mt-8"
          />
        </motion.div>

        {/* ── Category Groups ── */}
        <div className="flex flex-col gap-10">
          {CATEGORIES.map((cat, i) => (
            <CategoryGroup key={cat.key} category={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
