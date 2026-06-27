import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SceneWork() {
  const containerRef = useRef()

  useEffect(() => {
    // 1. Giant Background Title slide scroll scrub
    const giantTitle = containerRef.current.querySelector('.giant-title')
    gsap.fromTo(
      giantTitle,
      { x: '35vw', rotate: -2 },
      {
        x: '-35vw',
        rotate: 2,
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
    gsap.to(containerRef.current.querySelector('.work-content-wrap'), {
      scrollTrigger: {
        trigger: containerRef.current,
        start: '85% top',
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
      id="scene-work"
      ref={containerRef}
      className="scene min-h-[120vh] w-full flex items-center relative z-10 py-32 overflow-hidden"
    >
      {/* Giant Background Title - Animates on Scroll */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 select-none overflow-hidden opacity-30">
        <div
          className="giant-title font-display font-black text-transparent whitespace-nowrap leading-none tracking-widest"
          style={{
            fontSize: '24vw',
            WebkitTextStroke: '1.5px rgba(255, 107, 53, 0.12)'
          }}
        >
          PORTFOLIO
        </div>
      </div>

      <div className="scene-content work-content-wrap w-full select-none relative z-10">
        <div className="flex flex-col text-left mb-14">
          <span className="reveal-fade font-mono text-micro text-secondary uppercase tracking-[0.25em] mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent" />
            // SELECTED PROJECTS
          </span>
          
          <h2 className="font-display text-[2.8rem] md:text-[4rem] lg:text-[4.8rem] font-black leading-[0.9] text-textMain tracking-tighter">
            <div className="overflow-hidden py-1.5">
              <span className="reveal-text-line block">Engineering</span>
            </div>
            <div className="overflow-hidden py-1.5">
              <span className="reveal-text-line block text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">
                Impactful Products.
              </span>
            </div>
          </h2>
          
          <p className="reveal-fade font-body text-[1.125rem] md:text-[1.25rem] font-light text-textMuted/90 mt-8 max-w-2xl leading-relaxed">
            A gallery of public sector platforms, enterprise-grade AI copilots, and multi-tenant architectures. Scroll to move through the project cards horizontally.
          </p>
        </div>

        {/* Height spacer for 3D Project Cards scrolling row */}
        <div className="h-[440px] w-full" />
      </div>
    </section>
  )
}
