import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Simple lat/lon to 3D Cartesian conversion helper
function latLonToVector3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)

  const x = -(radius * Math.sin(phi) * Math.sin(theta))
  const y = radius * Math.cos(phi)
  const z = radius * Math.sin(phi) * Math.cos(theta)

  return new THREE.Vector3(x, y, z)
}

export default function GlobeWireframe() {
  const globeRef = useRef()
  const shaderRef = useRef()

  // Convert India coordinates (Bhopal lat 23.25, lon 77.41)
  const indiaPos = latLonToVector3(23.25, 77.41, 1.5)

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
      globeRef.current.rotation.x = 0.1 // Slight tilt
    }
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = state.clock.getElapsedTime()
    }
  })

  // Custom shader uniforms
  const uniforms = {
    uTime: { value: 0 },
    uColorVoid: { value: new THREE.Color('#050508') },
    uColorPrimary: { value: new THREE.Color('#6C63FF') },
    uColorSecondary: { value: new THREE.Color('#00D4FF') }
  }

  return (
    <group ref={globeRef}>
      {/* Outer grid sphere using custom shader */}
      <mesh>
        <sphereGeometry args={[1.5, 60, 60]} />
        <shaderMaterial
          ref={shaderRef}
          uniforms={uniforms}
          transparent
          vertexShader={`
            varying vec2 vUv;
            varying vec3 vNormal;
            void main() {
              vUv = uv;
              vNormal = normalize(normalMatrix * normal);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            uniform float uTime;
            uniform vec3 uColorVoid;
            uniform vec3 uColorPrimary;
            uniform vec3 uColorSecondary;
            varying vec2 vUv;
            varying vec3 vNormal;

            void main() {
              // Create dynamic wave lines running down the globe
              float grid = abs(sin(vUv.x * 40.0)) * abs(sin(vUv.y * 20.0));
              
              // Soft pulsing scanline effect
              float scan = sin(vUv.y * 10.0 - uTime * 2.0) * 0.5 + 0.5;
              
              // Fade out around the edges for atmospheric fresnel glow
              float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
              
              vec3 gridColor = mix(uColorPrimary, uColorSecondary, sin(uTime + vUv.x * 6.28) * 0.5 + 0.5);
              vec3 finalColor = mix(uColorVoid, gridColor, grid * 0.35 + intensity * 0.4);
              
              gl_FragColor = vec4(finalColor, 0.8);
            }
          `}
        />
      </mesh>

      {/* Subtle core sphere for solid blocking */}
      <mesh>
        <sphereGeometry args={[1.48, 32, 32]} />
        <meshBasicMaterial color="#07070d" transparent opacity={0.8} />
      </mesh>

      {/* Internal Wireframe grid for depth */}
      <mesh>
        <sphereGeometry args={[1.51, 16, 16]} />
        <meshBasicMaterial color="#00D4FF" wireframe transparent opacity={0.06} />
      </mesh>

      {/* Glowing hotspot for Bhopal, India */}
      <group position={indiaPos}>
        <mesh>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#FF6B35" />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial color="#FF6B35" transparent opacity={0.2} />
        </mesh>
      </group>
    </group>
  )
}
