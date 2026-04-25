/**
 * GSAP Singleton
 * ─────────────────────────────────────────────────────────────
 * Registers plugins once, globally.
 * Import `gsap` and `ScrollTrigger` from here — never from 'gsap' directly.
 * This prevents duplicate plugin registration bugs in Next.js.
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register plugins once
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // Global GSAP defaults
  gsap.defaults({
    ease: "power3.out",
    duration: 0.8,
  });

  // ScrollTrigger global config
  ScrollTrigger.config({
    ignoreMobileResize: true, // prevents layout thrash on mobile scroll
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
  });
}

// ── Animation Presets ──────────────────────────────────────────
export const GSAP_PRESETS = {
  fadeUp: {
    from: { y: 60, opacity: 0 },
    to: { y: 0, opacity: 1, ease: "power3.out", duration: 0.9 },
  },
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1, ease: "power2.out", duration: 0.6 },
  },
  clipReveal: {
    from: { clipPath: "inset(0 100% 0 0)" },
    to: { clipPath: "inset(0 0% 0 0)", ease: "power4.inOut", duration: 1.2 },
  },
  scaleIn: {
    from: { scale: 0.9, opacity: 0 },
    to: { scale: 1, opacity: 1, ease: "back.out(1.4)", duration: 0.8 },
  },
  slideLeft: {
    from: { x: 80, opacity: 0 },
    to: { x: 0, opacity: 1, ease: "power3.out", duration: 0.9 },
  },
  stagger: {
    amount: 0.12,
    from: "start" as const,
  },
} as const;

// ── ScrollTrigger Defaults ─────────────────────────────────────
export const ST_DEFAULTS = {
  start: "top 85%",
  end: "bottom 15%",
  markers: false, // set true during dev
} as const;

// ── Utility: create scrollTrigger-driven fromTo ────────────────
export function animateOnScroll(
  target: string | Element | Element[],
  fromVars: gsap.TweenVars,
  toVars: gsap.TweenVars,
  scrollTrigger?: ScrollTrigger.Vars,
) {
  return gsap.fromTo(target, fromVars, {
    ...toVars,
    scrollTrigger: {
      trigger: target as Element,
      ...ST_DEFAULTS,
      ...scrollTrigger,
    },
  });
}

// ── Utility: staggered children animation ─────────────────────
export function staggerChildren(
  parent: string | Element,
  childSelector: string,
  fromVars: gsap.TweenVars,
  toVars: gsap.TweenVars,
  staggerAmount = 0.12,
) {
  const children =
    typeof parent === "string"
      ? document.querySelectorAll(`${parent} ${childSelector}`)
      : (parent as Element).querySelectorAll(childSelector);

  return gsap.fromTo(children, fromVars, {
    ...toVars,
    stagger: staggerAmount,
    scrollTrigger: {
      trigger: parent as Element,
      ...ST_DEFAULTS,
    },
  });
}

export { gsap, ScrollTrigger };
