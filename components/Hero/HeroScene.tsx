/// <reference types="@react-three/fiber" />
'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Vertex Shader: simple pass-through
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment Shader: Ashima Arts 3D Simplex Noise + dynamic liquid gradient
const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec2 vUv;

  // Ashima Arts 3D Simplex Noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+10.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + D.xxx;
    vec3 x2 = x0 - i2 + D.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i);
    vec4 p = permute(permute(permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vec2 uv = vUv;

    // Organic fluid coordinate warping driven by time-based noise
    float distortX = snoise(vec3(uv * 1.5, uTime * 0.05)) * 0.12;
    float distortY = snoise(vec3(uv * 1.5 + vec2(10.0), uTime * 0.05)) * 0.12;
    
    // Dynamic coordinate translation containing mouse parallax offsets
    vec2 warpedUv = uv + vec2(distortX, distortY) - uMouse * 0.04;

    // Multi-octave simplex noise factors
    float n1 = snoise(vec3(warpedUv * 1.2, uTime * 0.03)) * 0.5 + 0.5;
    float n2 = snoise(vec3(warpedUv * 2.0, uTime * 0.06 + 10.0)) * 0.5 + 0.5;
    float n3 = snoise(vec3(warpedUv * 0.8, uTime * 0.02 - 10.0)) * 0.5 + 0.5;

    // DESIGN SYSTEM METRO & Mood-Baffait Colors:
    vec3 baseBg = vec3(0.015, 0.015, 0.022);    // velvelty near-black base
    vec3 royalBlue = vec3(0.0, 0.0, 1.0);        // Sundhar's primary royal blue (#0000FF)
    vec3 darkCrimson = vec3(0.24, 0.03, 0.04);   // Luke Baffait burgundy/deep red
    vec3 glowingRed = vec3(0.97, 0.2, 0.14);     // Luke Baffait high-saturation red
    vec3 terracotta = vec3(0.58, 0.22, 0.14);    // Clay-rust midtone accent
    vec3 metroMagenta = vec3(1.0, 0.0, 0.59);   // Metro UI Magenta (#FF0097)
    vec3 metroTeal = vec3(0.0, 0.67, 0.66);      // Metro UI Cyan/Teal (#00ABA9)

    vec3 finalColor = baseBg;
    
    // Base Color Mixing
    finalColor = mix(finalColor, darkCrimson, n1 * 0.45);
    finalColor = mix(finalColor, royalBlue, n2 * 0.35);
    
    // Splash hot glowing red & terracotta blooms
    float redBloom = smoothstep(0.4, 0.95, snoise(vec3(warpedUv * 2.5 + vec2(uTime * 0.01), uTime * 0.04)));
    finalColor = mix(finalColor, glowingRed, redBloom * 0.55);
    
    float terraBloom = smoothstep(0.5, 0.9, snoise(vec3(warpedUv * 1.8 - vec2(uTime * 0.015), uTime * 0.03 + 50.0)));
    finalColor = mix(finalColor, terracotta, terraBloom * 0.4);

    // Metro Highlights
    float magentaBloom = smoothstep(0.65, 0.98, n3);
    finalColor = mix(finalColor, metroMagenta, magentaBloom * 0.12);
    
    float tealBloom = smoothstep(0.6, 0.95, snoise(vec3(warpedUv * 3.5, uTime * 0.08 - 100.0)) * 0.5 + 0.5);
    finalColor = mix(finalColor, metroTeal, tealBloom * 0.08);

    // Continuous mouse responsive glow
    float mouseDistance = distance(uv, uMouse * 0.5 + 0.5);
    float mouseGlow = smoothstep(0.7, 0.0, mouseDistance);
    finalColor += glowingRed * mouseGlow * 0.07 + royalBlue * mouseGlow * 0.05;

    // Corner Vignette
    float vignette = uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y);
    vignette = clamp(pow(16.0 * vignette, 0.28), 0.0, 1.0);
    finalColor *= mix(0.3, 1.0, vignette);

    // High quality dithering to completely eliminate dark zone color banding
    float dither = (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) / 255.0;
    finalColor += dither * 1.6;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

function BackgroundGradient() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { mouse, viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    []
  );

  useFrame((state) => {
    if (!materialRef.current) return;
    
    // Continuous time ticker
    uniforms.uTime.value = state.clock.getElapsedTime();
    
    // Smooth responsive mouse interpolation
    uniforms.uMouse.value.lerp(mouse, 0.05);
  });

  return (
    // Plane coordinates map viewport dimensions slightly scaled up to support seamless margins
    <mesh position={[0, 0, -5]}>
      <planeGeometry args={[viewport.width * 1.5, viewport.height * 1.5]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

function FloatingParticles() {
  const points = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(300 * 3);
    for (let i = 0; i < 300; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!points.current) return;
    points.current.rotation.y = clock.getElapsedTime() * 0.02;
    points.current.rotation.x = clock.getElapsedTime() * 0.01;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#0000ff"
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 55 }}
      style={{ background: 'transparent' }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#0000ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#00aba9" />
      <BackgroundGradient />
      <FloatingParticles />
    </Canvas>
  );
}
