"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface Props {
  containerRef: React.RefObject<HTMLElement>;
}

/**
 * Attaches GSAP ScrollTrigger parallax to hero section.
 * Text layers move at different rates — creates depth on scroll.
 */
export default function useHeroScroll({ containerRef }: Props) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const hero = containerRef.current;
      if (!hero) return;

      // Headline parallax — drifts up faster than scroll speed
      gsap.to(".hero-headline", {
        y: "-15vh",
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // Eyebrow + supporting text — slightly slower
      gsap.to(".hero-meta", {
        y: "-8vh",
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "50% top",
          scrub: true,
        },
      });

      // Canvas fades on scroll
      gsap.to(".hero-canvas", {
        opacity: 0.15,
        scale: 1.04,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef]);
}
