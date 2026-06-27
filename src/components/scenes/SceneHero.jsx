import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SceneHero() {
  const containerRef = useRef()

  useEffect(() => {
    const letters = containerRef.current.querySelectorAll('.hero-letter')
    const roleText = containerRef.current.querySelector('.hero-role')
    const ctas = containerRef.current.querySelector('.hero-cta')

    const playEntrance = () => {
      const tl = gsap.timeline()
      
      tl.fromTo(
        letters,
        { y: -70, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.05, ease: 'back.out(1.4)', duration: 0.8 }
      )
      .fromTo(
        roleText,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo(
        ctas,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.3'
      )
    }

    // Play entrance when loader finishes
    window.addEventListener('loader-complete', playEntrance)

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

    return () => {
      window.removeEventListener('loader-complete', playEntrance)
    }
  }, [])

  const scrollToSection = (id) => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="scene-hero"
      ref={containerRef}
      className="scene min-h-[110vh] w-full flex items-center relative z-10"
    >
      <div className="scene-content hero-content-wrap flex flex-col justify-center h-full w-full select-none">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full">
          {/* Left Side: Name and details */}
          <div className="flex flex-col text-left">
            <span className="font-mono text-micro text-secondary uppercase tracking-[0.25em] mb-3 select-none">
              // DESIGNING THE FUTURE
            </span>
            <h1 className="font-display text-[var(--text-hero)] font-extrabold leading-[0.9] tracking-tighter text-textMain">
              <span className="block mb-2 overflow-hidden py-2">
                {'SHASHANK'.split('').map((l, i) => (
                  <span
                    key={i}
                    className="hero-letter inline-block opacity-0 filter drop-shadow-[0_0_15px_rgba(232,232,240,0.1)]"
                  >
                    {l}
                  </span>
                ))}
              </span>
              <span className="block font-light text-muted uppercase">
                {'JAIN'.split('').map((l, i) => (
                  <span
                    key={i}
                    className="hero-letter inline-block opacity-0"
                  >
                    {l}
                  </span>
                ))}
              </span>
            </h1>
            
            <p className="hero-role font-mono text-small md:text-body text-textMuted mt-6 border-l-2 border-primary/50 pl-4 py-1 leading-relaxed opacity-0">
              AI Engineer · Full-Stack Developer · Community Builder
            </p>
            
            <div className="hero-cta flex flex-wrap gap-4 mt-8 opacity-0">
              <button
                onClick={() => scrollToSection('#scene-work')}
                className="bg-primary hover:bg-primary/95 text-textMain px-6 py-3 rounded font-mono text-micro uppercase tracking-wider transition-all shadow-glow-primary hover:translate-y-[-2px]"
              >
                View My Work ↓
              </button>
              <button
                onClick={() => scrollToSection('#scene-contact')}
                className="border border-border hover:border-primary/50 text-textMuted hover:text-textMain px-6 py-3 rounded font-mono text-micro uppercase tracking-wider transition-all backdrop-blur-sm bg-void/35 hover:translate-y-[-2px]"
              >
                Let's Connect →
              </button>
            </div>
          </div>
          
          {/* Right Side: Spacer for 3D Morph shape */}
          <div className="hidden md:block h-[400px]" />
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
