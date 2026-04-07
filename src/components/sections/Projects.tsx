'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, Star, GitFork, Loader2 } from 'lucide-react'

// Hardcoded Featured Projects
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
        
        // Exclude the featured projects from the dynamic list if they are present
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

  // Helper to map repo topics/language to our 'Filters' & 'Categories'
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

  // Filter repos based on selected tab
  const displayedRepos = repos.filter(repo => {
    if (activeFilter === 'All') return true
    const cats = getTechCategories(repo)
    return cats.includes(activeFilter)
  })

  // Helper to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  return (
    <section id="work" className="w-full bg-white">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-24 lg:py-32">

        {/* ── Featured Projects ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 lg:mb-28"
        >
          <span className="label text-gray-400 block mb-5">Main Work</span>
          <h2 className="heading-xl text-[#080810] leading-none mb-16">
            FEATURED<br /><span className="text-gray-200">PROJECTS</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {FEATURED_PROJECTS.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-[28px] border p-8 md:p-10 card-lift flex flex-col justify-between"
                style={{ borderColor: `${project.highlight}30`, background: `${project.highlight}06` }}
              >
                <div>
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-6 label"
                    style={{ borderColor: `${project.highlight}50`, color: project.highlight, fontSize: '0.6rem' }}
                  >
                    ● Pinned
                  </div>
                  <h3 className="heading-md text-[#080810] mb-4">{project.title}</h3>
                  <p className="text-gray-500 font-semibold leading-relaxed mb-8 max-w-sm">{project.desc}</p>
                  <ul className="flex flex-col gap-3 mb-10">
                    {project.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-gray-600 font-medium text-sm">
                        <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: project.highlight }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex items-center gap-4 pt-6 border-t" style={{ borderColor: `${project.highlight}20` }}>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-colors"
                    style={{ color: project.highlight }}
                  >
                    <ExternalLink size={15} />
                    View Code
                  </a>
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
            viewport={{ once: false }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mb-14"
          >
            <span className="label text-gray-400 block mb-5">Built with Python, APIs, and AI workflows</span>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <h2 className="heading-xl text-[#080810] leading-none whitespace-nowrap">
                PROJECTS<br /><span className="text-gray-200">BUILT</span>
              </h2>
              
              {/* Filters */}
              {!error && !loading && (
                <div className="flex flex-wrap gap-2 lg:justify-end max-w-lg">
                  {FILTERS.map(f => (
                    <button
                      key={f}
                      onClick={() => setActiveFilter(f)}
                      className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${
                        activeFilter === f 
                        ? 'bg-[#080810] text-[#00e5ff] shadow-lg shadow-black/10' 
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-[#080810]'
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
                 <div key={i} className="rounded-[28px] bg-gray-50 border border-gray-100 p-8 h-64 animate-pulse flex flex-col justify-between">
                   <div className="flex flex-col gap-4">
                     <div className="h-4 w-16 bg-gray-200 rounded-full" />
                     <div className="h-6 w-3/4 bg-gray-200 rounded" />
                     <div className="h-12 w-full bg-gray-200 rounded" />
                   </div>
                   <div className="flex justify-between items-center mt-4">
                     <div className="h-4 w-12 bg-gray-200 rounded" />
                     <div className="h-4 w-12 bg-gray-200 rounded" />
                   </div>
                 </div>
               ))}
             </div>
          ) : error ? (
            <div className="w-full p-12 rounded-[28px] bg-gray-50 border border-gray-100 flex flex-col items-center justify-center text-center">
              <Loader2 className="w-10 h-10 text-gray-300 animate-spin mb-4" />
              <p className="text-gray-500 font-medium">Projects currently loading from GitHub...</p>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              <AnimatePresence>
                {displayedRepos.map((repo, i) => (
                  <motion.div
                    key={repo.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="group rounded-[28px] bg-[#f7f7f5] border border-black/5 p-8 flex flex-col card-lift relative overflow-hidden"
                  >
                    {/* Hover Glow */}
                    <div className="absolute top-0 right-0 -mr-6 -mt-6 w-32 h-32 bg-gradient-to-br from-[#00e5ff]/5 to-[#8b5cf6]/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
                    
                    {/* Language / Badge */}
                    <div className="flex gap-2 mb-5 overflow-hidden relative z-10 flex-wrap">
                      {repo.language && (
                        <span className="label text-[#8b5cf6] mr-2 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6]" />
                          {repo.language}
                        </span>
                      )}
                      {getTechCategories(repo).slice(0, 2).map(cat => (
                        <span key={cat} className="px-2.5 py-0.5 rounded-full bg-white border border-black/5 text-gray-500 text-[10px] font-bold tracking-widest uppercase">
                          {cat}
                        </span>
                      ))}
                    </div>

                    <h3 className="heading-md text-[#080810] mb-3 relative z-10 truncate" title={repo.name}>
                      {repo.name}
                    </h3>
                    
                    <p className="text-gray-500 font-medium text-sm leading-relaxed mb-6 flex-1 line-clamp-3 relative z-10">
                      {repo.description || 'A software project repository.'}
                    </p>

                    {/* Footer Info */}
                    <div className="flex items-center justify-between mt-auto pt-5 border-t border-black/5 relative z-10">
                      <div className="flex items-center gap-4 text-xs font-bold text-gray-500">
                        <div className="flex items-center gap-1.5">
                          <Star size={14} className="text-amber-400 fill-amber-400 group-hover:scale-110 transition-transform" />
                          <span>{repo.stargazers_count}</span>
                        </div>
                        <div className="flex items-center gap-1.5 opacity-60">
                          <GitFork size={14} />
                          <span>{repo.forks_count}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] uppercase font-bold text-gray-400">
                          {formatDate(repo.updated_at)}
                        </span>
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-8 h-8 rounded-full bg-white border border-black/5 text-[#080810] hover:text-[#00e5ff] hover:border-[#00e5ff]/30 hover:bg-[#00e5ff]/5 transition-all"
                          title="View on GitHub"
                        >
                          <Github size={14} />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

        </div>
      </div>
    </section>
  )
}
