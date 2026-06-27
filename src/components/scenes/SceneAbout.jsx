import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SceneAbout() {
  const containerRef = useRef()
  const statsRef = useRef()

  useEffect(() => {
    // 1. Giant full-screen background text horizontal scroll scrub
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

    // 2. Split-line slide up reveals for headings
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

    // 3. Fade reveals for body text and tags
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

    // 4. Polaroid floating animation
    const polaroid = containerRef.current.querySelector('.about-polaroid')
    gsap.fromTo(
      polaroid,
      { opacity: 0, x: -60, rotate: -6 },
      {
        opacity: 1,
        x: 0,
        rotate: -2,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    // 5. Stats count-up on scroll
    const statNumbers = statsRef.current.querySelectorAll('.stat-val')
    statNumbers.forEach((el) => {
      const targetVal = parseInt(el.getAttribute('data-val'), 10)
      const obj = { val: 0 }
      
      gsap.to(obj, {
        val: targetVal,
        duration: 1.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        onUpdate: () => {
          el.innerText = Math.floor(obj.val)
        }
      })
    })

    // Parallel scrub transition: fade out elements near bottom of section
    gsap.to(containerRef.current.querySelector('.about-content-wrap'), {
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
      id="scene-about"
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
          ABOUT ME
        </div>
      </div>

      <div className="scene-content about-content-wrap w-full select-none relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Polaroid Avatar Panel */}
          <div className="md:col-span-5 flex justify-center">
            <div className="about-polaroid opacity-0 w-[320px] p-5 pb-10 bg-[#0D0D14]/90 border border-border/80 rounded-sm shadow-2xl flex flex-col items-center backdrop-blur-md">
              <div className="relative w-full aspect-square rounded-full border-2 border-primary/45 p-1.5 bg-void overflow-hidden flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-[85%] h-[85%] text-primary opacity-80" fill="currentColor">
                  <path d="M50 15c-19.3 0-35 15.7-35 35 0 9.8 4.1 18.7 10.7 25l-2.7 7c-.5 1.3.4 2.7 1.8 2.7h50.4c1.4 0 2.3-1.4 1.8-2.7l-2.7-7c6.6-6.3 10.7-15.2 10.7-25 0-19.3-15.7-35-35-35zm0 6c16 0 29 13 29 29 0 7.8-3.1 14.9-8.1 20H29.1C24.1 64.9 21 57.8 21 50c0-16 13-29 29-29zm-7.5 12c-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5 4.5-2 4.5-4.5-2-4.5-4.5-4.5zm15 0c-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5 4.5-2 4.5-4.5-2-4.5-4.5-4.5zM38 52h24v4H38v-4z" />
                </svg>
                <div className="absolute inset-0 rounded-full border border-secondary/20 animate-ping pointer-events-none" />
              </div>
              <div className="mt-6 font-mono text-micro uppercase tracking-widest text-textMuted text-center">
                SHASHANK JAIN // AI.ENG
              </div>
              <div className="mt-1.5 font-mono text-[10px] text-secondary tracking-wide uppercase">
                BHOPAL, INDORE, INDIA
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Typographic Info */}
          <div className="md:col-span-7 flex flex-col text-left">
            <span className="reveal-fade font-mono text-micro text-secondary uppercase tracking-[0.25em] mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              // WHO I AM
            </span>

            {/* UPGRADED: Much larger text display */}
            <h2 className="font-display text-[2.8rem] md:text-[4rem] lg:text-[4.8rem] font-black leading-[0.9] text-textMain tracking-tighter">
              <div className="overflow-hidden py-1.5">
                <span className="reveal-text-line block">Full-Stack Engineer</span>
              </div>
              <div className="overflow-hidden py-1.5">
                <span className="reveal-text-line block text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#8b5cf6] to-secondary">
                  building AI-first products
                </span>
              </div>
              <div className="overflow-hidden py-1.5">
                <span className="reveal-text-line block">for India's GovTech.</span>
              </div>
            </h2>

            {/* UPGRADED: Larger body text */}
            <div className="reveal-fade space-y-5 mt-8 text-textMuted/90 font-body text-[1.125rem] md:text-[1.25rem] font-light max-w-2xl leading-relaxed">
              <p>
                B.Tech in Artificial Intelligence & Data Science. Currently AI Engineer at{' '}
                <strong className="text-textMain font-medium">SFA Technologies</strong>, building
                enterprise-scale tools for the Government of India. Previously led AI product
                development at Feedough.
              </p>
              <p>
                I work at the intersection of intelligent systems, modern web engineering, and
                community-driven growth — from React + FastAPI apps to fine-tuned LLMs.
              </p>
            </div>

            {/* Dashboard-style metrics layout */}
            <div
              ref={statsRef}
              className="reveal-fade grid grid-cols-2 gap-4 mt-12 max-w-2xl"
            >
              <div className="border border-border/50 bg-[#0c0c14]/40 hover:border-primary/30 transition-colors p-5 rounded-lg flex flex-col relative overflow-hidden group">
                <span className="font-display text-4xl font-extrabold text-primary flex items-center">
                  <span className="stat-val" data-val="3">0</span>+
                </span>
                <span className="font-mono text-[10px] text-textMuted uppercase tracking-wider mt-2">
                  Years Building
                </span>
                <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors animate-pulse" />
              </div>
              
              <div className="border border-border/50 bg-[#0c0c14]/40 hover:border-secondary/30 transition-colors p-5 rounded-lg flex flex-col relative overflow-hidden group">
                <span className="font-display text-4xl font-extrabold text-secondary flex items-center">
                  <span className="stat-val" data-val="10">0</span>+
                </span>
                <span className="font-mono text-[10px] text-textMuted uppercase tracking-wider mt-2">
                  Projects Shipped
                </span>
                <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-secondary/40 group-hover:bg-secondary transition-colors animate-pulse" />
              </div>
              
              <div className="border border-border/50 bg-[#0c0c14]/40 hover:border-textMain/30 transition-colors p-5 rounded-lg flex flex-col relative overflow-hidden group">
                <span className="font-display text-4xl font-extrabold text-textMain flex items-center">
                  <span className="stat-val" data-val="5">0</span>+
                </span>
                <span className="font-mono text-[10px] text-textMuted uppercase tracking-wider mt-2">
                  GovTech Products
                </span>
                <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-textMain/35 group-hover:bg-textMain transition-colors animate-pulse" />
              </div>
              
              <div className="border border-border/50 bg-[#0c0c14]/40 hover:border-accent/30 transition-colors p-5 rounded-lg flex flex-col relative overflow-hidden group">
                <span className="font-display text-4xl font-extrabold text-accent flex items-center">
                  <span className="stat-val" data-val="2">0</span>
                </span>
                <span className="font-mono text-[10px] text-textMuted uppercase tracking-wider mt-2">
                  Community Orgs Led
                </span>
                <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-accent/40 group-hover:bg-accent transition-colors animate-pulse" />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
