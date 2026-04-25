"use client";

import { useState, useEffect, useRef } from "react";

const SECTIONS = [
  "hero",
  "philosophy",
  "capabilities",
  "systems",
  "vision",
  "contact",
];
// Use a lower threshold — 0.15 catches short sections that never reach 0.3
const THRESHOLD = 0.15;

export function useActiveSection(): string {
  const [active, setActive] = useState("hero");
  const observers = useRef<IntersectionObserver[]>([]);

  useEffect(() => {
    observers.current.forEach((o) => o.disconnect());
    observers.current = [];

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        {
          threshold: THRESHOLD,
          rootMargin: "-10% 0px -10% 0px",
        },
      );
      observer.observe(el);
      observers.current.push(observer);
    });

    return () => observers.current.forEach((o) => o.disconnect());
  }, []);

  return active;
}
