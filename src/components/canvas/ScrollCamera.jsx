import { useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Define camera keyframes: [scrollProgress 0-1, x, y, z, lookAtX, lookAtY, lookAtZ]
const CAMERA_PATH = [
  [0.00, 0,  0,  8,   0, 0, 0],   // Intro
  [0.15, 0,  0,  5,   0, 0, 0],   // Hero
  [0.30, -3, 1,  4,   1.5, 0.5, 0],   // About (camera offset left to show text on right, and look slightly right)
  [0.45, 0,  0,  6,   0, 0, 0],   // Skills (camera centered on cube)
  [0.60, 0,  0,  4.5, 0, 0, 0],   // Work (camera centered on cards)
  [0.75, 2.5, 1, 6.5,  -1.5, 0, 0],   // Community (globe offset left, camera offset right)
  [1.00, 0,  0,  3,   0, 0, 0],   // Contact (camera close to orb)
]

export default function ScrollCamera() {
  const { camera } = useThree()
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0))
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0))

  useFrame(() => {
    // Get scroll progress from window scroll (0 to 1)
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
    if (scrollHeight <= 0) return
    
    // We get a raw scroll value and apply a small lerp for smoothness
    const rawProgress = window.scrollY / scrollHeight
    const t = Math.max(0, Math.min(1, rawProgress)) // clamp to 0-1

    // Find surrounding keyframes
    let prev = CAMERA_PATH[0]
    let next = CAMERA_PATH[CAMERA_PATH.length - 1]
    
    for (let i = 0; i < CAMERA_PATH.length - 1; i++) {
      if (t >= CAMERA_PATH[i][0] && t <= CAMERA_PATH[i + 1][0]) {
        prev = CAMERA_PATH[i]
        next = CAMERA_PATH[i + 1]
        break
      }
    }
    
    const range = next[0] - prev[0]
    const alpha = range === 0 ? 0 : (t - prev[0]) / range

    // Interpolate camera position
    const targetX = THREE.MathUtils.lerp(prev[1], next[1], alpha)
    const targetY = THREE.MathUtils.lerp(prev[2], next[2], alpha)
    const targetZ = THREE.MathUtils.lerp(prev[3], next[3], alpha)

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.05)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05)

    // Interpolate lookAt target
    const lookX = THREE.MathUtils.lerp(prev[4], next[4], alpha)
    const lookY = THREE.MathUtils.lerp(prev[5], next[5], alpha)
    const lookZ = THREE.MathUtils.lerp(prev[6], next[6], alpha)
    
    targetLookAt.current.set(lookX, lookY, lookZ)
    currentLookAt.current.lerp(targetLookAt.current, 0.05)
    
    camera.lookAt(currentLookAt.current)
  })

  return null
}
