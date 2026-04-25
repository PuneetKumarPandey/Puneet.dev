"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

// Lazy load with ssr: false — critical for R3F / WebGL
const Scene = dynamic(() => import("@/components/three/Scene"), {
  ssr: false,
  loading: () => null,
});

export default function HeroCanvas() {
  return (
    <motion.div
      className="absolute inset-0 z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 2.4, ease: "easeOut" }}
    >
      <Scene />

      {/* Radial vignette — focus center, fade edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 70% at 50% 50%, transparent 0%, var(--color-void) 100%)`,
        }}
      />

      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--color-void))",
        }}
      />
    </motion.div>
  );
}
