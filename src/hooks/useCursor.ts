"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type CursorVariant =
  | "default"
  | "hover"
  | "magnetic"
  | "text"
  | "hidden";

interface CursorState {
  x: number;
  y: number;
  variant: CursorVariant;
}

interface UseCursorReturn {
  cursorRef: React.RefObject<HTMLDivElement>;
  dotRef: React.RefObject<HTMLDivElement>;
  variant: CursorVariant;
  setVariant: (variant: CursorVariant) => void;
}

export function useCursor(): UseCursorReturn {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const [variant, setVariant] = useState<CursorVariant>("default");

  // Tracked position for smooth lerp
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>();

  const onMouseMove = useCallback((e: MouseEvent) => {
    target.current = { x: e.clientX, y: e.clientY };

    // Dot (inner) snaps immediately
    if (dotRef.current) {
      dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    }
  }, []);

  // RAF loop — lerp cursor ring toward target
  const animate = useCallback(() => {
    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;
    const speed = variant === "magnetic" ? 0.22 : 0.14;

    pos.current.x = lerp(pos.current.x, target.current.x, speed);
    pos.current.y = lerp(pos.current.y, target.current.y, speed);

    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
    }

    rafId.current = requestAnimationFrame(animate);
  }, [variant]);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [onMouseMove, animate]);

  return { cursorRef, dotRef, variant, setVariant };
}
