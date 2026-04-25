"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
  count?: number;
}

export default function ParticleField({ count = 1800 }: Props) {
  const meshRef = useRef<THREE.Points>(null);
  const clockRef = useRef(new THREE.Clock());

  // Generate particle positions once
  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Spread across a wide field
      positions[i3] = (Math.random() - 0.5) * 28;
      positions[i3 + 1] = (Math.random() - 0.5) * 16;
      positions[i3 + 2] = (Math.random() - 0.5) * 12;

      speeds[i] = 0.2 + Math.random() * 0.8;
    }

    return { positions, speeds };
  }, [count]);

  // Geometry with custom float attribute for per-particle speed
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aSpeed", new THREE.BufferAttribute(speeds, 1));
    return geo;
  }, [positions, speeds]);

  // Custom shader material — small glowing dots
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new THREE.Color("#00ffc2") },
          uSize: { value: 1.8 },
        },
        vertexShader: /* glsl */ `
      attribute float aSpeed;
      uniform float uTime;
      uniform float uSize;

      varying float vOpacity;

      void main() {
        vec3 pos = position;

        // Gentle vertical drift
        pos.y += sin(uTime * aSpeed * 0.4 + pos.x * 0.5) * 0.12;
        pos.x += cos(uTime * aSpeed * 0.3 + pos.z * 0.4) * 0.08;

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = uSize * (200.0 / -mvPosition.z);
        gl_Position  = projectionMatrix * mvPosition;

        // Opacity fade by depth
        vOpacity = clamp(1.0 + mvPosition.z / 12.0, 0.1, 0.6);
      }
    `,
        fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      varying float vOpacity;

      void main() {
        // Circular point with soft edge
        float d = length(gl_PointCoord - vec2(0.5));
        if (d > 0.5) discard;

        float alpha = (1.0 - d * 2.0) * vOpacity;
        gl_FragColor = vec4(uColor, alpha);
      }
    `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  useFrame(() => {
    const t = clockRef.current.getElapsedTime();
    material.uniforms.uTime.value = t;

    if (meshRef.current) {
      // Slow global rotation
      meshRef.current.rotation.y = t * 0.018;
      meshRef.current.rotation.x = Math.sin(t * 0.008) * 0.06;
    }
  });

  return <points ref={meshRef} geometry={geometry} material={material} />;
}
