"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense } from "react";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Starfield that flips between dark-space and light-page themes
const fragmentShader = `
  precision mediump float;
  varying vec2 vUv;
  uniform float time;
  uniform vec2  mouse;
  uniform float lightMode; // 0.0 = dark, 1.0 = light

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float starLayer(vec2 uv, float threshold, float size, float seed) {
    vec2 cell = floor(uv);
    vec2 f    = fract(uv) - 0.5;
    vec2 offset = vec2(hash(cell + seed) - 0.5, hash(cell + seed + 1.3) - 0.5) * 0.75;
    float d = length(f - offset);
    float exists  = step(threshold, hash(cell + seed + 2.7));
    float twinkle = 0.55 + 0.45 * sin(
      time * (0.8 + hash(cell + seed) * 2.5) +
      hash(cell + seed * 0.5) * 6.28318
    );
    return exists * twinkle * smoothstep(size, 0.0, d);
  }

  void main() {
    // Background: deep space (dark) ↔ soft paper (light)
    vec3 darkBg  = vec3(0.006, 0.006, 0.018);
    vec3 lightBg = vec3(0.950, 0.952, 0.962);
    vec3 color   = mix(darkBg, lightBg, lightMode);

    // Stars: white-blue in dark mode, dark navy in light mode
    vec3 farColor  = mix(vec3(0.55, 0.65, 0.90), vec3(0.22, 0.28, 0.52), lightMode);
    vec3 midColor  = mix(vec3(0.80, 0.88, 1.00), vec3(0.10, 0.14, 0.38), lightMode);
    vec3 nearColor = mix(vec3(1.00, 1.00, 1.00), vec3(0.04, 0.05, 0.20), lightMode);

    // In light mode: bigger dots, more of them, stronger blend
    float th1 = mix(0.76, 0.62, lightMode);
    float th2 = mix(0.81, 0.68, lightMode);
    float th3 = mix(0.88, 0.75, lightMode);
    float sz1 = mix(0.022, 0.045, lightMode);
    float sz2 = mix(0.032, 0.060, lightMode);
    float sz3 = mix(0.048, 0.085, lightMode);

    float s1 = starLayer(vUv * vec2(95.0, 55.0), th1, sz1, 0.0);
    color = mix(color, farColor,  s1 * mix(0.30, 0.85, lightMode));

    float s2 = starLayer(vUv * vec2(48.0, 28.0), th2, sz2, 4.1);
    color = mix(color, midColor,  s2 * mix(0.55, 0.92, lightMode));

    float s3 = starLayer(vUv * vec2(20.0, 12.0), th3, sz3, 8.7);
    color = mix(color, nearColor, s3 * mix(0.90, 1.00, lightMode));

    // Cursor nebula
    float dist = length((vUv - mouse) * vec2(1.8, 1.0));
    float nebula = smoothstep(0.38, 0.0, dist) * mix(0.055, 0.035, lightMode);
    vec3 nebulaColor = mix(vec3(0.18, 0.28, 0.72), vec3(0.60, 0.65, 0.88), lightMode);
    color = mix(color, nebulaColor, nebula);

    float starBrightness = max(max(s1, s2), s3);
    float alpha = 0.96 + starBrightness * 0.04;
    gl_FragColor = vec4(color, alpha);
  }
`;

function ShaderPlane({
  mouseUV,
  lightModeRef,
}: {
  mouseUV: React.MutableRefObject<[number, number]>;
  lightModeRef: React.MutableRefObject<number>;
}) {
  const { viewport } = useThree();
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      time:      { value: 0 },
      mouse:     { value: new THREE.Vector2(0.5, 0.5) },
      lightMode: { value: 0 },
    }),
    []
  );

  useFrame((_, delta) => {
    if (!matRef.current) return;
    matRef.current.uniforms.time.value += delta;
    matRef.current.uniforms.mouse.value.set(mouseUV.current[0], mouseUV.current[1]);
    matRef.current.uniforms.lightMode.value = lightModeRef.current;
  });

  return (
    <mesh position={[0, 0, -1]}>
      <planeGeometry args={[viewport.width + 2, viewport.height + 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

const FOREGROUND_COUNT = 110;

function DriftingStars({ lightModeRef }: { lightModeRef: React.MutableRefObject<number> }) {
  const isMobile = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
  const N = isMobile ? 55 : FOREGROUND_COUNT;

  const positions = useMemo(() => {
    const arr = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
    }
    return arr;
  }, [N]);

  const velocities = useMemo(() => {
    const arr = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 0.0004;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 0.0004;
      arr[i * 3 + 2] = 0;
    }
    return arr;
  }, [N]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame(() => {
    const p = positions;
    const v = velocities;
    const maxSpeed = 0.0009;
    for (let i = 0; i < N; i++) {
      const ix = i * 3, iy = i * 3 + 1;
      v[ix] += (Math.random() - 0.5) * 0.00006;
      v[iy] += (Math.random() - 0.5) * 0.00006;
      if (v[ix] >  maxSpeed) v[ix] =  maxSpeed;
      if (v[ix] < -maxSpeed) v[ix] = -maxSpeed;
      if (v[iy] >  maxSpeed) v[iy] =  maxSpeed;
      if (v[iy] < -maxSpeed) v[iy] = -maxSpeed;
      p[ix] += v[ix];
      p[iy] += v[iy];
      if (p[ix] >  5) p[ix] = -5;
      if (p[ix] < -5) p[ix] =  5;
      if (p[iy] >  3) p[iy] = -3;
      if (p[iy] < -3) p[iy] =  3;
    }
    if (pointsRef.current) {
      const attr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
      attr.array.set(p);
      attr.needsUpdate = true;
      // Flip star colour with theme
      const mat = pointsRef.current.material as THREE.PointsMaterial;
      const t = lightModeRef.current;
      mat.color.setRGB(0.80 - t * 0.68, 0.84 - t * 0.70, 0.97 - t * 0.72);
    }
  });

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions.slice(), 3));
    return g;
  }, [positions]);

  return (
    <points ref={pointsRef} geometry={geo}>
      <pointsMaterial color="#ccd6f6" size={0.028} transparent opacity={0.65} sizeAttenuation />
    </points>
  );
}

function Scene({
  mouseUV,
  lightModeRef,
}: {
  mouseUV: React.MutableRefObject<[number, number]>;
  lightModeRef: React.MutableRefObject<number>;
}) {
  return (
    <>
      <ShaderPlane mouseUV={mouseUV} lightModeRef={lightModeRef} />
      <DriftingStars lightModeRef={lightModeRef} />
      <EffectComposer>
        <Bloom luminanceThreshold={0.6} intensity={0.5} />
      </EffectComposer>
    </>
  );
}

export default function HeroCanvas() {
  const mouseUV     = useRef<[number, number]>([0.5, 0.5]);
  const lightModeRef = useRef(0);

  useEffect(() => {
    const check = () => {
      lightModeRef.current =
        document.documentElement.getAttribute("data-theme") === "light" ? 1 : 0;
    };
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    if (isMobile) return;
    const onMove = (e: MouseEvent) => {
      const el = document.documentElement;
      mouseUV.current = [e.clientX / el.clientWidth, 1 - e.clientY / el.clientHeight];
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <Canvas
      style={{ position: "absolute", inset: 0 }}
      camera={{ position: [0, 0, 5], fov: 60 }}
      dpr={[1, 2]}
      gl={{ antialias: false, alpha: true }}
    >
      <Suspense fallback={null}>
        <Scene mouseUV={mouseUV} lightModeRef={lightModeRef} />
      </Suspense>
    </Canvas>
  );
}
