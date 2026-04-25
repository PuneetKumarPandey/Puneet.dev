"use client";

import SectionWrapper from "@/components/layout/SectionWrapper";
import CapabilityNode from "./CapabilityNode";
import type { Capability } from "./capabilityData";
import { useScrollReveal } from "@/hooks/useScrollReveal";

// ── Capability Data ────────────────────────────────────────────
// SVG path strings from Lucide icons (MIT license, inline-safe)
const CAPABILITIES: Capability[] = [
  {
    id: 1,
    domain: "Architecture",
    title: "Design scalable, production-grade systems",
    detail:
      "From monolith to microservice, event-driven to serverless — I design systems that handle real load and evolve without rewrites.",
    icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z M9 22V12h6v10",
    accent: "#00ffc2",
  },
  {
    id: 2,
    domain: "AI Systems",
    title: "Build intelligent, agentic AI workflows",
    detail:
      "LLM orchestration, RAG pipelines, multi-agent coordination — AI that acts, reasons, and integrates into real business logic.",
    icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    accent: "#7c3aed",
  },
  {
    id: 3,
    domain: "Product Thinking",
    title: "Translate business problems into systems",
    detail:
      "I work backwards from outcomes, not tech. Every architecture decision is a product decision.",
    icon: "M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z",
    accent: "#ff6b35",
  },
  {
    id: 4,
    domain: "Full Stack",
    title: "Own the entire delivery surface",
    detail:
      "Frontend to infrastructure, API to deployment — no handoff loss. One engineer, complete ownership.",
    icon: "M5 12h14M12 5l7 7-7 7",
    accent: "#00ffc2",
  },
  {
    id: 5,
    domain: "Generative AI",
    title: "Ship LLM-native product features at speed",
    detail:
      "Prompt engineering, fine-tuning, evaluation frameworks, cost-optimized inference — built for production, not demos.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    accent: "#7c3aed",
  },
  {
    id: 6,
    domain: "Systems Thinking",
    title: "Identify leverage points in complex problems",
    detail:
      "I find the one decision that unlocks ten downstream ones. Systemic reasoning over reactive fixes.",
    icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    accent: "#ff6b35",
  },
];

export default function Capabilities() {
  const headerRef = useScrollReveal<HTMLDivElement>({
    selector: ".cap-header-item",
    from: { y: 28, opacity: 0 },
    to: { y: 0, opacity: 1, ease: "power3.out", duration: 0.9 },
    stagger: 0.14,
    start: "top 80%",
  });

  return (
    <SectionWrapper id="capabilities" className="bg-depth">
      <div className="container py-section">
        {/* ── Section Header ── */}
        <div ref={headerRef} className="mb-16 md:mb-20">
          <div className="cap-header-item flex items-center gap-4 mb-6">
            <span className="h-px w-8 bg-volt" />
            <span className="font-body text-xs tracking-[0.25em] uppercase text-volt">
              Capabilities
            </span>
          </div>

          <div className="cap-header-item">
            <h2 className="font-display text-hero leading-[0.93] tracking-tight text-white max-w-2xl">
              What I{" "}
              <em
                className="not-italic text-transparent"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}
              >
                build.
              </em>
            </h2>
          </div>

          <p className="cap-header-item font-sans text-ghost text-lg max-w-lg mt-6 leading-relaxed">
            System-level abilities. Not a tech stack.
          </p>
        </div>

        {/* ── Node Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CAPABILITIES.map((cap, i) => (
            <CapabilityNode key={cap.id} capability={cap} index={i} />
          ))}
        </div>

        {/* ── Network connectors (decorative SVG lines) ── */}
        <NetworkDecoration />
      </div>
    </SectionWrapper>
  );
}

// ── Decorative network line pattern ───────────────────────────
function NetworkDecoration() {
  return (
    <div className="relative mt-20 h-px">
      {/* Horizontal rule with node dots */}
      <div className="absolute inset-0 flex items-center">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>
      <div className="absolute inset-0 flex items-center justify-between px-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="relative">
            <div className="h-1.5 w-1.5 rounded-full bg-border" />
            {i === 2 && (
              <div className="absolute inset-0 rounded-full bg-neon animate-pulse-neon" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
