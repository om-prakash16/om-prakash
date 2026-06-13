'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, Star, GitFork, Loader2, ArrowUpRight } from 'lucide-react'

const FEATURED_PROJECTS = [
  {
    title: 'SkillProof AI (Hackathon Project)',
    desc: 'AI-powered SaaS platform for evaluating developer skills using project analysis and GitHub data.',
    items: [
      'Built backend APIs using FastAPI',
      'Designed AI-based evaluation workflow',
      'Process GitHub project data for skill insights',
      'Structured scalable backend architecture'
    ],
    highlight: '#00e5ff',
    github: 'https://github.com/om-prakash16/Skillsutra'
  },
  {
    title: 'Stock Data Analysis Tool',
    desc: 'Analyzes stock market data using Python and APIs.',
    items: [
      'Fetch stock data via API',
      'Detect breakout trends across multiple timeframes',
      'Process data using Pandas and NumPy',
      'Implement logging and error handling'
    ],
    highlight: '#8b5cf6',
    github: 'https://github.com/om-prakash16/NGTA'
  }
]

const FILTERS = ['All', 'Python', 'AI', 'API', 'Web', 'Data']

export default function Projects() {
  const [repos, setRepos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All')

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch('https://api.github.com/users/om-prakash16/repos?sort=updated&per_page=100')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        const filteredData = data.filter((repo: any) =>
          repo.name.toLowerCase() !== 'skillsutra' &&
          repo.name.toLowerCase() !== 'ngta'
        )
        setRepos(filteredData)
        setLoading(false)
      } catch (err) {
        setError(true)
        setLoading(false)
      }
    }
    fetchRepos()
  }, [])

  const getTechCategories = (repo: any) => {
    const categories = new Set<string>()
    const topics = repo.topics || []
    const lang = repo.language ? repo.language.toLowerCase() : ''
    const desc = (repo.description || '').toLowerCase()

    if (lang === 'python' || topics.includes('python')) categories.add('Python')
    if (topics.includes('ai') || topics.includes('machine-learning') || desc.includes(' ai ') || desc.includes('gpt')) categories.add('AI')
    if (topics.includes('api') || topics.includes('fastapi') || desc.includes('fastapi') || desc.includes('rest api')) categories.add('API')
    if (lang === 'typescript' || lang === 'javascript' || lang === 'html' || lang === 'css' || topics.includes('react') || topics.includes('nextjs')) categories.add('Web')
    if (topics.includes('data') || topics.includes('pandas') || desc.includes('data engineering') || lang === 'jupyter notebook') categories.add('Data')

    return Array.from(categories)
  }

  const displayedRepos = repos.filter(repo => {
    if (activeFilter === 'All') return true
    const cats = getTechCategories(repo)
    return cats.includes(activeFilter)
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  const LANG_COLORS: Record<string, string> = {
    python: '#3572A5',
    typescript: '#3178c6',
    javascript: '#f7df1e',
    html: '#e34c26',
    css: '#563d7c',
    'jupyter notebook': '#DA5B0B',
  }

  return (
    <section id="work" className="relative w-full bg-[#060611] overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 dot-pattern opacity-30" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#8b5cf6]/5 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#00e5ff]/5 blur-[180px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-24 lg:py-32">

        {/* ── Section Divider ── */}
        <div className="section-divider mb-24" />

        {/* ── Featured Projects ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 lg:mb-28"
        >
          <span className="label text-[#00e5ff] block mb-5">Main Work</span>
          <h2 className="heading-xl text-white leading-none mb-16">
            FEATURED<br /><span className="text-gray-700">PROJECTS</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {FEATURED_PROJECTS.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="group relative rounded-3xl overflow-hidden"
              >
                {/* Gradient border on hover */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ background: `linear-gradient(135deg, ${project.highlight}30, transparent, ${project.highlight}15)`, padding: '1px' }}
                />

                <div className="relative h-full rounded-3xl bg-[#0a0a1a] border border-white/[0.06] p-8 md:p-10 flex flex-col justify-between group-hover:border-transparent transition-all duration-500">
                  {/* Hover glow */}
                  <div
                    className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{ background: `${project.highlight}15` }}
                  />

                  <div className="relative z-10">
                    <div
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-6 label"
                      style={{ borderColor: `${project.highlight}40`, color: project.highlight, background: `${project.highlight}08`, fontSize: '0.6rem' }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: project.highlight }} />
                      Pinned
                    </div>
                    <h3 className="heading-md text-white mb-4">{project.title}</h3>
                    <p className="text-gray-400 font-medium leading-relaxed mb-8 max-w-md">{project.desc}</p>
                    <ul className="flex flex-col gap-3 mb-10">
                      {project.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-gray-500 font-medium text-sm">
                          <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: project.highlight }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="relative z-10 flex items-center gap-4 pt-6 border-t border-white/[0.06]">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-all duration-300 hover:gap-3"
                      style={{ color: project.highlight }}
                    >
                      <Github size={16} />
                      View Code
                      <ArrowUpRight size={14} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── GitHub Repositories ── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mb-14"
          >
            <span className="label text-gray-500 block mb-5">Built with Python, APIs, and AI workflows</span>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <h2 className="heading-xl text-white leading-none whitespace-nowrap">
                PROJECTS<br /><span className="text-gray-700">BUILT</span>
              </h2>

              {/* Filters */}
              {!error && !loading && (
                <div className="flex flex-wrap gap-2 lg:justify-end max-w-lg">
                  {FILTERS.map(f => (
                    <button
                      key={f}
                      onClick={() => setActiveFilter(f)}
                      className={`relative px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all duration-400 ${
                        activeFilter === f
                        ? 'bg-gradient-to-r from-[#00e5ff]/20 to-[#8b5cf6]/20 text-white border border-[#00e5ff]/30 shadow-[0_0_20px_rgba(0,229,255,0.1)]'
                        : 'bg-white/[0.03] text-gray-500 border border-white/[0.06] hover:bg-white/[0.06] hover:text-gray-300 hover:border-white/[0.1]'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="rounded-3xl bg-white/[0.02] border border-white/[0.05] p-8 h-64 animate-pulse flex flex-col justify-between">
                  <div className="flex flex-col gap-4">
                    <div className="h-4 w-16 bg-white/[0.06] rounded-full" />
                    <div className="h-6 w-3/4 bg-white/[0.06] rounded-lg" />
                    <div className="h-12 w-full bg-white/[0.04] rounded-lg" />
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="h-4 w-12 bg-white/[0.06] rounded" />
                    <div className="h-8 w-8 bg-white/[0.06] rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="w-full p-16 rounded-3xl bg-white/[0.02] border border-white/[0.05] flex flex-col items-center justify-center text-center">
              <Loader2 className="w-10 h-10 text-gray-600 animate-spin mb-4" />
              <p className="text-gray-500 font-medium">Projects currently loading from GitHub...</p>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              <AnimatePresence>
                {displayedRepos.map((repo) => {
                  const langColor = LANG_COLORS[repo.language?.toLowerCase()] || '#6b7280'
                  return (
                    <motion.div
                      key={repo.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="group relative rounded-2xl bg-white/[0.02] border border-white/[0.05] p-7 flex flex-col overflow-hidden hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-500 hover:-translate-y-1"
                    >
                      {/* Hover Glow */}
                      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 bg-gradient-to-br from-[#00e5ff]/5 to-[#8b5cf6]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                      {/* Language + Badges */}
                      <div className="flex gap-2 mb-4 overflow-hidden relative z-10 flex-wrap">
                        {repo.language && (
                          <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-gray-400">
                            <span className="w-2 h-2 rounded-full" style={{ background: langColor }} />
                            {repo.language}
                          </span>
                        )}
                        {getTechCategories(repo).slice(0, 2).map(cat => (
                          <span key={cat} className="px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-gray-500 text-[9px] font-bold tracking-widest uppercase">
                            {cat}
                          </span>
                        ))}
                      </div>

                      <h3 className="text-lg font-bold text-white mb-2.5 relative z-10 truncate tracking-tight" title={repo.name}>
                        {repo.name}
                      </h3>

                      <p className="text-gray-500 font-medium text-sm leading-relaxed mb-6 flex-1 line-clamp-3 relative z-10">
                        {repo.description || 'A software project repository.'}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/[0.05] relative z-10">
                        <div className="flex items-center gap-4 text-xs font-bold text-gray-600">
                          <div className="flex items-center gap-1.5">
                            <Star size={13} className="text-amber-500/70" />
                            <span>{repo.stargazers_count}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <GitFork size={13} />
                            <span>{repo.forks_count}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-[9px] uppercase font-bold text-gray-600 tracking-wider">
                            {formatDate(repo.updated_at)}
                          </span>
                          <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.06] text-gray-500 hover:text-[#00e5ff] hover:border-[#00e5ff]/30 hover:bg-[#00e5ff]/5 transition-all duration-300"
                            title="View on GitHub"
                          >
                            <Github size={14} />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
