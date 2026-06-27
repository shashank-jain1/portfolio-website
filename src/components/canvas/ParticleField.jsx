import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function ParticleField({ isMobile = false }) {
  const mesh = useRef()
  
  // 50 x 50 grid of particles
  const gridWidth = isMobile ? 35 : 60
  const gridDepth = isMobile ? 35 : 60
  const count = gridWidth * gridDepth

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const cols = new Float32Array(count * 3)
    
    let i = 0
    for (let x = 0; x < gridWidth; x++) {
      for (let z = 0; z < gridDepth; z++) {
        // Space them out on X and Z axes
        const posX = (x - gridWidth / 2) * 0.75
        const posZ = (z - gridDepth / 2) * 0.75
        
        pos[i * 3] = posX
        pos[i * 3 + 1] = 0 // Will be animated in useFrame
        pos[i * 3 + 2] = posZ
        
        // Dynamic violet to cyan gradient based on distance from center
        const dist = Math.sqrt(posX * posX + posZ * posZ)
        const maxDist = Math.sqrt((gridWidth / 2) ** 2 + (gridDepth / 2) ** 2) * 0.75
        const t = Math.min(1, dist / maxDist)
        
        // Primary (violet #6C63FF) to Secondary (cyan #00D4FF)
        cols[i * 3] = (108 / 255) + t * (0 - (108 / 255)) // R
        cols[i * 3 + 1] = (99 / 255) + t * ((212 / 255) - (99 / 255)) // G
        cols[i * 3 + 2] = 1.0 // B
        
        i++
      }
    }
    
    return [pos, cols]
  }, [count, gridWidth, gridDepth])

  useFrame((state) => {
    if (!mesh.current) return
    
    const time = state.clock.getElapsedTime()
    const posArray = mesh.current.geometry.attributes.position.array
    
    // Pointer coordinates mapped to 3D space coordinates
    const mouseX = state.pointer.x * 12
    const mouseZ = -state.pointer.y * 12

    let idx = 0
    for (let x = 0; x < gridWidth; x++) {
      for (let z = 0; z < gridDepth; z++) {
        const posX = posArray[idx * 3]
        const posZ = posArray[idx * 3 + 2]
        
        // 1. Double wave math using sine/cosine
        const wave1 = Math.sin(posX * 0.25 + time * 0.7) * 0.5
        const wave2 = Math.cos(posZ * 0.25 + time * 0.9) * 0.5
        const wave3 = Math.sin((posX + posZ) * 0.1 + time * 0.5) * 0.3
        
        // 2. Interactive mouse wave (push particles down/up based on cursor distance)
        const distToMouse = Math.sqrt((posX - mouseX) ** 2 + (posZ - mouseZ) ** 2)
        const mouseEffect = Math.sin(distToMouse * 0.6 - time * 2.0) * Math.max(0, 3.5 - distToMouse) * 0.12
        
        // Update Y coordinate
        posArray[idx * 3 + 1] = wave1 + wave2 + wave3 + mouseEffect
        
        idx++
      }
    }
    
    // Alert ThreeJS that positions changed
    mesh.current.geometry.attributes.position.needsUpdate = true
    
    // Gentle rotation of the overall field
    mesh.current.rotation.y = time * 0.015
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.06 : 0.045}
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}
