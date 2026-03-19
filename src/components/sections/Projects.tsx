'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'

const CURRENT_WORK = [
  {
    company: 'SuntecIndia',
    role: 'Process Associate',
    highlight: '#00e5ff',
    items: [
      'Creating and processing invoices using Bill.com',
      'Data handling and operations via RetailBackbone.com',
      'Using Microsoft Excel for fast data matching and reconciliation',
    ],
  },
]

const PROJECTS = [
  {
    title: 'Stock Analysis Tool',
    category: 'Python / Data',
    desc: 'Real-time stock data analysis using Pandas, NumPy, and Matplotlib for visualization dashboards.',
    tech: ['Python', 'Pandas', 'NumPy', 'Matplotlib'],
    color: '#00e5ff',
    github: 'https://github.com/om-prakash16/',
    live: '',
  },
  {
    title: 'AI Chatbot',
    category: 'AI / API',
    desc: 'Intelligent conversational chatbot with REST API integration and dynamic NLP response pipelines.',
    tech: ['Python', 'OpenAI API', 'FastAPI', 'JSON'],
    color: '#8b5cf6',
    github: 'https://github.com/om-prakash16/',
    live: '',
  },
  {
    title: 'Data Automation Suite',
    category: 'Automation / ETL',
    desc: 'End-to-end data cleaning, transformation, and automated reporting pipeline with scheduling.',
    tech: ['Python', 'Pandas', 'Linux', 'Bash', 'Cron'],
    color: '#10b981',
    github: 'https://github.com/om-prakash16/',
    live: '',
  },
]

export default function Projects() {
  return (
    <section id="work" className="w-full bg-white">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-24 lg:py-32">

        {/* ── Current Work ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 lg:mb-28"
        >
          <span className="label text-gray-400 block mb-5">Where I work now</span>
          <h2 className="heading-xl text-[#080810] leading-none mb-16">
            CURRENT<br /><span className="text-gray-200">WORK</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-1 max-w-2xl gap-6 lg:gap-8">
            {CURRENT_WORK.map((work, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-[28px] border p-10 card-lift"
                style={{ borderColor: `${work.highlight}30`, background: `${work.highlight}06` }}
              >
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-6 label"
                  style={{ borderColor: `${work.highlight}50`, color: work.highlight, fontSize: '0.6rem' }}
                >
                  ● Active
                </div>
                <h3 className="heading-md text-[#080810] mb-1">{work.company}</h3>
                <p className="text-gray-500 font-semibold mb-8">{work.role}</p>
                <ul className="flex flex-col gap-3">
                  {work.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-gray-600 font-medium">
                      <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: work.highlight }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Projects ── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mb-14"
          >
            <span className="label text-gray-400 block mb-5">Personal & Open-source</span>
            <h2 className="heading-xl text-[#080810] leading-none">
              PROJECTS<br /><span className="text-gray-200">BUILT</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {PROJECTS.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group rounded-[28px] bg-[#f7f7f5] border border-black/5 p-8 card-lift flex flex-col"
              >
                {/* Category */}
                <span className="label text-gray-400 mb-4">{p.category}</span>

                {/* Title */}
                <h3 className="heading-md text-[#080810] mb-4">{p.title}</h3>

                {/* Description */}
                <p className="text-gray-500 font-medium leading-relaxed mb-6 flex-1">{p.desc}</p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {p.tech.map(t => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full border text-xs font-bold"
                      style={{ borderColor: `${p.color}40`, color: p.color, background: `${p.color}08` }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* View / GitHub buttons */}
                <div className="flex items-center gap-3 pt-4 border-t border-black/5">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-500 hover:text-[#080810] transition-colors"
                  >
                    <Github size={15} />
                    GitHub
                  </a>
                  <span className="w-px h-4 bg-black/10" />
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-colors"
                    style={{ color: p.color }}
                  >
                    <ExternalLink size={15} />
                    View Project
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
