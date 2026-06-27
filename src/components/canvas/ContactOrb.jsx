import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

export default function ContactOrb() {
  const ringRef = useRef()

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.getElapsedTime() * 0.2
      ringRef.current.rotation.x = state.clock.getElapsedTime() * 0.05
    }
  })

  return (
    <group>
      {/* Morphing Liquid Orb */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#6C63FF"
          emissive="#00D4FF"
          emissiveIntensity={0.5}
          distort={0.45}
          speed={2.2}
          roughness={0.1}
          metalness={0.8}
          clearcoat={1.0}
        />
      </mesh>

      {/* Internal Core Glow Orb */}
      <mesh>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.3} />
      </mesh>

      {/* Orbiting Halo Ring of Points */}
      <points ref={ringRef}>
        <ringGeometry args={[1.4, 1.45, 64]} />
        <pointsMaterial
          size={0.03}
          color="#FF6B35"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>

      {/* Soft Light Point sources for beautiful reflections */}
      <pointLight position={[2, 2, 2]} intensity={2} color="#00D4FF" />
      <pointLight position={[-2, -2, -2]} intensity={1.5} color="#FF6B35" />
    </group>
  )
}
