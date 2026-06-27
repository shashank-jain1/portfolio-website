import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const EVENTS = [
  'Organizing Team — WordCamp Asia 2026',
  'Core Team — GDG Cloud Bhopal',
  'Organizer — WordCamp Bhopal',
  'Organizer — EmpowerWP',
  'Organizer — do_action Bhopal',
  'Organizer — DevFest',
  'Organizer — Cloud Community Day (CCD)'
]

export default function SceneCommunity() {
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

    // 4. Stagger slide-in list items on scroll
    const items = containerRef.current.querySelectorAll('.event-item')
    gsap.fromTo(
      items,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current.querySelector('.event-list-wrap'),
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    // Parallel scrub transition: fade out elements near bottom of section
    gsap.to(containerRef.current.querySelector('.comm-content-wrap'), {
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
      id="scene-community"
      ref={containerRef}
      className="scene min-h-[120vh] w-full flex items-center relative z-10 py-32 overflow-hidden"
    >
      {/* Giant Background Title - Animates on Scroll */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 select-none overflow-hidden opacity-30">
        <div
          className="giant-title font-display font-black text-transparent whitespace-nowrap leading-none tracking-widest"
          style={{
            fontSize: '24vw',
            WebkitTextStroke: '1.5px rgba(108, 99, 255, 0.12)'
          }}
        >
          COMMUNITY
        </div>
      </div>

      <div className="scene-content comm-content-wrap w-full select-none relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left Side: Empty space for 3D Globe Wireframe */}
          <div className="md:col-span-5 h-[350px] md:h-auto" />

          {/* Right Side: Community content */}
          <div className="md:col-span-7 flex flex-col text-left">
            <div className="comm-header">
              <span className="reveal-fade font-mono text-micro text-secondary uppercase tracking-[0.25em] mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                // ENGAGEMENT
              </span>
              
              <h2 className="font-display text-[2.8rem] md:text-[4rem] lg:text-[4.8rem] font-black leading-[0.9] text-textMain tracking-tighter">
                <div className="overflow-hidden py-1.5">
                  <span className="reveal-text-line block">Building Spaces</span>
                </div>
                <div className="overflow-hidden py-1.5">
                  <span className="reveal-text-line block text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
                    that inspire.
                  </span>
                </div>
              </h2>
              
              <p className="reveal-fade font-body text-[1.125rem] md:text-[1.25rem] font-light text-textMuted/90 mt-8 max-w-xl leading-relaxed">
                Empowering the developer ecosystem through conference planning, open source hacking, and technology mentorship across India and Asia.
              </p>
            </div>

            {/* List of events/roles */}
            <div className="event-list-wrap mt-10 space-y-4 max-w-xl border-l-2 border-border/80 pl-6 py-2">
              {EVENTS.map((item, idx) => (
                <div
                  key={idx}
                  className="event-item opacity-0 flex items-center gap-4 group"
                >
                  <span className="font-mono text-sm text-primary group-hover:text-secondary transition-colors select-none">
                    ★
                  </span>
                  <span className="font-mono text-micro md:text-small text-textMain tracking-wide group-hover:translate-x-2 transition-transform duration-300">
                    {item}
                  </span>
                </div>
              ))}
            </div>

          </div>
          
        </div>
      </div>
    </section>
  )
}
