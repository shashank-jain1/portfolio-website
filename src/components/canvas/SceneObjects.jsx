import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import SkillCube from './SkillCube'
import ProjectCards from './ProjectCards'
import GlobeWireframe from './GlobeWireframe'
import ContactOrb from './ContactOrb'

export default function SceneObjects({ isMobile = false }) {
  const morphMeshRef = useRef()
  const morphShaderRef = useRef()
  
  const skillCubeRef = useRef()
  const projectCardsRef = useRef()
  const globeRef = useRef()
  const orbRef = useRef()

  // Uniforms for the Hero morphing shape
  const morphUniforms = useMemo(() => ({
    uMorph: { value: 0 },
    uTime: { value: 0 },
    uColor: { value: new THREE.Color('#6C63FF') }
  }), [])

  useFrame((state) => {
    // Get scroll progress from window scroll (0 to 1)
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
    const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0

    const time = state.clock.getElapsedTime()

    // 1. Hero Morph Shape: active from 0.05 to 0.25
    if (morphMeshRef.current) {
      // Rotate shape
      morphMeshRef.current.rotation.y = time * 0.2
      morphMeshRef.current.rotation.x = time * 0.1

      // Map progress to morph factor (0 to 1)
      const start = 0.05
      const end = 0.22
      let morphFactor = 0
      if (progress > start && progress < end) {
        morphFactor = (progress - start) / (end - start)
      } else if (progress >= end) {
        morphFactor = 1
      }
      
      if (morphShaderRef.current) {
        morphShaderRef.current.uniforms.uMorph.value = THREE.MathUtils.lerp(
          morphShaderRef.current.uniforms.uMorph.value,
          morphFactor,
          0.1
        )
        morphShaderRef.current.uniforms.uTime.value = time
      }

      // Fade out and scale down as we scroll to next scene (0.22 to 0.30)
      let scale = isMobile ? 1.0 : 1.6
      let opacity = 0.8
      if (progress > 0.22) {
        const fadeFactor = Math.max(0, Math.min(1, (progress - 0.22) / 0.08))
        scale = (isMobile ? 1.0 : 1.6) * (1 - fadeFactor)
        opacity = 0.8 * (1 - fadeFactor)
      }
      // Hide completely before progress 0.05 (fade in)
      if (progress < 0.05) {
        const fadeIn = Math.max(0, Math.min(1, progress / 0.05))
        opacity = 0.8 * fadeIn
      }

      morphMeshRef.current.scale.setScalar(scale)
      if (morphMeshRef.current.material) {
        morphMeshRef.current.material.color.set(
          progress > 0.15 ? '#00D4FF' : '#6C63FF'
        )
      }
      // Set mesh visibility
      morphMeshRef.current.visible = opacity > 0.01
    }

    // 2. SkillCube: active from 0.25 to 0.48
    if (skillCubeRef.current) {
      let scale = isMobile ? 0.75 : 1.0
      let opacity = 0
      
      if (progress >= 0.25 && progress <= 0.48) {
        // Fade in from 0.25 to 0.30
        if (progress < 0.30) {
          opacity = (progress - 0.25) / 0.05
        }
        // Fully visible from 0.30 to 0.43
        else if (progress <= 0.43) {
          opacity = 1
        }
        // Fade out from 0.43 to 0.48
        else {
          opacity = 1 - (progress - 0.43) / 0.05
        }
      }
      
      skillCubeRef.current.scale.setScalar(scale * opacity)
      skillCubeRef.current.visible = opacity > 0.01
    }

    // 3. ProjectCards: active from 0.48 to 0.70
    if (projectCardsRef.current) {
      let opacity = 0
      
      if (progress >= 0.48 && progress <= 0.70) {
        if (progress < 0.53) {
          opacity = (progress - 0.48) / 0.05
        } else if (progress <= 0.65) {
          opacity = 1
        } else {
          opacity = 1 - (progress - 0.65) / 0.05
        }
      }
      
      projectCardsRef.current.scale.setScalar(opacity)
      projectCardsRef.current.visible = opacity > 0.01
    }

    // 4. GlobeWireframe: active from 0.70 to 0.88
    if (globeRef.current) {
      let scale = isMobile ? 0.7 : 1.1
      let opacity = 0
      
      if (progress >= 0.70 && progress <= 0.88) {
        if (progress < 0.74) {
          opacity = (progress - 0.70) / 0.04
        } else if (progress <= 0.83) {
          opacity = 1
        } else {
          opacity = 1 - (progress - 0.83) / 0.05
        }
      }
      
      globeRef.current.scale.setScalar(scale * opacity)
      globeRef.current.visible = opacity > 0.01
    }

    // 5. ContactOrb: active from 0.88 to 1.00
    if (orbRef.current) {
      let scale = isMobile ? 0.8 : 1.2
      let opacity = 0
      
      if (progress >= 0.88) {
        // Fade in from 0.88 to 0.93
        opacity = Math.min(1, (progress - 0.88) / 0.05)
      }
      
      orbRef.current.scale.setScalar(scale * opacity)
      orbRef.current.visible = opacity > 0.01
    }
  })

  return (
    <group>
      {/* Scene 1: Hero Glass TorusKnot */}
      <mesh
        ref={morphMeshRef}
        position={isMobile ? [0, -1.0, 0] : [2, 0, 0]}
        scale={1.5}
        visible={false}
        castShadow
        receiveShadow
      >
        <torusKnotGeometry args={[0.6, 0.2, 120, 16]} />
        <meshPhysicalMaterial
          transmission={0.9}
          thickness={1.5}
          roughness={0.08}
          metalness={0.15}
          reflectivity={0.9}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          ior={1.65}
          color="#6C63FF"
          emissive="#00D4FF"
          emissiveIntensity={0.25}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Scene 3: Skills Cube */}
      <group ref={skillCubeRef} visible={false}>
        <SkillCube />
      </group>

      {/* Scene 4: Project Cards */}
      <group ref={projectCardsRef} visible={false}>
        <ProjectCards />
      </group>

      {/* Scene 5: Community Globe */}
      <group
        ref={globeRef}
        position={isMobile ? [0, -1.2, 0] : [-1.5, 0.2, 0]}
        visible={false}
      >
        <GlobeWireframe />
      </group>

      {/* Scene 6: Contact Orb */}
      <group ref={orbRef} position={isMobile ? [0, -0.6, 0] : [0, 0.4, 0]} visible={false}>
        <ContactOrb />
      </group>
    </group>
  )
}
