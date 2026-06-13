'use client'

import { motion } from 'framer-motion'
import {
  Github, Linkedin, Mail, ArrowUpRight,
  Instagram, Twitter, MessageCircle, ChevronUp,
} from 'lucide-react'
import ContactForm from '@/components/ui/ContactForm'

const SOCIALS = [
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://linkedin.com/in/om-prakash-kr/',
    color: '#0077b5',
    label: 'Connect',
  },
  {
    name: 'GitHub',
    icon: Github,
    href: 'https://github.com/om-prakash16/',
    color: '#e2e8f0',
    label: 'Follow',
  },
  {
    name: 'Instagram',
    icon: Instagram,
    href: 'https://www.instagram.com/om_prakash__kr',
    color: '#e1306c',
    label: 'Follow',
  },
  {
    name: 'X / Twitter',
    icon: Twitter,
    href: 'https://x.com/om_prakash_kr_',
    color: '#1da1f2',
    label: 'Follow',
  },
  {
    name: 'Threads',
    icon: MessageCircle,
    href: 'https://www.threads.com/@om_prakash__kr',
    color: '#a855f7',
    label: 'Follow',
  },
  {
    name: 'Email',
    icon: Mail,
    href: 'mailto:prakash.om.global@gmail.com',
    color: '#00e5ff',
    label: 'Write',
  },
]

const NAV_FOOTER = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#work' },
  { name: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer id="contact" className="relative w-full bg-[#060611] overflow-hidden">

      {/* ── Section Divider ── */}
      <div className="section-divider" />

      {/* ── Atmospheric glow ── */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[400px] bg-[#00e5ff]/[0.04] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-[#8b5cf6]/[0.04] blur-[160px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">

        {/* ══ HERO CONNECT BLOCK ══ */}
        <div className="py-24 lg:py-32 border-b border-white/[0.06]">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-16">

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1"
            >
              <span className="label text-[#00e5ff] block mb-5">Get in touch</span>
              <h2 className="text-[clamp(3rem,8vw,7rem)] font-black tracking-tighter leading-[0.9] text-white mb-8">
                LET&apos;S<br />
                <span className="text-gradient">CONNECT</span>
              </h2>
              <p className="body-lg text-gray-400 max-w-md mb-8">
                Open to opportunities in Frontend UI/UX Design, Python Backend Development, AI Engineering, and full-stack SaaS Projects.
              </p>

              {/* Quick Info */}
              <div className="flex flex-wrap gap-6">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-gray-600 mb-1.5">Email</p>
                  <a href="mailto:prakash.om.global@gmail.com" className="text-sm font-bold text-white hover:text-[#00e5ff] transition-colors">
                    prakash.om.global@gmail.com
                  </a>
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-gray-600 mb-1.5">Location</p>
                  <p className="text-sm font-bold text-white">India</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-gray-600 mb-1.5">Status</p>
                  <p className="text-sm font-bold text-[#10b981] flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]" />
                    </span>
                    Open to Work
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full lg:w-[480px] flex-shrink-0"
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>

        {/* ══ SOCIAL LINKS ══ */}
        <div className="py-14 lg:py-16 border-b border-white/[0.06]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="label text-gray-600 block mb-2">Social Media</span>
            <h3 className="text-2xl md:text-3xl font-black tracking-tighter text-white">
              FOLLOW & CONNECT
            </h3>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {SOCIALS.map((s, i) => (
              <motion.a
                key={s.name}
                href={s.href}
                target={s.name !== 'Email' ? '_blank' : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group flex flex-col items-center gap-2.5 rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4 hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-400 hover:-translate-y-1"
                aria-label={s.name}
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
                  style={{ background: `${s.color}12`, color: s.color }}
                >
                  <s.icon size={18} />
                </div>
                <div className="text-center">
                  <p className="text-[11px] font-bold text-gray-300 group-hover:text-white transition-colors">{s.name}</p>
                  <p className="text-[9px] font-bold tracking-[0.2em] uppercase mt-0.5 opacity-60" style={{ color: s.color }}>
                    {s.label}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* ══ FOOTER BOTTOM ══ */}
        <div className="py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Brand */}
          <div>
            <p className="text-white font-black text-sm mb-1 tracking-tight">Om Prakash Kumar</p>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-600">
              Python Developer · UI/UX Designer · FastAPI · Open to Work
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {NAV_FOOTER.map(link => (
              <a
                key={link.name}
                href={link.href}
                className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-600 hover:text-[#00e5ff] transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {/* Copyright */}
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-700 whitespace-nowrap">
              © {new Date().getFullYear()} Om Prakash Kumar
            </p>

            {/* Back to top */}
            <a
              href="#"
              className="flex items-center justify-center w-9 h-9 rounded-full border border-white/[0.06] bg-white/[0.02] text-gray-500 hover:text-[#00e5ff] hover:border-[#00e5ff]/30 hover:bg-[#00e5ff]/5 transition-all duration-300"
              aria-label="Back to top"
            >
              <ChevronUp size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
