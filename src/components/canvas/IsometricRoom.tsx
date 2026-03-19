'use client'

import { useRef } from 'react'
import { PerspectiveCamera, useScroll, Float } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function IsometricRoom() {
  const groupRef = useRef<THREE.Group>(null)
  const scroll = useScroll()

  useFrame((state) => {
    if (!groupRef.current) return
    
    // Scroll-based rotation and position
    const offset = scroll.offset // 0 to 1
    
    // Camera rotation path
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, offset * Math.PI * 1.5, 0.05)
    
    // Camera movement path (closer/further)
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 8 + offset * 4, 0.05)
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 6 - offset * 4, 0.05)
    state.camera.lookAt(0, 0, 0)
  })

  return (
    <group ref={groupRef}>
      {/* Cinematic Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial 
          color="#0a0a12" 
          roughness={0.1} 
          metalness={0.8} 
        />
      </mesh>

      {/* Cyber Walls */}
      <mesh position={[-5, 2.5, 0]} receiveShadow>
        <boxGeometry args={[0.2, 6, 10]} />
        <meshStandardMaterial color="#0c0c16" metalness={0.5} roughness={0.2} />
      </mesh>
      <mesh position={[0, 2.5, -5]} receiveShadow>
        <boxGeometry args={[10, 6, 0.2]} />
        <meshStandardMaterial color="#0c0c16" metalness={0.5} roughness={0.2} />
      </mesh>

      {/* Floating Interactive Cubes (Cyber Aesthetic) */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[-2, 1, -2]} castShadow>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshStandardMaterial 
            color="#00f0ff" 
            emissive="#00f0ff" 
            emissiveIntensity={2} 
            transparent 
            opacity={0.8} 
          />
        </mesh>
      </Float>

      <Float speed={3} rotationIntensity={1} floatIntensity={1}>
        <mesh position={[2, 2, 0]} castShadow>
          <octahedronGeometry args={[1]} />
          <meshStandardMaterial 
            color="#9b5cff" 
            emissive="#9b5cff" 
            emissiveIntensity={2} 
            transparent 
            opacity={0.8} 
          />
        </mesh>
      </Float>

      {/* Center Console/Platform */}
      <mesh position={[0, 0.1, 0]} receiveShadow>
        <cylinderGeometry args={[2, 2.2, 0.4, 32]} />
        <meshStandardMaterial color="#1a1a2a" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Lighting System */}
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={1.5} castShadow color="#00f0ff" />
      <pointLight position={[-5, 5, -5]} intensity={1} color="#9b5cff" />
      <spotLight 
        position={[0, 10, 0]} 
        intensity={2} 
        angle={0.3} 
        penumbra={1} 
        castShadow 
        color="#fff" 
      />
      
      {/* Volumetric-like glow */}
      <mesh position={[0, 3, 0]}>
        <cylinderGeometry args={[0.01, 3, 6, 32, 1, true]} />
        <meshBasicMaterial 
          color="#00f0ff" 
          transparent 
          opacity={0.05} 
          side={THREE.DoubleSide} 
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}
