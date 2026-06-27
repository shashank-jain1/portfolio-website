import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Canvas Components
import ParticleField from './components/canvas/ParticleField'
import ScrollCamera from './components/canvas/ScrollCamera'
import SceneObjects from './components/canvas/SceneObjects'

// UI & Scene Components
import Navbar from './components/ui/Navbar'
import Loader from './components/ui/Loader'
import SceneHero from './components/scenes/SceneHero'
import SceneAbout from './components/scenes/SceneAbout'
import SceneSkills from './components/scenes/SceneSkills'
import SceneWork from './components/scenes/SceneWork'
import SceneCommunity from './components/scenes/SceneCommunity'
import SceneContact from './components/scenes/SceneContact'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [loading, setLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  // 1. Detect screen size and reduced motion settings
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(motionQuery.matches)

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // 2. Initialize Lenis Smooth Scrolling and GSAP
  useEffect(() => {
    if (loading) return // Wait until loading screen is completed

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    // Coordinate ScrollTrigger updates with Lenis scrolling
    lenis.on('scroll', ScrollTrigger.update)

    const updateLenis = (time) => {
      lenis.raf(time * 1000)
    }
    
    gsap.ticker.add(updateLenis)
    gsap.ticker.lagSmoothing(0)

    // Ensure we start scroll position at 0 on refresh/load
    window.scrollTo(0, 0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(updateLenis)
    }
  }, [loading])

  return (
    <>
      {/* 1. Loader Monogram Overlay */}
      {loading && <Loader onComplete={() => setLoading(false)} />}

      {/* 2. Main Site UI Wrapper */}
      {!loading && (
        <div className="relative w-full bg-[#050508]">
          <Navbar />

          {/* Fixed Background Three.js Canvas */}
          {!reducedMotion && (
            <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
              <Canvas
                gl={{ antialias: true, alpha: true }}
                dpr={Math.min(window.devicePixelRatio, 2)}
                camera={{ position: [0, 0, 8], fov: 60 }}
              >
                <ambientLight intensity={0.35} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#6C63FF" />
                <pointLight position={[-10, -5, -5]} intensity={0.8} color="#00D4FF" />
                
                {/* 3D Scene Nodes */}
                <ParticleField isMobile={isMobile} />
                <ScrollCamera />
                <SceneObjects isMobile={isMobile} />

                {/* Ambient Post-Processing Effects */}
                <EffectComposer>
                  <Bloom
                    intensity={1.0}
                    luminanceThreshold={0.5}
                    luminanceSmoothing={0.9}
                    height={300}
                  />
                  <ChromaticAberration offset={[0.0006, 0.0006]} />
                </EffectComposer>
              </Canvas>
            </div>
          )}

          {/* HTML Overlay Sections */}
          <div className="scroll-container relative w-full z-10">
            <SceneHero />
            <SceneAbout />
            <SceneSkills />
            <SceneWork />
            <SceneCommunity />
            <SceneContact />
          </div>
        </div>
      )}
    </>
  )
}
