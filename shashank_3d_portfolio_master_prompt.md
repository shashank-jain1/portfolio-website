# Master Prompt: Shashank Jain — 3D Animated Portfolio Website

> Use this document as the complete brief when building the portfolio website. Feed it fully (or section by section) into Claude, Cursor, v0, or any AI coding assistant. Each section is self-contained so you can regenerate individual sections without rebuilding from scratch.

---

## 0. Vision

Build a **cinematic, scroll-driven 3D portfolio** where the page feels like a film playing as the user scrolls. Every scroll position maps to a unique visual "frame." There is no static layout — everything is in motion. The experience should feel like walking through a digital world, not reading a webpage.

**Inspiration references (describe to the AI, don't copy):**
- Apple iPhone product pages — scroll controls 3D object rotation
- Bruno Simon's portfolio — full WebGL world
- Stripe's animated marketing pages — smooth scroll + particle fields
- Linear's website — dark, crisp, engineering aesthetic with ambient motion

---

## 1. Tech Stack

```
Framework:     React 18 + Vite
3D Engine:     Three.js (via @react-three/fiber + @react-three/drei)
Scroll Engine: GSAP ScrollTrigger (primary) + Lenis (smooth scroll)
Animations:    GSAP timeline-driven, synced to scroll progress
Shaders:       GLSL (custom vertex/fragment shaders for particle effects)
Styling:       Tailwind CSS (utility) + CSS custom properties (design tokens)
Fonts:         Google Fonts or local — see Section 3
Build:         Vite, TypeScript optional
Deploy:        Vercel or Netlify
```

**Install commands:**
```bash
npm create vite@latest shashank-portfolio -- --template react
cd shashank-portfolio
npm install three @react-three/fiber @react-three/drei gsap @studio-freight/lenis
npm install -D tailwindcss postcss autoprefixer
```

---

## 2. Design System

### Color Palette
```css
--color-void:       #050508;   /* near-black background */
--color-surface:    #0D0D14;   /* card / panel backgrounds */
--color-border:     #1A1A2E;   /* subtle borders */
--color-primary:    #6C63FF;   /* electric violet — primary accent */
--color-secondary:  #00D4FF;   /* cyan — secondary accent / glow */
--color-accent:     #FF6B35;   /* burnt orange — CTA / highlights */
--color-text:       #E8E8F0;   /* primary text */
--color-muted:      #6B6B8A;   /* secondary / meta text */
--color-glow:       rgba(108, 99, 255, 0.15);  /* ambient glow color */
```

### Typography
```css
--font-display:  'Space Grotesk', sans-serif;   /* headings, names, big text */
--font-body:     'Inter', sans-serif;            /* body copy, descriptions */
--font-mono:     'JetBrains Mono', monospace;   /* code, labels, tags */

/* Scale */
--text-hero:   clamp(3.5rem, 8vw, 7rem);
--text-title:  clamp(2rem, 4vw, 3.5rem);
--text-section: clamp(1.5rem, 2.5vw, 2.2rem);
--text-body:   1rem;
--text-small:  0.875rem;
--text-micro:  0.75rem;
```

### Signature Element
A **floating particle field** that responds to scroll — particles are rendered as a Three.js Points mesh, slowly drifting in 3D space. As the user scrolls, the camera flies *through* the particle cloud. This is the single most memorable visual — every section has it subtly in the background. The particles also react to mouse movement (parallax).

---

## 3. Page Architecture & Scroll Scenes

The page is structured as **scroll scenes** — each section occupies a defined scroll range (e.g., 0–20% of total scroll height). GSAP ScrollTrigger maps each range to a timeline of 3D camera moves, object rotations, and text reveals.

### Total scroll height: `600vh` (6 viewport heights)

| Scene | Scroll Range | Name |
|-------|-------------|------|
| 0 | 0–10vh | **Intro — Loading / Brand** |
| 1 | 10–120vh | **Hero — Name + Title** |
| 2 | 120–220vh | **About — Who I Am** |
| 3 | 220–320vh | **Skills — Tech Stack** |
| 4 | 320–420vh | **Work — Projects** |
| 5 | 420–500vh | **Community — Events & Open Source** |
| 6 | 500–600vh | **Contact — Connect** |

---

## 4. Scene-by-Scene Specification

---

### Scene 0: Intro / Loader (0–10vh)

**Visual:** Full-screen dark void. A single glowing point in the center expands outward — like a universe Big Bang. Text fades in: `SJ` monogram (Space Grotesk, bold, 8rem), then dissolves into particle dust that becomes the background particle field.

**Code pattern:**
```jsx
// Loader component with GSAP timeline
useEffect(() => {
  const tl = gsap.timeline()
  tl.from('.monogram', { scale: 0, opacity: 0, duration: 1.2, ease: 'expo.out' })
    .to('.monogram', { scale: 20, opacity: 0, duration: 1, ease: 'expo.in' }, '+=0.5')
    .to('.loader', { opacity: 0, duration: 0.5 })
    .set('.loader', { display: 'none' })
}, [])
```

---

### Scene 1: Hero (10–120vh)

**Camera:** Starting far back in the particle field, slowly dollying forward.

**Text reveal (scroll-triggered, staggered):**
1. First 30vh: Name appears letter by letter, each letter dropping from above with spring physics
   - `SHASHANK` on line 1
   - `JAIN` on line 2 (larger, lighter weight)
2. Next 30vh: Role tag fades in — `AI Engineer · Full-Stack Developer · Community Builder`
3. Final 30vh: Two CTA buttons slide up — `View My Work ↓` and `Let's Connect →`

**3D element:** A slowly rotating abstract low-poly icosahedron (wireframe, `--color-primary` tint) floats to the right of the text. On scroll, it morphs into a sphere using morph targets.

**GSAP ScrollTrigger setup:**
```js
gsap.timeline({
  scrollTrigger: {
    trigger: '#scene-hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1.5,       // scrub = smooth scroll-linked
    pin: true,
  }
})
.from('.hero-name span', { y: -80, opacity: 0, stagger: 0.05, ease: 'back.out(1.2)' })
.from('.hero-role', { y: 30, opacity: 0, duration: 0.5 })
.from('.hero-cta', { y: 20, opacity: 0, stagger: 0.15 })
```

---

### Scene 2: About (120–220vh)

**Camera:** Pulls back slightly, rotates left to reveal a new "room."

**Visual concept:** Split-screen — left side: a 3D floating card/polaroid with an avatar placeholder (circular frame, violet glow border). Right side: text reveals line by line.

**Content to render:**
```
[EYEBROW LABEL]  About Me

[HEADLINE]  Full-Stack Engineer
            building AI-first products
            for India's digital future.

[BODY]
B.Tech in Artificial Intelligence & Data Science.
Currently AI Engineer at SFA Technologies, building
enterprise tools for the Government of India.
Previously led AI product development at Feedough.

I work at the intersection of intelligent systems,
modern web engineering, and community-driven growth —
from React + FastAPI apps to fine-tuned LLMs.

[STAT CHIPS — animated count-up on scroll]
  3+  Years Building
  10+ Projects Shipped
  5+  GovTech Products
  2   Community Orgs Led
```

**Animation:** Each line uses `clipPath` reveal — text slides out from behind an invisible mask, left to right. Stats count up with GSAP's `CountTo` on scroll entry.

---

### Scene 3: Skills (220–320vh)

**Camera:** Flies through the particle field, particles part like a corridor.

**Visual concept:** A **3D rotating cube** (React Three Fiber) with a different tech category on each visible face. As scroll progresses, the cube rotates to show each face. Each face lights up with the `--color-primary` glow when facing camera.

**Cube Faces / Tech Groups:**

| Face | Label | Skills |
|------|-------|--------|
| Front | Languages | Python · JS · TypeScript · PHP · C# · SQL |
| Right | Frameworks | React · FastAPI · ASP.NET Core · Vite |
| Top | AI / ML | LLMs · RAG · LoRA/QLoRA · Prompt Eng · vLLM |
| Left | Infra | IIS · Windows Server · Docker · PM2 · NSSM |
| Bottom | Databases | MS SQL Server · MySQL |
| Back | Tools | Git · GitHub · VS Code · Linux · Figma |

**Alternative layout (if cube is too complex to start):** Render skill tags as 3D floating pills in space — each pill drifts gently. On scroll into view, pills fly in from random directions and cluster into groups. Use `drei`'s `<Float>` component.

**Code pattern for floating skill tags:**
```jsx
import { Float, Text3D } from '@react-three/drei'

function SkillPill({ label, position }) {
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh position={position}>
        <boxGeometry args={[2, 0.5, 0.1]} />
        <meshStandardMaterial color="#6C63FF" emissive="#6C63FF" emissiveIntensity={0.3} />
      </mesh>
      <Text3D font="/fonts/SpaceGrotesk_Regular.json" size={0.15} position={[position[0]-0.8, position[1]-0.08, position[2]+0.06]}>
        {label}
        <meshStandardMaterial color="#E8E8F0" />
      </Text3D>
    </Float>
  )
}
```

---

### Scene 4: Work / Projects (320–420vh)

**Camera:** Pans horizontally as user scrolls — like walking past a gallery wall.

**Visual concept:** Projects displayed as **3D glass panels / cards** floating in a horizontal row in 3D space. Camera moves along the X axis, bringing each card into frame. Each card has a subtle refraction/frosted glass material.

**Projects to include:**

#### Project 1 — EVM Management System
```
Tag: Government of India · Full-Stack
Stack: React 18 · Vite · Node.js · Express · MS SQL Server
Highlights:
- Three-tier JWT role hierarchy (ADMIN → STATE → DISTRICT)
- Dual-library QR scanning (html5-qrcode + @zxing/library)
- Custom deep navy + saffron government-aesthetic UI
- Deployed on Windows Server with IIS reverse proxy + PM2
```

#### Project 2 — Bharatkosh AI Copilot
```
Tag: Enterprise AI · Integration
Stack: React · Python · FastAPI · .NET Core
Highlights:
- AI chatbot integrated into existing .NET + React finance platform
- Tenant-aware authentication, production-ready RAG pipeline
- FastAPI deployed via HttpPlatformHandler on Windows Server IIS
- Strict multi-tenant security boundary enforcement
```

#### Project 3 — Bharat CMS
```
Tag: GovTech · AI-Native SaaS
Stack: Python · ReportLab · RAG · Bhashini API
Highlights:
- AI-native multi-tenant platform for Indian public administration
- RAG chatbot, Bhashini API localization (Indian languages)
- Offline PWA, smart forms, omnichannel notifications
```

#### Project 4 — AI Content Generation Platform
```
Tag: AI · Content
Stack: Python · LLMs · React
Highlights:
- AI-powered content strategy and generation tool (Feedough)
- Fine-tuning pipeline documentation for open-source LLMs
- LoRA/QLoRA + PEFT + DeepSpeed + vLLM stack
```

**3D Card Material (Three.js):**
```js
const glassMaterial = new THREE.MeshPhysicalMaterial({
  transmission: 0.9,
  thickness: 0.5,
  roughness: 0.1,
  metalness: 0,
  reflectivity: 0.5,
  ior: 1.5,
  color: new THREE.Color('#0D0D14'),
})
```

**Hover state:** Card tilts toward camera (rotateX/Y by ±5°), glow border intensifies, project details expand below.

---

### Scene 5: Community (420–500vh)

**Camera:** Zooms out to show a globe/map, then zooms back in.

**Visual concept:** A **wireframe globe** (Three.js sphere + custom GLSL shader for grid lines) slowly rotates. Glowing dots on India. Text reveals float in from the right.

**Content:**
```
[EYEBROW]  Community & Open Source

[HEADLINE]  Building communities that
            inspire developers.

[EVENT LIST — each item slides in on scroll]
  ★  Organizing Team — WordCamp Asia 2026
  ★  Core Team — GDG Cloud Bhopal
  ★  Organizer — WordCamp Bhopal
  ★  Organizer — EmpowerWP
  ★  Organizer — do_action Bhopal
  ★  Organizer — DevFest
  ★  Organizer — Cloud Community Day (CCD)
```

**Globe shader snippet:**
```glsl
// Fragment shader for wireframe globe effect
varying vec2 vUv;
void main() {
  float grid = abs(sin(vUv.x * 30.0)) * abs(sin(vUv.y * 15.0));
  vec3 color = mix(vec3(0.04, 0.04, 0.08), vec3(0.42, 0.39, 1.0), grid * 0.4);
  gl_FragColor = vec4(color, 1.0);
}
```

---

### Scene 6: Contact (500–600vh)

**Camera:** Flies forward, bursting through the particle field to arrive at "ground level."

**Visual concept:** The particle field suddenly stills. A single glowing orb pulses in the center. Contact elements float up from below, one by one.

**Content:**
```
[HEADLINE]  Let's build something
            that matters.

[LINKS — each one a glowing pill button]
  📧  hello@shashankjain.me
  🔗  linkedin.com/in/shashank-jain1
  🐙  github.com/shashankjain
  📸  @btwitsshank

[BOTTOM — thin footer text]
  Built with Three.js · React · GSAP
  © 2026 Shashank Jain
```

**Orb effect:** Animated with `drei`'s `<MeshDistortMaterial>` for a fluid, morphing sphere.
```jsx
import { MeshDistortMaterial } from '@react-three/drei'
<mesh>
  <sphereGeometry args={[1, 64, 64]} />
  <MeshDistortMaterial
    color="#6C63FF"
    emissive="#00D4FF"
    emissiveIntensity={0.4}
    distort={0.4}
    speed={2}
    roughness={0.1}
  />
</mesh>
```

---

## 5. Global 3D Scene Setup

This is the persistent Three.js canvas that runs behind all scenes.

```jsx
// App.jsx
import { Canvas } from '@react-three/fiber'
import { Stars, EffectComposer, Bloom, ChromaticAberration } from '@react-three/drei'
import { Bloom, ChromaticAberration } from '@react-three/postprocessing'

function App() {
  return (
    <>
      {/* Full-screen fixed canvas — always behind */}
      <Canvas
        style={{ position: 'fixed', top: 0, left: 0, zIndex: 0 }}
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#6C63FF" />
        <pointLight position={[-10, -5, -5]} intensity={0.5} color="#00D4FF" />
        <ParticleField />        {/* always visible, scroll-driven drift */}
        <ScrollCamera />         {/* camera position driven by scroll */}
        <SceneObjects />         {/* scene-specific 3D objects, shown/hidden by scroll */}
        <EffectComposer>
          <Bloom intensity={1.2} luminanceThreshold={0.6} radius={0.8} />
          <ChromaticAberration offset={[0.0005, 0.0005]} />
        </EffectComposer>
      </Canvas>

      {/* HTML overlay — all text and UI layers */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <SceneHero />
        <SceneAbout />
        <SceneSkills />
        <SceneWork />
        <SceneCommunity />
        <SceneContact />
      </div>
    </>
  )
}
```

---

## 6. Particle Field (Core Visual)

```jsx
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function ParticleField({ count = 4000 }) {
  const mesh = useRef()

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 30
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30
      // Violet to cyan gradient
      const t = Math.random()
      colors[i * 3]     = 0.42 + t * (0 - 0.42)    // R
      colors[i * 3 + 1] = 0.39 + t * (0.83 - 0.39) // G
      colors[i * 3 + 2] = 1.0                        // B
    }
    return [positions, colors]
  }, [count])

  useFrame((state) => {
    // Slow drift + mouse parallax
    mesh.current.rotation.y += 0.0003
    mesh.current.rotation.x = state.mouse.y * 0.05
    mesh.current.rotation.z = state.mouse.x * 0.05
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} vertexColors transparent opacity={0.7} sizeAttenuation />
    </points>
  )
}
```

---

## 7. Scroll Camera System

```jsx
import { useThree, useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'

// Define camera keyframes: [scrollProgress 0-1, x, y, z, lookAtX, lookAtY, lookAtZ]
const CAMERA_PATH = [
  [0.00, 0,  0,  8,  0, 0, 0],   // Intro
  [0.15, 0,  0,  5,  0, 0, 0],   // Hero
  [0.30, -3, 1,  4,  0, 0, 0],   // About
  [0.45, 0,  0,  6,  0, 0, 0],   // Skills
  [0.60, 0, -1,  5,  0, 0, 0],   // Work
  [0.75, 2,  1,  7,  0, 0, 0],   // Community
  [1.00, 0,  0,  3,  0, 0, 0],   // Contact
]

function ScrollCamera() {
  const { camera } = useThree()
  const scroll = useScroll()

  useFrame(() => {
    const t = scroll.offset // 0 to 1

    // Linear interpolation between keyframes
    // Find surrounding keyframes and lerp
    let prev = CAMERA_PATH[0], next = CAMERA_PATH[CAMERA_PATH.length - 1]
    for (let i = 0; i < CAMERA_PATH.length - 1; i++) {
      if (t >= CAMERA_PATH[i][0] && t <= CAMERA_PATH[i + 1][0]) {
        prev = CAMERA_PATH[i]
        next = CAMERA_PATH[i + 1]
        break
      }
    }
    const alpha = (t - prev[0]) / (next[0] - prev[0])
    camera.position.x = THREE.MathUtils.lerp(prev[1], next[1], alpha)
    camera.position.y = THREE.MathUtils.lerp(prev[2], next[2], alpha)
    camera.position.z = THREE.MathUtils.lerp(prev[3], next[3], alpha)
    camera.lookAt(
      THREE.MathUtils.lerp(prev[4], next[4], alpha),
      THREE.MathUtils.lerp(prev[5], next[5], alpha),
      THREE.MathUtils.lerp(prev[6], next[6], alpha),
    )
  })
  return null
}
```

---

## 8. HTML Scene Template

Each HTML scene uses this structure:

```jsx
function SceneHero() {
  return (
    <section
      id="scene-hero"
      style={{ height: '110vh', position: 'relative', display: 'flex', alignItems: 'center' }}
    >
      <div className="scene-content">
        {/* GSAP targets go here */}
        <h1 className="hero-name">
          {'SHASHANK'.split('').map((l, i) => (
            <span key={i} className="hero-letter">{l}</span>
          ))}
        </h1>
        <p className="hero-role">AI Engineer · Full-Stack Developer · Community Builder</p>
        <div className="hero-cta">
          <button>View My Work ↓</button>
          <button>Let's Connect →</button>
        </div>
      </div>
    </section>
  )
}
```

---

## 9. Lenis Smooth Scroll Setup

```jsx
// main.jsx
import Lenis from '@studio-freight/lenis'

const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  smoothWheel: true,
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

// Tell GSAP about Lenis so ScrollTrigger stays in sync
import { ScrollTrigger } from 'gsap/ScrollTrigger'
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
```

---

## 10. Performance Budget

| Item | Target |
|------|--------|
| First Contentful Paint | < 1.5s |
| Particle count | ≤ 5,000 (desktop), ≤ 1,500 (mobile) |
| Canvas resolution | `Math.min(window.devicePixelRatio, 2)` |
| Three.js draw calls | < 20 per frame |
| JS bundle (gzipped) | < 350KB |
| Respect `prefers-reduced-motion` | ✅ — disable all 3D animation, show static layout |

```js
// Detect reduced motion and disable 3D
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
if (prefersReducedMotion) {
  // Render static HTML version only, hide Canvas
}
```

---

## 11. Mobile Behavior

- Canvas still renders but with reduced particle count and simplified camera path
- 3D cards become horizontal-swipe carousel (touch-enabled)
- Font sizes use `clamp()` — already defined in design tokens
- Canvas always behind HTML — HTML is fully readable on mobile
- Pinch-zoom disabled on canvas (`touch-action: none` on canvas element)

---

## 12. File Structure

```
shashank-portfolio/
├── public/
│   ├── fonts/
│   │   └── SpaceGrotesk_Regular.json   # converted for Text3D
│   └── textures/
│       └── matcap-violet.png            # optional matcap for 3D text
├── src/
│   ├── components/
│   │   ├── canvas/
│   │   │   ├── ParticleField.jsx
│   │   │   ├── ScrollCamera.jsx
│   │   │   ├── SkillCube.jsx
│   │   │   ├── ProjectCards.jsx
│   │   │   ├── GlobeWireframe.jsx
│   │   │   └── ContactOrb.jsx
│   │   ├── scenes/
│   │   │   ├── SceneIntro.jsx
│   │   │   ├── SceneHero.jsx
│   │   │   ├── SceneAbout.jsx
│   │   │   ├── SceneSkills.jsx
│   │   │   ├── SceneWork.jsx
│   │   │   ├── SceneCommunity.jsx
│   │   │   └── SceneContact.jsx
│   │   └── ui/
│   │       ├── Navbar.jsx
│   │       ├── Loader.jsx
│   │       └── ScrollProgress.jsx
│   ├── hooks/
│   │   ├── useScrollProgress.js
│   │   └── useMouseParallax.js
│   ├── styles/
│   │   ├── globals.css       # CSS custom properties + reset
│   │   └── scenes.css        # per-scene styles
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
└── tailwind.config.js
```

---

## 13. Build Sequence (Recommended Order)

Build in this order to stay unblocked:

1. **Setup** — Vite + React + Tailwind + install Three.js stack
2. **Canvas shell** — Empty `<Canvas>` fixed behind page, confirm it renders
3. **Particle field** — Get particles working and mouse-reactive
4. **Lenis + GSAP** — Smooth scroll + ScrollTrigger sync confirmed
5. **Scroll camera** — Keyframe system working, camera moves on scroll
6. **Scene 1 (Hero)** — First HTML scene + letter animation
7. **Scene 2 (About)** — Text reveal animations
8. **Skill cube / pills** — First real 3D interactive element
9. **Project cards** — Glass material, horizontal camera pan
10. **Globe + Community** — Shader-based globe
11. **Contact orb** — Distort material
12. **Loader** — Monogram burst intro
13. **Post-processing** — Add Bloom + Chromatic Aberration
14. **Polish** — Mobile, reduced-motion, performance tuning

---

## 14. Key Prompts for Each Build Step

Use these as follow-up prompts when building each section:

### Particle Field
> "Build a Three.js particle field with 4000 points spread across a 30-unit cube. Particles should drift slowly and respond to mouse position with subtle parallax. Use vertex colors interpolating from violet (#6C63FF) to cyan (#00D4FF). Use @react-three/fiber. Export as `<ParticleField />`."

### Scroll Camera
> "Create a scroll-linked Three.js camera system using @react-three/drei's useScroll hook. Define 7 keyframe positions mapped to scroll progress 0–1. Smoothly interpolate camera position and lookAt between keyframes on each frame using THREE.MathUtils.lerp."

### Hero Letter Animation
> "Build a React hero section where the name 'SHASHANK JAIN' animates letter-by-letter using GSAP ScrollTrigger. Each letter is a `<span>` that falls from y: -80 with spring ease and stagger 0.05s. Role text and CTA buttons follow. Section height is 110vh."

### Glass Project Cards
> "Create Three.js 3D cards using MeshPhysicalMaterial with transmission: 0.9, roughness: 0.1 and ior: 1.5 to simulate frosted glass. Lay 4 cards horizontally spaced 4 units apart along the X axis. Camera pans from x: -6 to x: 6 as scroll progresses through this section."

### Wireframe Globe
> "Build a Three.js globe using a SphereGeometry with a custom GLSL ShaderMaterial. The fragment shader should draw a lat/lon grid pattern in violet (#6C63FF) on a near-black (#050508) background. Sphere should rotate slowly on Y axis."

### Contact Orb
> "Create a slowly morphing sphere using @react-three/drei's MeshDistortMaterial with color #6C63FF, emissive #00D4FF, emissiveIntensity 0.4, distort 0.4, speed 2. Surround it with a soft bloom glow using @react-three/postprocessing Bloom."

---

## 15. Personal Content Reference

Use this data when populating all text, labels, and copy:

```yaml
name: Shashank Jain
role: AI Engineer · Full-Stack Developer · Community Builder
location: Bhopal / Indore, India
education: B.Tech in Artificial Intelligence & Data Science

current_role: AI Engineer at SFA Technologies (Dec 2025–present)
prev_role: AI Project Manager at Feedough (Jan–Jun 2025)

skills:
  languages: [Python, JavaScript, TypeScript, PHP, "C#", SQL]
  frameworks: [React, Vite, FastAPI, "ASP.NET Core", WordPress]
  ai: [LLMs, RAG, "LoRA/QLoRA", PEFT, DeepSpeed, vLLM, "Prompt Engineering"]
  infra: [IIS, "Windows Server", Docker, PM2, NSSM, HttpPlatformHandler]
  databases: ["MS SQL Server", MySQL]
  tools: [Git, GitHub, "VS Code", Linux, macOS]

projects:
  - name: EVM Management System
    client: Government of India
    stack: "React 18 · Node.js · MS SQL Server · IIS"
  - name: Bharatkosh AI Copilot
    type: Enterprise AI chatbot integration
    stack: "React · FastAPI · .NET Core"
  - name: Bharat CMS
    type: AI-native GovTech SaaS
    stack: "Python · RAG · Bhashini API"

community:
  - "Organizing Team — WordCamp Asia 2026"
  - "Core Team Member — GDG Cloud Bhopal"
  - "Organizer — WordCamp Bhopal"
  - "Organizer — EmpowerWP"
  - "Organizer — do_action Bhopal"
  - "Organizer — DevFest"
  - "Organizer — Cloud Community Day (CCD)"

contact:
  linkedin: "linkedin.com/in/shashank-jain1"
  instagram: "@btwitsshank"
  website: "shashankjain.me"

motto: "Building technology that empowers people, creating communities that inspire growth."
```

---

## 16. Aesthetic Dos and Don'ts

| ✅ Do | ❌ Don't |
|-------|---------|
| Dark void background — always | White or cream background |
| Violet + cyan as the only accent colors | Rainbow gradients |
| Thin, clean sans-serif text | Decorative/display-heavy body text |
| Particles and glow as the atmosphere | Generic stock 3D shapes |
| Camera movement = narrative progression | Random camera shakes |
| Scroll = time — every px is intentional | Parallax for its own sake |
| One signature 3D element per scene | Clutter of unrelated 3D objects |
| Bloom only on light-emitting elements | Bloom everywhere |
| Reduced motion fallback is a real layout | Just hiding the canvas |

---

*End of Master Prompt — Feed to Claude / Cursor / v0 section by section or as a whole.*
