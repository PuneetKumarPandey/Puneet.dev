"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { EASE, DUR, GSAP_EASE } from "@/config/animations";
import { useCursorContext } from "@/context/CursorContext";
import { useMagnetic } from "@/hooks/useMagnetic";
import { scrollTo } from "@/lib/lenis";
import GhostHeading from "@/components/ui/GhostHeading";

// ── Split word — single responsibility ────────────────────────
function SplitWord({ word, delay }: { word: string; delay: number }) {
  return (
    <span className="inline-block overflow-hidden">
      <motion.span
        className="inline-block"
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ delay, duration: DUR.slow, ease: EASE.out }}
      >
        {word}
      </motion.span>
    </span>
  );
}

// ── CTA — reduced variants, unified easing ────────────────────
function HeroCTA({
  label,
  href,
  variant,
  delay,
}: {
  label: string;
  href: string;
  variant: "primary" | "ghost";
  delay: number;
}) {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic<HTMLAnchorElement>({
    strength: 0.45,
  });
  const { setVariant } = useCursorContext();

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={(e) => {
        e.preventDefault();
        scrollTo(href);
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={() => {
        onMouseLeave();
        setVariant("default");
      }}
      onMouseEnter={() => setVariant("magnetic")}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: DUR.slow, ease: EASE.out }}
      whileTap={{ scale: 0.97 }}
      className={
        variant === "primary"
          ? `inline-flex items-center gap-3 px-8 py-4 rounded-full
             font-body text-xs tracking-widest uppercase
             bg-neon text-void font-medium
             transition-shadow duration-300 hover:shadow-neon`
          : `inline-flex items-center gap-3 px-8 py-4 rounded-full
             font-body text-xs tracking-widest uppercase
             border border-white/10 text-ash
             transition-colors duration-300
             hover:border-white/20 hover:text-white`
      }
    >
      {variant === "primary" && (
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
          <path
            d="M1 6.5h11M6.5 1l5.5 5.5-5.5 5.5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {label}
    </motion.a>
  );
}

export default function HeroText() {
  const tagRef = useRef<HTMLDivElement>(null);
  const { setVariant, setCursorText } = useCursorContext();

  useEffect(() => {
    if (!tagRef.current) return;
    gsap.fromTo(
      tagRef.current,
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, delay: 0.5, duration: 0.8, ease: GSAP_EASE.out },
    );
  }, []);

  const words = ["Building", "systems", "that"];

  return (
    <div
      className="relative z-10 flex flex-col items-start justify-center
                    min-h-screen px-gutter pt-24 pb-16 max-w-site mx-auto"
    >
      {/* Eyebrow */}
      <div ref={tagRef} className="mb-8 flex items-center gap-3 opacity-0">
        <span className="h-px w-8 bg-neon" aria-hidden />
        <span className="font-body text-xs tracking-[0.25em] uppercase text-neon">
          AI Application Developer
        </span>
        <span className="font-body text-xs text-whisper" aria-hidden>
          ·
        </span>
        <span className="font-body text-xs tracking-[0.2em] uppercase text-ghost">
          Bengaluru, India
        </span>
      </div>

      {/* Headline */}
      <h1
        className="font-display font-bold leading-[0.92] tracking-tight mb-8"
        style={{ fontSize: "clamp(4.5rem, 10.5vw, 10rem)" }}
        onMouseEnter={() => {
          setVariant("text");
          setCursorText("Think");
        }}
        onMouseLeave={() => {
          setVariant("default");
          setCursorText("");
        }}
      >
        {words.map((word, i) => (
          <span key={word} className="mr-[0.18em]">
            <SplitWord word={word} delay={0.85 + i * 0.1} />
          </span>
        ))}
        {/* Ghost word — typographic contrast */}
        <span className="inline-block overflow-hidden mr-[0.18em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ delay: 1.15, duration: DUR.slow, ease: EASE.out }}
          >
            <GhostHeading>think.</GhostHeading>
          </motion.span>
        </span>
      </h1>

      {/* Supporting line */}
      <motion.p
        className="font-sans text-ghost text-lg max-w-md leading-relaxed mb-12"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.45, duration: DUR.slow, ease: EASE.out }}
      >
        I architect <span className="text-ash">AI-native products</span> and{" "}
        <span className="text-ash">agentic systems</span> — built for scale,
        designed for the real world.
      </motion.p>

      {/* CTAs */}
      <div className="flex flex-wrap items-center gap-4">
        <HeroCTA
          label="Explore my systems"
          href="#systems"
          variant="primary"
          delay={1.6}
        />
        <HeroCTA
          label="How I think"
          href="#philosophy"
          variant="ghost"
          delay={1.72}
        />
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-gutter flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.8 }}
        aria-hidden
      >
        <span className="font-body text-xs tracking-widest uppercase text-whisper">
          Scroll
        </span>
        <div className="relative h-12 w-px bg-border overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full bg-neon"
            animate={{
              height: ["0%", "100%", "0%"],
              top: ["0%", "0%", "100%"],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* Coordinates */}
      <motion.div
        className="absolute bottom-10 right-gutter font-body text-xs
                   text-whisper tracking-widest uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        aria-label="Location: Bengaluru, India"
      >
        12.9°N · 77.5°E
      </motion.div>
    </div>
  );
}
