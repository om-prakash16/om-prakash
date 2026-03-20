'use client'

import { motion } from 'framer-motion'
import {
  Github, Linkedin, Mail, ArrowUpRight,
  Instagram, Twitter, MessageCircle, Facebook,
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
    <footer id="contact" className="relative w-full bg-[#080810] overflow-hidden">

      {/* ── Atmospheric glow ── */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-[#00e5ff]/6 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-[#8b5cf6]/6 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">

        {/* ══ HERO CONNECT BLOCK ══ */}
        <div className="py-24 lg:py-32 border-b border-white/8">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12">

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1"
            >
              <span className="label text-[#00e5ff] block mb-5">Get in touch</span>
              <h2 className="text-[clamp(3rem,8vw,8rem)] font-black tracking-tighter leading-none text-white mb-6">
                LET&apos;S<br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, #00e5ff, #8b5cf6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  CONNECT
                </span>
              </h2>
              <p className="body-lg text-gray-400 max-w-md">
                Open to Python projects, web development work, technical writing, and operations collaborations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full lg:w-1/2 flex-shrink-0"
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>

        {/* ══ FOLLOW US BLOCK ══ */}
        <div className="py-16 lg:py-20 border-b border-white/8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="mb-10"
          >
            <span className="label text-[#00e5ff] block mb-2">Social Media</span>
            <h3 className="text-3xl md:text-4xl font-black tracking-tighter text-white">
              FOLLOW &amp; CONNECT
            </h3>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {SOCIALS.map((s, i) => (
              <motion.a
                key={s.name}
                href={s.href}
                target={s.name !== 'Email' ? '_blank' : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-white/8 bg-white/3 p-5 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
                style={{
                  borderColor: undefined,
                }}
                aria-label={s.name}
              >
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110"
                  style={{ background: `${s.color}18`, color: s.color }}
                >
                  <s.icon size={20} />
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold text-white">{s.name}</p>
                  <p className="text-[10px] font-bold tracking-widest uppercase mt-0.5" style={{ color: s.color }}>
                    {s.label}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* ══ CONTACT INFO ══ */}
        <div className="py-12 lg:py-16 border-b border-white/8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <p className="label text-gray-600 mb-3">Email</p>
              <a href="mailto:prakash.om.global@gmail.com" className="text-base font-bold text-white hover:text-[#00e5ff] transition-colors break-all">
                prakash.om.global@gmail.com
              </a>
            </div>
            <div>
              <p className="label text-gray-600 mb-3">GitHub</p>
              <a href="https://github.com/om-prakash16/" target="_blank" rel="noopener noreferrer" className="text-base font-bold text-white hover:text-[#00e5ff] transition-colors">
                github.com/om-prakash16
              </a>
            </div>
            <div>
              <p className="label text-gray-600 mb-3">Location</p>
              <p className="text-base font-bold text-white">India</p>
            </div>
            <div>
              <p className="label text-gray-600 mb-3">Availability</p>
              <p className="text-base font-bold text-[#10b981] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse inline-block" />
                Open to Work
              </p>
            </div>
          </div>
        </div>

        {/* ══ FOOTER BOTTOM ══ */}
        <div className="py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Brand */}
          <div>
            <p className="text-white font-black text-base mb-1 tracking-tight">Om Prakash Kumar</p>
            <p className="label text-gray-600">Process Associate · Python Dev · Technical Writer</p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {NAV_FOOTER.map(link => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-bold tracking-widest uppercase text-gray-500 hover:text-[#00e5ff] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <p className="label text-gray-600 whitespace-nowrap">
            © {new Date().getFullYear()} Om Prakash Kumar
          </p>
        </div>
      </div>
    </footer>
  )
}
