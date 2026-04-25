"use client";

import { useRef } from "react";
import HeroText from "./HeroText";
import HeroCanvas from "./HeroCanvas";
import useHeroScroll from "./HeroScroll";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  useHeroScroll({ containerRef });

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-void"
    >
      {/* 3D particle field background */}
      <div className="hero-canvas">
        <HeroCanvas />
      </div>

      {/* Ambient gradient blob — top left */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-[700px] w-[700px] rounded-full opacity-[0.07]"
        style={{
          background: "radial-gradient(circle, #00ffc2 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Ambient gradient blob — bottom right */}
      <div
        className="pointer-events-none absolute -bottom-20 -right-20 h-[500px] w-[500px] rounded-full opacity-[0.05]"
        style={{
          background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Typography layer */}
      <div className="hero-headline w-full">
        <HeroText />
      </div>

      {/* Horizontal rule at bottom */}
      <div className="hero-meta absolute bottom-0 left-0 right-0 h-px bg-border" />
    </section>
  );
}
