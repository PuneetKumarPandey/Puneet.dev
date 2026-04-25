"use client";

import SectionWrapper from "@/components/layout/SectionWrapper";
import PhilosophyStatement from "./PhilosophyStatement";
import GhostHeading from "@/components/ui/GhostHeading";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const STATEMENTS = [
  {
    index: "01",
    text: "Systems before features.",
    sub: "Every decision starts with the full picture — data flow, failure modes, scale constraints — before a single line is written. Features are temporary. Architecture outlasts everything.",
  },
  {
    index: "02",
    text: "AI is infrastructure, not a feature.",
    sub: "I build AI as a foundational layer, not a plugin. Generative models and agentic workflows belong in the core of how a product thinks — not bolted on at the end of a sprint.",
  },
  {
    index: "03",
    text: "Ownership is the only speed.",
    sub: "The fastest path through ambiguity is full ownership. I move quickly because I think end-to-end — from user intent to backend contracts to deployment. No handoff friction.",
  },
  {
    index: "04",
    text: "Complexity is a tax on clarity.",
    sub: "Every abstraction has a cost. I pay that cost only when it earns its place. Simple, readable systems survive longer, scale better, and break in predictable ways.",
  },
  {
    index: "05",
    text: "Ship to learn. Build to last.",
    sub: "Moving fast and building well are not opposites. Iteration is the strategy; architecture is the foundation. The best systems evolve intentionally.",
  },
] as const;

export default function Philosophy() {
  const headerRef = useScrollReveal<HTMLDivElement>({
    selector: ".phil-header-item",
    from: { y: 28, opacity: 0 },
    to: { y: 0, opacity: 1, ease: "power3.out", duration: 0.85 },
    stagger: 0.12,
    start: "top 80%",
  });

  return (
    // AUDIT: bg-void — same as hero. Intentional. Creates breathing room.
    // The depth shift happens at Capabilities.
    <SectionWrapper id="philosophy" className="bg-void">
      <div className="container py-section">
        <div ref={headerRef} className="mb-16 md:mb-20">
          <div className="phil-header-item flex items-center gap-4 mb-6">
            <span className="h-px w-8 bg-neon" aria-hidden />
            <span className="font-body text-xs tracking-[0.25em] uppercase text-neon">
              Philosophy
            </span>
          </div>

          <div className="phil-header-item overflow-hidden">
            <h2
              className="font-display leading-[0.93] tracking-tight text-white"
              style={{ fontSize: "clamp(3rem, 7vw, 7rem)" }}
            >
              How I <GhostHeading>think.</GhostHeading>
            </h2>
          </div>

          <p className="phil-header-item font-sans text-ghost text-lg max-w-sm mt-5 leading-relaxed">
            Not a skill list. A way of working.
          </p>
        </div>

        <div>
          {STATEMENTS.map((s) => (
            <PhilosophyStatement
              key={s.index}
              index={s.index}
              text={s.text}
              sub={s.sub}
            />
          ))}
        </div>

        {/* Section close — leads eye to Capabilities */}
        <div className="mt-20 flex items-center gap-6" aria-hidden>
          <span className="font-body text-xs tracking-widest uppercase text-whisper">
            Puneet Pandey
          </span>
          <span className="h-px flex-1 bg-border max-w-xs" />
          <span className="font-body text-xs text-whisper">
            Bengaluru · {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </SectionWrapper>
  );
}
