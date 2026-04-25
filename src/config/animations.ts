import type { Variants } from "framer-motion";

/**
 * EASING DICTIONARY
 * All easing in the site must reference these.
 * No inline cubic-bezier arrays anywhere else.
 */
export const EASE = {
  out: [0.16, 1, 0.3, 1] as [number, number, number, number],
  in: [0.7, 0, 0.84, 0] as [number, number, number, number],
  inOut: [0.77, 0, 0.175, 1] as [number, number, number, number],
  spring: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
  smooth: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
} as const;

/** GSAP string equivalents */
export const GSAP_EASE = {
  out: "power3.out",
  in: "power3.in",
  inOut: "power4.inOut",
  spring: "back.out(1.4)",
  elastic: "elastic.out(1, 0.4)",
} as const;

/** DURATION SCALE */
export const DUR = {
  fast: 0.25,
  base: 0.55,
  slow: 0.9,
  glacial: 1.2,
} as const;

/** STAGGER SCALE */
export const STAGGER = {
  tight: 0.06,
  base: 0.1,
  loose: 0.16,
} as const;

// ── Framer Motion variant presets ─────────────────────────────

export const fadeUp: Variants = {
  hidden: { y: 36, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: DUR.slow, ease: EASE.out },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DUR.base, ease: EASE.smooth },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER.base,
      delayChildren: 0.08,
    },
  },
};

export const clipReveal: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: DUR.glacial, ease: EASE.inOut },
  },
};

export const scaleIn: Variants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: DUR.base, ease: EASE.spring },
  },
};
