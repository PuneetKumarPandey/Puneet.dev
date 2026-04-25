"use client";

import { useScroll, motion, useSpring } from "framer-motion";

/**
 * Thin scroll progress bar — fixed to top of viewport.
 * Uses Framer spring for smooth trailing feel.
 */
export default function NavProgress() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-px origin-left z-toast"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #00ffc2, #7c3aed)",
      }}
    />
  );
}
