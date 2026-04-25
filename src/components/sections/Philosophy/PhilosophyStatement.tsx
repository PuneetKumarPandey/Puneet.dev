"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCursorContext } from "@/context/CursorContext";

interface StatementProps {
  index: string; // "01", "02" etc.
  text: string;
  sub: string;
  delay?: number;
}

export default function PhilosophyStatement({
  index,
  text,
  sub,
}: StatementProps) {
  const lineRef = useScrollReveal<HTMLDivElement>({
    selector: ".reveal-target",
    from: { y: 40, opacity: 0 },
    to: { y: 0, opacity: 1, ease: "power3.out", duration: 1.0 },
    stagger: 0.14,
    start: "top 84%",
  });

  const { setVariant } = useCursorContext();

  return (
    <div
      ref={lineRef}
      className="group relative grid grid-cols-[3rem_1fr] md:grid-cols-[6rem_1fr] gap-6 md:gap-12 py-10 md:py-14 border-b border-border last:border-b-0"
    >
      {/* Index */}
      <div className="reveal-target pt-1">
        <span className="font-body text-xs text-whisper tracking-widest">
          {index}
        </span>
      </div>

      {/* Content */}
      <div>
        <p
          className="reveal-target font-display text-2xl md:text-3xl text-ash leading-[1.15] mb-4 tracking-tight"
          onMouseEnter={() => setVariant("text")}
          onMouseLeave={() => setVariant("default")}
          style={{ fontStyle: "normal" }}
        >
          {text}
        </p>
        <p className="reveal-target font-sans text-base text-ghost leading-relaxed max-w-xl">
          {sub}
        </p>
      </div>

      {/* Accent line on hover */}
      <div
        className="absolute left-0 top-0 w-px h-0 bg-neon opacity-0
                   group-hover:h-full group-hover:opacity-100
                   transition-all duration-700 ease-out-expo"
      />
    </div>
  );
}
