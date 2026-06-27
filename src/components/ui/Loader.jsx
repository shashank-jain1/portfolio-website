import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Loader({ onComplete }) {
  const containerRef = useRef()
  const monogramRef = useRef()
  const textRef = useRef()

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete()
      }
    })

    // Set initial state
    tl.set(monogramRef.current, { scale: 0.5, opacity: 0 })
      .set(textRef.current, { opacity: 0, y: 15 })
      
    // Animate monogram and subtext in
    tl.to(monogramRef.current, {
      scale: 1,
      opacity: 1,
      duration: 1.2,
      ease: 'power3.out'
    })
    .to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6')
    
    // Hold frame for effect
    .to({}, { duration: 0.6 })
    
    // Zoom monogram out (explosion/big bang effect)
    .to(monogramRef.current, {
      scale: 30,
      opacity: 0,
      duration: 1.0,
      ease: 'power4.inOut'
    })
    .to(textRef.current, {
      opacity: 0,
      y: -15,
      duration: 0.5,
      ease: 'power3.in'
    }, '-=0.8')
    
    // Fade out overlay container
    .to(containerRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out'
    }, '-=0.4')
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full z-50 bg-[#050508] flex flex-col justify-center items-center select-none"
    >
      <div className="relative flex flex-col items-center">
        {/* Monogram logo */}
        <h1
          ref={monogramRef}
          className="font-display text-[9rem] font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary via-textMain to-secondary tracking-tighter"
        >
          SJ
        </h1>
        
        {/* Subtext info */}
        <p
          ref={textRef}
          className="font-mono text-micro text-muted uppercase tracking-[0.3em] -mt-2"
        >
          INITIALIZING DIGITAL SPACE
        </p>
      </div>

      {/* Atmospheric faint border glow */}
      <div className="absolute inset-[15%] border border-primary/5 rounded-[32px] pointer-events-none" />
      <div className="absolute inset-[25%] border border-secondary/5 rounded-[24px] pointer-events-none" />
    </div>
  )
}
