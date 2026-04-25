"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { useCursorContext } from "@/context/CursorContext";

interface Props {
  text: string;
  delay: number;
  size?: "large" | "medium" | "small";
  muted?: boolean;
  italic?: boolean;
  accent?: boolean;
}

const SIZE_MAP = {
  large: "text-3xl md:text-4xl lg:text-5xl",
  medium: "text-xl md:text-2xl",
  small: "text-base md:text-lg",
};

/**
 * A single line of the Vision manifesto.
 * Reveals via GSAP clip-path + translate — slower, more deliberate than Hero.
 */
export default function VisionLine({
  text,
  delay,
  size = "large",
  muted = false,
  italic = false,
  accent = false,
}: Props) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const { setVariant } = useCursorContext();

  useEffect(() => {
    if (!innerRef.current || !outerRef.current) return;

    gsap.fromTo(
      innerRef.current,
      { y: "108%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        delay,
        duration: 1.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: outerRef.current,
          start: "top 87%",
          once: true,
          toggleActions: "play none none none",
        },
      },
    );
  }, [delay]);

  return (
    <div ref={outerRef} className="overflow-hidden py-0.5">
      <div
        ref={innerRef}
        className={[
          "font-display tracking-tight leading-[1.1]",
          SIZE_MAP[size],
          muted ? "text-whisper" : accent ? "text-neon" : "text-ash",
          italic ? "italic" : "",
        ].join(" ")}
        onMouseEnter={() => accent && setVariant("hover")}
        onMouseLeave={() => setVariant("default")}
      >
        {text}
      </div>
    </div>
  );
}
