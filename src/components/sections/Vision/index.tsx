"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionWrapper from "@/components/layout/SectionWrapper";
import VisionLine from "./VisionLine";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useMagnetic } from "@/hooks/useMagnetic";
import { useCursorContext } from "@/context/CursorContext";
import { scrollTo } from "@/lib/lenis";

// ── Manifesto lines ────────────────────────────────────────────
// Each has: text, delay offset, visual treatment
const MANIFESTO = [
  {
    text: "The next decade of software",
    delay: 0,
    size: "large",
    muted: false,
    italic: false,
    accent: false,
  },
  {
    text: "will be defined by systems",
    delay: 0.08,
    size: "large",
    muted: false,
    italic: false,
    accent: false,
  },
  {
    text: "that reason, adapt,",
    delay: 0.16,
    size: "large",
    muted: false,
    italic: true,
    accent: false,
  },
  {
    text: "and act autonomously.",
    delay: 0.24,
    size: "large",
    muted: false,
    italic: false,
    accent: true,
  },
  {
    text: "",
    delay: 0,
    size: "small",
    muted: true,
    italic: false,
    accent: false,
  },
  {
    text: "I'm building toward that.",
    delay: 0.34,
    size: "medium",
    muted: false,
    italic: false,
    accent: false,
  },
  {
    text: "Not as a feature on a roadmap —",
    delay: 0.42,
    size: "medium",
    muted: true,
    italic: false,
    accent: false,
  },
  {
    text: "as the foundation of every",
    delay: 0.5,
    size: "medium",
    muted: true,
    italic: false,
    accent: false,
  },
  {
    text: "system I touch from here.",
    delay: 0.58,
    size: "medium",
    muted: false,
    italic: true,
    accent: false,
  },
] as const;

export default function Vision() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax on the background grid
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);

  // Header reveal
  const headerRef = useScrollReveal<HTMLDivElement>({
    selector: ".vis-header-item",
    from: { y: 24, opacity: 0 },
    to: { y: 0, opacity: 1, ease: "power3.out", duration: 0.9 },
    stagger: 0.13,
    start: "top 80%",
  });

  // CTA magnetic
  const {
    ref: ctaRef,
    onMouseMove,
    onMouseLeave,
  } = useMagnetic<HTMLButtonElement>({ strength: 0.45 });
  const { setVariant } = useCursorContext();

  return (
    <SectionWrapper id="vision" className="bg-depth overflow-hidden">
      <div ref={containerRef} className="relative">
        {/* ── Parallax grid background ── */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-[0.028]"
          style={{ y: gridY }}
          aria-hidden
        >
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="vision-grid"
                width="80"
                height="80"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 80 0 L 0 0 0 80"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#vision-grid)" />
          </svg>
        </motion.div>

        {/* ── Ambient glow ── */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                     w-[900px] h-[500px] rounded-full opacity-[0.06]"
          style={{
            background: "radial-gradient(ellipse, #00ffc2 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />

        <div className="container py-section relative z-10">
          {/* ── Section Header ── */}
          <div ref={headerRef} className="mb-20 md:mb-24">
            <div className="vis-header-item flex items-center gap-4 mb-6">
              <span className="h-px w-8 bg-neon" />
              <span className="font-body text-xs tracking-[0.25em] uppercase text-neon">
                Vision
              </span>
            </div>
          </div>

          {/* ── Manifesto text ── */}
          <div className="max-w-4xl space-y-1 mb-20 md:mb-28">
            {MANIFESTO.map((line, i) =>
              line.text === "" ? (
                <div key={i} className="h-6" />
              ) : (
                <VisionLine
                  key={i}
                  text={line.text}
                  delay={line.delay}
                  size={line.size as "large" | "medium" | "small"}
                  muted={line.muted}
                  italic={line.italic}
                  accent={line.accent}
                />
              ),
            )}
          </div>

          {/* ── Three pillars ── */}
          <VisionPillars />

          {/* ── CTA ── */}
          <div className="mt-20 flex items-center gap-6">
            <button
              ref={ctaRef}
              onMouseMove={onMouseMove}
              onMouseLeave={() => {
                onMouseLeave();
                setVariant("default");
              }}
              onMouseEnter={() => setVariant("magnetic")}
              onClick={() => scrollTo("#contact")}
              className="group inline-flex items-center gap-3 font-body text-xs
                         tracking-widest uppercase text-neon px-8 py-4 rounded-full
                         border border-neon/30 hover:border-neon hover:bg-neon/10
                         transition-all duration-300 hover:shadow-neon"
            >
              <span
                className="h-1.5 w-1.5 rounded-full bg-neon
                           group-hover:scale-150 transition-transform duration-300"
              />
              Let's build something
            </button>

            <motion.div
              className="h-px flex-1 max-w-xs bg-gradient-to-r from-neon/30 to-transparent"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.8,
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          </div>
          {/* Bridge to Contact — prevents seam */}
          <motion.div
            className="mt-24 flex items-center gap-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.9 }}
            aria-hidden
          >
            <span className="font-body text-xs tracking-[0.25em] uppercase text-whisper">
              Ready to start?
            </span>
            <span className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-border to-transparent" />
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="var(--color-whisper)"
              strokeWidth="1"
              strokeLinecap="round"
            >
              <path d="M8 2v12M4 10l4 4 4-4" />
            </svg>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}

// ── Three directional pillars ──────────────────────────────────
const PILLARS = [
  {
    number: "001",
    title: "AI-Native Products",
    body: "Products where intelligence is the architecture — not a layer on top of it.",
    accent: "#00ffc2",
  },
  {
    number: "002",
    title: "Agentic Infrastructure",
    body: "The plumbing that lets AI systems act, recover, and improve without constant human intervention.",
    accent: "#7c3aed",
  },
  {
    number: "003",
    title: "Human-Centred Systems",
    body: "Technology that augments how people work — not replaces the judgment that makes work meaningful.",
    accent: "#ff6b35",
  },
] as const;

function VisionPillars() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border rounded-xl overflow-hidden">
      {PILLARS.map((pillar, i) => (
        <motion.div
          key={pillar.number}
          className="bg-void p-8 md:p-10 group"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{
            delay: 0.1 + i * 0.12,
            duration: 0.85,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {/* Number */}
          <p
            className="font-body text-xs tracking-widest mb-6"
            style={{ color: `${pillar.accent}60` }}
          >
            {pillar.number}
          </p>

          {/* Accent rule */}
          <div
            className="h-px w-8 mb-6 transition-all duration-500 group-hover:w-16"
            style={{ backgroundColor: pillar.accent }}
          />

          {/* Title */}
          <h4
            className="font-display text-lg text-ash mb-3 tracking-tight
                       group-hover:text-white transition-colors duration-300"
          >
            {pillar.title}
          </h4>

          {/* Body */}
          <p className="font-sans text-sm text-ghost leading-relaxed">
            {pillar.body}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
