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
    // Reveal headers and buttons
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

    tl.fromTo(head, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
      .fromTo(pills, { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .fromTo(footer, { opacity: 0 }, { opacity: 1, duration: 1.0 }, '-=0.2')
  }, [])

  return (
    <section
      id="scene-contact"
      ref={containerRef}
      className="scene min-h-[110vh] w-full flex items-center relative z-10 py-20"
    >
      <div className="scene-content flex flex-col justify-between h-full min-h-[80vh] w-full select-none text-center">
        
        {/* Top spacer to push content below the ContactOrb which sits around the upper-middle */}
        <div className="h-[250px] md:h-[300px]" />

        {/* Core contact details */}
        <div className="flex flex-col items-center">
          <div className="contact-head opacity-0">
            <span className="font-mono text-micro text-secondary uppercase tracking-[0.25em] mb-3">
              // LET'S COLLABORATE
            </span>
            <h2 className="font-display text-[var(--text-title)] md:text-[4rem] font-extrabold leading-[1.0] text-textMain tracking-tighter max-w-2xl">
              Let's build something <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                that matters.
              </span>
            </h2>
          </div>

          {/* Links grid */}
          <div className="flex flex-wrap justify-center gap-4 mt-10 max-w-3xl">
            {LINKS.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="contact-pill opacity-0 glass-panel border border-border px-5 py-3 rounded-full flex items-center gap-2.5 hover:border-primary/50 transition-all font-mono text-micro md:text-small text-textMain hover:scale-105"
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="contact-footer opacity-0 border-t border-border/30 mt-20 pt-8 w-full flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-micro text-textMuted uppercase tracking-wider">
            Built with Three.js · React · GSAP · Tailwind
          </p>
          <p className="font-mono text-micro text-textMuted uppercase tracking-wider">
            © 2026 Shashank Jain
          </p>
        </div>

      </div>
    </section>
  )
}
