import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SceneAbout() {
  const containerRef = useRef()
  const statsRef = useRef()

  useEffect(() => {
    // 1. Text slide reveals
    const textEls = containerRef.current.querySelectorAll('.reveal-line')
    
    gsap.fromTo(
      textEls,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: '50% 50%',
          scrub: false,
          toggleActions: 'play none none reverse'
        }
      }
    )

    // 2. Polaroid card float trigger
    const polaroid = containerRef.current.querySelector('.about-polaroid')
    gsap.fromTo(
      polaroid,
      { opacity: 0, x: -50, rotate: -6 },
      {
        opacity: 1,
        x: 0,
        rotate: -3,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    // 3. Stats count-up on scroll
    const statNumbers = statsRef.current.querySelectorAll('.stat-val')
    statNumbers.forEach((el) => {
      const targetVal = parseInt(el.getAttribute('data-val'), 10)
      const obj = { val: 0 }
      
      gsap.to(obj, {
        val: targetVal,
        duration: 2,
        ease: 'power2.out',
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
      className="scene min-h-[110vh] w-full flex items-center relative z-10 py-20"
    >
      <div className="scene-content about-content-wrap w-full select-none">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Polaroid Avatar placeholder */}
          <div className="md:col-span-5 flex justify-center">
            <div className="about-polaroid opacity-0 w-[280px] p-4 pb-8 bg-[#0a0a0f] border border-border/80 rounded-sm shadow-2xl flex flex-col items-center">
              <div className="w-full aspect-square rounded-full border-2 border-primary/45 p-1 bg-void overflow-hidden flex items-center justify-center">
                {/* SVG avatar representing AI/Engineering focus */}
                <svg viewBox="0 0 100 100" className="w-[85%] h-[85%] text-primary opacity-80" fill="currentColor">
                  <path d="M50 15c-19.3 0-35 15.7-35 35 0 9.8 4.1 18.7 10.7 25l-2.7 7c-.5 1.3.4 2.7 1.8 2.7h50.4c1.4 0 2.3-1.4 1.8-2.7l-2.7-7c6.6-6.3 10.7-15.2 10.7-25 0-19.3-15.7-35-35-35zm0 6c16 0 29 13 29 29 0 7.8-3.1 14.9-8.1 20H29.1C24.1 64.9 21 57.8 21 50c0-16 13-29 29-29zm-7.5 12c-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5 4.5-2 4.5-4.5-2-4.5-4.5-4.5zm15 0c-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5 4.5-2 4.5-4.5-2-4.5-4.5-4.5zM38 52h24v4H38v-4z" />
                </svg>
              </div>
              <div className="mt-5 font-mono text-[10px] uppercase tracking-widest text-textMuted text-center">
                SHASHANK JAIN // AI.ENG
              </div>
              <div className="mt-1 font-mono text-micro text-secondary tracking-wide">
                BHOPAL, INDORE, INDIA
              </div>
            </div>
          </div>

          {/* Right Side: Description */}
          <div className="md:col-span-7 flex flex-col text-left">
            <span className="reveal-line font-mono text-micro text-secondary uppercase tracking-[0.25em] mb-3">
              // WHO I AM
            </span>
            <h2 className="reveal-line font-display text-[var(--text-title)] font-extrabold leading-[1.0] text-textMain">
              Full-Stack Engineer <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                building AI-first products
              </span> <br />
              for India's digital future.
            </h2>

            <div className="reveal-line space-y-4 mt-6 text-textMuted font-body text-body font-light max-w-xl leading-relaxed">
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

            {/* Stat chips container */}
            <div
              ref={statsRef}
              className="reveal-line grid grid-cols-2 gap-4 md:gap-6 mt-8 max-w-lg border-t border-border/50 pt-8"
            >
              <div className="flex flex-col">
                <span className="font-display text-2xl md:text-3xl font-extrabold text-primary flex items-center">
                  <span className="stat-val" data-val="3">0</span>+
                </span>
                <span className="font-mono text-micro text-textMuted uppercase tracking-wider mt-1">
                  Years Building
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-2xl md:text-3xl font-extrabold text-secondary flex items-center">
                  <span className="stat-val" data-val="10">0</span>+
                </span>
                <span className="font-mono text-micro text-textMuted uppercase tracking-wider mt-1">
                  Projects Shipped
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-2xl md:text-3xl font-extrabold text-textMain flex items-center">
                  <span className="stat-val" data-val="5">0</span>+
                </span>
                <span className="font-mono text-micro text-textMuted uppercase tracking-wider mt-1">
                  GovTech Products
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-2xl md:text-3xl font-extrabold text-accent flex items-center">
                  <span className="stat-val" data-val="2">0</span>
                </span>
                <span className="font-mono text-micro text-textMuted uppercase tracking-wider mt-1">
                  Community Orgs Led
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
