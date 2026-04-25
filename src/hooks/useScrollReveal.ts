"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { GSAP_EASE } from "@/config/animations";

interface ScrollRevealOptions {
  selector?: string;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  stagger?: number;
  start?: string;
}

export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {},
) {
  const {
    selector,
    from = { y: 40, opacity: 0 },
    to = { y: 0, opacity: 1, ease: GSAP_EASE.out, duration: 0.9 },
    stagger = 0,
    start = "top 82%",
  } = options;

  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = selector
      ? Array.from(el.querySelectorAll<HTMLElement>(selector))
      : [el];

    if (!targets.length) return;

    // Set initial state immediately — prevents flash before trigger
    gsap.set(targets, from);

    const ctx = gsap.context(() => {
      gsap.to(targets, {
        ...to,
        stagger,
        scrollTrigger: {
          trigger: el,
          start,
          once: true,
          toggleActions: "play none none none",
        },
      });
    }, el);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally empty — options are read once on mount

  return ref;
}
