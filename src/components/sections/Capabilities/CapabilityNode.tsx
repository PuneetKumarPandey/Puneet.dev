"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useMagnetic } from "@/hooks/useMagnetic";
import { useCursorContext } from "@/context/CursorContext";
import { EASE, DUR } from "@/config/animations";
// import type { Capability } from "./capabilityData";
import { Capability } from "./capabilityData";

export default function CapabilityNode({
  capability,
  index,
}: {
  capability: Capability;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const { ref, onMouseMove, onMouseLeave } = useMagnetic<HTMLDivElement>({
    strength: 0.14,
  });
  const { setVariant } = useCursorContext();

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={() => {
        onMouseLeave();
        setHovered(false);
        setVariant("default");
      }}
      onMouseEnter={() => {
        setHovered(true);
        setVariant("hover");
      }}
      // AUDIT FIX: active state for touch devices
      className="group relative p-7 rounded-xl border border-border
                 bg-surface/30 overflow-hidden
                 transition-colors duration-400
                 hover:border-white/8 active:scale-[0.99]"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{
        delay: index * 0.07,
        duration: DUR.slow,
        ease: EASE.out,
      }}
      style={{ willChange: "transform" }}
    >
      {/* AUDIT: glow opacity reduced from 1 → 0.7, spread tightened */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        animate={{ opacity: hovered ? 0.7 : 0 }}
        transition={{ duration: 0.35 }}
        style={{
          background: `radial-gradient(ellipse 70% 50% at 50% 130%,
                       ${capability.accent}12 0%, transparent 70%)`,
        }}
      />

      {/* Domain tag + index */}
      <div className="flex items-center justify-between mb-5">
        <span
          className="font-body text-xs tracking-widest uppercase
                     px-2.5 py-1 rounded-full border"
          style={{
            color: capability.accent,
            borderColor: `${capability.accent}22`,
            backgroundColor: `${capability.accent}07`,
          }}
        >
          {capability.domain}
        </span>
        <span className="font-body text-xs text-whisper tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Icon */}
      <div
        className="mb-5 w-9 h-9 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: `${capability.accent}10` }}
        aria-hidden
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke={capability.accent}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d={capability.icon} />
        </svg>
      </div>

      {/* Title */}
      <h3
        className="font-display text-xl text-ash leading-snug mb-3 tracking-tight
                     group-hover:text-white transition-colors duration-300"
      >
        {capability.title}
      </h3>

      {/* Detail */}
      <p className="font-sans text-sm text-ghost leading-relaxed">
        {capability.detail}
      </p>

      {/* Arrow — only on hover, no layout shift */}
      <motion.div
        className="absolute bottom-6 right-6"
        animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -4 }}
        transition={{ duration: 0.25 }}
        aria-hidden
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          stroke={capability.accent}
          strokeWidth="1.4"
          strokeLinecap="round"
        >
          <path d="M2 7h10M7 2l5 5-5 5" />
        </svg>
      </motion.div>
    </motion.div>
  );
}
