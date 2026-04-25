"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";

interface Props {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  /** 'line' wraps children in a clip container — reveals bottom-to-top */
  mode?: "line" | "fade";
}

/**
 * Single-line GSAP clip reveal.
 * Wrap any text node. Parent must NOT have overflow: hidden (that's our job).
 */
export default function RevealText({
  children,
  delay = 0,
  duration = 0.9,
  className,
  mode = "line",
}: Props) {
  const outerRef = useRef<HTMLSpanElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (mode === "line" && innerRef.current) {
      gsap.fromTo(
        innerRef.current,
        { y: "105%" },
        {
          y: 0,
          delay,
          duration,
          ease: "power3.out",
          scrollTrigger: {
            trigger: outerRef.current!,
            start: "top 88%",
            once: true,
            toggleActions: "play none none none",
          },
        },
      );
    } else if (mode === "fade" && outerRef.current) {
      gsap.fromTo(
        outerRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          delay,
          duration,
          ease: "power3.out",
          scrollTrigger: {
            trigger: outerRef.current,
            start: "top 88%",
            once: true,
            toggleActions: "play none none none",
          },
        },
      );
    }
  }, [delay, duration, mode]);

  if (mode === "line") {
    return (
      <span
        ref={outerRef}
        className={`inline-block overflow-hidden ${className ?? ""}`}
      >
        <span ref={innerRef} className="inline-block">
          {children}
        </span>
      </span>
    );
  }

  return (
    <span ref={outerRef} className={className}>
      {children}
    </span>
  );
}
