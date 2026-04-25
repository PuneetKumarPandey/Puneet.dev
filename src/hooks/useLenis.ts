"use client";

import { useEffect, useRef } from "react";
import type Lenis from "@studio-freight/lenis";
import { getLenis } from "@/lib/lenis";

type ScrollCallback = (e: {
  scroll: number;
  limit: number;
  velocity: number;
  direction: number;
  progress: number;
}) => void;

/**
 * Subscribe to Lenis scroll events.
 * Automatically unsubscribes on unmount.
 */
export function useLenisScroll(callback: ScrollCallback) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return;

    const handler: ScrollCallback = (e) => callbackRef.current(e);
    lenis.on("scroll", handler);

    return () => {
      lenis.off("scroll", handler);
    };
  }, []);
}

/**
 * Get direct Lenis instance reference.
 * Use sparingly — prefer useLenisScroll for subscriptions.
 */
export function useLenisInstance(): Lenis | null {
  return getLenis();
}
