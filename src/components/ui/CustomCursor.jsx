import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorDot = useRef()
  const cursorRing = useRef()

  useEffect(() => {
    // Hide default cursor for standard desktop view
    let mouseX = -100
    let mouseY = -100
    let ringX = -100
    let ringY = -100
    let isHovered = false

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const handleMouseOver = (e) => {
      const target = e.target
      if (!target) return
      
      // Scale cursor up when hovering over links, buttons, or custom interactives
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('span[role="button"]') ||
        target.classList.contains('interactive')
      
      isHovered = isInteractive
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)

    let animationFrameId

    const tick = () => {
      // Lerp the outer ring for smooth trailing follow lag
      ringX += (mouseX - ringX) * 0.16
      ringY += (mouseY - ringY) * 0.16

      // Direct style updates bypass React's render loop for silky 60fps performance
      if (cursorDot.current) {
        cursorDot.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
      }
      
      if (cursorRing.current) {
        cursorRing.current.style.transform = `translate3d(${ringX - 16}px, ${ringY - 16}px, 0) scale(${isHovered ? 1.7 : 1.0})`
        cursorRing.current.style.borderColor = isHovered ? 'var(--color-secondary)' : 'rgba(108, 99, 255, 0.6)'
        cursorRing.current.style.backgroundColor = isHovered ? 'rgba(0, 212, 255, 0.08)' : 'transparent'
      }

      animationFrameId = requestAnimationFrame(tick)
    }

    tick()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <>
      {/* Custom Outer Ring */}
      <div
        ref={cursorRing}
        className="hidden md:block fixed top-0 left-0 w-8 h-8 rounded-full border border-primary/60 pointer-events-none z-[9999] transition-transform duration-100 ease-out"
        style={{
          transform: 'translate3d(-100px, -100px, 0)',
          willChange: 'transform, border-color, background-color'
        }}
      />
      {/* Custom Inner Dot */}
      <div
        ref={cursorDot}
        className="hidden md:block fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-secondary pointer-events-none z-[9999]"
        style={{
          transform: 'translate3d(-100px, -100px, 0)',
          marginLeft: '-3px',
          marginTop: '-3px',
          willChange: 'transform'
        }}
      />
    </>
  )
}
