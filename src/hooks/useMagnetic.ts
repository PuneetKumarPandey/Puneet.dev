"use client";

import { useRef, useCallback, useEffect } from "react";
import { gsap } from "@/lib/gsap";

interface MagneticOptions {
  strength?: number;
}

export function useMagnetic<T extends HTMLElement>(
  options: MagneticOptions = {},
) {
  const { strength = 0.4 } = options;
  const ref = useRef<T>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  // Kill any running tween on unmount
  useEffect(() => {
    return () => {
      tweenRef.current?.kill();
    };
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const deltaX = (e.clientX - rect.left - rect.width / 2) * strength;
      const deltaY = (e.clientY - rect.top - rect.height / 2) * strength;

      tweenRef.current?.kill();
      tweenRef.current = gsap.to(el, {
        x: deltaX,
        y: deltaY,
        duration: 0.4,
        ease: GSAP_EASE.out,
      });
    },
    [strength],
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    tweenRef.current?.kill();
    tweenRef.current = gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.4)",
    });
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}

import { GSAP_EASE } from "@/config/animations";
