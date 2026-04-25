"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { PerformanceMonitor } from "@react-three/drei";
import { useState } from "react";
import ParticleField from "./ParticleField";
import FloatingMesh from "./FloatingMesh";

/**
 * PerformanceMonitor auto-reduces particle count if FPS drops below 55.
 * DPR capped at 1.5 — prevents GPU overload on retina screens.
 */
export default function Scene() {
  const [particleCount, setParticleCount] = useState(1600);

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 65 }}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
        depth: false,
      }}
      dpr={[1, 1.5]}
      frameloop="always"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
      }}
    >
      {/* Auto-degrade on low-end devices */}
      <PerformanceMonitor
        onDecline={() => setParticleCount(800)}
        onIncline={() => setParticleCount(1600)}
        flipflops={3}
      >
        <Suspense fallback={null}>
          <ParticleField count={particleCount} />
          <FloatingMesh />
        </Suspense>
      </PerformanceMonitor>
    </Canvas>
  );
}
