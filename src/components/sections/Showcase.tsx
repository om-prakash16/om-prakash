'use client'

import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const IsometricRoom = dynamic(() => import('../canvas/IsometricRoom'), { ssr: false })

export default function Showcase() {
  return (
    <section className="relative h-screen w-full bg-[#080810] flex items-center justify-center overflow-hidden">
      {/* 3D Canvas — full background */}
      <div className="absolute inset-0 z-0">
        <Canvas shadows camera={{ position: [5, 5, 5], fov: 38 }}>
          <IsometricRoom />
        </Canvas>
      </div>

      {/* Dark vignette so text is always readable */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#080810]/70 via-transparent to-[#080810]/40 pointer-events-none" />

      {/* Overlay — pinned to bottom-left, never overlaps center 3D */}
      <div className="absolute bottom-0 left-0 z-10 p-8 md:p-12 lg:p-16 max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="label text-[#00e5ff] block mb-4">Interactive 3D Lab</span>
          <h2 className="heading-xl text-white leading-none mb-6">
            THE<br /><span className="neon-text-purple">CORE</span>
          </h2>
          <p className="body-lg text-gray-400 max-w-sm">
            Interact with the digital heartbeat of the lab. Real-time WebGL, physics, and light.
          </p>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 right-10 z-10 flex flex-col items-center gap-2 opacity-40">
        <span className="label text-[#00e5ff] writing-vertical" style={{ fontSize: '0.55rem', writingMode: 'vertical-rl' }}>
          DRAG TO INTERACT
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-[#00e5ff] to-transparent" />
      </div>
    </section>
  )
}
