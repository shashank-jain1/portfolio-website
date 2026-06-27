import { useEffect, useState } from 'react'

const NAV_ITEMS = [
  { label: 'Intro', href: '#scene-hero' },
  { label: 'About', href: '#scene-about' },
  { label: 'Skills', href: '#scene-skills' },
  { label: 'Work', href: '#scene-work' },
  { label: 'Community', href: '#scene-community' },
  { label: 'Contact', href: '#scene-contact' }
]

export default function Navbar() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight > 0) {
        setScrollProgress(window.scrollY / scrollHeight)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-border/40 backdrop-blur-md bg-void/60 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Monogram Logo */}
        <a
          href="#scene-hero"
          onClick={(e) => handleNavClick(e, '#scene-hero')}
          className="font-display text-xl font-bold tracking-widest text-textMain hover:text-primary transition-colors select-none"
        >
          SJ<span className="text-secondary">.</span>
        </a>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="font-mono text-micro text-textMuted hover:text-textMain transition-colors uppercase tracking-widest"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Right CTA */}
        <a
          href="#scene-contact"
          onClick={(e) => handleNavClick(e, '#scene-contact')}
          className="font-mono text-[10px] uppercase tracking-widest border border-primary/50 hover:border-primary px-4 py-1.5 rounded bg-primary/5 hover:bg-primary/10 transition-all select-none text-textMain"
        >
          LET'S CHAT →
        </a>
      </div>

      {/* Progress Bar indicator */}
      <div
        className="h-[2px] bg-gradient-to-r from-primary to-secondary transition-all duration-75 origin-left"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
    </nav>
  )
}
