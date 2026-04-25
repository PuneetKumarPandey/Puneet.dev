"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCursorContext } from "@/context/CursorContext";
import { useReducedMotion, useIsMobile } from "@/hooks/useMediaQuery";

const CURSOR_SIZE: Record<string, number> = {
  default: 20,
  hover: 44,
  text: 80,
  magnetic: 56,
  hidden: 0,
};

export default function CustomCursor() {
  const { variant, cursorText } = useCursorContext();
  const prefersReduced = useReducedMotion();
  const isMobile = useIsMobile();

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const dotX = useSpring(mouseX, { stiffness: 1200, damping: 60, mass: 0.1 });
  const dotY = useSpring(mouseY, { stiffness: 1200, damping: 60, mass: 0.1 });
  const ringX = useSpring(mouseX, { stiffness: 160, damping: 24, mass: 0.6 });
  const ringY = useSpring(mouseY, { stiffness: 160, damping: 24, mass: 0.6 });

  useEffect(() => {
    if (prefersReduced || isMobile) return;

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY, prefersReduced, isMobile]);

  // Don't render on mobile or reduced motion
  if (isMobile || prefersReduced) return null;

  const size = CURSOR_SIZE[variant] ?? 20;
  const isHidden = variant === "hidden";
  const isText = variant === "text";

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-cursor
                   flex items-center justify-center rounded-full"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{ width: size, height: size, opacity: isHidden ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 30 }}
      >
        <motion.div
          className="h-full w-full rounded-full border border-neon"
          animate={{
            backgroundColor:
              variant === "hover" || variant === "magnetic"
                ? "rgba(0,255,194,0.07)"
                : "transparent",
          }}
          transition={{ duration: 0.2 }}
        >
          {isText && cursorText && (
            <span
              className="absolute inset-0 flex items-center justify-center
                             font-body text-xs text-neon pointer-events-none"
            >
              {cursorText}
            </span>
          )}
        </motion.div>
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-cursor
                   rounded-full bg-neon"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: 5,
          height: 5,
        }}
        animate={{
          scale: variant === "hover" || variant === "magnetic" ? 0 : 1,
          opacity: isHidden ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
