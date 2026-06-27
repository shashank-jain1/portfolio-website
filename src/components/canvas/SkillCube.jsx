import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

const SKILL_FACES = [
  {
    title: 'Languages',
    skills: ['Python', 'JavaScript', 'TypeScript', 'PHP', 'C#', 'SQL'],
    pos: [0, 0, 1.25],
    rot: [0, 0, 0]
  },
  {
    title: 'Frameworks',
    skills: ['React', 'FastAPI', 'ASP.NET Core', 'Vite', 'WordPress'],
    pos: [1.25, 0, 0],
    rot: [0, Math.PI / 2, 0]
  },
  {
    title: 'AI / ML',
    skills: ['LLMs', 'RAG', 'LoRA/QLoRA', 'PEFT', 'DeepSpeed', 'vLLM'],
    pos: [0, 0, -1.25],
    rot: [0, Math.PI, 0]
  },
  {
    title: 'Infra',
    skills: ['IIS', 'Windows Server', 'Docker', 'PM2', 'NSSM', 'HttpPlatformHandler'],
    pos: [-1.25, 0, 0],
    rot: [0, -Math.PI / 2, 0]
  },
  {
    title: 'Databases',
    skills: ['MS SQL Server', 'MySQL', 'PostgreSQL'],
    pos: [0, 1.25, 0],
    rot: [-Math.PI / 2, 0, 0]
  },
  {
    title: 'Tools',
    skills: ['Git', 'GitHub', 'VS Code', 'Linux', 'macOS', 'Figma'],
    pos: [0, -1.25, 0],
    rot: [Math.PI / 2, 0, 0]
  }
]

export default function SkillCube() {
  const cubeRef = useRef()

  useFrame((state) => {
    if (!cubeRef.current) return

    // Get current scroll position percentage
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
    const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0

    // Skills section is active around 0.35 to 0.55 progress
    // We map this progress to extra rotation
    const skillsStart = 0.35
    const skillsEnd = 0.55
    let scrollRotationY = 0
    let scrollRotationX = 0

    if (progress > skillsStart && progress < skillsEnd) {
      const factor = (progress - skillsStart) / (skillsEnd - skillsStart)
      scrollRotationY = factor * Math.PI * 2
      scrollRotationX = factor * Math.PI
    }

    // Combine automatic slow rotation with scroll-linked rotation
    const time = state.clock.getElapsedTime()
    const autoRotationY = time * 0.15
    const autoRotationX = time * 0.08

    cubeRef.current.rotation.y = THREE.MathUtils.lerp(cubeRef.current.rotation.y, autoRotationY + scrollRotationY, 0.05)
    cubeRef.current.rotation.x = THREE.MathUtils.lerp(cubeRef.current.rotation.x, autoRotationX + scrollRotationX, 0.05)
  })

  return (
    <group ref={cubeRef} position={[0, 0, 0]}>
      {/* Wireframe Box Container for visual structure */}
      <mesh>
        <boxGeometry args={[2.5, 2.5, 2.5]} />
        <meshBasicMaterial
          color="#6C63FF"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Glow Corner Spheres */}
      <mesh position={[1.25, 1.25, 1.25]}><sphereGeometry args={[0.05]} /><meshBasicMaterial color="#00D4FF" /></mesh>
      <mesh position={[-1.25, 1.25, 1.25]}><sphereGeometry args={[0.05]} /><meshBasicMaterial color="#6C63FF" /></mesh>
      <mesh position={[1.25, -1.25, 1.25]}><sphereGeometry args={[0.05]} /><meshBasicMaterial color="#6C63FF" /></mesh>
      <mesh position={[-1.25, -1.25, 1.25]}><sphereGeometry args={[0.05]} /><meshBasicMaterial color="#00D4FF" /></mesh>
      <mesh position={[1.25, 1.25, -1.25]}><sphereGeometry args={[0.05]} /><meshBasicMaterial color="#6C63FF" /></mesh>
      <mesh position={[-1.25, 1.25, -1.25]}><sphereGeometry args={[0.05]} /><meshBasicMaterial color="#00D4FF" /></mesh>
      <mesh position={[1.25, -1.25, -1.25]}><sphereGeometry args={[0.05]} /><meshBasicMaterial color="#00D4FF" /></mesh>
      <mesh position={[-1.25, -1.25, -1.25]}><sphereGeometry args={[0.05]} /><meshBasicMaterial color="#6C63FF" /></mesh>

      {/* Render each face using Html transform */}
      {SKILL_FACES.map((face, index) => (
        <group key={index} position={face.pos} rotation={face.rot}>
          <Html
            transform
            occlude
            distanceFactor={3}
            style={{
              width: '250px',
              height: '250px',
              backfaceVisibility: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(13, 13, 20, 0.95)',
              border: '1.5px solid rgba(108, 99, 255, 0.3)',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 0 25px rgba(108, 99, 255, 0.15)',
              textAlign: 'center',
              pointerEvents: 'none'
            }}
          >
            <div className="w-full h-full flex flex-col justify-between items-center select-none">
              <h3 className="font-display text-lg font-bold text-secondary glow-text-secondary tracking-wider uppercase border-b border-border w-full pb-2">
                {face.title}
              </h3>
              <div className="flex flex-wrap justify-center gap-1.5 py-4 my-auto">
                {face.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="font-mono text-micro bg-[#161626] border border-[#2b2b4d] px-2 py-0.5 rounded text-textMain"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="text-[10px] font-mono text-muted uppercase tracking-widest">
                SJ // 3D PORTFOLIO
              </div>
            </div>
          </Html>
        </group>
      ))}
    </group>
  )
}
