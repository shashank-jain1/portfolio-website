import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SceneWork() {
  const containerRef = useRef()

  useEffect(() => {
    // Reveal text block on scroll
    gsap.fromTo(
      containerRef.current.querySelector('.work-header'),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
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
      className="scene min-h-[110vh] w-full flex items-center relative z-10 py-20"
    >
      <div className="scene-content work-content-wrap w-full select-none">
        <div className="flex flex-col text-left mb-10 work-header opacity-0">
          <span className="font-mono text-micro text-secondary uppercase tracking-[0.25em] mb-3">
            // SELECTED PROJECTS
          </span>
          <h2 className="font-display text-[var(--text-title)] font-extrabold leading-[1.0] text-textMain">
            Engineering{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Impactful Solutions
            </span>
          </h2>
          <p className="font-body text-body font-light text-textMuted mt-4 max-w-xl leading-relaxed">
            A gallery of public sector platforms, enterprise-grade AI copilots, and multi-tenant architectures. Scroll to move through the project cards horizontally.
          </p>
        </div>

        {/* Height spacer for 3D Project Cards scrolling row */}
        <div className="h-[400px] w-full" />
      </div>
    </section>
  )
}
