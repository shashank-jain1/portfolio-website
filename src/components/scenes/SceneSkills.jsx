import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SceneSkills() {
  const containerRef = useRef()

  useEffect(() => {
    // 1. Giant Background Title slide scroll scrub
    const giantTitle = containerRef.current.querySelector('.giant-title')
    gsap.fromTo(
      giantTitle,
      { x: '-35vw', rotate: 2 },
      {
        x: '35vw',
        rotate: -2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.0
        }
      }
    )

    // 2. Heading slide up reveals
    const revealLines = containerRef.current.querySelectorAll('.reveal-text-line')
    gsap.fromTo(
      revealLines,
      { y: '100%' },
      {
        y: '0%',
        stagger: 0.08,
        duration: 0.8,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    // 3. Fade reveals
    const fadeEls = containerRef.current.querySelectorAll('.reveal-fade')
    gsap.fromTo(
      fadeEls,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
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
      className="scene min-h-[120vh] w-full flex items-center relative z-10 py-32 overflow-hidden"
    >
      {/* Giant Background Title - Animates on Scroll */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 select-none overflow-hidden opacity-30">
        <div
          className="giant-title font-display font-black text-transparent whitespace-nowrap leading-none tracking-widest"
          style={{
            fontSize: '24vw',
            WebkitTextStroke: '1.5px rgba(0, 212, 255, 0.12)'
          }}
        >
          EXPERTISE
        </div>
      </div>

      <div className="scene-content skills-content-wrap w-full select-none relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left Side: Header info */}
          <div className="md:col-span-6 flex flex-col text-left">
            <span className="reveal-fade font-mono text-micro text-secondary uppercase tracking-[0.25em] mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              // SKILLS & TOOLS
            </span>
            
            <h2 className="font-display text-[2.8rem] md:text-[4rem] lg:text-[4.8rem] font-black leading-[0.9] text-textMain tracking-tighter">
              <div className="overflow-hidden py-1.5">
                <span className="reveal-text-line block">My Technology</span>
              </div>
              <div className="overflow-hidden py-1.5">
                <span className="reveal-text-line block text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
                  Ecosystem.
                </span>
              </div>
            </h2>
            
            <p className="reveal-fade font-body text-[1.125rem] md:text-[1.25rem] font-light text-textMuted/90 mt-8 max-w-xl leading-relaxed">
              Every system is constructed using modular architectures. Spin the 3D cube to inspect languages, frameworks, AI/ML tools, databases, IIS infrastructure, and tools.
            </p>

            <div className="reveal-fade mt-10 flex flex-col gap-3.5 font-mono text-micro text-muted">
              <span className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Scroll or drag to rotate cube
              </span>
              <span className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                Interactive 3D HTML transforms
              </span>
            </div>
          </div>
          
          {/* Right Side: Spacer for 3D Skill Cube */}
          <div className="md:col-span-6 h-[480px]" />
          
        </div>
      </div>
    </section>
  )
}
