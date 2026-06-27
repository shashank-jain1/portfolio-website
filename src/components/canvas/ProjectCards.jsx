import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

const PROJECTS = [
  {
    title: 'EVM Management System',
    tag: 'GOVERNMENT OF INDIA · FULL-STACK',
    stack: 'React 18 · Node.js · MS SQL Server · IIS',
    desc: 'Three-tier JWT role hierarchy (Admin-State-District) with dual-library QR scanning (html5-qrcode + zxing). IIS + PM2 deployment.',
    color: '#00D4FF'
  },
  {
    title: 'Bharatkosh AI Copilot',
    tag: 'ENTERPRISE AI · INTEGRATION',
    stack: 'React · FastAPI · .NET Core · IIS',
    desc: 'Multi-tenant RAG chatbot integrated into existing .NET platform. FastAPI deployed via HttpPlatformHandler with strict security boundaries.',
    color: '#6C63FF'
  },
  {
    title: 'Bharat CMS',
    tag: 'GOVTECH · AI-NATIVE SAAS',
    stack: 'Python · ReportLab · RAG · Bhashini API',
    desc: 'AI-native CMS for public administration. Features Bhashini translation API, offline PWA capability, and dynamic form generation.',
    color: '#FF6B35'
  },
  {
    title: 'AI Content Generation',
    tag: 'AI · CONTENT STRATEGY',
    stack: 'Python · LoRA/QLoRA · PEFT · React',
    desc: 'Feedough strategy tool. Features custom LLM fine-tuning pipelines, PEFT adapters, DeepSpeed, and vLLM stack for low latency serving.',
    color: '#00FFCC'
  }
]

function ProjectCard({ project, position }) {
  const cardRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (!cardRef.current) return

    // Smooth tilt to mouse position when hovered
    let targetXRot = 0
    let targetYRot = 0
    let targetScale = 1

    if (hovered) {
      targetXRot = -state.pointer.y * 0.25
      targetYRot = state.pointer.x * 0.25
      targetScale = 1.05
    }

    cardRef.current.rotation.x = THREE.MathUtils.lerp(cardRef.current.rotation.x, targetXRot, 0.1)
    cardRef.current.rotation.y = THREE.MathUtils.lerp(cardRef.current.rotation.y, targetYRot, 0.1)
    cardRef.current.scale.setScalar(THREE.MathUtils.lerp(cardRef.current.scale.x, targetScale, 0.1))
  })

  return (
    <group
      position={position}
      ref={cardRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* 3D Glass Mesh Backplane */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.5, 3.5, 0.1]} />
        <meshPhysicalMaterial
          transmission={0.85}
          thickness={0.5}
          roughness={0.15}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          reflectivity={0.6}
          ior={1.5}
          color="#0D0D14"
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Outer Border Glow Wireframe */}
      <mesh>
        <boxGeometry args={[2.52, 3.52, 0.11]} />
        <meshBasicMaterial
          color={hovered ? project.color : '#1A1A2E'}
          wireframe
          transparent
          opacity={hovered ? 0.7 : 0.2}
        />
      </mesh>

      {/* HTML Content Rendered in 3D Space */}
      <Html
        transform
        distanceFactor={3}
        style={{
          width: '230px',
          height: '330px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          pointerEvents: 'none',
          backfaceVisibility: 'hidden',
        }}
      >
        <div className="w-full h-full flex flex-col justify-between select-none text-left">
          <div>
            <span
              className="text-[9px] font-mono tracking-widest px-2 py-0.5 rounded border uppercase"
              style={{
                borderColor: `${project.color}33`,
                color: project.color,
                backgroundColor: `${project.color}11`
              }}
            >
              {project.tag.split('·')[0].trim()}
            </span>
            <h3 className="font-display text-base font-bold text-textMain mt-3 leading-tight">
              {project.title}
            </h3>
            <p className="text-[10px] font-mono text-muted mt-1.5 uppercase tracking-wide">
              {project.stack}
            </p>
          </div>

          <p className="text-[10.5px] text-textMain leading-relaxed font-body font-light my-2 opacity-90">
            {project.desc}
          </p>

          <div className="flex items-center justify-between border-t border-border pt-2">
            <span className="text-[9px] font-mono text-muted">
              SJ // 2026
            </span>
            <span
              className="text-[10px] font-mono font-bold flex items-center gap-1"
              style={{ color: project.color }}
            >
              ACTIVE CASE study →
            </span>
          </div>
        </div>
      </Html>
    </group>
  )
}

export default function ProjectCards() {
  const groupRef = useRef()

  useFrame(() => {
    if (!groupRef.current) return

    // Get current scroll position percentage
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
    const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0

    // Work section range is around 0.50 to 0.70
    const start = 0.50
    const end = 0.70
    let targetX = 0

    if (progress > start && progress < end) {
      const factor = (progress - start) / (end - start)
      // Slide horizontal: from X: 4 to X: -4
      targetX = 4 - factor * 8
    } else if (progress <= start) {
      targetX = 4
    } else {
      targetX = -4
    }

    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05)
  })

  return (
    <group ref={groupRef} position={[4, 0, 0]}>
      {PROJECTS.map((proj, idx) => (
        <ProjectCard
          key={idx}
          project={proj}
          // Arrange cards horizontally, spaced by 3 units
          position={[(idx - 1.5) * 3, 0, 0]}
        />
      ))}
    </group>
  )
}
