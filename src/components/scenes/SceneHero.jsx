import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SceneHero() {
  const containerRef = useRef()
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 })
  const [logs, setLogs] = useState([
    '[SYS] INITIALIZING COGNITIVE CORE...',
    '[SYS] COGNITIVE CORE ENGINE [LOADED]',
    '[NET] ESTABLISHING ENCRYPTED GATEWAY...',
    '[NET] ENCRYPTED SECURE LINK [ACTIVE]'
  ])

  // Scrolling developer diagnostics logs simulation
  useEffect(() => {
    const logFeed = [
      '[NET] REVERSE PROXY ACTIVE ON IIS PORT 443',
      '[DB] MS SQL CONNECTION POOL INITIALIZED',
      '[AI] VECTOR INDEX LOADED (12,409 NODES)',
      '[LLM] DEPLOYED vLLM PIPELINE WITH PEFT',
      '[SEC] JWT THREE-TIER AUTH VALIDATOR ONLINE',
      '[AI] BHASHINI LOCALIZATION API CONNECTED',
      '[PERF] CANVAS DRAW-CALL STABLE AT 60 FPS',
      '[SYS] STANDBY. SPATIAL CAMERA READY FOR SCROLL.'
    ]
    let idx = 0
    const interval = setInterval(() => {
      setLogs((prev) => {
        const next = [...prev, logFeed[idx]]
        if (next.length > 7) next.shift() // Keep last 7 items
        return next
      })
      idx = (idx + 1) % logFeed.length
    }, 1800)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const letters = containerRef.current.querySelectorAll('.hero-letter')
    const roleText = containerRef.current.querySelector('.hero-role')
    const ctas = containerRef.current.querySelector('.hero-cta')
    const badge = containerRef.current.querySelector('.hero-badge')
    const terminal = containerRef.current.querySelector('.hero-terminal')

    // Timeline linked to scroll for Hero section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
        pin: false
      }
    })

    // Stagger reveals
    tl.fromTo(
      badge,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
    )
    .fromTo(
      letters,
      { y: 50, rotateX: 90, opacity: 0 },
      { y: 0, rotateX: 0, opacity: 1, stagger: 0.03, ease: 'power4.out', duration: 0.8 },
      '-=0.3'
    )
    .fromTo(
      roleText,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo(
      ctas,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
      '-=0.3'
    )
    .fromTo(
      terminal,
      { scale: 0.95, opacity: 0, rotateY: -15 },
      { scale: 1, opacity: 1, rotateY: 0, duration: 1.0, ease: 'power3.out' },
      '-=0.8'
    )

    // Parallel scrub transition: fade out elements as we scroll near the bottom of hero (100vh)
    gsap.to(containerRef.current.querySelector('.hero-content-wrap'), {
      scrollTrigger: {
        trigger: containerRef.current,
        start: '70% top',
        end: 'bottom top',
        scrub: true
      },
      opacity: 0,
      y: -50,
      ease: 'none'
    })

    // Handle mouse movement for backlight glow
    const handleMouseMove = (e) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const scrollToSection = (id) => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="scene-hero"
      ref={containerRef}
      className="scene min-h-[110vh] w-full flex items-center relative z-10 overflow-hidden"
    >
      {/* 1. Perspective Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(26,26,46,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(26,26,46,0.12)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_50%_at_35%_50%,#000_60%,transparent_100%)] pointer-events-none z-[-2] opacity-80" />

      {/* 2. Interactive Cursor back-lit glow blob */}
      <div
        className="absolute pointer-events-none rounded-full blur-[120px] opacity-35 bg-gradient-to-r from-primary via-[#8b5cf6] to-secondary transition-all duration-500 ease-out z-[-1]"
        style={{
          left: `${mousePos.x - 250}px`,
          top: `${mousePos.y - 250}px`,
          width: '500px',
          height: '500px',
          willChange: 'transform, left, top'
        }}
      />

      {/* 3. Static Ambient void glow */}
      <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] bg-primary/5 blur-[90px] rounded-full pointer-events-none z-[-1]" />

      <div className="scene-content hero-content-wrap flex flex-col justify-center h-full w-full select-none relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center w-full">
          
          {/* Left Side: Name and details */}
          <div className="md:col-span-7 flex flex-col text-left">
            
            {/* Cinematic Pulsing Badge */}
            <div className="hero-badge opacity-0 inline-flex items-center gap-2 border border-primary/20 rounded-full px-3.5 py-1.5 bg-primary/5 backdrop-blur-md mb-6 w-fit select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_#00D4FF] animate-ping" />
              <span className="font-mono text-[9px] text-textMain/80 uppercase tracking-[0.25em]">
                Spatial Web Experience v1.2
              </span>
            </div>

            <h1 className="font-display text-[var(--text-hero)] font-extrabold leading-[0.85] tracking-tighter text-textMain">
              {/* SHASHANK: Large bold gradient text */}
              <span className="block mb-1 overflow-hidden py-2 perspective-[1000px]">
                {'SHASHANK'.split('').map((l, i) => (
                  <span
                    key={i}
                    className="hero-letter inline-block opacity-0 origin-bottom bg-clip-text text-transparent bg-gradient-to-r from-textMain via-textMain to-primary/95"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {l}
                  </span>
                ))}
              </span>
              
              {/* JAIN: Giant thin outlined letter spacing */}
              <span className="block overflow-hidden py-2 font-black tracking-[0.18em] uppercase relative">
                {'JAIN'.split('').map((l, i) => (
                  <span
                    key={i}
                    className="hero-letter inline-block opacity-0"
                    style={{
                      WebkitTextStroke: '1.5px rgba(232, 232, 240, 0.25)',
                      color: 'transparent'
                    }}
                  >
                    {l}
                  </span>
                ))}
              </span>
            </h1>
            
            <p className="hero-role font-mono text-[11px] md:text-[13px] text-textMuted mt-8 border-l-2 border-primary/40 pl-4 py-1 leading-relaxed uppercase tracking-wider opacity-0">
              AI Engineer <span className="text-primary/75">·</span> Full-Stack Developer <span className="text-primary/75">·</span> Community Builder
            </p>
            
            <div className="hero-cta flex flex-wrap gap-4 mt-10 opacity-0">
              <button
                onClick={() => scrollToSection('#scene-work')}
                className="bg-primary hover:bg-primary/95 text-textMain px-7 py-3.5 rounded font-mono text-[10px] uppercase tracking-wider transition-all shadow-glow-primary hover:shadow-[0_0_25px_rgba(108,99,255,0.45)] hover:translate-y-[-2px] select-none"
              >
                View My Work ↓
              </button>
              <button
                onClick={() => scrollToSection('#scene-contact')}
                className="border border-border hover:border-primary/40 text-textMuted hover:text-textMain px-7 py-3.5 rounded font-mono text-[10px] uppercase tracking-wider transition-all backdrop-blur-sm bg-void/30 hover:bg-primary/5 hover:translate-y-[-2px] select-none"
              >
                Let's Connect →
              </button>
            </div>
          </div>
          
          {/* Right Side: Futuristic Diagnostics Terminal Overlay */}
          <div className="md:col-span-5 flex flex-col justify-center h-full w-full">
            <div className="hero-terminal opacity-0 relative glass-panel border border-border/80 rounded-lg p-5 w-full max-w-[380px] shadow-2xl overflow-hidden self-center md:self-end">
              
              {/* HUD corner ticks */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary/45 rounded-tl" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary/45 rounded-tr" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary/45 rounded-bl" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary/45 rounded-br" />

              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between border-b border-border/60 pb-3 mb-4 select-none">
                <span className="font-mono text-[9px] uppercase tracking-widest text-secondary flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                  Live Diagnostics Console
                </span>
                <span className="font-mono text-[8px] text-muted">SEC_LEVEL // 03</span>
              </div>

              {/* Console logs feed */}
              <div className="font-mono text-[10px] text-textMain/90 leading-relaxed text-left h-[170px] overflow-hidden space-y-2 select-text">
                {logs.map((log, index) => {
                  let colorClass = 'text-textMain/80'
                  if (log.includes('[SYS]')) colorClass = 'text-primary'
                  if (log.includes('[NET]')) colorClass = 'text-secondary'
                  if (log.includes('[DB]')) colorClass = 'text-[#00FFCC]'
                  if (log.includes('[AI]')) colorClass = 'text-[#FF9900]'
                  if (log.includes('[LOADED]') || log.includes('[ACTIVE]')) colorClass = 'text-[#00FF00]'
                  return (
                    <div key={index} className={`font-mono transition-opacity duration-300 ${colorClass}`}>
                      {log}
                    </div>
                  )
                })}
              </div>

              {/* Live coordinates ticker */}
              <div className="mt-4 border-t border-border/40 pt-3 flex items-center justify-between font-mono text-[8px] text-muted">
                <span>RAD_COORD: {mousePos.x > 0 ? `${mousePos.x},${mousePos.y}` : 'WAITING_POS'}</span>
                <span>STATUS: STABLE</span>
              </div>

            </div>
          </div>
          
        </div>
      </div>

      {/* Background hint scroll-down arrow */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-40 select-none animate-bounce font-mono text-[9px] uppercase tracking-widest text-textMuted pointer-events-none">
        <span>Scroll Down</span>
        <span>↓</span>
      </div>
    </section>
  )
}
