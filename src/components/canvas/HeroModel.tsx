'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

function FloatingOrb({
  position,
  color,
  size = 0.5,
  speed = 1,
  delay = 0,
}: {
  position: [number, number, number]
  color: string
  size?: number
  speed?: number
  delay?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime() * speed + delay
    meshRef.current.position.y = position[1] + Math.sin(time) * 0.4
    meshRef.current.position.x = position[0] + Math.sin(time * 0.7) * 0.15
    meshRef.current.rotation.x = time * 0.2
    meshRef.current.rotation.z = time * 0.15
  })

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[size, 1]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        transparent
        opacity={0.35}
        wireframe
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  )
}

function GlowRing({
  position,
  color,
  delay = 0,
}: {
  position: [number, number, number]
  color: string
  delay?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime() + delay
    meshRef.current.rotation.x = Math.PI / 2 + Math.sin(time * 0.5) * 0.3
    meshRef.current.rotation.z = time * 0.3
  })

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[1.8, 0.02, 16, 64]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.2}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

export default function HeroModel() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={45} />

      {/* Subtle ambient */}
      <ambientLight intensity={0.08} />

      {/* Floating wireframe orbs */}
      <FloatingOrb position={[-3, 1.5, -2]} color="#00e5ff" size={0.6} speed={0.6} delay={0} />
      <FloatingOrb position={[3.5, -1, -3]} color="#8b5cf6" size={0.8} speed={0.5} delay={2} />
      <FloatingOrb position={[0, 2.5, -5]} color="#3b82f6" size={0.45} speed={0.7} delay={4} />
      <FloatingOrb position={[-2, -2, -1]} color="#00e5ff" size={0.35} speed={0.8} delay={1} />
      <FloatingOrb position={[2, 0.5, -4]} color="#8b5cf6" size={0.5} speed={0.55} delay={3} />

      {/* Glowing rings */}
      <GlowRing position={[0, 0, -3]} color="#00e5ff" delay={0} />
      <GlowRing position={[-1, 1, -6]} color="#8b5cf6" delay={2} />

      {/* Accent lights */}
      <pointLight position={[-5, 4, 3]} intensity={4} color="#00e5ff" distance={20} />
      <pointLight position={[5, -3, 2]} intensity={3} color="#8b5cf6" distance={20} />

      {/* Depth fog */}
      <fog attach="fog" args={['#060611', 6, 22]} />
    </>
  )
}
