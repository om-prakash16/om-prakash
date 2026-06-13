'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [focused, setFocused] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        setStatus('success')
        ;(e.target as HTMLFormElement).reset()
      } else {
        setStatus('error')
        setErrorMessage(result.error || 'Failed to send message.')
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage('A network error occurred. Please try again.')
    }
  }

  const inputClasses = (field: string) =>
    `w-full bg-white/[0.03] border rounded-2xl px-5 py-4 text-white text-sm font-medium placeholder:text-gray-600 focus:outline-none transition-all duration-400 ${
      focused === field
        ? 'border-[#00e5ff]/40 bg-white/[0.06] shadow-[0_0_20px_rgba(0,229,255,0.06)]'
        : 'border-white/[0.06] hover:border-white/[0.1]'
    }`

  return (
    <div className="w-full">
      <div className="rounded-3xl bg-white/[0.02] border border-white/[0.06] p-6 md:p-8 backdrop-blur-sm">
        <div className="mb-6">
          <h4 className="text-lg font-bold text-white tracking-tight mb-1">Send a message</h4>
          <p className="text-xs text-gray-500 font-medium">I&apos;ll get back to you within 24 hours.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <div className="flex flex-col sm:flex-row gap-3.5">
            <div className="w-full">
              <label htmlFor="name" className="sr-only">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Your Name"
                onFocus={() => setFocused('name')}
                onBlur={() => setFocused(null)}
                className={inputClasses('name')}
              />
            </div>
            <div className="w-full">
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Email Address"
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
                className={inputClasses('email')}
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="sr-only">Message</label>
            <textarea
              id="message"
              name="message"
              required
              placeholder="How can I help you?"
              rows={4}
              onFocus={() => setFocused('message')}
              onBlur={() => setFocused(null)}
              className={`${inputClasses('message')} resize-none`}
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="group relative w-full sm:w-auto self-start flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl font-bold text-sm tracking-tight overflow-hidden transition-all duration-400 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              background: status === 'success'
                ? 'linear-gradient(135deg, #10b981, #059669)'
                : 'linear-gradient(135deg, #00e5ff, #8b5cf6)',
            }}
          >
            <span className="relative z-10 flex items-center gap-2 text-[#060611] font-bold">
              {status === 'loading' ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Sending...
                </>
              ) : status === 'success' ? (
                <>
                  <CheckCircle2 size={16} />
                  Sent!
                </>
              ) : (
                <>
                  Send Message
                  <Send size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </>
              )}
            </span>
          </button>

          {/* Status Messages */}
          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-rose-400 text-sm font-medium mt-1"
            >
              <AlertCircle size={15} />
              {errorMessage}
            </motion.div>
          )}

          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-[#10b981] text-sm font-medium mt-1"
            >
              <CheckCircle2 size={15} />
              Thank you! I&apos;ll get back to you soon.
            </motion.div>
          )}
        </form>
      </div>
    </div>
  )
}
