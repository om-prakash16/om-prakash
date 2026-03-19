'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture, Float, PerspectiveCamera, Text } from '@react-three/drei'
import * as THREE from 'three'

interface ProjectTileProps {
  position: [number, number, number]
  textureUrl: string
  delay?: number
  title: string
}

function ProjectTile({ position, textureUrl, delay = 0, title }: ProjectTileProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const texture = useTexture(textureUrl)

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime() + delay
    meshRef.current.position.y = position[1] + Math.sin(time) * 0.1
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, hovered ? 0.2 : 0, 0.1)
    
    // Scale animation
    const targetScale = hovered ? 1.1 : 1
    meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1))
  })

  return (
    <group position={position}>
      <mesh 
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[1.5, 1, 0.05]} />
        <meshStandardMaterial 
          map={texture} 
          transparent 
          opacity={0.8}
          metalness={0.8}
          roughness={0.2}
          emissive={hovered ? "#00f0ff" : "#000000"}
          emissiveIntensity={hovered ? 0.5 : 0}
        />
      </mesh>
      {hovered && (
        <Text
          position={[0, -0.8, 0]}
          fontSize={0.1}
          color="#00f0ff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Bold.woff" // Assuming font path or using default
        >
          {title.toUpperCase()}
        </Text>
      )}
    </group>
  )
}

function VolumetricBeam({ position, color, delay = 0 }: { position: [number, number, number], color: string, delay?: number }) {
  const beamRef = useRef<THREE.Mesh>(null)
  const lightRef = useRef<THREE.SpotLight>(null)

  useFrame((state) => {
    const time = state.clock.getElapsedTime() + delay
    const pulse = (Math.sin(time * 0.5) + 1) / 2 // 0 to 1
    
    if (beamRef.current) {
      const material = beamRef.current.material as THREE.MeshBasicMaterial
      material.opacity = 0.1 + pulse * 0.2
    }
    if (lightRef.current) {
      lightRef.current.intensity = 5 + pulse * 10
    }
  })

  return (
    <group position={position}>
      <mesh ref={beamRef} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.05, 1.5, 12, 32, 1, true]} />
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={0.2} 
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>
      <spotLight 
        ref={lightRef}
        position={[0, -6, 0]} 
        intensity={10} 
        color={color} 
        angle={0.2} 
        penumbra={1} 
        castShadow 
      />
    </group>
  )
}

export default function HeroModel() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 1, 8]} />
      
      {/* Floor with reflection-like texture */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial 
          color="#050505" 
          roughness={0.1} 
          metalness={0.9} 
        />
      </mesh>

      {/* Pulsing Light Beams */}
      <VolumetricBeam position={[-4, 0, -5]} color="#00f0ff" delay={0} />
      <VolumetricBeam position={[4, 0, -6]} color="#9b5cff" delay={2} />
      <VolumetricBeam position={[0, 0, -8]} color="#00f0ff" delay={4} />

      {/* Enhanced Project Tiles */}
      <ProjectTile position={[-2, 1, 1]} textureUrl="/img/project1.png" title="Cyber Dashboard" delay={0} />
      <ProjectTile position={[2, -0.5, 2]} textureUrl="/img/project2.png" title="Neon Abstract" delay={2} />
      <ProjectTile position={[0.5, 2, -2]} textureUrl="/img/project1.png" title="Future UI" delay={4} />

      <ambientLight intensity={0.1} />
      {/* Standard Fog for Depth */}
      <fog attach="fog" args={['#0a0a0f', 5, 25]} />
    </>
  )
}
