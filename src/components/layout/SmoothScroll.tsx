"use client";

import { useEffect, type ReactNode } from "react";
import { createLenis, destroyLenis } from "@/lib/lenis";

interface Props {
  children: ReactNode;
}

/**
 * Initializes Lenis on mount, synced with GSAP.
 * Wrap around the page content in root layout.
 */
export default function SmoothScroll({ children }: Props) {
  useEffect(() => {
    createLenis();
    return () => destroyLenis();
  }, []);

  return <>{children}</>;
}
