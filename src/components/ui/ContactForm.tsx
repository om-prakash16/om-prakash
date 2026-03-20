'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

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

  return (
    <div className="w-full max-w-lg mx-auto lg:mx-0">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full">
            <label htmlFor="name" className="sr-only">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Your Name"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#00e5ff]/50 focus:bg-white/10 transition-all"
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
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#00e5ff]/50 focus:bg-white/10 transition-all"
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
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#00e5ff]/50 focus:bg-white/10 transition-all resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="group relative w-full sm:w-auto self-start flex items-center justify-center gap-3 bg-[#00e5ff] text-[#080810] px-8 py-4 rounded-xl font-black label hover:bg-white transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            {status === 'loading' ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Sending...
              </>
            ) : status === 'success' ? (
              <>
                <CheckCircle2 size={18} className="text-emerald-600" />
                Message Sent
              </>
            ) : (
              <>
                Send Message
                <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </>
            )}
          </span>
        </button>

        {/* Status Messages */}
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-rose-400 mt-2 text-sm font-medium"
          >
            <AlertCircle size={16} />
            {errorMessage}
          </motion.div>
        )}
        
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-[#00e5ff] mt-2 text-sm font-medium"
          >
            <CheckCircle2 size={16} />
            Thank you! I&apos;ll get back to you soon.
          </motion.div>
        )}
      </form>
    </div>
  )
}
