import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SceneSkills() {
  const containerRef = useRef()

  useEffect(() => {
    // Reveal text block on scroll
    gsap.fromTo(
      containerRef.current.querySelector('.skills-header'),
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    // Parallel scrub transition: fade out elements near bottom of section
    gsap.to(containerRef.current.querySelector('.skills-content-wrap'), {
      scrollTrigger: {
        trigger: containerRef.current,
        start: '80% top',
        end: 'bottom top',
        scrub: true
      },
      opacity: 0,
      y: -30,
      ease: 'none'
    })
  }, [])

  return (
    <section
      id="scene-skills"
      ref={containerRef}
      className="scene min-h-[110vh] w-full flex items-center relative z-10 py-20"
    >
      <div className="scene-content skills-content-wrap w-full select-none">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left Side: Header info */}
          <div className="md:col-span-5 flex flex-col text-left skills-header opacity-0">
            <span className="font-mono text-micro text-secondary uppercase tracking-[0.25em] mb-3">
              // EXPERTISE
            </span>
            <h2 className="font-display text-[var(--text-title)] font-extrabold leading-[1.0] text-textMain">
              My Technology <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Ecosystem
              </span>
            </h2>
            
            <p className="font-body text-body font-light text-textMuted mt-6 max-w-sm leading-relaxed">
              Every system is carefully constructed using modular architectures. Spin the 3D cube to inspect languages, frameworks, AI/ML tools, databases, IIS infrastructure, and tools.
            </p>

            <div className="mt-8 flex flex-col gap-2 font-mono text-micro text-muted">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Scroll to rotate cube
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                Interactive 3D HTML transforms
              </span>
            </div>
          </div>
          
          {/* Right Side: Spacer for 3D Skill Cube */}
          <div className="md:col-span-7 h-[450px]" />
          
        </div>
      </div>
    </section>
  )
}
