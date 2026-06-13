'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    setIsVisible(true)

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      // Check if hovering over interactive elements
      const isInteractive = target.closest('a, button, input, textarea, select, [role="button"]') !== null
      setIsHovering(isInteractive)
    }

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mouseover', updateHoverState)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mouseover', updateHoverState)
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* Tiny solid dot that follows exactly */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#00e5ff] rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 0 : 1,
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
      />
      
      {/* Larger trailing outline */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-[#8b5cf6] rounded-full pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.8 : 1,
          backgroundColor: isHovering ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0)',
          borderColor: isHovering ? 'rgba(0, 229, 255, 0.5)' : 'rgba(139, 92, 246, 0.5)'
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
          mass: 0.6
        }}
      />
    </>
  )
}
