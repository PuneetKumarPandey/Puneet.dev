/**
 * Lenis Smooth Scroll Singleton
 * ─────────────────────────────────────────────────────────────
 * Configured for perfect 60fps feel.
 * Synced with GSAP's ticker for frame-perfect animations.
 */

import Lenis from "@studio-freight/lenis";
import { gsap } from "./gsap";

let lenisInstance: Lenis | null = null;

export function createLenis(): Lenis {
  if (lenisInstance) return lenisInstance;

  lenisInstance = new Lenis({
    duration: 1.3, // scroll duration multiplier
    easing: (
      t: number, // custom ease: expo-like decay
    ) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: 0.8, // slightly slower = more premium feel
    touchMultiplier: 1.5,
    infinite: false,
  });

  // ── Sync Lenis RAF with GSAP ticker ──────────────────────────
  // This is critical — without this, ScrollTrigger and Lenis
  // can fall out of sync on certain frames.
  gsap.ticker.add((time) => {
    lenisInstance?.raf(time * 1000);
  });

  // Prevent GSAP from adding its own requestAnimationFrame
  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function destroyLenis(): void {
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
}

// ── Helper: scroll to element or position ─────────────────────
export function scrollTo(
  target: string | number | HTMLElement,
  options?: { offset?: number; duration?: number; immediate?: boolean },
) {
  lenisInstance?.scrollTo(target, {
    offset: options?.offset ?? 0,
    duration: options?.duration ?? 1.4,
    immediate: options?.immediate ?? false,
  });
}

// ── Helper: stop/start scroll (for modals, menus) ─────────────
export function stopScroll() {
  lenisInstance?.stop();
}

export function startScroll() {
  lenisInstance?.start();
}
