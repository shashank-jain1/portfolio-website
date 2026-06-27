import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const LINKS = [
  { label: 'hello@shashankjain.me', href: 'mailto:hello@shashankjain.me', icon: '📧' },
  { label: 'linkedin.com/in/shashank-jain1', href: 'https://linkedin.com/in/shashank-jain1', icon: '🔗' },
  { label: 'github.com/shashankjain', href: 'https://github.com/shashankjain', icon: '🐙' },
  { label: '@btwitsshank', href: 'https://instagram.com/btwitsshank', icon: '📸' }
]

export default function SceneContact() {
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

    // 2. Reveal headers and buttons
    const head = containerRef.current.querySelector('.contact-head')
    const pills = containerRef.current.querySelectorAll('.contact-pill')
    const footer = containerRef.current.querySelector('.contact-footer')

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    })

    tl.fromTo(head, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
      .fromTo(pills, { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .fromTo(footer, { opacity: 0 }, { opacity: 1, duration: 1.0 }, '-=0.2')
  }, [])

  return (
    <section
      id="scene-contact"
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
          SAY HELLO
        </div>
      </div>

      <div className="scene-content flex flex-col justify-between h-full min-h-[85vh] w-full select-none text-center relative z-10">
        
        {/* Top spacer to push content below the ContactOrb */}
        <div className="h-[280px] md:h-[320px]" />

        {/* Core contact details */}
        <div className="flex flex-col items-center">
          <div className="contact-head opacity-0">
            <span className="font-mono text-micro text-secondary uppercase tracking-[0.25em] mb-4 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping" />
              // LET'S COLLABORATE
            </span>
            
            {/* UPGRADED: Bigger typography headline */}
            <h2 className="font-display text-[2.8rem] md:text-[4rem] lg:text-[4.8rem] font-black leading-[0.95] text-textMain tracking-tighter max-w-4xl">
              Let's build something <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                that matters.
              </span>
            </h2>
          </div>

          {/* Links grid */}
          <div className="flex flex-wrap justify-center gap-5 mt-12 max-w-4xl">
            {LINKS.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="contact-pill opacity-0 glass-panel border border-border px-7 py-4 rounded-full flex items-center gap-3.5 hover:border-primary/50 transition-all font-mono text-micro md:text-small text-textMain hover:scale-105"
              >
                <span className="text-lg">{link.icon}</span>
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="contact-footer opacity-0 border-t border-border/30 mt-24 pt-8 w-full flex flex-col md:flex-row items-center justify-between gap-5">
          <p className="font-mono text-micro text-textMuted/80 uppercase tracking-wider">
            Built with Three.js · React · GSAP · Tailwind
          </p>
          <p className="font-mono text-micro text-textMuted/80 uppercase tracking-wider">
            © 2026 Shashank Jain
          </p>
        </div>

      </div>
    </section>
  )
}
