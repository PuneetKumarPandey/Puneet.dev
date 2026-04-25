"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { useCursorContext } from "@/context/CursorContext";
import type { SystemEntry } from "./systemsData";
import clsx from "clsx";

// ── Stack pill ─────────────────────────────────────────────────
function StackPill({ label, accent }: { label: string; accent: string }) {
  return (
    <span
      className="inline-block font-body text-xs px-2.5 py-1 rounded-full border"
      style={{
        color: accent,
        borderColor: `${accent}25`,
        backgroundColor: `${accent}08`,
      }}
    >
      {label}
    </span>
  );
}

// ── Expandable row ─────────────────────────────────────────────
export default function SystemCard({
  system,
  isOpen,
  onToggle,
}: {
  system: SystemEntry;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { setVariant, setCursorText } = useCursorContext();

  const handleEnter = () => {
    setVariant("text");
    setCursorText(isOpen ? "Close" : "Read");
  };

  const handleLeave = () => {
    // FIX: always clear cursor text on leave
    setVariant("default");
    setCursorText("");
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      onClick={onToggle}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={clsx(
        "relative border-b border-border overflow-hidden",
        "transition-colors duration-300",
        isOpen ? "bg-surface/60" : "hover:bg-surface/20",
      )}
    >
      {/* ── Header row (always visible) ── */}
      <motion.div
        layout="position"
        className="grid grid-cols-[3rem_1fr_auto] md:grid-cols-[6rem_1fr_12rem_auto] items-center gap-4 py-7 px-0"
      >
        {/* Index */}
        <span className="font-body text-xs text-whisper tracking-widest">
          {system.index}
        </span>

        {/* Title + tag */}
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span
              className="hidden md:inline-block font-body text-xs tracking-widest uppercase px-2.5 py-0.5 rounded-full border"
              style={{
                color: system.accent,
                borderColor: `${system.accent}25`,
                backgroundColor: `${system.accent}08`,
              }}
            >
              {system.tag}
            </span>
          </div>
          <h3
            className={clsx(
              "font-display tracking-tight leading-snug transition-colors duration-300",
              "text-xl md:text-2xl",
              isOpen ? "text-white" : "text-ash group-hover:text-white",
            )}
          >
            {system.title}
          </h3>
        </div>

        {/* Scale badge — desktop only */}
        <div className="hidden md:flex items-center gap-2">
          <span
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: system.accent }}
          />
          <span className="font-body text-xs text-ghost tracking-wider">
            {system.scale}
          </span>
        </div>

        {/* Expand indicator */}
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="w-8 h-8 rounded-full border border-border flex items-center justify-center flex-shrink-0"
          style={{ borderColor: isOpen ? `${system.accent}40` : undefined }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke={isOpen ? system.accent : "var(--color-ghost)"}
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <path d="M6 1v10M1 6h10" />
          </svg>
        </motion.div>
      </motion.div>

      {/* ── Expanded panel ── */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: {
                height: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.35, delay: 0.12 },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.4, ease: [0.7, 0, 0.84, 0] },
                opacity: { duration: 0.2 },
              },
            }}
          >
            <div className="pb-10 grid md:grid-cols-[6rem_1fr] gap-4">
              {/* Spacer to align with title column */}
              <div className="hidden md:block" />

              <div className="grid md:grid-cols-3 gap-8">
                {/* Problem */}
                <div>
                  <p
                    className="font-body text-xs tracking-widest uppercase mb-3"
                    style={{ color: system.accent }}
                  >
                    Problem
                  </p>
                  <p className="font-sans text-sm text-ghost leading-relaxed">
                    {system.problem}
                  </p>
                </div>

                {/* Approach */}
                <div>
                  <p
                    className="font-body text-xs tracking-widest uppercase mb-3"
                    style={{ color: system.accent }}
                  >
                    Architecture
                  </p>
                  <p className="font-sans text-sm text-ghost leading-relaxed">
                    {system.approach}
                  </p>
                </div>

                {/* Outcome */}
                <div>
                  <p
                    className="font-body text-xs tracking-widest uppercase mb-3"
                    style={{ color: system.accent }}
                  >
                    Outcome
                  </p>
                  <p className="font-sans text-sm text-ash leading-relaxed">
                    {system.outcome}
                  </p>

                  {/* Stack pills */}
                  <div className="flex flex-wrap gap-2 mt-5">
                    {system.stack.map((s) => (
                      <StackPill key={s} label={s} accent={system.accent} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Accent line at bottom of panel */}
            <motion.div
              className="absolute bottom-0 left-0 h-px"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              exit={{ width: "0%" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ backgroundColor: system.accent, opacity: 0.25 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Left accent bar on open */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-px"
        animate={{
          opacity: isOpen ? 1 : 0,
          backgroundColor: system.accent,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
