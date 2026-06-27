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
    // 1. Reveal headers
    gsap.fromTo(
      containerRef.current.querySelector('.comm-header'),
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

    // 2. Stagger slide-in list items on scroll
    const items = containerRef.current.querySelectorAll('.event-item')
    gsap.fromTo(
      items,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.15,
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
      className="scene min-h-[110vh] w-full flex items-center relative z-10 py-20"
    >
      <div className="scene-content comm-content-wrap w-full select-none">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left Side: Empty space for 3D Globe Wireframe */}
          <div className="md:col-span-5 h-[350px] md:h-auto" />

          {/* Right Side: Community content */}
          <div className="md:col-span-7 flex flex-col text-left">
            <div className="comm-header opacity-0">
              <span className="font-mono text-micro text-secondary uppercase tracking-[0.25em] mb-3">
                // CONNECTING DEVELOPERS
              </span>
              <h2 className="font-display text-[var(--text-title)] font-extrabold leading-[1.0] text-textMain">
                Building Communities <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  that inspire growth.
                </span>
              </h2>
              <p className="font-body text-body font-light text-textMuted mt-4 max-w-xl leading-relaxed">
                Empowering the developer ecosystem through conference planning, open source hacking, and technology mentorship across India and Asia.
              </p>
            </div>

            {/* List of events/roles */}
            <div className="event-list-wrap mt-8 space-y-3.5 max-w-lg border-l border-border/80 pl-6 py-2">
              {EVENTS.map((item, idx) => (
                <div
                  key={idx}
                  className="event-item opacity-0 flex items-center gap-3.5 group"
                >
                  <span className="font-mono text-xs text-primary group-hover:text-secondary transition-colors select-none">
                    ★
                  </span>
                  <span className="font-mono text-micro md:text-small text-textMain tracking-wide group-hover:translate-x-1.5 transition-transform duration-300">
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
